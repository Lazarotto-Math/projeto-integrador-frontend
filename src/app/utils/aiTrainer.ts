// Tipos de dados do sistema
export interface UserMetrics {
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: 'hipertrofia' | 'emagrecimento' | 'condicionamento' | 'reabilitacao';
  level: 'iniciante' | 'intermediario' | 'avancado';
  injuries: string[];
  preferences: string[];
  benchPress?: number;
  squat?: number;
  deadlift?: number;
  pullUp?: number;
}

export interface Exercise {
  id: string;
  name: string;
  machine: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
  intensity: 'baixa' | 'media' | 'alta';
}

export interface WorkoutPlan {
  day: string;
  focus: string;
  exercises: Exercise[];
  duration: string;
}

// Máquinas disponíveis na academia (dados mock)
export const availableMachines = [
  { id: 'm1', name: 'Supino Reto', muscleGroup: 'peito', type: 'compound' },
  { id: 'm2', name: 'Leg Press 45°', muscleGroup: 'pernas', type: 'compound' },
  { id: 'm3', name: 'Puxada Alta', muscleGroup: 'costas', type: 'compound' },
  { id: 'm4', name: 'Cadeira Extensora', muscleGroup: 'pernas', type: 'isolation' },
  { id: 'm5', name: 'Rosca Direta', muscleGroup: 'biceps', type: 'isolation' },
  { id: 'm6', name: 'Tríceps Pulley', muscleGroup: 'triceps', type: 'isolation' },
  { id: 'm7', name: 'Desenvolvimento Ombros', muscleGroup: 'ombros', type: 'compound' },
  { id: 'm8', name: 'Crucifixo', muscleGroup: 'peito', type: 'isolation' },
  { id: 'm9', name: 'Mesa Flexora', muscleGroup: 'pernas', type: 'isolation' },
  { id: 'm10', name: 'Remada Sentada', muscleGroup: 'costas', type: 'compound' },
  { id: 'm11', name: 'Elevação Lateral', muscleGroup: 'ombros', type: 'isolation' },
  { id: 'm12', name: 'Abdominal Máquina', muscleGroup: 'abdomen', type: 'isolation' },
  { id: 'm13', name: 'Panturrilha em Pé', muscleGroup: 'panturrilha', type: 'isolation' },
  { id: 'm14', name: 'Cadeira Adutora', muscleGroup: 'pernas', type: 'isolation' },
  { id: 'm15', name: 'Esteira', muscleGroup: 'cardio', type: 'cardio' },
];

// Simulação de IA para gerar treino personalizado
export function generateAIWorkout(metrics: UserMetrics): WorkoutPlan[] {
  const workoutPlans: WorkoutPlan[] = [];
  
  // Lógica baseada no objetivo
  if (metrics.goal === 'hipertrofia') {
    workoutPlans.push(
      {
        day: 'Segunda-feira',
        focus: 'Peito e Tríceps',
        duration: '60-75 min',
        exercises: [
          {
            id: 'e1',
            name: 'Supino Reto',
            machine: 'Supino Reto',
            muscleGroup: 'Peito',
            sets: metrics.level === 'iniciante' ? 3 : 4,
            reps: '8-12',
            rest: '90s',
            intensity: 'alta',
            notes: metrics.benchPress ? `Carga sugerida: ${Math.floor(metrics.benchPress * 0.7)}kg` : undefined
          },
          {
            id: 'e2',
            name: 'Crucifixo',
            machine: 'Crucifixo',
            muscleGroup: 'Peito',
            sets: 3,
            reps: '10-15',
            rest: '60s',
            intensity: 'media'
          },
          {
            id: 'e3',
            name: 'Tríceps Pulley',
            machine: 'Tríceps Pulley',
            muscleGroup: 'Tríceps',
            sets: 3,
            reps: '12-15',
            rest: '60s',
            intensity: 'media'
          }
        ]
      },
      {
        day: 'Quarta-feira',
        focus: 'Costas e Bíceps',
        duration: '60-75 min',
        exercises: [
          {
            id: 'e4',
            name: 'Puxada Alta',
            machine: 'Puxada Alta',
            muscleGroup: 'Costas',
            sets: 4,
            reps: '8-12',
            rest: '90s',
            intensity: 'alta'
          },
          {
            id: 'e5',
            name: 'Remada Sentada',
            machine: 'Remada Sentada',
            muscleGroup: 'Costas',
            sets: 3,
            reps: '10-12',
            rest: '75s',
            intensity: 'alta'
          },
          {
            id: 'e6',
            name: 'Rosca Direta',
            machine: 'Rosca Direta',
            muscleGroup: 'Bíceps',
            sets: 3,
            reps: '10-12',
            rest: '60s',
            intensity: 'media'
          }
        ]
      },
      {
        day: 'Sexta-feira',
        focus: 'Pernas e Ombros',
        duration: '75-90 min',
        exercises: [
          {
            id: 'e7',
            name: 'Leg Press 45°',
            machine: 'Leg Press 45°',
            muscleGroup: 'Pernas',
            sets: 4,
            reps: '10-15',
            rest: '120s',
            intensity: 'alta',
            notes: metrics.injuries.some(i => i.toLowerCase().includes('joelho')) 
              ? 'ATENÇÃO: Amplitude reduzida devido a lesão no joelho' 
              : undefined
          },
          {
            id: 'e8',
            name: 'Cadeira Extensora',
            machine: 'Cadeira Extensora',
            muscleGroup: 'Quadríceps',
            sets: 3,
            reps: '12-15',
            rest: '60s',
            intensity: 'media'
          },
          {
            id: 'e9',
            name: 'Desenvolvimento Ombros',
            machine: 'Desenvolvimento Ombros',
            muscleGroup: 'Ombros',
            sets: 3,
            reps: '10-12',
            rest: '75s',
            intensity: 'media'
          }
        ]
      }
    );
  } else if (metrics.goal === 'emagrecimento') {
    workoutPlans.push(
      {
        day: 'Segunda/Quarta/Sexta',
        focus: 'Treino Full Body + Cardio',
        duration: '50-60 min',
        exercises: [
          {
            id: 'e10',
            name: 'Leg Press 45°',
            machine: 'Leg Press 45°',
            muscleGroup: 'Pernas',
            sets: 3,
            reps: '15-20',
            rest: '45s',
            intensity: 'media'
          },
          {
            id: 'e11',
            name: 'Supino Reto',
            machine: 'Supino Reto',
            muscleGroup: 'Peito',
            sets: 3,
            reps: '15-20',
            rest: '45s',
            intensity: 'media'
          },
          {
            id: 'e12',
            name: 'Puxada Alta',
            machine: 'Puxada Alta',
            muscleGroup: 'Costas',
            sets: 3,
            reps: '15-20',
            rest: '45s',
            intensity: 'media'
          },
          {
            id: 'e13',
            name: 'Esteira - HIIT',
            machine: 'Esteira',
            muscleGroup: 'Cardio',
            sets: 1,
            reps: '20 min',
            rest: '-',
            intensity: 'alta',
            notes: 'Intervalos: 1min intenso / 2min moderado'
          }
        ]
      }
    );
  } else if (metrics.goal === 'condicionamento') {
    workoutPlans.push(
      {
        day: 'Terça/Quinta/Sábado',
        focus: 'Condicionamento Físico',
        duration: '45-60 min',
        exercises: [
          {
            id: 'e14',
            name: 'Circuito de Força',
            machine: 'Múltiplas',
            muscleGroup: 'Corpo Todo',
            sets: 4,
            reps: '12-15',
            rest: '30s entre exercícios',
            intensity: 'alta',
            notes: 'Circuito: Leg Press → Supino → Remada → Desenvolvimento'
          },
          {
            id: 'e15',
            name: 'Cardio Moderado',
            machine: 'Esteira',
            muscleGroup: 'Cardio',
            sets: 1,
            reps: '15 min',
            rest: '-',
            intensity: 'media',
            notes: 'Ritmo constante, 70% FCMax'
          }
        ]
      }
    );
  }

  return workoutPlans;
}

// Calcular progresso e insights
export function generateInsights(metrics: UserMetrics): string[] {
  const insights: string[] = [];
  
  const bmi = metrics.weight / ((metrics.height / 100) ** 2);
  
  if (bmi < 18.5) {
    insights.push('💡 Seu IMC está abaixo do ideal. Foque em ganho de massa muscular.');
  } else if (bmi > 25) {
    insights.push('💡 Considere incluir mais cardio para otimizar resultados.');
  }
  
  if (metrics.level === 'iniciante') {
    insights.push('🎯 Como iniciante, priorize a técnica sobre a carga!');
  }
  
  if (metrics.injuries.length > 0) {
    insights.push(`⚠️ Seu treino foi adaptado considerando: ${metrics.injuries.join(', ')}`);
  }
  
  if (metrics.goal === 'hipertrofia') {
    insights.push('🍗 Não esqueça: a dieta é 70% do resultado na hipertrofia!');
  }
  
  return insights;
}
