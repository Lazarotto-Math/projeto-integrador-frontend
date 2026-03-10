import { Exercise } from '../utils/aiTrainer';
import { Dumbbell, Clock, Zap, AlertTriangle } from 'lucide-react';

interface WorkoutCardProps {
  exercise: Exercise;
  number: number;
}

export default function WorkoutCard({ exercise, number }: WorkoutCardProps) {
  const intensityConfig = {
    baixa: { 
      bg: 'bg-green-500/10', 
      border: 'border-green-500/30', 
      text: 'text-green-400',
      label: 'LEVE'
    },
    media: { 
      bg: 'bg-yellow-500/10', 
      border: 'border-yellow-500/30', 
      text: 'text-yellow-400',
      label: 'MODERADA'
    },
    alta: { 
      bg: 'bg-red-500/10', 
      border: 'border-red-500/30', 
      text: 'text-red-400',
      label: 'INTENSA'
    },
  };

  const config = intensityConfig[exercise.intensity];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 active:scale-98 transition-all">
      <div className="flex items-start gap-3 mb-4">
        {/* Number Badge */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-white font-bold">{number}</span>
          </div>
        </div>

        {/* Exercise Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h5 className="font-bold text-white text-base tracking-tight uppercase leading-tight">
              {exercise.name}
            </h5>
            <div className={`px-2.5 py-1 rounded-lg border ${config.bg} ${config.border} flex-shrink-0`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${config.text}`}>
                {config.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
            <Dumbbell className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-semibold">{exercise.machine}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-black/50 rounded-xl p-2.5 border border-zinc-800">
          <div className="text-[9px] text-zinc-500 mb-1 font-bold uppercase tracking-wider">Séries</div>
          <div className="font-bold text-white text-base">{exercise.sets}<span className="text-orange-500 text-sm">x</span></div>
        </div>
        <div className="bg-black/50 rounded-xl p-2.5 border border-zinc-800">
          <div className="text-[9px] text-zinc-500 mb-1 font-bold uppercase tracking-wider">Reps</div>
          <div className="font-bold text-white text-base">{exercise.reps}</div>
        </div>
        <div className="bg-black/50 rounded-xl p-2.5 border border-zinc-800">
          <div className="text-[9px] text-zinc-500 mb-1 font-bold uppercase tracking-wider">Rest</div>
          <div className="font-bold text-white text-base flex items-center gap-0.5">
            <Clock className="w-3 h-3 text-orange-500" />
            <span className="text-sm">{exercise.rest}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {exercise.notes && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 mb-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-orange-200 font-semibold leading-snug">{exercise.notes}</p>
          </div>
        </div>
      )}

      {/* Muscle Group Tag */}
      <div className="flex items-center gap-1.5">
        <Zap className="w-3 h-3 text-purple-400" />
        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
          {exercise.muscleGroup}
        </span>
      </div>
    </div>
  );
}