import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Flame, Zap, Crown, Check, TrendingUp, Award, BarChart3 } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPlans, setShowPlans] = useState(false);

  const handleSelectPlan = (plan: 'free' | 'premium') => {
    localStorage.setItem('userPlan', plan);
    navigate('/onboarding');
  };

  if (!showPlans) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-3xl opacity-50 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Flame className="w-14 h-14 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            IRON<span className="text-orange-500">AI</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-3">Treinos Personalizados</p>
          <p className="text-sm text-zinc-500 mb-12 max-w-md">
            Inteligência artificial criando seu treino ideal baseado em suas metas e limitações
          </p>

          <div className="space-y-4 w-full max-w-sm">
            <div className="flex items-center gap-3 text-left p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <Zap className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">IA Avançada</p>
                <p className="text-xs text-zinc-500">Treinos adaptados para você</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">Acompanhamento Real-Time</p>
                <p className="text-xs text-zinc-500">Timer e registro de cargas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <BarChart3 className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">Analytics Completo</p>
                <p className="text-xs text-zinc-500">Gráficos de evolução</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="p-6 pb-8">
          <button
            onClick={() => setShowPlans(true)}
            className="w-full relative py-5 rounded-2xl font-bold text-white transition-all active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 blur-xl opacity-50" />
            <span className="relative text-lg">🔥 Começar Agora</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">
              IRON<span className="text-orange-500">AI</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="pt-24 px-6 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Escolha Seu Plano</h2>
          <p className="text-zinc-400">Comece grátis ou desbloqueie todo o potencial</p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {/* Free Plan */}
          <div className="bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-6 relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Free</h3>
                <p className="text-zinc-400 text-sm">Para começar sua jornada</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">R$0</p>
                <p className="text-xs text-zinc-500">para sempre</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-zinc-300">Treinos personalizados por IA</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-zinc-300">Timer de descanso</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-zinc-300">Registro de cargas</span>
              </div>
              <div className="flex items-center gap-2 opacity-40">
                <Check className="w-5 h-5 text-zinc-600" />
                <span className="text-sm text-zinc-600 line-through">Analytics avançado</span>
              </div>
              <div className="flex items-center gap-2 opacity-40">
                <Check className="w-5 h-5 text-zinc-600" />
                <span className="text-sm text-zinc-600 line-through">Sem anúncios</span>
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('free')}
              className="w-full py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white font-bold active:scale-95 transition-all"
            >
              Começar Grátis
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-2 border-orange-500 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full flex items-center gap-1">
                <Crown className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Premium</span>
              </div>
            </div>

            <div className="flex items-start justify-between mb-4 pr-20">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Pro</h3>
                <p className="text-orange-200 text-sm">Experiência completa</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">R$29</span>
                <span className="text-zinc-400">/mês</span>
              </div>
              <p className="text-xs text-orange-300 mt-1">7 dias grátis para testar</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-white font-semibold">Tudo do plano Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-white">✨ Analytics avançado com gráficos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-white">🎯 Objetivos e metas personalizadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-white">📊 Histórico completo de treinos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-white">🚫 Zero anúncios</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-white">🏆 Conquistas e badges</span>
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('premium')}
              className="w-full relative py-4 rounded-2xl font-bold text-white active:scale-95 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl" />
              <span className="relative">Começar Teste Grátis</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-8 max-w-sm mx-auto">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}
