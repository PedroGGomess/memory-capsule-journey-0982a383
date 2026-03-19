import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { RotateCcw, Gamepad2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SCENARIOS = [
  {
    id: "american-tourist",
    titlePt: "O Turista Americano",
    titleEn: "The American Tourist",
    descPt: "Um casal confiante entra. Quer 'algo impressionante'.",
    descEn: "A confident couple enters. They want 'something impressive'.",
    steps: [
      {
        textPt: "Como os recebes?",
        textEn: "How do you greet them?",
        options: [
          { textPt: "Posso ajudar?", textEn: "Can I help you?", feedback: { ptFeedback: "Nunca asks this. Welcome them to the time capsule.", enFeedback: "Never ask this. Welcome them to the time capsule." }, points: 0 },
          { textPt: "Bem-vindo à nossa cápsula do tempo. Podes ficar à vontade.", textEn: "Welcome to our time capsule. Feel free to look around.", feedback: { ptFeedback: "Perfeito! +10pts", enFeedback: "Perfect! +10pts" }, points: 10 },
          { textPt: "Ignoro e espero", textEn: "Ignore and wait", feedback: { ptFeedback: "Os primeiros 10 segundos definem o tom.", enFeedback: "First 10 seconds set the tone." }, points: 0 }
        ]
      },
      {
        textPt: "Pegam num Entry Gift. O que fazes?",
        textEn: "They pick up an Entry Gift. What do you do?",
        options: [
          { textPt: "A nossa opção mais acessível.", textEn: "Our most affordable option.", feedback: { ptFeedback: "Nunca fales de acessibilidade.", enFeedback: "Never talk about affordability." }, points: 0 },
          { textPt: "Bela escolha. Viste a versão em madeira de carvalho? Torna-se uma peça de decoração depois.", textEn: "Beautiful choice. Have you seen the oak wood version? It becomes a decorative piece after.", feedback: { ptFeedback: "Upsell + Second Life. Excelente! +15pts", enFeedback: "Upsell + Second Life. Excellent! +15pts" }, points: 15 },
          { textPt: "Quer adicionar personalização UV?", textEn: "Would you like to add UV personalization?", feedback: { ptFeedback: "Bom mas perdeste o upsell. +5pts", enFeedback: "Good but missed the upsell. +5pts" }, points: 5 }
        ]
      },
      {
        textPt: "Eles dizem: 'É caro.' Como respondes?",
        textEn: "They say: 'It's expensive.' How do you respond?",
        options: [
          { textPt: "Temos opções mais baratas.", textEn: "We have cheaper options.", feedback: { ptFeedback: "Nunca desvaloriz o produto.", enFeedback: "Never discount the value." }, points: 0 },
          { textPt: "Não estás a comprar vinho. Estás a comprar 30 anos de tempo, selado neste momento.", textEn: "You're not buying wine. You're buying 30 years of time, sealed in this moment.", feedback: { ptFeedback: "Mágico! +15pts", enFeedback: "Magic! +15pts" }, points: 15 },
          { textPt: "Deixa-me ver se há descontos.", textEn: "Let me check for discounts.", feedback: { ptFeedback: "Nunca menciones descontos.", enFeedback: "Never mention discounts." }, points: 0 }
        ]
      }
    ]
  },
  {
    id: "rush-passenger",
    titlePt: "O Cruzeirista com Pressa",
    titleEn: "The Rushed Cruise Passenger",
    descPt: "Um grupo de 4. Têm 20 minutos.",
    descEn: "A group of 4. They have 20 minutes.",
    steps: [
      {
        textPt: "Como os abordas?",
        textEn: "How do you approach?",
        options: [
          { textPt: "Faço tour completo da história.", textEn: "Full storytelling tour.", feedback: { ptFeedback: "Não têm tempo para isto.", enFeedback: "They don't have time for this." }, points: 0 },
          { textPt: "Bem-vindo! Sei que têm pressa — deixa-me mostrar os 3 melhores prontos para levar.", textEn: "Welcome! I know you're on a schedule — let me show you our top 3 ready-to-go gifts.", feedback: { ptFeedback: "Perfeito! Respeitas o tempo deles. +10pts", enFeedback: "Perfect! You respect their time. +10pts" }, points: 10 },
          { textPt: "Fiquem à vontade para procurar.", textEn: "Feel free to look around.", feedback: { ptFeedback: "Precisam de orientação.", enFeedback: "They need guidance." }, points: 0 }
        ]
      },
      {
        textPt: "Querem 4 presentes, preços diferentes. O que sugeris?",
        textEn: "They want 4 gifts, different prices. What do you suggest?",
        options: [
          { textPt: "4 Entry Gifts para todos.", textEn: "4 Entry Gifts for everyone.", feedback: { ptFeedback: "Sem variedade.", enFeedback: "No variety." }, points: 0 },
          { textPt: "2 cilindros de cortiça para amigos, 2 cubos para família — personalizamos as datas?", textEn: "2 cork cylinders for friends, 2 cubes for family — shall I personalize the dates?", feedback: { ptFeedback: "Mix perfeito! Personalização! +15pts", enFeedback: "Perfect mix! Personalization! +15pts" }, points: 15 },
          { textPt: "4 cubos iguais.", textEn: "4 identical cubes.", feedback: { ptFeedback: "Perdeste a personalização. +5pts", enFeedback: "Missed personalization. +5pts" }, points: 5 }
        ]
      }
    ]
  },
  {
    id: "wine-expert",
    titlePt: "O Conhecedor",
    titleEn: "The Wine Expert",
    descPt: "Um homem entra sozinho, pergunta sobre o Tawny 50 anos.",
    descEn: "A man enters alone, asks about the 50-year Tawny.",
    steps: [
      {
        textPt: "Como respondes?",
        textEn: "How do you respond?",
        options: [
          { textPt: "Descrição genérica do vinho.", textEn: "Generic description of the wine.", feedback: { ptFeedback: "Ele sabe mais do que pensas.", enFeedback: "He knows more than you think." }, points: 0 },
          { textPt: "O 50 anos — fruta seca, caramelo, com um final que dura minutos. É a coleção Icon. Quer provar?", textEn: "The 50-year — dried fruit, caramel, with a finish that lasts minutes. This is The Icon collection. Would you like to taste?", feedback: { ptFeedback: "Respeitoso e especializado! +10pts", enFeedback: "Respectful and knowledgeable! +10pts" }, points: 10 },
          { textPt: "É o melhor que temos.", textEn: "It's the best we have.", feedback: { ptFeedback: "Muito simplificado.", enFeedback: "Too simplistic." }, points: 0 }
        ]
      },
      {
        textPt: "Ele pede para comparar com o 30 anos.",
        textEn: "He asks to compare with the 30-year.",
        options: [
          { textPt: "O 50 é melhor.", textEn: "The 50 is better.", feedback: { ptFeedback: "Nunca rejeites um produto.", enFeedback: "Never dismiss a product." }, points: 0 },
          { textPt: "O 30 tem mais fruta e vitalidade. O 50 tem complexidade mais profunda e um final mais longo. Ambos são excecionais — depende do momento que queres capturar.", textEn: "The 30 has more fruit and vibrancy. The 50 has deeper complexity and a longer finish. Both are exceptional — it depends on the moment you want to capture.", feedback: { ptFeedback: "Perspicaz! Conhecedor! +15pts", enFeedback: "Insightful! Knowledgeable! +15pts" }, points: 15 },
          { textPt: "Qual preferes?", textEn: "Which do you prefer?", feedback: { ptFeedback: "Deverias guiar, não perguntar.", enFeedback: "You should guide, not ask." }, points: 0 }
        ]
      }
    ]
  },
  {
    id: "romantic-couple",
    titlePt: "O Casal Romântico",
    titleEn: "The Romantic Couple",
    descPt: "Um casal em viagem de aniversário. Querem 'algo especial'.",
    descEn: "A couple on anniversary trip. They want 'something special'.",
    steps: [
      {
        textPt: "Como crias o momento?",
        textEn: "How do you create the moment?",
        options: [
          { textPt: "Mostro o catálogo.", textEn: "Show the catalogue.", feedback: { ptFeedback: "Isto não é sobre catálogos.", enFeedback: "This isn't about catalogues." }, points: 0 },
          { textPt: "Quando foi o vosso aniversário? Deixa-me gravar essa data numa garrafa — o vosso amor, selado no tempo.", textEn: "When was your anniversary? Let me engrave that date on a bottle — your love, sealed in time.", feedback: { ptFeedback: "Momento mágico! +15pts", enFeedback: "Magic moment! +15pts" }, points: 15 },
          { textPt: "Temos muitas opções lindas.", textEn: "We have many beautiful options.", feedback: { ptFeedback: "Muito genérico.", enFeedback: "Too generic." }, points: 0 }
        ]
      },
      {
        textPt: "Estão interessados mas hesitantes.",
        textEn: "They're interested but hesitant.",
        options: [
          { textPt: "Insisto para venderem.", textEn: "I push harder to sell.", feedback: { ptFeedback: "Nunca empurres.", enFeedback: "Never push." }, points: 0 },
          { textPt: "Tomem o vosso tempo. Querem provar um Tawny 30 anos enquanto decidem? Combina bem com este momento.", textEn: "Take your time. Would you like to try a 30-year Tawny while you decide? It pairs beautifully with this moment.", feedback: { ptFeedback: "Acolhedor e perspicaz! +10pts", enFeedback: "Welcoming and insightful! +10pts" }, points: 10 },
          { textPt: "Qual vos agrada mais?", textEn: "Which appeals to you more?", feedback: { ptFeedback: "Ajuda mas sem alcance emocional. +3pts", enFeedback: "Helps but lacks emotional connection. +3pts" }, points: 3 }
        ]
      }
    ]
  },
  {
    id: "wine-novice",
    titlePt: "O Cliente sem Conhecimento",
    titleEn: "The Wine Novice",
    descPt: "Uma mulher hesitante, claramente não sabe sobre vinho do Porto.",
    descEn: "A hesitant woman, clearly doesn't know about Port wine.",
    steps: [
      {
        textPt: "Ela diz: 'Não sei nada de vinho.'",
        textEn: "She says: 'I don't really know about wine.'",
        options: [
          { textPt: "Explicação técnica do vinho.", textEn: "Technical explanation of wine.", feedback: { ptFeedback: "Sem jargão.", enFeedback: "No jargon." }, points: 0 },
          { textPt: "Perfeito! Não precisa ser experto. Pensa nisto como uma cápsula de tempo — um presente bonito que conta uma história. Quer provar?", textEn: "Perfect! You don't need to be an expert. Think of it as a time capsule — a beautiful gift that tells a story. Would you like to try a taste?", feedback: { ptFeedback: "Acessível e convidativo! +10pts", enFeedback: "Accessible and inviting! +10pts" }, points: 10 },
          { textPt: "É vinho envelhecido. Muito bom.", textEn: "It's aged wine. Very good.", feedback: { ptFeedback: "Muito vago.", enFeedback: "Too vague." }, points: 0 }
        ]
      },
      {
        textPt: "Gostou mas preocupa-se com o transporte.",
        textEn: "She likes it but worries about transport.",
        options: [
          { textPt: "Vais conseguir resolver.", textEn: "You'll figure it out.", feedback: { ptFeedback: "Sem solução.", enFeedback: "No solution." }, points: 0 },
          { textPt: "Ótima notícia — as nossas garrafas têm 100ml, cabem perfeitamente na bagagem de cabina. Ou podemos enviar para qualquer lado do mundo — chamamos 'Enviar uma Memória'.", textEn: "Great news — our bottles are 100ml, which fits perfectly in cabin luggage. Or we can ship it anywhere in the world for you — we call it 'Send a Memory'.", feedback: { ptFeedback: "Solução perfeita! +15pts", enFeedback: "Perfect solution! +15pts" }, points: 15 },
          { textPt: "Vende embrulhado para transporte.", textEn: "Sell it wrapped for transport.", feedback: { ptFeedback: "Ajuda mas não completo. +5pts", enFeedback: "Helps but incomplete. +5pts" }, points: 5 }
        ]
      }
    ]
  }
];

interface ScenarioStep {
  textPt: string;
  textEn: string;
  options: Array<{
    textPt: string;
    textEn: string;
    feedback: { ptFeedback: string; enFeedback: string };
    points: number;
  }>;
}

interface Scenario {
  id: string;
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  steps: ScenarioStep[];
}

const SalesSimulator = () => {
  const { t, language } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenario) as Scenario | undefined;

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setCurrentStep(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    if (scenario) {
      const step = scenario.steps[currentStep] as ScenarioStep;
      const option = step.options[optionIndex];
      setScore((prev) => prev + option.points);
      setShowFeedback(true);
    }
  };

  const handleNextStep = () => {
    if (scenario && currentStep < scenario.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setCurrentStep(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const maxScore = scenario ? scenario.steps.reduce((sum, step) => {
    return sum + Math.max(...step.options.map((opt) => opt.points));
  }, 0) : 0;

  if (!selectedScenario) {
    return (
      <ModuleLayout
        moduleId="sales-simulator"
        title={language === "pt" ? "Simulador de Vendas" : "Sales Simulator"}
        subtitle={language === "pt" ? "Pratica diferentes cenários de clientes" : "Practice different customer scenarios"}
        heroImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop"
        hideCompletion
      >
        <ContentBlock title={language === "pt" ? "Escolhe um Cenário" : "Choose a Scenario"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <AnimatePresence>
              {SCENARIOS.map((scn, index) => (
                <motion.button
                  key={scn.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelectScenario(scn.id)}
                  className="relative group text-left border border-border p-8 hover:border-primary transition-all duration-200 h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-light text-primary">
                        {language === "pt" ? scn.titlePt : scn.titleEn}
                      </h3>
                      <Gamepad2 className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-foreground/70 font-light">
                      {language === "pt" ? scn.descPt : scn.descEn}
                    </p>
                    <p className="text-xs text-foreground/50 tracking-[0.1em] uppercase">
                      {scn.steps.length} {language === "pt" ? "passos" : "steps"}
                    </p>
                  </div>
                  <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-all duration-200" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </ContentBlock>
      </ModuleLayout>
    );
  }

  if (!scenario) return null;

  const step = scenario.steps[currentStep] as ScenarioStep;
  const isLastStep = currentStep === scenario.steps.length - 1;

  return (
    <ModuleLayout
      moduleId="sales-simulator"
      title={language === "pt" ? "Simulador de Vendas" : "Sales Simulator"}
      subtitle={language === "pt" ? scenario.titlePt : scenario.titleEn}
      heroImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop"
      hideCompletion
    >
      <ScrollReveal>
        <div className="space-y-8">
          {/* Score Bar */}
          <div className="bg-card border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-foreground/70 font-light">
                {language === "pt" ? "Pontuação" : "Score"}
              </p>
              <p className="text-2xl font-light text-primary">{score}/{maxScore}</p>
            </div>
            <div className="h-1 bg-border overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(score / maxScore) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-card border border-border p-8">
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
              {language === "pt" ? "Passo" : "Step"} {currentStep + 1} {language === "pt" ? "de" : "of"} {scenario.steps.length}
            </p>

            <h3 className="text-2xl font-light text-primary mb-8">
              {language === "pt" ? step.textPt : step.textEn}
            </h3>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {step.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelectOption(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-6 border transition-all duration-200 ${
                    selectedOption === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  } ${showFeedback ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <p className="font-light text-foreground/90">
                    {language === "pt" ? option.textPt : option.textEn}
                  </p>
                  {selectedOption === index && showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 pt-3 border-t border-primary/20"
                    >
                      <p className={`text-sm font-light ${option.points > 0 ? "text-green-400" : "text-yellow-400"}`}>
                        {language === "pt" ? option.feedback.ptFeedback : option.feedback.enFeedback}
                      </p>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                {!isLastStep ? (
                  <button
                    onClick={handleNextStep}
                    className="flex-1 border border-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200"
                  >
                    {language === "pt" ? "Próximo Passo" : "Next Step"}
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="flex-1 border border-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {language === "pt" ? "Tentar Novamente" : "Try Again"}
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* Back Button */}
          {!showFeedback && (
            <button
              onClick={handleReset}
              className="text-sm text-foreground/60 hover:text-primary transition-colors font-light"
            >
              ← {language === "pt" ? "Voltar" : "Back"}
            </button>
          )}
        </div>
      </ScrollReveal>
    </ModuleLayout>
  );
};

export default SalesSimulator;
