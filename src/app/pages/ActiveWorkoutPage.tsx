import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ChevronLeft,
  Check,
  Play,
  Pause,
  SkipForward,
  Flame,
  Clock,
  Weight,
  TrendingUp,
  X,
} from 'lucide-react';
import { UserMetrics, generateAIWorkout, Exercise } from '../utils/aiTrainer';

interface ExerciseLog {
  exerciseId: string;
  sets: {
    setNumber: number;
    weight: number;
    reps: number;
    completed: boolean;
  }[];
}

export default function ActiveWorkoutPage() {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(20);
  const [selectedReps, setSelectedReps] = useState(10);
  const [showWeightPicker, setShowWeightPicker] = useState(false);
  const [workoutStartTime] = useState(new Date());

  useEffect(() => {
    const storedMetrics = localStorage.getItem('userMetrics');
    if (!storedMetrics) {
      navigate('/');
      return;
    }
    setMetrics(JSON.parse(storedMetrics));
  }, [navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  if (!metrics) return null;

  const workoutPlans = generateAIWorkout(metrics);
  const currentWorkout = workoutPlans[Number(workoutId)];
  const currentExercise = currentWorkout?.exercises[currentExerciseIndex];

  if (!currentWorkout || !currentExercise) {
    navigate('/dashboard');
    return null;
  }

  const totalExercises = currentWorkout.exercises.length;
  const progress = ((currentExerciseIndex + 1) / totalExercises) * 100;

  const handleCompleteSet = () => {
    const exerciseLog = exerciseLogs.find((log) => log.exerciseId === currentExercise.id) || {
      exerciseId: currentExercise.id,
      sets: [],
    };

    exerciseLog.sets.push({
      setNumber: currentSet,
      weight: selectedWeight,
      reps: selectedReps,
      completed: true,
    });

    const updatedLogs = exerciseLogs.filter((log) => log.exerciseId !== currentExercise.id);
    setExerciseLogs([...updatedLogs, exerciseLog]);

    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
      // Start rest timer
      const restSeconds = parseInt(currentExercise.rest.replace('s', ''));
      setRestTimer(restSeconds);
      setIsResting(true);
    } else {
      // Move to next exercise
      handleNextExercise();
    }

    setShowWeightPicker(false);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setIsResting(false);
      setRestTimer(0);
      // Reset weight to recommended for new exercise
      setSelectedWeight(20);
    } else {
      // Workout completed
      handleCompleteWorkout();
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTimer(0);
  };

  const handleCompleteWorkout = () => {
    const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]');
    const today = new Date().toISOString().split('T')[0];
    completedWorkouts.push(`${today}-${workoutId}`);
    localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));

    // Save workout log
    const workoutLog = {
      date: new Date().toISOString(),
      workoutId,
      workoutName: currentWorkout.focus,
      duration: Math.round((new Date().getTime() - workoutStartTime.getTime()) / 60000),
      exercises: exerciseLogs,
    };
    
    const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    workoutHistory.push(workoutLog);
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));

    navigate('/dashboard');
  };

  const handleQuit = () => {
    if (window.confirm('Deseja realmente sair? Seu progresso será perdido.')) {
      navigate('/dashboard');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCompletedSets = () => {
    const log = exerciseLogs.find((log) => log.exerciseId === currentExercise.id);
    return log?.sets.length || 0;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleQuit}
              className="p-2 hover:bg-zinc-900 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="text-sm font-bold text-zinc-400">
              {currentExerciseIndex + 1}/{totalExercises}
            </div>
          </div>
        </div>
      </header>

      {/* Rest Timer Overlay */}
      {isResting && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center px-6">
            <div className="relative mb-8">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-zinc-800"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-orange-500"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - restTimer / parseInt(currentExercise.rest.replace('s', '')))}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-white">{restTimer}</div>
              </div>
            </div>

            <p className="text-xl font-bold text-white mb-2">Descanso</p>
            <p className="text-zinc-400 mb-8">Prepare-se para a próxima série</p>

            <button
              onClick={handleSkipRest}
              className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white font-bold active:scale-95 transition-transform"
            >
              Pular Descanso
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-24 px-4 pb-32">
        <div className="space-y-6">
          {/* Exercise Info */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-2 border-orange-500/50 rounded-3xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-orange-400">
                  {currentExerciseIndex + 1}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {currentExercise.name}
                </h2>
                <p className="text-orange-200 text-sm">{currentExercise.machine}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/30 rounded-xl p-3 text-center">
                <p className="text-xs text-orange-300 mb-1 uppercase tracking-wider">Séries</p>
                <p className="text-xl font-bold text-white">{currentExercise.sets}</p>
              </div>
              <div className="bg-black/30 rounded-xl p-3 text-center">
                <p className="text-xs text-orange-300 mb-1 uppercase tracking-wider">Reps</p>
                <p className="text-xl font-bold text-white">{currentExercise.reps}</p>
              </div>
              <div className="bg-black/30 rounded-xl p-3 text-center">
                <p className="text-xs text-orange-300 mb-1 uppercase tracking-wider">Descanso</p>
                <p className="text-xl font-bold text-white">{currentExercise.rest}</p>
              </div>
            </div>

            {currentExercise.notes && (
              <div className="mt-4 bg-orange-500/10 border border-orange-500/30 rounded-xl p-3">
                <p className="text-sm text-orange-200">{currentExercise.notes}</p>
              </div>
            )}
          </div>

          {/* Current Set */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Série Atual</h3>
              <div className="flex items-center gap-2">
                {Array.from({ length: currentExercise.sets }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all ${
                      index < getCompletedSets()
                        ? 'bg-green-500/20 border-green-500'
                        : index === currentSet - 1
                        ? 'bg-orange-500/20 border-orange-500'
                        : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    {index < getCompletedSets() ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <span className="text-sm font-bold text-zinc-500">{index + 1}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weight Picker */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                  Carga (kg)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="2.5"
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(Number(e.target.value))}
                    className="w-full h-3 bg-zinc-900 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-8
                      [&::-webkit-slider-thumb]:h-8
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-gradient-to-r
                      [&::-webkit-slider-thumb]:from-orange-500
                      [&::-webkit-slider-thumb]:to-red-600
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:shadow-lg
                      [&::-webkit-slider-thumb]:shadow-orange-500/50
                      [&::-moz-range-thumb]:w-8
                      [&::-moz-range-thumb]:h-8
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-gradient-to-r
                      [&::-moz-range-thumb]:from-orange-500
                      [&::-moz-range-thumb]:to-red-600
                      [&::-moz-range-thumb]:border-0
                      [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between mt-3 text-xs text-zinc-500">
                    <span>0 kg</span>
                    <span className="text-2xl font-bold text-white">{selectedWeight} kg</span>
                    <span>200 kg</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                  Repetições
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedReps(Math.max(1, selectedReps - 1))}
                    className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-bold active:scale-95 transition-all"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-bold text-white">{selectedReps}</span>
                    <span className="text-zinc-500 ml-2">reps</span>
                  </div>
                  <button
                    onClick={() => setSelectedReps(selectedReps + 1)}
                    className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-bold active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Sets Log */}
          {getCompletedSets() > 0 && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">
                Séries Completadas
              </h3>
              <div className="space-y-3">
                {exerciseLogs
                  .find((log) => log.exerciseId === currentExercise.id)
                  ?.sets.map((set) => (
                    <div
                      key={set.setNumber}
                      className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500/20 border border-green-500 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-500" />
                        </div>
                        <span className="text-white font-semibold">Série {set.setNumber}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-zinc-400">{set.weight} kg</span>
                        <span className="text-zinc-600">×</span>
                        <span className="text-zinc-400">{set.reps} reps</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4 pb-safe">
        <div className="flex gap-3">
          {currentSet < currentExercise.sets && (
            <button
              onClick={handleNextExercise}
              className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white font-bold active:scale-95 transition-all"
            >
              Pular Exercício
            </button>
          )}
          <button
            onClick={handleCompleteSet}
            className="flex-1 relative py-4 rounded-2xl font-bold text-white active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl" />
            <span className="relative flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              {currentSet === currentExercise.sets ? 'Próximo Exercício' : 'Completar Série'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
