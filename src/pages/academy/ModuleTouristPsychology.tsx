import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  TipBlock,
  PhraseCard,
  ScenarioSimulator,
  PhaseQuiz,
  type Phase,
  type Scenario,
  type ScenarioStep,
  type QuizQuestion,
} from "@/components/InteractiveModule";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const ModuleTouristPsychology = () => {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const phases: Phase[] = [
    {
      id: "mentalidade-turista",
      title: isEN ? "Traveler Mindset" : "Mentalidade do Turista",
      description: isEN
        ? "Understanding how tourists think and their emotional journey"
        : "Compreender como os turistas pensam e a sua jornada emocional",
      content: [
        {
          type: "text",
          heading: isEN ? "The Traveler's Emotional State" : "O Estado Emocional do Turista",
          text: isEN
            ? "Travelers exist in a unique emotional space: they are outside their normal environment, experiencing time pressure, making rapid decisions, and influenced by practical constraints. Understanding this psychology is essential to deliver a premium experience."
            : "Os turistas existem num espaço emocional único: estão fora do seu ambiente, com tempo limitado, com decisões rápidas a tomar e com restrições práticas. Compreender esta psicologia é essencial para oferecer uma experiência premium.",
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN ? "Holiday Mode Activation" : "Ativação do Modo Férias",
          items: [
            isEN
              ? "Travelers spend more freely than locals (holiday mode psychology)"
              : "Os turistas gastam mais livremente do que os locais (psicologia do modo férias)",
            isEN
              ? "Emotional purchasing: souvenirs are emotional investments, not just products"
              : "Compra emocional: souvenirs são investimentos emocionais, não apenas produtos",
            isEN
              ? "Time pressure creates sense of urgency: 'I won't be back soon'"
              : "Pressão temporal cria sensação de urgência: 'Não vou voltar tão cedo'",
            isEN
              ? "Souvenir culture: taking a piece of the destination home"
              : "Cultura de souvenir: levar uma parte do destino para casa",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-phase1",
            question: isEN
              ? "What psychological state do travelers typically enter?"
              : "Que estado psicológico os turistas tipicamente entram?",
            options: [
              isEN ? "Cautious and reserved" : "Cautelosos e reservados",
              isEN ? "Holiday mode: more open, emotional, and spending-friendly" : "Modo férias: mais abertos, emocionais e gastadores",
              isEN ? "Analytical and budget-focused" : "Analíticos e focados no orçamento",
              isEN ? "Indifferent to purchases" : "Indiferentes às compras",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-phase1",
            question: isEN
              ? "Why is time pressure a key factor in tourist purchases?"
              : "Por que é que a pressão temporal é um fator chave nas compras turísticas?",
            options: [
              isEN ? "Tourists have unlimited time" : "Os turistas têm tempo ilimitado",
              isEN
                ? "Time pressure creates urgency: 'I won't be back soon' makes them more decisive"
                : "A pressão temporal cria urgência: 'Não vou voltar tão cedo' os torna mais decisivos",
              isEN ? "Time has no impact on decisions" : "O tempo não tem impacto nas decisões",
              isEN ? "Tourists want to waste time" : "Os turistas querem perder tempo",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "gatilhos-emocionais",
      title: isEN ? "Emotional Triggers" : "Gatilhos Emocionais",
      description: isEN
        ? "Learn what drives tourist emotions and how to amplify them"
        : "Aprenda o que move as emoções dos turistas e como amplificá-las",
      content: [
        {
          type: "text",
          heading: isEN ? "Triggers That Drive Tourist Purchases" : "Gatilhos que Impulsionam Compras Turísticas",
          text: isEN
            ? "Nostalgia, uniqueness, and storytelling are the three pillars of tourist emotional purchasing. When a product carries a story and exclusivity, it becomes irreplaceable."
            : "Nostalgia, unicidade e storytelling são os três pilares da compra emocional turística. Quando um produto carrega uma história e exclusividade, torna-se insubstituível.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN
            ? "The 4 Emotional Triggers"
            : "Os 4 Gatilhos Emocionais",
          items: [
            isEN
              ? "NOSTALGIA: 'This reminds me of my childhood / my home'"
              : "NOSTALGIA: 'Isto recorda-me a minha infância / casa'",
            isEN
              ? "UNIQUENESS: 'I won't find this anywhere else'"
              : "UNICIDADE: 'Não vou encontrar isto em lado nenhum'",
            isEN
              ? "STORYTELLING: 'This product has a story behind it'"
              : "STORYTELLING: 'Este produto tem uma história por trás'",
            isEN
              ? "TAKING HOME: 'A piece of Portugal / this experience to keep forever'"
              : "LEVAR PARA CASA: 'Uma parte de Portugal / esta experiência para manter para sempre'",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-phase2",
            question: isEN
              ? "Which emotional trigger is most powerful for tourist purchases?"
              : "Qual é o gatilho emocional mais poderoso para compras turísticas?",
            options: [
              isEN ? "Price alone" : "Apenas o preço",
              isEN
                ? "Combination of story, uniqueness, and emotional connection (taking a piece home)"
                : "Combinação de história, unicidade e conexão emocional (levar uma parte para casa)",
              isEN ? "Convenience" : "Conveniência",
              isEN ? "Brand size" : "Tamanho da marca",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-phase2",
            question: isEN
              ? "How can storytelling enhance a tourist's purchasing decision?"
              : "Como pode o storytelling melhorar a decisão de compra de um turista?",
            options: [
              isEN ? "It makes products more expensive" : "Torna produtos mais caros",
              isEN
                ? "It transforms a product into an emotional memory—giving it meaning beyond its material value"
                : "Transforma um produto numa memória emocional—dando-lhe significado além do seu valor material",
              isEN ? "It confuses customers" : "Confunde os clientes",
              isEN ? "It has no impact" : "Não tem impacto",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "praticas-premium",
      title: isEN ? "Premium Practices by Nationality" : "Práticas Premium por Nacionalidade",
      description: isEN
        ? "Adapt your approach based on cultural backgrounds"
        : "Adapte a sua abordagem com base nas origens culturais",
      content: [
        {
          type: "text",
          heading: isEN ? "Nationality Shapes Expectations" : "A Nacionalidade Molda as Expectativas",
          text: isEN
            ? "Different nationalities value different things. Premium service means reading these patterns and adapting instantly."
            : "Diferentes nacionalidades valorizam coisas diferentes. Serviço premium significa ler estes padrões e adaptar instantaneamente.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN ? "Nationality Profiles" : "Perfis por Nacionalidade",
          items: [
            isEN
              ? "FRENCH: Appreciation of craft and artisanal quality. Focus on 'made with care, traditional methods'"
              : "FRANCÊS: Apreciação de artesanato e qualidade artesanal. Focar em 'feito com cuidado, métodos tradicionais'",
            isEN
              ? "AMERICAN: Story + Experience. Emphasize the 'why' and the journey behind the product"
              : "AMERICANO: História + Experiência. Enfatizar o 'porquê' e a jornada por trás do produto",
            isEN
              ? "ASIAN: Gift culture & status. Presentation, exclusivity, and the prestige of giving premium items"
              : "ASIÁTICO: Cultura de regalo e status. Apresentação, exclusividade e o prestígio de dar itens premium",
            isEN
              ? "BRITISH: Understatement & quality. Avoid excess; focus on subtle elegance and proven reliability"
              : "BRITÂNICO: Subtileza e qualidade. Evitar excesso; focar em elegância subtil e confiabilidade comprovada",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-phase3",
            question: isEN
              ? "How should you approach a French tourist about The 100's products?"
              : "Como deve abordar um turista francês sobre os produtos The 100's?",
            options: [
              isEN ? "Focus on the price" : "Focar no preço",
              isEN
                ? "Highlight the artisanal craft, traditional methods, and quality of materials"
                : "Destacar o artesanato, métodos tradicionais e qualidade dos materiais",
              isEN ? "Give a long story about the company" : "Dar uma história longa sobre a empresa",
              isEN ? "Let them discover without information" : "Deixá-los descobrir sem informação",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-phase3",
            question: isEN
              ? "Why is presentation especially important for Asian tourists?"
              : "Por que é a apresentação especialmente importante para turistas asiáticos?",
            options: [
              isEN ? "They don't care about aesthetics" : "Não ligam para estética",
              isEN
                ? "Gift culture values presentation as part of the prestige and respect shown through giving"
                : "A cultura de regalo valoriza a apresentação como parte do prestígio e respeito através de dar",
              isEN ? "It's purely visual" : "É puramente visual",
              isEN ? "They prefer simplicity" : "Preferem simplicidade",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "turista-cliente-premium",
      title: isEN ? "Tourist as Premium Client" : "Turista como Cliente Premium",
      description: isEN
        ? "Understanding the tourist as your highest-value customer segment"
        : "Compreender o turista como seu segmento de cliente com maior valor",
      content: [
        {
          type: "text",
          heading: isEN
            ? "Why Tourists Are Your Premium Segment"
            : "Por que os Turistas São o Seu Segmento Premium",
          text: isEN
            ? "Tourists typically have higher average ticket values, make impulse purchases, and value experience over price. They are willing to invest in quality and uniqueness."
            : "Os turistas tipicamente têm valores de ticket médios mais altos, fazem compras por impulso e valorizam experiência acima do preço. Estão dispostos a investir em qualidade e unicidade.",
        },
        {
          type: "tip",
          category: "success",
          title: isEN
            ? "Tourist Customer Behavior Patterns"
            : "Padrões de Comportamento do Cliente Turista",
          items: [
            isEN
              ? "HIGHER SPENDING: No budget anxiety; 'This is my vacation moment'"
              : "GASTOS MAIS ALTOS: Sem ansiedade orçamental; 'Este é meu momento de férias'",
            isEN
              ? "IMPULSE PURCHASES: Time pressure + emotional state = faster decisions"
              : "COMPRAS IMPULSIVAS: Pressão temporal + estado emocional = decisões mais rápidas",
            isEN
              ? "CONSIDERED PURCHASES: Still exists for premium/high-value items (The Icon, THE HUNDRED)"
              : "COMPRAS CONSIDERADAS: Ainda existem para itens premium/alto valor (The Icon, THE HUNDRED)",
            isEN
              ? "QUALITY OVER PRICE: 'If it's special, I'll pay for it'"
              : "QUALIDADE SOBRE PREÇO: 'Se for especial, pagarei por isso'",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-phase4",
            question: isEN
              ? "Why do tourists typically have higher spending patterns?"
              : "Por que é que os turistas tipicamente têm padrões de gastos mais altos?",
            options: [
              isEN ? "They earn more" : "Ganham mais",
              isEN
                ? "Holiday mode, time pressure, emotional purchasing, and the 'once-in-a-while' nature of travel"
                : "Modo férias, pressão temporal, compra emocional e a natureza 'ocasional' da viagem",
              isEN ? "Products are cheaper" : "Produtos são mais baratos",
              isEN ? "They have no choice" : "Não têm escolha",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
    {
      id: "diagnostico-rapido-30s",
      title: isEN ? "30-Second Quick Diagnosis" : "Diagnóstico Rápido 30 Segundos",
      description: isEN
        ? "Master the art of reading a client in 30 seconds: Gift or Personal? Occasion? Budget? Nationality?"
        : "Domine a arte de ler um cliente em 30 segundos: Presente ou Pessoal? Ocasião? Orçamento? Nacionalidade?",
      content: [
        {
          type: "text",
          heading: isEN
            ? "The Four Questions That Guide Everything"
            : "As Quatro Perguntas Que Guiam Tudo",
          text: isEN
            ? "Quick diagnosis is not interrogation—it's elegant conversation. In 30 seconds, identify: 1) Gift or Personal? 2) Occasion? 3) Implicit Budget? 4) Nationality/Profile?"
            : "Diagnóstico rápido não é interrogatório—é conversa elegante. Em 30 segundos, identifique: 1) Presente ou Pessoal? 2) Ocasião? 3) Orçamento Implícito? 4) Nacionalidade/Perfil?",
        },
        {
          type: "tip",
          category: "key_insight",
          title: isEN ? "The 30-Second Diagnosis Framework" : "O Marco de Diagnóstico de 30 Segundos",
          items: [
            isEN
              ? "GIFT OR PERSONAL? [Observe body language, eye movement, hesitation]"
              : "PRESENTE OU PESSOAL? [Observe linguagem corporal, movimento de olhos, hesitação]",
            isEN
              ? "OCCASION? [Listen for context clues: 'birthday', 'anniversary', 'souvenir']"
              : "OCASIÃO? [Ouça pistas de contexto: 'aniversário', 'aniversário', 'souvenir']",
            isEN
              ? "IMPLICIT BUDGET? [Price sensitivity, duration of browsing, product choices]"
              : "ORÇAMENTO IMPLÍCITO? [Sensibilidade de preço, duração da navegação, escolhas de produtos]",
            isEN
              ? "NATIONALITY/CULTURE? [Accent, approach style, what catches their attention]"
              : "NACIONALIDADE/CULTURA? [Sotaque, estilo de abordagem, o que lhes chama atenção]",
          ],
        },
      ],
      quiz: {
        questions: [
          {
            id: "q1-phase5",
            question: isEN
              ? "In a 30-second diagnosis, what is the FIRST thing you should identify?"
              : "Num diagnóstico de 30 segundos, qual é a PRIMEIRA coisa que deve identificar?",
            options: [
              isEN ? "Their nationality" : "A sua nacionalidade",
              isEN ? "Gift or personal purchase" : "Presente ou compra pessoal",
              isEN ? "Their budget" : "O seu orçamento",
              isEN ? "The occasion" : "A ocasião",
            ],
            correctAnswer: 1,
          },
          {
            id: "q2-phase5",
            question: isEN
              ? "How should you diagnose nationality or cultural preferences?"
              : "Como deve diagnosticar nacionalidade ou preferências culturais?",
            options: [
              isEN ? "Ask directly 'Where are you from?'" : "Pergunte diretamente 'De onde é?'",
              isEN
                ? "Observe accent, body language, what catches their attention, how they relate to presentation and product selection"
                : "Observe sotaque, linguagem corporal, o que lhes chama atenção, como se relacionam com apresentação e seleção de produtos",
              isEN ? "Don't need to; everyone is the same" : "Não é preciso; todos são iguais",
              isEN ? "Just assume based on appearance" : "Apenas assuma com base na aparência",
            ],
            correctAnswer: 1,
          },
        ],
      },
    },
  ];

  return (
    <ModuleLayout
      moduleId="tourist-psychology"
      title={isEN ? "Module 8: Tourist Psychology" : "Módulo 8: Psicologia do Turista"}
      description={
        isEN
          ? "Master the psychology of travelers and deliver premium experiences tailored to their unique emotional and practical needs"
          : "Domine a psicologia dos turistas e forneça experiências premium adaptadas às suas necessidades emocionais e práticas únicas"
      }
      heroImage="/assets/hero-drop.jpg"
      area="area3"
      moduleNumber={8}
    >
      <PhaseSystem
        phases={phases}
        onQuizComplete={(phaseId) => {
          if (!completedQuizzes.includes(phaseId)) {
            setCompletedQuizzes([...completedQuizzes, phaseId]);
          }
        }}
      />
    </ModuleLayout>
  );
};

export default ModuleTouristPsychology;
