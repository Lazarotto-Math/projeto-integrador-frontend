import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Flame,
  Calendar,
  Target,
  TrendingUp,
  User,
  Crown,
  Dumbbell,
  Home,
  BarChart,
  Play,
  Lock,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { UserMetrics, generateAIWorkout, WorkoutPlan } from '../utils/aiTrainer';
import AdBanner from '../components/AdBanner';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'progress' | 'profile'>('home');
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);

  useEffect(() => {
    const storedMetrics = localStorage.getItem('userMetrics');
    const storedPlan = localStorage.getItem('userPlan') as 'free' | 'premium';
    const storedCompleted = localStorage.getItem('completedWorkouts');
    
    if (!storedMetrics) {
      navigate('/');
      return;
    }

    const userMetrics: UserMetrics = JSON.parse(storedMetrics);
    setMetrics(userMetrics);
    setUserPlan(storedPlan || 'free');
    
    if (storedCompleted) {
      setCompletedWorkouts(JSON.parse(storedCompleted));
    }

    const plans = generateAIWorkout(userMetrics);
    setWorkoutPlans(plans);
  }, [navigate]);

  const handleStartWorkout = (planIndex: number) => {
    navigate(`/workout/${planIndex}`);
  };

  const handleUpgrade = () => {
    // Simular upgrade para premium
    localStorage.setItem('userPlan', 'premium');
    setUserPlan('premium');
  };

  const isWorkoutCompleted = (dayIndex: number) => {
    const today = new Date().toISOString().split('T')[0];
    return completedWorkouts.includes(`${today}-${dayIndex}`);
  };

  if (!metrics) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <Flame className="w-16 h-16 text-orange-500 animate-pulse" />
          <p className="text-zinc-400 font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  const todayWorkout = workoutPlans[new Date().getDay() % workoutPlans.length];
  const todayIndex = new Date().getDay() % workoutPlans.length;

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white">IRON<span className="text-orange-500">AI</span></h1>
                {userPlan === 'premium' && (
                  <div className="flex items-center gap-1">
                    <Crown className="w-3 h-3 text-yellow-500" />
                    <span className="text-[9px] text-yellow-500 font-bold uppercase">Premium</span>
                  </div>
                )}
              </div>
            </div>

            {userPlan === 'free' && (
              <button
                onClick={handleUpgrade}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center gap-2 active:scale-95 transition-transform"
              >
                <Crown className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">Upgrade</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Free Plan Ad */}
      {userPlan === 'free' && activeTab === 'home' && (
        <div className="fixed top-20 left-0 right-0 z-40">
          <AdBanner onUpgrade={handleUpgrade} />
        </div>
      )}

      {/* Main Content */}
      <div className={`pt-20 px-4 ${userPlan === 'free' && activeTab === 'home' ? 'mt-20' : ''}`}>
        {activeTab === 'home' && (
          <div className="space-y-6 py-4">
            {/* Welcome */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                Olá, {metrics.name.split(' ')[0]}! 🔥
              </h2>
              <p className="text-zinc-400">Pronto para treinar hoje?</p>
            </div>

            {/* Today's Workout */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-2 border-orange-500/50 rounded-3xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-orange-500/20 border border-orange-500/50 rounded-xl flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-orange-300 font-bold uppercase tracking-wider">Treino de Hoje</p>
                    <h3 className="text-xl font-bold text-white">{todayWorkout.focus}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-orange-200">
                    <Dumbbell className="w-4 h-4" />
                    <span>{todayWorkout.exercises.length} exercícios</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-200">
                    <Target className="w-4 h-4" />
                    <span>{todayWorkout.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartWorkout(todayIndex)}
                  disabled={isWorkoutCompleted(todayIndex)}
                  className="w-full relative py-4 rounded-2xl font-bold text-white disabled:opacity-50 active:scale-95 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl" />
                  <div className="relative flex items-center justify-center gap-2">
                    {isWorkoutCompleted(todayIndex) ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Treino Concluído</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Iniciar Treino</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Resumo da Semana</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-white mb-1">{completedWorkouts.length}</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Treinos</p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-orange-500 mb-1">{workoutPlans.length}</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Dias/Sem</p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-white mb-1">{Math.round((completedWorkouts.length / workoutPlans.length) * 100)}%</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Meta</p>
                </div>
              </div>
            </div>

            {/* Week Overview */}
            <div>
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Seus Treinos</h3>
              <div className="space-y-3">
                {workoutPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">{plan.day}</p>
                        <h4 className="font-bold text-white">{plan.focus}</h4>
                      </div>
                      {isWorkoutCompleted(index) ? (
                        <div className="w-8 h-8 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
                          <Circle className="w-5 h-5 text-zinc-600" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleStartWorkout(index)}
                      disabled={isWorkoutCompleted(index)}
                      className="w-full py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm font-semibold active:scale-95 transition-all disabled:opacity-50"
                    >
                      {isWorkoutCompleted(index) ? 'Concluído' : 'Iniciar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6 py-4">
            <h2 className="text-2xl font-bold text-white">Calendário</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 text-center">
              <Calendar className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400 mb-2">Calendário Interativo</p>
              <p className="text-sm text-zinc-500">Visualização mensal em desenvolvimento</p>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Progresso</h2>
              {userPlan === 'free' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <Lock className="w-3 h-3 text-zinc-500" />
                  <span className="text-xs text-zinc-500 font-bold">Premium</span>
                </div>
              )}
            </div>

            {userPlan === 'free' ? (
              <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-2 border-orange-500/50 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-orange-500/20 border border-orange-500/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Analytics Premium</h3>
                <p className="text-orange-200 mb-6 text-sm">
                  Desbloqueie gráficos de evolução, análise de performance e histórico completo
                </p>
                <button
                  onClick={handleUpgrade}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl text-white font-bold active:scale-95 transition-transform flex items-center gap-2 mx-auto"
                >
                  <Crown className="w-5 h-5" />
                  <span>Fazer Upgrade</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-4">Evolução de Força</h3>
                  <div className="h-48 bg-zinc-900 rounded-xl flex items-center justify-center">
                    <p className="text-zinc-600">Gráfico de evolução</p>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-4">Frequência Semanal</h3>
                  <div className="h-32 bg-zinc-900 rounded-xl flex items-center justify-center">
                    <p className="text-zinc-600">Gráfico de frequência</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 py-4">
            <h2 className="text-2xl font-bold text-white">Perfil</h2>

            {/* User Info */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {metrics.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{metrics.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {userPlan === 'premium' ? (
                      <>
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-500 font-bold">Premium</span>
                      </>
                    ) : (
                      <span className="text-sm text-zinc-500">Plano Free</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Objetivo</span>
                  <span className="text-white font-semibold">{metrics.goal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Nível</span>
                  <span className="text-white font-semibold">{metrics.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Peso</span>
                  <span className="text-white font-semibold">{metrics.weight} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Altura</span>
                  <span className="text-white font-semibold">{metrics.height} cm</span>
                </div>
              </div>
            </div>

            {/* Plan Info */}
            {userPlan === 'free' && (
              <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-2 border-orange-500/50 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white mb-1">Upgrade para Premium</h3>
                    <p className="text-sm text-orange-200">Desbloqueie todos os recursos</p>
                  </div>
                  <Crown className="w-8 h-8 text-orange-400" />
                </div>
                <button
                  onClick={handleUpgrade}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white font-bold active:scale-95 transition-transform"
                >
                  Ver Planos
                </button>
              </div>
            )}

            <button
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}
              className="w-full py-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-500 font-bold active:scale-95 transition-transform"
            >
              Sair da Conta
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 pb-safe">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
              activeTab === 'home'
                ? 'bg-orange-500/10 text-orange-500'
                : 'text-zinc-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
              activeTab === 'calendar'
                ? 'bg-orange-500/10 text-orange-500'
                : 'text-zinc-500'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Calendário</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all relative ${
              activeTab === 'progress'
                ? 'bg-orange-500/10 text-orange-500'
                : 'text-zinc-500'
            }`}
          >
            {userPlan === 'free' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <Lock className="w-2.5 h-2.5 text-black" />
              </div>
            )}
            <BarChart className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Progresso</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'bg-orange-500/10 text-orange-500'
                : 'text-zinc-500'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
