import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, QuizBlock, ReflectionBlock, VideoBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import teamOpsImg from "@/assets/academy/team-ops.svg";
import { Clock, Users, Target, Zap, MessageCircle, TrendingUp, CheckSquare, Lightbulb } from "lucide-react";

const ModuleTeamOps = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  return (
    <ModuleLayout
      moduleId="team-ops"
      moduleNumber={22}
      title={isEN ? "Team Operations & Performance" : "Operações de Equipa e Desempenho"}
      subtitle={isEN ? "Master shift coordination, coaching and KPI management to drive team excellence." : "Domina coordenação de turnos, coaching e gestão de KPIs para impulsionar excelência de equipa."}
      heroImage={teamOpsImg}
    >
      <ContentBlock title={isEN ? "Your Role as Team Leader" : "O Teu Papel como Team Leader"}>
        <p>
          {isEN
            ? "As a Team Leader, you are the bridge between management and frontline staff. You ensure smooth daily operations, develop your team's skills and create an environment where everyone is motivated to deliver excellence."
            : "Como Team Leader, és a ponte entre gestão e pessoal de primeira linha. Garantis operações diárias suaves, desenvolves as competências da tua equipa e crias um ambiente onde todos estão motivados para entregar excelência."}
        </p>
      </ContentBlock>

      <VideoBlock
        title="Operações de Equipa"
        description="Coordenação, turnos e gestão de picos."
        duration="9:30"
        poster={teamOpsImg}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(isEN ? [
          {
            icon: Clock,
            title: "Shift Coordination",
            desc: "Plan shifts strategically. Ensure full coverage during peak hours, balance experienced with newer staff, and prepare for busier periods.",
          },
          {
            icon: Users,
            title: "Team Delegation",
            desc: "Assign tasks based on strengths. Newer team members learn by doing; experienced staff take on stretch assignments.",
          },
          {
            icon: Zap,
            title: "Peak Management",
            desc: "Prepare for busy periods. Ensure products are well-stocked, the space is clean and team is briefed on the busier day ahead.",
          },
          {
            icon: MessageCircle,
            title: "Sales Coaching",
            desc: "Provide constructive feedback and model excellent customer service. Help team members calibrate their approach.",
          },
        ] : [
          {
            icon: Clock,
            title: "Coordenação de Turnos",
            desc: "Planeia turnos estrategicamente. Garante cobertura completa nas horas de pico, equilibra pessoal experiente com novo e prepara-se para períodos mais ocupados.",
          },
          {
            icon: Users,
            title: "Delegação de Tarefas",
            desc: "Atribui tarefas com base em pontos fortes. Membros novos aprendem fazendo; pessoal experiente assume tarefas de aprendizagem.",
          },
          {
            icon: Zap,
            title: "Gestão de Picos",
            desc: "Prepara-te para períodos ocupados. Garante que os produtos estão bem stocks, o espaço está limpo e a equipa está informada sobre o dia mais ocupado.",
          },
          {
            icon: MessageCircle,
            title: "Coaching de Vendas",
            desc: "Fornece feedback construtivo e modela excelente serviço ao cliente. Ajuda os membros da equipa a calibrarem a sua abordagem.",
          },
        ]).map((item) => (
          <ScrollReveal key={item.title}>
            <div className="border border-border/30 p-6 h-full flex flex-col gap-4">
              <div className="p-3 bg-primary/10 rounded-sm w-fit">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-base font-light text-foreground/90 mb-2">{item.title}</h4>
                <p className="text-sm text-foreground/60 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Shift Planning Best Practices" : "Melhores Práticas de Planeamento de Turnos"}>
        <p>
          {isEN
            ? "Good shift planning prevents stress, ensures quality service and helps team members balance work with personal life."
            : "Um bom planeamento de turnos previne stress, garante qualidade de serviço e ajuda os membros da equipa a equilibrarem trabalho com vida pessoal."}
        </p>
      </ContentBlock>

      <div className="space-y-4">
        {(isEN ? [
          {
            step: "1. Plan Ahead",
            desc: "Create schedules 2-4 weeks in advance. This gives team members notice and allows for adjustments.",
          },
          {
            step: "2. Balance Experience Levels",
            desc: "Pair experienced staff with newer team members on every shift. Knowledge transfers happen naturally.",
          },
          {
            step: "3. Match Peak Hours",
            desc: "Schedule your strongest team during busiest times (typically evenings, weekends, tourists seasons).",
          },
          {
            step: "4. Cross-Training",
            desc: "Ensure multiple people can perform each role. This prevents bottlenecks and reduces dependency on one person.",
          },
          {
            step: "5. Flexibility & Fairness",
            desc: "Be flexible with requests but maintain fairness. Document preferences and rotate shifts equitably.",
          },
        ] : [
          {
            step: "1. Planeamento Antecipado",
            desc: "Cria horários com 2-4 semanas de antecedência. Isto dá à equipa aviso e permite ajustes.",
          },
          {
            step: "2. Equilibra Níveis de Experiência",
            desc: "Emparelha pessoal experiente com membros novos em cada turno. Transferência de conhecimento acontece naturalmente.",
          },
          {
            step: "3. Combina Horas de Pico",
            desc: "Agenda a tua equipa mais forte durante tempos mais ocupados (tipicamente noites, fins de semana, épocas turísticas).",
          },
          {
            step: "4. Treinamento Cruzado",
            desc: "Garante que múltiplas pessoas podem executar cada papel. Isto previne afunilamentos e reduz dependência de uma pessoa.",
          },
          {
            step: "5. Flexibilidade e Justiça",
            desc: "Sê flexível com pedidos mas mantém justiça. Documenta preferências e alterna turnos equitativamente.",
          },
        ]).map((item) => (
          <ScrollReveal key={item.step}>
            <div className="border border-border/30 p-6">
              <h4 className="text-base font-light text-primary mb-2">{item.step}</h4>
              <p className="text-sm text-foreground/60 font-light">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Coaching & Constructive Feedback" : "Coaching e Feedback Construtivo"}>
        <p>
          {isEN
            ? "Coaching is not about criticism — it's about helping team members see what they did well and where they can improve. Regular, small feedback moments build skills faster than waiting for formal reviews."
            : "Coaching não é sobre crítica — é sobre ajudar os membros da equipa a ver o que fizeram bem e onde podem melhorar. Momentos de feedback regulares e pequenos constroem competências mais rápido do que esperar por avaliações formais."}
        </p>
      </ContentBlock>

      <div className="space-y-4">
        {(isEN ? [
          {
            title: "The Coaching Framework",
            items: [
              "Observe: Watch interactions, note specific moments",
              "Reflect: Ask the team member to evaluate their own performance",
              "Coach: Offer specific, actionable feedback",
              "Celebrate: Acknowledge what they did well",
              "Practice: Give them the opportunity to apply the feedback soon",
            ],
          },
          {
            title: "Feedback Tips",
            items: [
              "Be timely: Give feedback soon after the moment (not weeks later)",
              "Be specific: 'You explained the collection beautifully' vs 'Good job'",
              "Be private: Praise publicly, correct privately",
              "Be solution-focused: Suggest how to improve, not just what went wrong",
              "Be supportive: Frame as partnership, not judgment",
            ],
          },
        ] : [
          {
            title: "O Quadro de Coaching",
            items: [
              "Observa: Vê interações, nota momentos específicos",
              "Reflete: Pede ao membro da equipa para avaliar o seu próprio desempenho",
              "Treina: Oferece feedback específico e acionável",
              "Celebra: Reconhece o que fizeram bem",
              "Pratica: Dá-lhes a oportunidade de aplicar o feedback em breve",
            ],
          },
          {
            title: "Dicas de Feedback",
            items: [
              "Sê oportuno: Fornece feedback em breve após o momento (não semanas depois)",
              "Sê específico: 'Explicaste a coleção lindamente' vs 'Bom trabalho'",
              "Sê privado: Elogia em público, corrige em privado",
              "Sê focado na solução: Sugere como melhorar, não apenas o que correu mal",
              "Sê apoiante: Enquadra como parceria, não julgamento",
            ],
          },
        ]).map((section) => (
          <ScrollReveal key={section.title}>
            <div className="border border-border/30 p-6">
              <h4 className="text-base font-light text-primary mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/60 font-light">
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Advanced Operational Checklist" : "Checklist Operacional Avançado"}>
        <p>
          {isEN
            ? "Use this daily checklist to ensure your store operates smoothly and provides consistent experience."
            : "Usa este checklist diário para garantir que a tua loja opera suavemente e fornece experiência consistente."}
        </p>
      </ContentBlock>

      <div className="space-y-3">
        {(isEN ? [
          "Morning: Check inventory, confirm staff attendance, review daily targets",
          "Pre-opening: Stock check, space cleanliness, team briefing on objectives and busy forecast",
          "During shift: Monitor floor, engage with customers, provide real-time coaching, track sales",
          "Peak times: Lead by example, support team, handle VIP customers, manage queues",
          "End of shift: Count cash, review performance vs targets, brief closing team, plan tomorrow",
          "Post-close: Deep clean, restock, check systems, document issues, communicate with manager",
        ] : [
          "Manhã: Verifica inventário, confirma presença de pessoal, revê objetivos diários",
          "Pré-abertura: Verificação de stocks, limpeza do espaço, briefing de equipa sobre objetivos e previsão de ocupação",
          "Durante turno: Monitora o chão, envolve com clientes, fornece coaching em tempo real, rastreia vendas",
          "Tempos de pico: Lidera pelo exemplo, apoia a equipa, trata clientes VIP, gere filas",
          "Fim de turno: Conta dinheiro, revê desempenho vs objetivos, instrui equipa de encerramento, planeia amanhã",
          "Pós-encerramento: Limpeza profunda, reabastecimento, verificação de sistemas, documenta problemas, comunica com gestor",
        ]).map((item, i) => (
          <ScrollReveal key={i}>
            <div className="flex items-start gap-3 border border-border/30 p-4">
              <CheckSquare className="w-5 h-5 text-primary/60 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/70 font-light">{item}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "Understanding & Communicating KPIs" : "Compreender e Comunicar KPIs"}>
        <p>
          {isEN
            ? "KPIs (Key Performance Indicators) are the metrics that tell you if your store is healthy and performing. Understanding them helps you make better decisions and motivate your team."
            : "KPIs (Indicadores-Chave de Desempenho) são as métricas que te dizem se a tua loja está saudável e a funcionar bem. Compreendê-los ajuda a tomar melhores decisões e a motivar a tua equipa."}
        </p>
      </ExpandableSection>

      <div className="space-y-4">
        {(isEN ? [
          {
            kpi: "Daily Sales Target",
            meaning: "Expected revenue for the day",
            how: "Track during the day, celebrate if you exceed, analyze if you fall short",
          },
          {
            kpi: "Conversion Rate",
            meaning: "% of customers who purchase",
            how: "Count visitors and buyers, discuss with team how to improve engagement",
          },
          {
            kpi: "Average Transaction Value",
            meaning: "Average amount spent per customer",
            how: "Use cross-selling techniques, showcase premium products, bundle offerings",
          },
          {
            kpi: "Time to Sale",
            meaning: "How quickly a customer is served",
            how: "Monitor during busy periods, ensure no one is left standing too long",
          },
          {
            kpi: "Customer Satisfaction",
            meaning: "How happy customers are with experience",
            how: "Listen to feedback, ask for ratings, adjust based on comments",
          },
          {
            kpi: "Staff Engagement",
            meaning: "How motivated and aligned your team is",
            how: "Check in regularly, celebrate wins, address concerns quickly",
          },
        ] : [
          {
            kpi: "Objetivo de Vendas Diárias",
            meaning: "Receita esperada para o dia",
            how: "Rastreia durante o dia, celebra se excedes, analisa se fica abaixo",
          },
          {
            kpi: "Taxa de Conversão",
            meaning: "% de clientes que compram",
            how: "Conta visitantes e compradores, discute com a equipa como melhorar engagement",
          },
          {
            kpi: "Valor de Transação Médio",
            meaning: "Quantidade média gasta por cliente",
            how: "Usa técnicas de cross-selling, destaca produtos premium, agrupa ofertas",
          },
          {
            kpi: "Tempo até Venda",
            meaning: "Quão rapidamente um cliente é servido",
            how: "Monitora durante períodos ocupados, garante que ninguém fica de pé muito tempo",
          },
          {
            kpi: "Satisfação do Cliente",
            meaning: "Quão contentes estão os clientes com a experiência",
            how: "Ouve feedback, pede avaliações, ajusta com base em comentários",
          },
          {
            kpi: "Envolvimento de Pessoal",
            meaning: "Quão motivada e alinhada está a tua equipa",
            how: "Verifica regularmente, celebra sucessos, aborda preocupações rapidamente",
          },
        ]).map((item) => (
          <ScrollReveal key={item.kpi}>
            <div className="border border-border/30 p-6">
              <h4 className="text-base font-light text-primary mb-1">{item.kpi}</h4>
              <p className="text-xs text-foreground/60 font-light mb-2">{item.meaning}</p>
              <p className="text-sm text-foreground/70 font-light italic">{isEN ? "How: " : "Como: "}{item.how}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <KeyTakeaway
        items={[
          isEN
            ? "Good shift planning prevents bottlenecks and keeps morale high"
            : "Um bom planeamento de turnos previne afunilamentos e mantém o moral elevado",
          isEN
            ? "Pair experienced staff with newer team members — knowledge transfers naturally"
            : "Emparelha pessoal experiente com membros novos — transferência de conhecimento acontece naturalmente",
          isEN
            ? "Coaching is about helping team members see what they did well and improve"
            : "Coaching é sobre ajudar membros da equipa a ver o que fizeram bem e melhorar",
          isEN
            ? "Praise publicly, correct privately — maintain dignity and morale"
            : "Elogia em público, corrige em privado — mantém dignidade e moral",
          isEN
            ? "Use the advanced operational checklist daily to ensure consistency"
            : "Usa o checklist operacional avançado diariamente para garantir consistência",
          isEN
            ? "KPIs are tools for improvement, not punishment — use them to guide decisions"
            : "KPIs são ferramentas para melhoria, não punição — usa-as para guiar decisões",
        ]}
      />

      <QuizBlock
        moduleId="team-ops"
        questions={[
          {
            question: isEN
              ? "When planning shifts, what is the primary benefit of pairing experienced staff with newer team members?"
              : "Ao planear turnos, qual é o benefício principal de emparelhar pessoal experiente com membros novos?",
            options: isEN
              ? [
                  "It reduces payroll costs",
                  "Knowledge transfers naturally and reduces dependency on one person",
                  "It makes scheduling easier",
                  "It discourages staff from asking questions",
                ]
              : [
                  "Reduz custos de folha de pagamento",
                  "Transferência de conhecimento acontece naturalmente e reduz dependência de uma pessoa",
                  "Torna agendamento mais fácil",
                  "Desencoraja pessoal de fazer perguntas",
                ],
            correct: 1,
          },
          {
            question: isEN
              ? "What is the key principle of giving constructive feedback?"
              : "Qual é o princípio-chave de fornecer feedback construtivo?",
            options: isEN
              ? [
                  "Tell them everything they did wrong at once",
                  "Wait for formal reviews to give feedback",
                  "Praise publicly, correct privately, be specific and solution-focused",
                  "Only give feedback when you're disappointed",
                ]
              : [
                  "Diz-lhes tudo que fizeram errado de uma vez",
                  "Espera por avaliações formais para fornecer feedback",
                  "Elogia em público, corrige em privado, sé específico e focado na solução",
                  "Só fornece feedback quando estás desapontado",
                ],
            correct: 2,
          },
          {
            question: isEN
              ? "Which KPI directly measures how many customers make a purchase?"
              : "Qual KPI mede diretamente quantos clientes fazem uma compra?",
            options: isEN
              ? [
                  "Average Transaction Value",
                  "Conversion Rate",
                  "Daily Sales Target",
                  "Customer Satisfaction",
                ]
              : [
                  "Valor de Transação Médio",
                  "Taxa de Conversão",
                  "Objetivo de Vendas Diárias",
                  "Satisfação do Cliente",
                ],
            correct: 1,
          },
        ]}
      />

      <ReflectionBlock
        questions={[
          isEN
            ? "Think about a shift you've worked recently. How could you improve the schedule or operations for next week?"
            : "Pensa num turno que trabalhaste recentemente. Como poderias melhorar a agenda ou operações para a próxima semana?",
          isEN
            ? "Describe a time when you received helpful feedback. What made it effective?"
            : "Descreve um momento em que recebeste feedback útil. O que o tornou eficaz?",
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleTeamOps;
