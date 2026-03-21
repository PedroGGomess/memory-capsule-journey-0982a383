import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, ReflectionBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import leadershipImg from "@/assets/academy/leadership.svg";
import { Users, Target, TrendingUp, MessageCircle, BarChart3, Zap, Award, Lightbulb } from "lucide-react";

const ModuleLeadership = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  return (
    <ModuleLayout
      moduleId="leadership"
      moduleNumber={21}
      title={isEN ? "Leadership & Team Management" : "Liderança e Gestão de Equipa"}
      subtitle={isEN ? "How to inspire, develop and lead your team to excellence." : "Como inspirar, desenvolver e liderar a tua equipa para a excelência."}
      heroImage={leadershipImg}
    >
      <ContentBlock title={isEN ? "What It Means to Lead at The 100's" : "O Que Significa Liderar no The 100's"}>
        <p>
          {isEN
            ? "Leadership at The 100's is about creating an environment where your team feels empowered, valued and connected to the brand mission. As a Store Manager, you are not just a leader — you are a guardian of culture, an example of excellence and a catalyst for growth."
            : "A liderança no The 100's é criar um ambiente onde a tua equipa se sente capacitada, valorizada e conectada à missão da marca. Como Gerente de Loja, não és apenas um líder — és um guardião da cultura, um exemplo de excelência e um catalisador de crescimento."}
        </p>
      </ContentBlock>

      <VideoBlock
        title="Liderança e Gestão"
        description="Liderança situacional e gestão de equipa."
        duration="12:00"
        poster={leadershipImg}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(isEN ? [
          {
            icon: Users,
            title: "Situational Leadership",
            desc: "Adapt your leadership style to each team member's maturity and the task at hand. Some need direction, others need support, and some need autonomy.",
          },
          {
            icon: Target,
            title: "Delegation & Empowerment",
            desc: "Distribute responsibility with trust. When team members own their tasks, they develop skills and build confidence.",
          },
          {
            icon: MessageCircle,
            title: "Coaching & Feedback",
            desc: "Regular, constructive feedback is the foundation of growth. Praise publicly, correct privately, and always focus on improvement.",
          },
          {
            icon: TrendingUp,
            title: "Performance Management",
            desc: "Set clear goals, monitor progress and celebrate wins. Use KPIs to create transparency and accountability.",
          },
        ] : [
          {
            icon: Users,
            title: "Liderança Situacional",
            desc: "Adapta o teu estilo de liderança à maturidade de cada membro da equipa e à tarefa em questão. Alguns precisam de direção, outros de apoio e alguns de autonomia.",
          },
          {
            icon: Target,
            title: "Delegação e Capacitação",
            desc: "Distribui responsabilidade com confiança. Quando os membros da equipa são donos das suas tarefas, desenvolvem competências e ganham confiança.",
          },
          {
            icon: MessageCircle,
            title: "Coaching e Feedback",
            desc: "Feedback regular e construtivo é a base do crescimento. Elogia em público, corrige em privado e foca sempre na melhoria.",
          },
          {
            icon: TrendingUp,
            title: "Gestão de Desempenho",
            desc: "Define objetivos claros, monitora progresso e celebra sucessos. Usa KPIs para criar transparência e responsabilidade.",
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

      <ContentBlock title={isEN ? "Conflict Resolution" : "Resolução de Conflitos"}>
        <p>
          {isEN
            ? "Conflicts are natural in any team. Address them quickly, fairly and privately. Listen to all perspectives, identify the root cause and work toward a solution that preserves relationships while solving the problem."
            : "Conflitos são naturais em qualquer equipa. Aborda-os rapidamente, justamente e em privado. Ouve todas as perspetivas, identifica a causa raiz e trabalha para uma solução que preserva as relações enquanto resolve o problema."}
        </p>
      </ContentBlock>

      <div className="space-y-4">
        {[
          {
            step: isEN ? "1. Listen" : "1. Ouve",
            desc: isEN
              ? "Understand each person's perspective without judgment. Create a safe space for them to share their concerns."
              : "Compreende a perspetiva de cada pessoa sem julgamento. Cria um espaço seguro para partilharem as suas preocupações.",
          },
          {
            step: isEN ? "2. Clarify" : "2. Clarifica",
            desc: isEN
              ? "Ask clarifying questions to identify the true issue. Sometimes surface disagreements hide deeper needs."
              : "Faz perguntas de esclarecimento para identificar o verdadeiro problema. Às vezes, desentendimentos de superfície escondem necessidades mais profundas.",
          },
          {
            step: isEN ? "3. Find Common Ground" : "3. Encontra Terreno Comum",
            desc: isEN
              ? "Despite differences, both parties usually share common goals. Redirect focus toward shared objectives."
              : "Apesar das diferenças, ambas as partes geralmente partilham objetivos comuns. Redireciona o foco para objetivos partilhados.",
          },
          {
            step: isEN ? "4. Agree on Next Steps" : "4. Concorda com Próximos Passos",
            desc: isEN
              ? "Document the resolution and follow up. Ensure all parties understand expectations and feel heard."
              : "Documenta a resolução e faz acompanhamento. Garante que todas as partes compreendem as expectativas e se sentem ouvidas.",
          },
        ].map((item) => (
          <ScrollReveal key={item.step}>
            <div className="border border-border/30 p-6">
              <h4 className="text-base font-light text-primary mb-2">{item.step}</h4>
              <p className="text-sm text-foreground/60 font-light">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Effective Meetings & Communication" : "Reuniões Eficazes e Comunicação"}>
        <p>
          {isEN
            ? "Meetings are critical moments to align the team, celebrate wins and tackle challenges. Make them purposeful, inclusive and time-efficient."
            : "Reuniões são momentos críticos para alinhar a equipa, celebrar sucessos e enfrentar desafios. Torna-as propositadas, inclusivas e eficientes no tempo."}
        </p>
      </ContentBlock>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(isEN ? [
          {
            icon: Lightbulb,
            title: "Team Huddles (Daily)",
            desc: "5-10 minute daily briefings to align on priorities, celebrate small wins and address immediate concerns.",
          },
          {
            icon: Target,
            title: "1:1 Check-ins (Weekly)",
            desc: "Private conversations to discuss individual goals, provide feedback and support personal development.",
          },
          {
            icon: BarChart3,
            title: "Performance Reviews (Monthly)",
            desc: "Deeper discussions about KPIs, skill development and career progression. Document feedback and create action plans.",
          },
          {
            icon: Award,
            title: "Team Celebrations (Monthly/Quarterly)",
            desc: "Publicly recognize achievements. Build morale and reinforce the behaviors and values you want to see.",
          },
        ] : [
          {
            icon: Lightbulb,
            title: "Team Huddles (Diária)",
            desc: "Briefings diários de 5-10 minutos para alinhar prioridades, celebrar pequenos sucessos e abordar preocupações imediatas.",
          },
          {
            icon: Target,
            title: "Check-ins 1:1 (Semanal)",
            desc: "Conversas privadas para discutir objetivos individuais, fornecer feedback e apoiar desenvolvimento pessoal.",
          },
          {
            icon: BarChart3,
            title: "Avaliações de Desempenho (Mensal)",
            desc: "Discussões mais profundas sobre KPIs, desenvolvimento de competências e progressão na carreira. Documenta feedback e cria planos de ação.",
          },
          {
            icon: Award,
            title: "Celebrações de Equipa (Mensal/Trimestral)",
            desc: "Reconhece publicamente as realizações. Constrói moral e reforça os comportamentos e valores que queres ver.",
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

      <ExpandableSection title={isEN ? "Mystery Client & Store Audits" : "Cliente Mistério e Auditorias de Loja"}>
        <p>
          {isEN
            ? "Regular audits ensure consistency in brand experience and service quality. Mystery clients provide unbiased feedback on how your team delivers the experience."
            : "Auditorias regulares garantem consistência na experiência da marca e qualidade de serviço. Clientes mistério fornecem feedback imparcial sobre como a tua equipa entrega a experiência."}
        </p>
        <p>
          {isEN
            ? "Use audit results not to punish, but to coach. Celebrate what's working and support teams in improving what isn't."
            : "Usa resultados de auditoria não para punir, mas para treinar. Celebra o que está funcionando e apoia as equipas na melhoria do que não está."}
        </p>
      </ExpandableSection>

      <ContentBlock title={isEN ? "Reading & Acting on KPIs" : "Ler e Agir sobre KPIs"}>
        <p>
          {isEN
            ? "As a Store Manager, you have access to critical business metrics. Understand them, track trends and use data to make decisions that improve both customer experience and sales."
            : "Como Gerente de Loja, tens acesso a métricas críticas de negócio. Compreende-as, acompanha tendências e usa dados para tomar decisões que melhoram tanto a experiência do cliente como as vendas."}
        </p>
      </ContentBlock>

      <div className="space-y-4">
        {(isEN ? [
          {
            kpi: "Conversion Rate",
            meaning: "% of visitors who purchase. Target: 15-20%",
            action: "Train team on engagement, improve product displays, refine pitch.",
          },
          {
            kpi: "Average Transaction Value",
            meaning: "Average spend per customer. Target: €25-35",
            action: "Use cross-selling techniques, bundle offers, highlight premium products.",
          },
          {
            kpi: "Customer Satisfaction (NPS)",
            meaning: "Net Promoter Score. Target: 75+",
            action: "Gather feedback, identify pain points, train team on service excellence.",
          },
          {
            kpi: "Staff Retention Rate",
            meaning: "% of team that stays. Target: 90%+",
            action: "Create growth opportunities, provide recognition, ensure fair compensation.",
          },
          {
            kpi: "Product Return Rate",
            meaning: "% of damaged/returned items. Target: <2%",
            action: "Improve handling procedures, train on care, review quality standards.",
          },
        ] : [
          {
            kpi: "Taxa de Conversão",
            meaning: "% de visitantes que compram. Objetivo: 15-20%",
            action: "Treina a equipa em engagement, melhora displays de produtos, refina pitch.",
          },
          {
            kpi: "Valor de Transação Médio",
            meaning: "Despesa média por cliente. Objetivo: €25-35",
            action: "Usa técnicas de cross-selling, ofertas em bundle, destaca produtos premium.",
          },
          {
            kpi: "Satisfação do Cliente (NPS)",
            meaning: "Net Promoter Score. Objetivo: 75+",
            action: "Recolhe feedback, identifica pain points, treina a equipa em excelência de serviço.",
          },
          {
            kpi: "Taxa de Retenção de Pessoal",
            meaning: "% de equipa que fica. Objetivo: 90%+",
            action: "Cria oportunidades de crescimento, fornece reconhecimento, garante compensação justa.",
          },
          {
            kpi: "Taxa de Devolução de Produtos",
            meaning: "% de itens danificados/devolvidos. Objetivo: <2%",
            action: "Melhora procedimentos de manuseamento, treina no cuidado, revê padrões de qualidade.",
          },
        ]).map((item) => (
          <ScrollReveal key={item.kpi}>
            <div className="border border-border/30 p-6">
              <h4 className="text-base font-light text-primary mb-1">{item.kpi}</h4>
              <p className="text-xs text-foreground/60 font-light mb-3">{item.meaning}</p>
              <p className="text-sm text-foreground/70 font-light italic">{isEN ? "Action: " : "Ação: "}{item.action}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Internal Communication Planning" : "Planeamento de Comunicação Interna"}>
        <p>
          {isEN
            ? "Keep your team informed about company updates, product launches, strategic changes and market news. Use multiple channels (huddles, email, chat) to ensure the message reaches everyone."
            : "Mantém a tua equipa informada sobre atualizações da empresa, lançamentos de produtos, mudanças estratégicas e notícias de mercado. Usa múltiplos canais (huddles, email, chat) para garantir que a mensagem chega a todos."}
        </p>
      </ContentBlock>

      <KeyTakeaway
        items={[
          isEN ? "Situational Leadership: Adapt your style to each team member's needs" : "Liderança Situacional: Adapta o teu estilo às necessidades de cada membro da equipa",
          isEN ? "Delegation builds confidence and skills — trust your team with responsibility" : "Delegação constrói confiança e competências — confia à tua equipa com responsabilidade",
          isEN ? "Conflict resolution requires listening, clarity and focus on common goals" : "Resolução de conflitos requer ouvir, clareza e foco em objetivos comuns",
          isEN ? "Effective meetings (huddles, 1:1s, reviews) keep teams aligned and motivated" : "Reuniões eficazes (huddles, 1:1s, avaliações) mantêm as equipas alinhadas e motivadas",
          isEN ? "KPIs drive decisions — understand them and use data to improve" : "KPIs impulsionam decisões — compreende-as e usa dados para melhorar",
          isEN ? "Internal communication ensures alignment and builds psychological safety" : "Comunicação interna garante alinhamento e constrói segurança psicológica",
        ]}
      />

      <ModuleQuizGate
        moduleId="leadership"
        questions={[
          { question: "O que é liderança situacional?", options: ["Liderar apenas em emergências", "Adaptar o estilo de liderança ao nível de maturidade do colaborador", "Liderar por antiguidade", "Seguir sempre o mesmo método"], correctIndex: 1 },
          { question: "Qual a frequência recomendada para huddles (briefings rápidos)?", options: ["Mensalmente", "Diariamente, 5-10 minutos", "Semanalmente", "Apenas quando há problemas"], correctIndex: 1 },
          { question: "O que é um PDI (Plano de Desenvolvimento Individual)?", options: ["Plano de decoração interior", "Plano personalizado de crescimento profissional para cada colaborador", "Plano de descontos", "Plano de inventário"], correctIndex: 1 },
          { question: "Como construir segurança psicológica na equipa?", options: ["Evitar feedback", "Comunicação aberta, celebrar sucessos e aceitar erros como aprendizagem", "Manter distância hierárquica", "Punir erros rapidamente"], correctIndex: 1 },
          { question: "Qual a melhor forma de dar feedback?", options: ["Apenas quando algo corre mal", "Construtivo, específico, frequente e equilibrado (positivo + melhoria)", "Em público para todos ouvirem", "Apenas no final do mês"], correctIndex: 1 },
        ]}
      />

      <ReflectionBlock
        questions={[
          isEN
            ? "Describe a conflict you've witnessed or experienced. How would you approach it using the conflict resolution framework?"
            : "Descreve um conflito que já presenciaste ou experienciaste. Como o abordarías usando o quadro de resolução de conflitos?",
          isEN
            ? "Which KPI do you think is most important for store success, and why?"
            : "Qual achas que é o KPI mais importante para o sucesso da loja e porquê?",
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleLeadership;
