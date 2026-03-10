import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Flame, 
  Target, 
  Activity, 
  AlertCircle, 
  Dumbbell, 
  ArrowRight,
  Zap,
  TrendingUp,
  ChevronLeft
} from 'lucide-react';
import { UserMetrics } from '../utils/aiTrainer';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [metrics, setMetrics] = useState<Partial<UserMetrics>>({
    injuries: [],
    preferences: []
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      localStorage.setItem('userMetrics', JSON.stringify(metrics));
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return metrics.name && metrics.age && metrics.weight && metrics.height;
      case 2:
        return metrics.goal && metrics.level;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-4 safe-area-inset-top">
          <div className="flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handlePrevious}
                className="p-2 hover:bg-zinc-900 rounded-xl transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            ) : (
              <div className="w-10" />
            )}
            
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-base font-bold text-white tracking-tight">
                IRON<span className="text-orange-500">AI</span>
              </h1>
            </div>
            
            <div className="text-sm font-bold text-zinc-500 w-10 text-right">
              {step}/4
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-[73px] left-0 right-0 z-40 bg-black/95 backdrop-blur-xl px-4 pb-3">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step
                  ? 'bg-gradient-to-r from-orange-500 to-red-600'
                  : 'bg-zinc-900'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pt-[110px] pb-24 px-4">
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-2xl shadow-orange-500/30">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                INFORMAÇÕES BÁSICAS
              </h2>
              <p className="text-zinc-400">Dados fundamentais para seu treino</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={metrics.name || ''}
                  onChange={(e) => setMetrics({ ...metrics, name: e.target.value })}
                  className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                  Idade
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={metrics.age || ''}
                  onChange={(e) => setMetrics({ ...metrics, age: Number(e.target.value) })}
                  className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                  placeholder="25"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={metrics.weight || ''}
                    onChange={(e) => setMetrics({ ...metrics, weight: Number(e.target.value) })}
                    className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                    placeholder="70"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={metrics.height || ''}
                    onChange={(e) => setMetrics({ ...metrics, height: Number(e.target.value) })}
                    className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                    placeholder="175"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-2xl shadow-orange-500/30">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                OBJETIVO & NÍVEL
              </h2>
              <p className="text-zinc-400">Defina sua meta de treino</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                Seu Objetivo
              </label>
              <div className="space-y-3">
                {[
                  { value: 'hipertrofia', label: 'GANHO DE MASSA', emoji: '💪', desc: 'Crescimento muscular' },
                  { value: 'emagrecimento', label: 'EMAGRECIMENTO', emoji: '🔥', desc: 'Queima de gordura' },
                  { value: 'condicionamento', label: 'CONDICIONAMENTO', emoji: '⚡', desc: 'Resistência física' },
                  { value: 'reabilitacao', label: 'REABILITAÇÃO', emoji: '🎯', desc: 'Recuperação' },
                ].map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => setMetrics({ ...metrics, goal: goal.value as any })}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                      metrics.goal === goal.value
                        ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                        : 'border-zinc-800 bg-zinc-900 active:scale-95'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{goal.emoji}</div>
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm tracking-wider mb-0.5">{goal.label}</div>
                        <div className="text-xs text-zinc-500">{goal.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                Nível de Experiência
              </label>
              <div className="space-y-3">
                {[
                  { value: 'iniciante', label: 'INICIANTE', icon: '🌱', desc: 'Pouca ou nenhuma experiência' },
                  { value: 'intermediario', label: 'INTERMEDIÁRIO', icon: '💪', desc: '6 meses a 2 anos de treino' },
                  { value: 'avancado', label: 'AVANÇADO', icon: '🏆', desc: 'Mais de 2 anos de treino' },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setMetrics({ ...metrics, level: level.value as any })}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                      metrics.level === level.value
                        ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                        : 'border-zinc-800 bg-zinc-900 active:scale-95'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{level.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm tracking-wider mb-0.5">{level.label}</div>
                        <div className="text-xs text-zinc-500">{level.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl mb-4 shadow-2xl shadow-red-500/30">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                LESÕES & RESTRIÇÕES
              </h2>
              <p className="text-zinc-400">Informe limitações físicas</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                Áreas com lesão ou limitação
              </label>
              <div className="space-y-3">
                {[
                  { name: 'Joelho', icon: '🦵' },
                  { name: 'Ombro', icon: '💪' },
                  { name: 'Lombar', icon: '🔴' },
                  { name: 'Cotovelo', icon: '💪' },
                  { name: 'Punho', icon: '✋' },
                  { name: 'Tornozelo', icon: '👟' },
                ].map((injury) => (
                  <label
                    key={injury.name}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95 ${
                      metrics.injuries?.includes(injury.name)
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-zinc-800 bg-zinc-900'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={metrics.injuries?.includes(injury.name)}
                      onChange={(e) => {
                        const current = metrics.injuries || [];
                        if (e.target.checked) {
                          setMetrics({ ...metrics, injuries: [...current, injury.name] });
                        } else {
                          setMetrics({ ...metrics, injuries: current.filter((i) => i !== injury.name) });
                        }
                      }}
                      className="w-5 h-5 rounded bg-zinc-900 border-zinc-700 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-xl">{injury.icon}</span>
                    <span className="text-white font-semibold flex-1">{injury.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                Observações Adicionais
              </label>
              <textarea
                className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none text-base"
                rows={4}
                placeholder="Descreva outras limitações..."
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-2xl shadow-orange-500/30">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                MÉTRICAS DE FORÇA
              </h2>
              <p className="text-zinc-400">Cargas atuais (opcional)</p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-200">
                  <strong className="text-orange-400">IA otimizada:</strong> Essas informações ajudarão a calcular cargas ideais
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                  Supino Reto (kg)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={metrics.benchPress || ''}
                  onChange={(e) => setMetrics({ ...metrics, benchPress: Number(e.target.value) })}
                  className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                  placeholder="60"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                  Agachamento (kg)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={metrics.squat || ''}
                  onChange={(e) => setMetrics({ ...metrics, squat: Number(e.target.value) })}
                  className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                  placeholder="80"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                  Terra (kg)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={metrics.deadlift || ''}
                  onChange={(e) => setMetrics({ ...metrics, deadlift: Number(e.target.value) })}
                  className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                  Pull Up (reps)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={metrics.pullUp || ''}
                  onChange={(e) => setMetrics({ ...metrics, pullUp: Number(e.target.value) })}
                  className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base"
                  placeholder="8"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4 pb-safe">
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="relative w-full py-4 rounded-2xl font-bold text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl" />
          <span className="relative text-base">{step === 4 ? '🔥 Gerar Treino' : 'Próximo'}</span>
          <ArrowRight className="relative w-5 h-5" />
        </button>
      </div>
    </div>
  );
}