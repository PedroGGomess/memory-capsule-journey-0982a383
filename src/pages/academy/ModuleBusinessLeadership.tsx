import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ModuleLayout, ContentBlock } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  SlideViewer,
  TipBlock,
  PhaseQuiz,
  type Phase,
  type Slide,
  type QuizQuestion,
} from "@/components/InteractiveModule";

export default function ModuleBusinessLeadership() {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases: Phase[] = [
    {
      id: "phase-1-business-model",
      title: isEN ? "Business Model" : "Modelo de Negócio",
      description: isEN
        ? "Understanding the 70/30 philosophy and margin structure"
        : "Compreender a filosofia 70/30 e estrutura de margem",
      slides: [
        {
          id: "slide-1-70-30",
          title: isEN ? "The 70/30 Philosophy" : "A Filosofia 70/30",
          content: isEN
            ? "THE 100'S BUSINESS MODEL IS NOT JUST ABOUT SELLING BOTTLES\n\nTHE 70/30 PRINCIPLE:\n70% = Product (premium bottles, selection, quality)\n30% = Experience (service, personalization, atmosphere, guidance)\n\nWHY THIS MATTERS:\nMost gift shops are 100% transactional: 'Here's your bottle, that'll be €50.'\nThe 100's is different: We sell premium bottles AND the confidence to give them.\n\nWHAT 'EXPERIENCE' MEANS IN PRACTICE:\n• Expert guidance: 'This tier is perfect for someone starting with wine'\n• Transport expertise: 'Let me make sure it travels safely'\n• Personalization: UV printing, custom packaging\n• After-sale support: Following up, addressing concerns\n• Consultative selling: Building relationships, not transactions\n\nWHY THIS CREATES HIGHER MARGINS:\nTransactional: Bottle €50 → Costs €25 → Margin €25 (50%)\nConsultative: Bottle €50 + personalization €20 + transport protection €10 + confidence premium €15 = €95 revenue → Costs €35 → Margin €60 (63%)\n\nTHE REAL INSIGHT:\nWhen customers trust your expertise (the 30%), they're willing to pay more for the product (the 70%). The margin isn't just in the bottle—it's in the relationship."
            : "O MODELO DE NEGÓCIO THE 100'S NÃO É APENAS SOBRE VENDER GARRAFAS\n\nO PRINCÍPIO 70/30:\n70% = Produto (garrafas premium, seleção, qualidade)\n30% = Experiência (serviço, personalização, atmosfera, orientação)\n\nPOR QUE ISTO IMPORTA:\nA maioria das lojas de presentes são 100% transacionais: 'Aqui está sua garrafa, isso será €50.'\nA The 100's é diferente: Vendemos garrafas premium E a confiança para as dar.\n\nO QUE 'EXPERIÊNCIA' SIGNIFICA NA PRÁTICA:\n• Orientação especializada: 'Este tier é perfeito para alguém começando com vinho'\n• Expertise em transporte: 'Deixe-me garantir que viaja com segurança'\n• Personalização: Impressão UV, embalagem customizada\n• Suporte pós-venda: Acompanhamento, abordagem de preocupações\n• Venda consultativa: Construir relacionamentos, não transações\n\nPOR QUE ISTO CRIA MARGENS MAIS ALTAS:\nTransacional: Garrafa €50 → Custos €25 → Margem €25 (50%)\nConsultativa: Garrafa €50 + personalização €20 + proteção de transporte €10 + prêmio de confiança €15 = €95 receita → Custos €35 → Margem €60 (63%)\n\nA PERCEÇÃO REAL:\nQuando clientes confiam em sua expertise (o 30%), estão dispostos a pagar mais pelo produto (o 70%). A margem não é apenas na garrafa—é no relacionamento.",
          notes: isEN
            ? "The 30% experience is where your competitive advantage lives."
            : "A experiência 30% é onde sua vantagem competitiva vive.",
        },
        {
          id: "slide-2-tier-structure",
          title: isEN ? "Tier Structure & Targets" : "Estrutura de Tier & Alvos",
          content: isEN
            ? "THE 100'S TIER SYSTEM\n\nTIER 1: ENTRY LEVEL (€30-60)\n• Target customer: Budget-conscious tourists, casual gifters\n• Positioning: 'Great introduction to premium wine/spirits'\n• Margin target: 50% (€15-30 per bottle)\n• Sales goal: 40% of daily transactions\n• Key message: 'Quality at every price point'\n\nTIER 2: POPULAR (€60-100)\n• Target customer: Regular tourists, corporate gifters, repeat customers\n• Positioning: 'Best balance of quality and value'\n• Margin target: 55% (€33-55 per bottle)\n• Sales goal: 35% of daily transactions\n• Key message: 'This is where the magic happens'\n\nTIER 3: PREMIUM (€100-200)\n• Target customer: Connoisseurs, high-value gifts, collectors\n• Positioning: 'Exceptional bottles, investment quality'\n• Margin target: 60% (€60-120 per bottle)\n• Sales goal: 20% of daily transactions\n• Key message: 'A bottle they'll remember forever'\n\nTIER 4: LUXURY (€200+)\n• Target customer: VIP customers, large corporate orders, special occasions\n• Positioning: 'Exclusive, limited, investment-grade'\n• Margin target: 65% (€130+)\n• Sales goal: 5% of daily transactions\n• Key message: 'The ultimate gift or personal collection piece'\n\nDAILY KPI TARGETS:\n• Average transaction value (ATV): €65\n• Transactions per day: 12-15\n• Daily revenue: €780-975\n• Daily margin: €450-600\n• Tier 2+ percentage: 55% of sales (higher margin)\n• Repeat customer ratio: 20%\n• Add-on sales (personalization, packaging): €50+ daily"
            : "SISTEMA DE TIER THE 100'S\n\nTIER 1: NÍVEL DE ENTRADA (€30-60)\n• Cliente alvo: Turistas conscientes de orçamento, presenteadores casuais\n• Posicionamento: 'Ótima introdução a vinho/bebidas premium'\n• Alvo de margem: 50% (€15-30 por garrafa)\n• Objetivo de vendas: 40% de transações diárias\n• Mensagem-chave: 'Qualidade em cada ponto de preço'\n\nTIER 2: POPULAR (€60-100)\n• Cliente alvo: Turistas regulares, presenteadores corporativos, clientes que voltam\n• Posicionamento: 'Melhor equilíbrio de qualidade e valor'\n• Alvo de margem: 55% (€33-55 por garrafa)\n• Objetivo de vendas: 35% de transações diárias\n• Mensagem-chave: 'Aqui é onde a magia acontece'\n\nTIER 3: PREMIUM (€100-200)\n• Cliente alvo: Conhecedores, presentes de alto valor, colecionadores\n• Posicionamento: 'Garrafas excecionais, qualidade de investimento'\n• Alvo de margem: 60% (€60-120 por garrafa)\n• Objetivo de vendas: 20% de transações diárias\n• Mensagem-chave: 'Uma garrafa que eles sempre lembrarão'\n\nTIER 4: LUXO (€200+)\n• Cliente alvo: Clientes VIP, grandes pedidos corporativos, ocasiões especiais\n• Posicionamento: 'Exclusiva, limitada, nível de investimento'\n• Alvo de margem: 65% (€130+)\n• Objetivo de vendas: 5% de transações diárias\n• Mensagem-chave: 'O presente definitivo ou peça de coleção pessoal'\n\nALVOS DE KPI DIÁRIO:\n• Valor médio de transação (ATV): €65\n• Transações por dia: 12-15\n• Receita diária: €780-975\n• Margem diária: €450-600\n• Percentagem de Tier 2+: 55% de vendas (margem mais alta)\n• Taxa de cliente que volta: 20%\n• Vendas de add-on (personalização, embalagem): €50+ diariamente",
          notes: isEN
            ? "Your daily success is measured by margin, not just by volume."
            : "Seu sucesso diário é medido por margem, não apenas por volume.",
        },
        {
          id: "slide-3-kpis",
          title: isEN ? "Key Performance Indicators" : "Indicadores-Chave de Desempenho",
          content: isEN
            ? "TRACKING WHAT MATTERS\n\nDAILY KPIs (Store Staff)\n1. TRANSACTIONS & VOLUME\n   • # of transactions per day (target: 12-15)\n   • Average transaction value (target: €65)\n   • Total daily revenue (target: €780-975)\n\n2. MARGIN & PROFITABILITY\n   • Daily margin € (target: €450-600)\n   • Margin % by transaction (track tier distribution)\n   • Margin vs. target (are we hitting 55-60%?)\n\n3. CUSTOMER EXPERIENCE\n   • Repeat customers (track % day-over-day)\n   • New customers (track source: walk-in, referral, guide, etc.)\n   • Customer satisfaction (any complaints or issues?)\n\n4. PRODUCT MIX\n   • Tier 1 vs Tier 2 vs Tier 3 vs Tier 4 sales split\n   • Best-performing bottles (which are flying off shelves?)\n   • Slow-moving inventory (which need repositioning?)\n\n5. ADD-ON SALES\n   • Personalization revenue (UV printing)\n   • Packaging/gift wrap add-ons\n   • Transport services (shipping, protection)\n\nWEEKLY KPIs (Store Manager)\n• Average daily revenue for the week\n• Week-over-week trend (up/down)\n• Customer retention rate (how many came back?)\n• Staff performance (individual transaction data)\n• Inventory accuracy (variance between system and physical)\n• CRM data quality (are customers being recorded?)\n\nHOW TO USE THIS DATA:\n• Daily: Check against targets. Celebrate wins, address gaps.\n• Weekly: Identify trends. Adjust staffing, inventory, or training.\n• Monthly: Strategic review. Are we building sustainable growth?\n• Quarterly: Trend analysis. What's working? What needs fixing?\n\nREMEMBER:\nKPIs aren't about surveillance—they're about continuous improvement. Each number tells a story about what customers want, what works, and where we can do better."
            : "RASTREAMENTO DO QUE IMPORTA\n\nKPIs DIÁRIOS (Pessoal de Loja)\n1. TRANSAÇÕES & VOLUME\n   • # de transações por dia (alvo: 12-15)\n   • Valor médio de transação (alvo: €65)\n   • Receita diária total (alvo: €780-975)\n\n2. MARGEM & RENTABILIDADE\n   • Margem € diária (alvo: €450-600)\n   • Margem % por transação (rastreie distribuição de tier)\n   • Margem vs. alvo (estamos atingindo 55-60%?)\n\n3. EXPERIÊNCIA DE CLIENTE\n   • Clientes que voltam (rastreie % dia a dia)\n   • Novos clientes (rastreie origem: a pé, referência, guia, etc.)\n   • Satisfação do cliente (quaisquer reclamações ou problemas?)\n\n4. MIX DE PRODUTO\n   • Divisão de vendas de Tier 1 vs Tier 2 vs Tier 3 vs Tier 4\n   • Garrafas com melhor desempenho (quais estão saindo das prateleiras?)\n   • Inventário de movimento lento (quais precisam reposicionamento?)\n\n5. VENDAS DE ADD-ON\n   • Receita de personalização (impressão UV)\n   • Add-ons de embalagem/embrulho de presente\n   • Serviços de transporte (envio, proteção)\n\nKPIs SEMANAIS (Gerente de Loja)\n• Receita diária média da semana\n• Tendência semana a semana (cima/baixo)\n• Taxa de retenção de cliente (quantos voltaram?)\n• Desempenho de pessoal (dados individuais de transação)\n• Precisão de inventário (variação entre sistema e físico)\n• Qualidade de dados de CRM (clientes estão sendo registados?)\n\nCOMO USAR ESTES DADOS:\n• Diariamente: Verifique contra alvos. Comemore vitórias, aborde lacunas.\n• Semanalmente: Identifique tendências. Ajuste pessoal, inventário, ou treinamento.\n• Mensalmente: Revisão estratégica. Estamos construindo crescimento sustentável?\n• Trimestralmente: Análise de tendência. O que está funcionando? O que precisa de reparo?\n\nLEMBRE:\nKPIs não são sobre vigilância—são sobre melhoria contínua. Cada número conta uma história sobre o que clientes querem, o que funciona, e onde podemos fazer melhor.",
          notes: isEN
            ? "Numbers tell the truth. Pay attention to them."
            : "Números dizem a verdade. Preste atenção neles.",
        },
      ] as Slide[],
      quiz: {
        questions: [
          {
            id: "q1-70-30",
            question: isEN
              ? "In The 100's business model, what does the '30' represent?"
              : "No modelo de negócio da The 100's, o que '30' representa?",
            options: isEN
              ? ["Discount percentage", "Experience and service", "Product margin", "Customer base size"]
              : ["Percentagem de desconto", "Experiência e serviço", "Margem de produto", "Tamanho de base de cliente"],
            correctAnswer: 1,
            explanation: isEN
              ? "The 30% is experience: service, personalization, atmosphere, and guidance. This is where premium margins come from."
              : "O 30% é experiência: serviço, personalização, atmosfera, e orientação. É aqui que as margens premium vêm.",
          },
          {
            id: "q2-tier-target",
            question: isEN
              ? "What is the target sales goal percentage for Tier 2 products?"
              : "Qual é o percentagem de objetivo de vendas alvo para produtos Tier 2?",
            options: isEN
              ? ["20%", "35%", "40%", "55%"]
              : ["20%", "35%", "40%", "55%"],
            correctAnswer: 1,
            explanation: isEN
              ? "Tier 2 should represent 35% of daily transactions. Combined with Tier 3 & 4, this gives us the 55% Tier 2+ revenue goal."
              : "Tier 2 deve representar 35% de transações diárias. Combinado com Tier 3 & 4, isto nos dá o objetivo de receita Tier 2+ de 55%.",
          },
          {
            id: "q3-atv",
            question: isEN
              ? "What is the target average transaction value (ATV)?",
              : "Qual é o valor médio de transação alvo (ATV)?",
            options: isEN
              ? ["€45", "€55", "€65", "€85"]
              : ["€45", "€55", "€65", "€85"],
            correctAnswer: 2,
            explanation: isEN
              ? "The target ATV is €65. This balanced with 12-15 transactions per day gives us our daily revenue target of €780-975."
              : "O ATV alvo é €65. Isto equilibrado com 12-15 transações por dia nos dá nosso alvo de receita diária de €780-975.",
          },
        ] as QuizQuestion[],
        passingScore: 66,
      },
    },
    {
      id: "phase-2-leadership-team",
      title: isEN ? "Leadership & Team" : "Liderança & Equipa",
      description: isEN
        ? "Store manager responsibilities and team communication"
        : "Responsabilidades de gerente de loja e comunicação de equipa",
      slides: [
        {
          id: "slide-1-store-manager-role",
          title: isEN ? "Store Manager Role" : "Papel de Gerente de Loja",
          content: isEN
            ? "THE STORE MANAGER IS THE CAPTAIN OF THE SHIP\n\nPRIMARY RESPONSIBILITIES:\n\n1. FINANCIAL PERFORMANCE\n   • Monitor daily revenue vs. targets\n   • Track margin % (should be 55-65%)\n   • Manage inventory investment (stock levels, cash tied up)\n   • Control labor costs (scheduling, efficiency)\n   • Report to HQ weekly: Revenue, margin, KPIs, issues\n\n2. TEAM LEADERSHIP\n   • Hire, train, and develop staff\n   • Conduct 1-on-1 check-ins monthly\n   • Provide feedback: positive and corrective\n   • Create team culture: professional yet personable\n   • Recognize achievements: celebrate wins\n   • Address performance issues: coaching or transitions\n\n3. CUSTOMER EXPERIENCE\n   • Set the tone: You are the example\n   • Monitor customer interactions (secret shopper perspective)\n   • Address complaints: resolve quickly and professionally\n   • Track repeat customers: recognize regulars\n   • Implement feedback: customer input drives improvement\n\n4. OPERATIONAL EXCELLENCE\n   • Ensure systems work: POS, CRM, UV printer\n   • Inventory accuracy: regular counts and audits\n   • Store appearance: clean, organized, professional\n   • Security: cash handling, data protection, alarm management\n   • Compliance: follow The 100's standards and local regulations\n\n5. STRATEGIC PLANNING\n   • Identify trends: what's selling, what's not\n   • Plan inventory: anticipate seasonal demand\n   • Staff development: build depth in the team\n   • Problem-solving: address systemic issues\n   • Growth opportunities: new customers, events, partnerships\n\nWHAT SUCCESS LOOKS LIKE:\n• Your team loves coming to work\n• Customers recognize you and return\n• Numbers hit or exceed targets\n• No crises or surprises\n• Staff retention is high (low turnover)\n• Customers consistently mention 'excellent service'"
            : "O GERENTE DE LOJA É O CAPITÃO DO NAVIO\n\nRESPONSABILIDADES PRIMÁRIAS:\n\n1. DESEMPENHO FINANCEIRO\n   • Monitorar receita diária vs. alvos\n   • Rastrear margem % (deve ser 55-65%)\n   • Gerir investimento de inventário (níveis de estoque, dinheiro preso)\n   • Controlar custos de trabalho (agendamento, eficiência)\n   • Relatar para HQ semanalmente: Receita, margem, KPIs, problemas\n\n2. LIDERANÇA DE EQUIPA\n   • Contratar, treinar, e desenvolver pessoal\n   • Conduzir check-ins 1-a-1 mensalmente\n   • Fornecer feedback: positivo e corretivo\n   • Criar cultura de equipa: profissional mas personável\n   • Reconhecer conquistas: celebre vitórias\n   • Aborde problemas de desempenho: coaching ou transições\n\n3. EXPERIÊNCIA DE CLIENTE\n   • Defina o tom: Você é o exemplo\n   • Monitore interações de cliente (perspectiva de cliente secreto)\n   • Aborde reclamações: resolva rápido e profissionalmente\n   • Rastreie clientes que voltam: reconheça regulares\n   • Implemente feedback: entrada de cliente impulsiona melhoria\n\n4. EXCELÊNCIA OPERACIONAL\n   • Garanta que sistemas funcionam: POS, CRM, impressora UV\n   • Precisão de inventário: contagens e auditorias regulares\n   • Aparência de loja: limpa, organizada, profissional\n   • Segurança: gestão de dinheiro, proteção de dados, gestão de alarme\n   • Conformidade: siga padrões The 100's e regulamentações locais\n\n5. PLANEJAMENTO ESTRATÉGICO\n   • Identifique tendências: o que está vendendo, o que não está\n   • Planeje inventário: antecipe demanda sazonal\n   • Desenvolvimento de pessoal: construa profundidade na equipa\n   • Resolução de problemas: aborde problemas sistêmicos\n   • Oportunidades de crescimento: novos clientes, eventos, parcerias\n\nCOMO SE VÊ O SUCESSO:\n• Sua equipa ama vir trabalhar\n• Clientes o reconhecem e voltam\n• Números atingem ou excedem alvos\n• Sem crises ou surpresas\n• Retenção de pessoal é alta (rotatividade baixa)\n• Clientes consistentemente mencionam 'serviço excelente'",
          notes: isEN
            ? "Everything flows through the store manager. Excellence starts with you."
            : "Tudo flui através do gerente de loja. Excelência começa com você.",
        },
        {
          id: "slide-2-team-roles",
          title: isEN ? "Team Roles & Responsibilities" : "Papéis & Responsabilidades de Equipa",
          content: isEN
            ? "THE 100'S TEAM STRUCTURE\n\nSTORE MANAGER (1 per location)\n• Hired from high-performing Sales Specialists\n• Salary + performance bonus\n• Responsible for all store performance\n• Reports to Area Manager\n• Manages 2-4 Sales Specialists\n\nSALES SPECIALIST (2-4 per store)\n• Core team member\n• Responsible for customer interactions and sales\n• Works scheduled shifts (typically 5 days/week)\n• Hourly wage + monthly commission (3-5% of personal sales)\n• Growth path: → Store Manager role\n\nKEY TEAM SKILLS TO DEVELOP\nEach person should be strong in:\n• Product knowledge (tiers, origins, tasting notes)\n• Sales technique (consultative selling, upselling)\n• Customer service (empathy, problem-solving, follow-up)\n• Systems competency (POS, CRM, inventory)\n• Brand representation (professionalism, appearance, conduct)\n\nTEAM COMMUNICATION STRUCTURE\n• Daily briefing (10 min): Updates, special customers, focus\n• Weekly team meeting: Performance review, training, challenges\n• Monthly 1-on-1s: Personal development, feedback, goals\n• Quarterly reviews: Performance assessment, growth planning\n\nCONFLICT RESOLUTION\nIf issues arise between team members:\n1. Address privately with individual\n2. Listen without judgment\n3. Clarify expectations\n4. Follow up in writing\n5. Monitor improvement\n6. Recognize when resolved\n\nWHEN TO ESCALATE\nIf issues persist after coaching:\n• Document all conversations\n• Inform Area Manager\n• Create improvement plan with metrics\n• Set timeline for change\n• Follow disciplinary process (if needed)"
            : "ESTRUTURA DE EQUIPA THE 100'S\n\nGERENTE DE LOJA (1 por localização)\n• Contratado de Especialistas em Vendas de alto desempenho\n• Salário + bônus de desempenho\n• Responsável por todo desempenho de loja\n• Relata ao Gerente de Área\n• Gerencia 2-4 Especialistas em Vendas\n\nESPECIALISTA EM VENDAS (2-4 por loja)\n• Membro de equipa principal\n• Responsável por interações de cliente e vendas\n• Trabalha turnos agendados (tipicamente 5 dias/semana)\n• Salário por hora + comissão mensal (3-5% de vendas pessoais)\n• Caminho de crescimento: → Papel de Gerente de Loja\n\nHABILIDADES PRINCIPAIS DE EQUIPA PARA DESENVOLVER\nCada pessoa deve ser forte em:\n• Conhecimento de produto (tiers, origens, notas de degustação)\n• Técnica de vendas (venda consultativa, venda adicional)\n• Serviço ao cliente (empatia, resolução de problemas, acompanhamento)\n• Competência de sistemas (POS, CRM, inventário)\n• Representação de marca (profissionalismo, aparência, conduta)\n\nESTRUTURA DE COMUNICAÇÃO DE EQUIPA\n• Briefing diário (10 min): Atualizações, clientes especiais, foco\n• Reunião de equipa semanal: Revisão de desempenho, treinamento, desafios\n• Check-ins 1-a-1 mensais: Desenvolvimento pessoal, feedback, objetivos\n• Revisões trimestrais: Avaliação de desempenho, planejamento de crescimento\n\nRESOLUÇÃO DE CONFLITO\nSe problemas surgirem entre membros de equipa:\n1. Aborde privadamente com indivíduo\n2. Ouça sem julgamento\n3. Esclareça expectativas\n4. Acompanhe por escrito\n5. Monitore melhoria\n6. Reconheça quando resolvido\n\nQUANDO ESCALAR\nSe problemas persistirem após coaching:\n• Documente todas as conversas\n• Informe o Gerente de Área\n• Crie plano de melhoria com métricas\n• Defina cronograma para mudança\n• Siga processo disciplinar (se necessário)",
          notes: isEN
            ? "Strong teams are built, not inherited. Invest in people."
            : "Equipes fortes são construídas, não herdadas. Invista em pessoas.",
        },
        {
          id: "slide-3-communication",
          title: isEN ? "Communication Framework" : "Framework de Comunicação",
          content: isEN
            ? "CLEAR COMMUNICATION = SMOOTH OPERATIONS\n\nDAILY HUDDLE (5-10 MINUTES)\nWhen: Start of day, before opening\nWho: Manager + all staff present\nWhat to cover:\n• Sales goal for today (revenue & margin target)\n• Customer focus: 'Any VIPs coming? New customers to watch for?'\n• Special tasks: 'We're doing inventory count at 3pm'\n• Product highlight: 'New Tier 3 just arrived—learn the notes'\n• Recognition: 'Great work yesterday, John—stellar customer feedback'\n\nSAMPLE HUDDLE:\n'Good morning team. Today we're targeting €850 in revenue and 60% margin. We have three regular VIPs coming—Akiko is a Tier 3 enthusiast, the Wilson's like our gift-wrapped selections, and Marcus wants to discuss shipping options. New Tier 3 Portuguese arrived yesterday—I want each of you to taste it so you can speak to it. Finally, great work yesterday. Sarah, your customer comments were excellent. Let's keep that energy. Any questions?'\n\nWEEKLY TEAM MEETING (30-45 MINUTES)\nWhen: Scheduled at least once per week\nAgenda:\n• Review numbers: Revenue, transactions, margin %, Tier mix\n• Celebrate wins: Who hit targets? Great customer moments?\n• Address challenges: What didn't go well? How to improve?\n• Training: New products, techniques, customer feedback\n• Announcements: Upcoming events, new systems, policy changes\n\nMONTHLY 1-ON-1s (20-30 MINUTES)\nWhen: Scheduled with each person\nStructure:\n1. Open: 'How are you doing? Any challenges?'\n2. Performance: 'Let's look at your numbers this month'\n3. Strengths: 'What you're doing really well...'\n4. Development: 'One area to focus on next month...'\n5. Support: 'How can I help you succeed?'\n6. Closing: 'Great conversation. See you next month.'\n\nWRITTEN COMMUNICATION\n• Daily: Brief note in team chat (Slack or WhatsApp)\n• Weekly: Email with performance data\n• Monthly: Written feedback attached to check-in notes\n• Urgent: Direct call or in-person conversation\n\nWHEN COMMUNICATION BREAKS DOWN\nIf someone misunderstands or forgets:\n1. Assume good intent\n2. Gently clarify: 'Just to make sure we're on the same page...'\n3. Write it down: 'I'll email that to you so it's clear'\n4. Follow up: 'Let me check in tomorrow to make sure that worked'\n5. Document: Keep records of important conversations\n\nTHE GOLDEN RULE\n'The clarity of your communication is directly proportional to the success of your team.'"
            : "COMUNICAÇÃO CLARA = OPERAÇÕES SUAVES\n\nHUDDLE DIÁRIO (5-10 MINUTOS)\nQuando: Início do dia, antes de abrir\nQuem: Gerente + todo pessoal presente\nO que cobrir:\n• Objetivo de vendas para hoje (alvo de receita & margem)\n• Foco de cliente: 'Algum VIP vindo? Novos clientes para vigiar?'\n• Tarefas especiais: 'Estamos fazendo contagem de inventário às 3pm'\n• Destaque de produto: 'Novo Tier 3 acabou de chegar—aprenda as notas'\n• Reconhecimento: 'Ótimo trabalho ontem, João—feedback de cliente estelar'\n\nHUDDLE DE AMOSTRA:\n'Bom dia equipa. Hoje estamos visando €850 em receita e 60% margem. Temos três VIPs regulares vindo—Akiko é entusiasta de Tier 3, os Wilsons gostam de nossas seleções com embrulho de presente, e Marcus quer discutir opções de envio. Novo Tier 3 Português chegou ontem—quero que cada um de vocês o prove para poder falar sobre isso. Finalmente, ótimo trabalho ontem. Sara, seus comentários de cliente foram excelentes. Vamos manter essa energia. Alguma dúvida?'\n\nREUNIÃO DE EQUIPA SEMANAL (30-45 MINUTOS)\nQuando: Agendado pelo menos uma vez por semana\nAgenda:\n• Revise números: Receita, transações, margem %, mix de Tier\n• Celebre vitórias: Quem atingiu alvos? Momentos de cliente ótimos?\n• Aborde desafios: O que não correu bem? Como melhorar?\n• Treinamento: Novos produtos, técnicas, feedback de cliente\n• Anúncios: Próximos eventos, novos sistemas, mudanças de política\n\nCHECK-INS 1-A-1 MENSAIS (20-30 MINUTOS)\nQuando: Agendado com cada pessoa\nEstrutura:\n1. Abra: 'Como você está? Quaisquer desafios?'\n2. Desempenho: 'Vamos ver seus números este mês'\n3. Forças: 'O que você está fazendo realmente bem...'\n4. Desenvolvimento: 'Uma área para focar no próximo mês...'\n5. Suporte: 'Como posso ajudá-lo a ter sucesso?'\n6. Encerramento: 'Ótima conversa. Vejo você próximo mês.'\n\nCOMUNICAÇÃO ESCRITA\n• Diariamente: Nota breve em chat de equipa (Slack ou WhatsApp)\n• Semanalmente: Email com dados de desempenho\n• Mensalmente: Feedback escrito anexado a notas de check-in\n• Urgente: Chamada direta ou conversa presencial\n\nQUANDO COMUNICAÇÃO SE QUEBRA\nSe alguém entender mal ou esquecer:\n1. Assuma boa intenção\n2. Esclareça gentilmente: 'Apenas para garantir que estamos na mesma página...'\n3. Escreva: 'Vou enviar por email para que seja claro'\n4. Acompanhe: 'Deixe-me verificar amanhã para garantir que funcionou'\n5. Documente: Mantenha registros de conversas importantes\n\nA REGRA DE OURO\n'A clareza de sua comunicação é diretamente proporcional ao sucesso de sua equipa.'",
          notes: isEN
            ? "Communication is the lifeblood of management."
            : "Comunicação é o lifeblood da gestão.",
        },
      ] as Slide[],
      quiz: {
        questions: [
          {
            id: "q1-manager-role",
            question: isEN
              ? "What is the PRIMARY responsibility of a Store Manager?"
              : "Qual é a RESPONSABILIDADE PRIMARY de um Gerente de Loja?",
            options: isEN
              ? [
                  "Process transactions",
                  "Monitor financial performance and lead the team",
                  "Stack shelves",
                  "Answer customer questions only",
                ]
              : [
                  "Processar transações",
                  "Monitorar desempenho financeiro e liderar a equipa",
                  "Empilhar prateleiras",
                  "Responder apenas perguntas de cliente",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Store managers are responsible for financial performance, team leadership, customer experience, operations, and strategic planning."
              : "Gerentes de loja são responsáveis por desempenho financeiro, liderança de equipa, experiência de cliente, operações, e planejamento estratégico.",
          },
          {
            id: "q2-commission",
            question: isEN
              ? "What is the monthly commission structure for Sales Specialists?"
              : "Qual é a estrutura de comissão mensal para Especialistas em Vendas?",
            options: isEN
              ? ["1-2% of personal sales", "3-5% of personal sales", "5-10% of store sales", "Flat bonus of €200"]
              : ["1-2% de vendas pessoais", "3-5% de vendas pessoais", "5-10% de vendas de loja", "Bônus fixo de €200"],
            correctAnswer: 1,
            explanation: isEN
              ? "Sales Specialists earn 3-5% commission on their personal sales, incentivizing quality service and higher transaction values."
              : "Especialistas em Vendas ganham 3-5% de comissão em suas vendas pessoais, incentivando serviço de qualidade e valores de transação mais altos.",
          },
          {
            id: "q3-daily-huddle",
            question: isEN
              ? "When should the daily huddle be conducted?"
              : "Quando deve a huddle diária ser conduzida?",
            options: isEN
              ? ["Before opening", "During opening", "At lunch", "Before closing"]
              : ["Antes de abrir", "Durante a abertura", "No almoço", "Antes de fechar"],
            correctAnswer: 0,
            explanation: isEN
              ? "The daily huddle should happen before opening (5-10 minutes) to align the team on goals and special activities for the day."
              : "A huddle diária deve acontecer antes de abrir (5-10 minutos) para alinhar a equipa em objetivos e atividades especiais do dia.",
          },
        ] as QuizQuestion[],
        passingScore: 66,
      },
    },
    {
      id: "phase-3-team-operations",
      title: isEN ? "Team Operations" : "Operações de Equipa",
      description: isEN
        ? "Scheduling, delegation, and performance tracking"
        : "Agendamento, delegação, e rastreamento de desempenho",
      slides: [
        {
          id: "slide-1-scheduling",
          title: isEN ? "Shift Scheduling" : "Agendamento de Turno",
          content: isEN
            ? "BUILDING AN EFFICIENT SCHEDULE\n\nBASIC STRUCTURE\n• Store hours: 10:00-17:30 (Monday-Saturday, closed Sunday)\n• Peak hours: 12:00-15:00 (lunch + tourist hour)\n• Staff required: Minimum 2 people during peak, 1 during off-peak\n• Ideal team: 1 manager + 3 Sales Specialists (can scale up/down)\n\nSCHEDULE TEMPLATE\nMONDAY-FRIDAY:\n  Morning shift: 10:00-14:00 (Sales Specialist A + Manager/B)\n  Afternoon shift: 14:00-17:30 (Sales Specialist B + Manager)\n  • Overlap lunch: 12:00-13:00 (peak coverage)\n  • Manager present for opening and closing\n\nSATURDAY (HIGH TRAFFIC):\n  10:00-12:00: Manager + 2 Specialists\n  12:00-15:00: Manager + 3 Specialists (peak)\n  15:00-17:30: Manager + 2 Specialists\n\nBEST PRACTICES\n• Post schedule 2 weeks in advance\n• Allow at least one day off per person per week\n• Balance peak hours (everyone does some)\n• Consider requests (vacation, personal needs)\n• Cross-train for flexibility (anyone can open/close)\n• Shift trades: Allow if both people agree and manager approves\n\nWHEN SOMEONE CALLS IN SICK\n1. Acknowledge their situation\n2. Find coverage immediately\n3. Adjust schedule if needed\n4. Note absence in system\n5. Follow up when they return\n\nOVERTIME MANAGEMENT\n• Minimize overtime (control costs)\n• If needed, first offer to existing team\n• Use extra hours for training or special projects\n• Never force overtime\n• Track hours carefully (labor law compliance)"
            : "CONSTRUINDO UM AGENDAMENTO EFICIENTE\n\nESTRUTURA BÁSICA\n• Horas de loja: 10:00-17:30 (Segunda-Sábado, fechado domingo)\n• Horas de pico: 12:00-15:00 (almoço + hora do turista)\n• Pessoal necessário: Mínimo 2 pessoas durante pico, 1 durante fora-pico\n• Equipa ideal: 1 gerente + 3 Especialistas em Vendas (pode dimensionar para cima/baixo)\n\nTEMPLATE DE AGENDAMENTO\nSEGUNDA-SEXTA:\n  Turno matinal: 10:00-14:00 (Especialista em Vendas A + Gerente/B)\n  Turno vespertino: 14:00-17:30 (Especialista em Vendas B + Gerente)\n  • Almoço de sobreposição: 12:00-13:00 (cobertura de pico)\n  • Gerente presente para abertura e encerramento\n\nSÁBADO (TRÁFEGO ALTO):\n  10:00-12:00: Gerente + 2 Especialistas\n  12:00-15:00: Gerente + 3 Especialistas (pico)\n  15:00-17:30: Gerente + 2 Especialistas\n\nMELHORES PRÁTICAS\n• Publique agendamento 2 semanas antecipadamente\n• Permita pelo menos um dia de folga por pessoa por semana\n• Equilibre horas de pico (todo mundo faz algumas)\n• Considere pedidos (férias, necessidades pessoais)\n• Treinamento cruzado para flexibilidade (qualquer um pode abrir/fechar)\n• Trocas de turno: Permita se ambas as pessoas concordarem e gerente aprovar\n\nQUANDO ALGUÉM LIGA FORA DOENTE\n1. Reconheça sua situação\n2. Encontre cobertura imediatamente\n3. Ajuste agendamento se necessário\n4. Anotar ausência no sistema\n5. Acompanhe quando voltarem\n\nGESTÃO DE HORAS EXTRAS\n• Minimize horas extras (controle custos)\n• Se necessário, primeiro ofereça a equipa existente\n• Use horas extras para treinamento ou projetos especiais\n• Nunca force horas extras\n• Rastreie horas com cuidado (conformidade com lei trabalhista)",
          notes: isEN
            ? "Good scheduling prevents burnout and maintains service quality."
            : "Bom agendamento previne burnout e mantém qualidade de serviço.",
        },
        {
          id: "slide-2-delegation",
          title: isEN ? "Task Delegation & Development" : "Delegação de Tarefas & Desenvolvimento",
          content: isEN
            ? "EMPOWERING YOUR TEAM THROUGH DELEGATION\n\nWHY DELEGATE?\n• Develops people: Delegation builds skills and confidence\n• Saves time: You can't do everything yourself\n• Creates ownership: People care more about tasks they own\n• Builds bench strength: Prepares people for promotion\n• Increases engagement: People feel trusted and valued\n\nWHAT TO DELEGATE\nGOOD FITS FOR DELEGATION:\n• Daily inventory checks\n• CRM data entry\n• Customer follow-ups (email)\n• Shelf organization and displays\n• Training new team members\n• Managing social media or events\n• Weekly inventory reconciliation\n• Zoho CRM maintenance\n\nNOT GOOD FOR DELEGATION:\n• Financial decisions (pricing, discounts beyond authority)\n• Performance management (hiring, firing decisions)\n• Sensitive customer complaints\n• Large cash handling (opening/closing)\n• Confidential information\n\nHOW TO DELEGATE EFFECTIVELY\n\nSTEP 1: CHOOSE THE RIGHT PERSON\n• Consider their current skills\n• Think about growth opportunity\n• Match to their interests if possible\n• Be fair with assignments (rotate 'boring' tasks)\n\nSTEP 2: BRIEF THEM CLEARLY\n'Sarah, I'd like you to take ownership of our daily inventory checks. Here's why: It builds your system knowledge, and it frees me to focus on customer strategy. Here's how: Use the checklist on the wall, take a photo of discrepancies, and report to me by 10am. You'll do this Monday through Thursday, and I'll handle Friday. Questions?'\n\nSTEP 3: SUPPORT THEIR SUCCESS\n• First time: Do it WITH them\n• Second time: Watch and comment\n• Third time: Let them lead, you observe\n• Then: Trust them, check in weekly\n\nSTEP 4: GIVE FEEDBACK\nPositive: 'Your inventory reports are clear and thorough. This helps me see patterns.'\nCorrective: 'I noticed the discrepancy list was incomplete Tuesday. Let's look at why that happened.'\n\nDEVELOPMENT PLANNING\nFor high performers (potential managers):\n• Assign special projects\n• Involve in decision-making\n• Provide leadership training\n• Create mentorship opportunities\n• Discuss growth path explicitly\n\nEXAMPLE 1-YEAR DEVELOPMENT PLAN\nFor Sales Specialist → Manager track:\n\nMONTHS 1-3: COMPETENCY BUILDING\n• Sales technique mastery (target ATV, tier mix)\n• Product knowledge (everything)\n• CRM expertise\n• Systems proficiency\n\nMONTHS 4-6: LEADERSHIP FOUNDATIONS\n• Lead daily huddles (manager observes)\n• Train new hires\n• Manage inventory ordering\n• Handle customer issues\n\nMONTHS 7-9: OPERATIONAL OWNERSHIP\n• Own specific KPIs (margin, Tier 2+%)\n• Lead weekly meetings\n• Performance coaching with team\n• Special projects (events, campaigns)\n\nMONTHS 10-12: READINESS ASSESSMENT\n• Manager 1-on-1 coaching\n• Decision-making authority increases\n• Ready for next promotion or expanded role"
            : "EMPOWERANDO SUA EQUIPA ATRAVÉS DE DELEGAÇÃO\n\nPOR QUE DELEGAR?\n• Desenvolve pessoas: Delegação constrói habilidades e confiança\n• Economiza tempo: Você não pode fazer tudo sozinho\n• Cria propriedade: Pessoas se importam mais com tarefas que possuem\n• Constrói força de banco: Prepara pessoas para promoção\n• Aumenta engajamento: Pessoas se sentem confiadas e valorizadas\n\nO QUE DELEGAR\nBOAS OPÇÕES PARA DELEGAÇÃO:\n• Verificações diárias de inventário\n• Entrada de dados de CRM\n• Acompanhamentos de cliente (email)\n• Organização de prateleira e exibições\n• Treinamento de novos membros de equipa\n• Gestão de redes sociais ou eventos\n• Reconciliação semanal de inventário\n• Manutenção de Zoho CRM\n\nNÃO BOM PARA DELEGAÇÃO:\n• Decisões financeiras (preço, descontos além de autoridade)\n• Gestão de desempenho (decisões de contratação, demissão)\n• Reclamações sensíveis de cliente\n• Grande gestão de dinheiro (abertura/encerramento)\n• Informação confidencial\n\nCOMO DELEGAR EFETIVAMENTE\n\nPASSO 1: ESCOLHA A PESSOA CERTA\n• Considere suas habilidades atuais\n• Pense em oportunidade de crescimento\n• Corresponda a seus interesses se possível\n• Seja justo com atribuições (gire tarefas 'chatas')\n\nPASSO 2: DÊ UM BRIEFING CLARO\n'Sara, gostaria que você assumisse a propriedade de nossas verificações de inventário diárias. Aqui está porquê: Constrói seu conhecimento de sistema, e me libera para focar em estratégia de cliente. Aqui está como: Use a lista de verificação na parede, tire foto de discrepâncias, e reporte a mim até 10am. Você fará isso segunda a quinta, e eu faço quinta. Dúvidas?'\n\nPASSO 3: SUPORTE SEU SUCESSO\n• Primeira vez: Faça COM eles\n• Segunda vez: Observe e comente\n• Terceira vez: Deixe-os liderar, você observa\n• Depois: Confie neles, verifique semanalmente\n\nPASSO 4: DÊ FEEDBACK\nPositivo: 'Seus relatórios de inventário são claros e completos. Isto me ajuda a ver padrões.'\nCorretivo: 'Notei que a lista de discrepâncias estava incompleta terça. Vamos olhar por que aconteceu.'\n\nPLANEJAMENTO DE DESENVOLVIMENTO\nPara alto desempenho (potencial de gerente):\n• Atribua projetos especiais\n• Envolva em tomada de decisão\n• Forneça treinamento de liderança\n• Crie oportunidades de mentoria\n• Discuta caminho de crescimento explicitamente\n\nPLANO DE DESENVOLVIMENTO DE 1 ANO\nPara Especialista em Vendas → Faixa de Gerente:\n\nMÊS 1-3: CONSTRUÇÃO DE COMPETÊNCIA\n• Domínio de técnica de vendas (alvo ATV, mix de tier)\n• Conhecimento de produto (tudo)\n• Expertise de CRM\n• Proficiência de sistemas\n\nMÊS 4-6: FUNDAÇÕES DE LIDERANÇA\n• Lidere huddles diárias (gerente observa)\n• Treine novas contratações\n• Gerencie ordenação de inventário\n• Trate com problemas de cliente\n\nMÊS 7-9: PROPRIEDADE OPERACIONAL\n• Possua KPIs específicos (margem, Tier 2+%)\n• Lidere reuniões semanais\n• Coaching de desempenho com equipa\n• Projetos especiais (eventos, campanhas)\n\nMÊS 10-12: AVALIAÇÃO DE READINESS\n• Coaching 1-a-1 do gerente\n• Autoridade de tomada de decisão aumenta\n• Pronto para próxima promoção ou papel expandido",
          notes: isEN
            ? "Delegation is how you multiply your impact."
            : "Delegação é como você multiplica seu impacto.",
        },
        {
          id: "slide-3-performance",
          title: isEN ? "Performance Tracking & Meetings" : "Rastreamento de Desempenho & Reuniões",
          content: isEN
            ? "MEASURING AND MANAGING PERFORMANCE\n\nINDIVIDUAL KPIs FOR SALES SPECIALISTS\n\n1. TRANSACTION METRICS\n   • # of transactions per shift (target: 2-3 per hour)\n   • Average transaction value (target: €65+)\n   • Personal revenue (tracked daily)\n   • Sales by tier (are they pushing higher tiers?)\n\n2. QUALITY METRICS\n   • Customer satisfaction (feedback, ratings, returns)\n   • Repeat customer recognition (using CRM)\n   • Add-on sales (personalization, packaging, services)\n   • CRM quality (are notes complete and useful?)\n\n3. BEHAVIORAL METRICS\n   • Punctuality (on time for shifts)\n   • Shift completion (staying through assigned time)\n   • Appearance (dress code compliance)\n   • Communication (active in team channels)\n   • Initiative (do they solve problems or escalate?)\n\nTRACKING DASHBOARD (Weekly)\nManager should monitor:\n• Each person's weekly revenue\n• Personal transaction count\n• Average transaction value\n• Tier mix (what % Tier 2+?)\n• Customer feedback (any mentions?)\n• Commission earned\n\nWEEKLY PERFORMANCE REVIEW (TEAM)\nWhen: Every Friday, 10 minutes\nFormat:\n'Great work this week, team. Let's look at numbers:'\n\nTRANSACTIONS:\n'We did 47 transactions, targeting 52. Let's aim for the extra 5 next week.'\n\nREVENUE:\n'We hit €3,055 on a €3,200 target. Close! The Saturday push helped.'\n\nMARGIN:\n'Margin was 58%, slightly below our 60% target. Why? Let me see... We had a high volume of Tier 1. Let's focus on Tier 2+ conversations next week.'\n\nCUSTOMER FEEDBACK:\n'Three specific mentions of excellent service—John, Sarah, and Michael, well done.'\n\nNEXT WEEK FOCUS:\n'Let's focus on: (1) Higher transaction count, (2) Tier 2+ mix, (3) Personalization upsells. Questions?'\n\nMONTHLY 1-ON-1 PERFORMANCE REVIEW\nStructure:\n\n1. OPENING (2 min)\n   'Thanks for meeting. How's it going? Any challenges?'\n\n2. NUMBERS REVIEW (8 min)\n   'Let's look at your month:'\n   • Total revenue: €X (vs. target €Y)\n   • Transaction count: Z (vs. average)\n   • Personal ATV: €X (trend up/down)\n   • Commission earned: €X\n   • Tier 2+ %: X% (vs. team average)\n   • Customer feedback: Highlights + concerns\n\n3. STRENGTHS (3 min)\n   'What you're doing really well:'\n   • Specific examples\n   • Customer feedback\n   • Team impact\n\n4. DEVELOPMENT AREA (3 min)\n   'One thing to focus on next month:'\n   • Be specific: 'Tier 2 positioning in your opens'\n   • Be supportive: 'I think you can crush this'\n   • Give tools: 'Here's how we can practice'\n\n5. GOALS FOR NEXT MONTH (2 min)\n   'Your targets next month:'\n   • Revenue: €X\n   • ATV: €X\n   • Tier 2+: %X\n   • Specific behavior: 'Three Tier 2+ closes per shift'\n\n6. CLOSING (1 min)\n   'Great conversation. I believe in you. Let's touch base in a week to see how it's going.'\n\nQUARTERLY PERFORMANCE ASSESSMENT\nEvery 3 months, deeper review:\n• Trend analysis (improving or declining?)\n• Promotion readiness (if applicable)\n• Compensation adjustments (bonus, raise)\n• Development plan for next quarter\n• Major wins and challenges\n\nCONCERNS ABOUT PERFORMANCE\nIf someone is underperforming:\n\nWEEK 1: COACHING CONVERSATION\n'I've noticed your ATV has dropped. What's going on? How can I help?'\n(Listen, problem-solve together)\n\nWEEK 2: CLEAR EXPECTATIONS\n'Here's what needs to improve: ATV back to €60 per transaction by end of month. Here's how we'll practice. Let's check in Friday.'\n(Document this conversation)\n\nWEEK 3: CHECK-IN\n'How's it going? Any progress? Do you need more support?'\n(Give specific feedback based on observation)\n\nWEEK 4: FINAL ASSESSMENT\nIf improved: 'Great progress! Keep this momentum.'\nIf not: Escalate to Area Manager for formal improvement plan\n\nREMEMBER:\nPerformance management is coaching, not punishment. The goal is helping people succeed."
            : "MEDINDO E GERENCIANDO DESEMPENHO\n\nKPIs INDIVIDUAIS PARA ESPECIALISTAS EM VENDAS\n\n1. MÉTRICAS DE TRANSAÇÃO\n   • # de transações por turno (alvo: 2-3 por hora)\n   • Valor médio de transação (alvo: €65+)\n   • Receita pessoal (rastreada diariamente)\n   • Vendas por tier (estão empurrando tiers mais altos?)\n\n2. MÉTRICAS DE QUALIDADE\n   • Satisfação de cliente (feedback, classificações, devoluções)\n   • Reconhecimento de cliente que volta (usando CRM)\n   • Vendas de add-on (personalização, embalagem, serviços)\n   • Qualidade de CRM (as notas estão completas e úteis?)\n\n3. MÉTRICAS COMPORTAMENTAIS\n   • Pontualidade (no tempo para turnos)\n   • Conclusão de turno (ficar durante tempo atribuído)\n   • Aparência (conformidade de código de vestuário)\n   • Comunicação (ativo em canais de equipa)\n   • Iniciativa (eles resolvem problemas ou escalambem?)\n\nDADOS RASTREADOS (Semanal)\nGerente deve monitorar:\n• Receita semanal de cada pessoa\n• Contagem de transação pessoal\n• Valor médio de transação\n• Mix de tier (que % Tier 2+?)\n• Feedback de cliente (alguma menção?)\n• Comissão ganha\n\nREVISÃO DE DESEMPENHO SEMANAL (EQUIPA)\nQuando: Toda sexta, 10 minutos\nFormato:\n'Ótimo trabalho esta semana, equipa. Vamos ver números:'\n\nTRANSAÇÕES:\n'Fizemos 47 transações, visando 52. Vamos visar os 5 extras próxima semana.'\n\nRECEITA:\n'Atingimos €3.055 com alvo de €3.200. Perto! O impulso de sábado ajudou.'\n\nMARGEM:\n'Margem foi 58%, ligeiramente abaixo de nosso alvo 60%. Por quê? Deixe-me ver... Tivemos volume alto de Tier 1. Vamos focar em conversas de Tier 2+ próxima semana.'\n\nFEEDBACK DE CLIENTE:\n'Três menções específicas de serviço excelente—João, Sara, e Miguel, muito bem.'\n\nFOCO PRÓXIMA SEMANA:\n'Vamos focar em: (1) Contagem de transação mais alta, (2) Mix de Tier 2+, (3) Upsells de personalização. Dúvidas?'\n\nREVISÃO DE DESEMPENHO 1-A-1 MENSAL\nEstrutura:\n\n1. ABERTURA (2 min)\n   'Obrigado por reunir. Como está indo? Quaisquer desafios?'\n\n2. REVISÃO DE NÚMEROS (8 min)\n   'Vamos ver seu mês:'\n   • Receita total: €X (vs. alvo €Y)\n   • Contagem de transação: Z (vs. média)\n   • ATV pessoal: €X (tendência cima/baixo)\n   • Comissão ganha: €X\n   • Tier 2+ %: X% (vs. média de equipa)\n   • Feedback de cliente: Destaques + preocupações\n\n3. FORÇAS (3 min)\n   'O que você está fazendo realmente bem:'\n   • Exemplos específicos\n   • Feedback de cliente\n   • Impacto de equipa\n\n4. ÁREA DE DESENVOLVIMENTO (3 min)\n   'Uma coisa para focar próximo mês:'\n   • Seja específico: 'Posicionamento de Tier 2 em suas aberturas'\n   • Seja solidário: 'Acho que você pode destruir isto'\n   • Dê ferramentas: 'Aqui está como podemos praticar'\n\n5. OBJETIVOS PARA PRÓXIMO MÊS (2 min)\n   'Seus alvos próximo mês:'\n   • Receita: €X\n   • ATV: €X\n   • Tier 2+: %X\n   • Comportamento específico: 'Três closes de Tier 2+ por turno'\n\n6. ENCERRAMENTO (1 min)\n   'Ótima conversa. Acredito em você. Vamos nos verificar em uma semana para ver como está indo.'\n\nAVALIAÇÃO DE DESEMPENHO TRIMESTRAL\nCada 3 meses, revisão mais profunda:\n• Análise de tendência (melhorando ou declinando?)\n• Readiness de promoção (se aplicável)\n• Ajustes de compensação (bônus, aumento)\n• Plano de desenvolvimento para próximo trimestre\n• Grandes vitórias e desafios\n\nPREOCUPAÇÕES SOBRE DESEMPENHO\nSe alguém está com desempenho inferior:\n\nSEMANA 1: CONVERSA DE COACHING\n'Notei que seu ATV caiu. O que está acontecendo? Como posso ajudar?'\n(Ouça, resolva problemas juntos)\n\nSEMANA 2: EXPECTATIVAS CLARAS\n'Aqui está o que precisa melhorar: ATV de volta a €60 por transação até fim de mês. Aqui está como vamos praticar. Deixe-me verificar sexta.'\n(Documente esta conversa)\n\nSEMANA 3: CHECK-IN\n'Como está indo? Algum progresso? Você precisa de mais suporte?'\n(Dê feedback específico baseado em observação)\n\nSEMANA 4: AVALIAÇÃO FINAL\nSe melhorou: 'Ótimo progresso! Mantenha este momentum.'\nSe não: Escale para Gerente de Área para plano de melhoria formal\n\nLEMBRE:\nGestão de desempenho é coaching, não punição. O objetivo é ajudar pessoas a ter sucesso.",
          notes: isEN
            ? "Regular feedback beats annual surprises."
            : "Feedback regular bate surpresas anuais.",
        },
      ] as Slide[],
      quiz: {
        questions: [
          {
            id: "q1-shift-coverage",
            question: isEN
              ? "What is the minimum recommended staffing during peak hours (12:00-15:00)?"
              : "Qual é a dotação mínima recomendada durante horas de pico (12:00-15:00)?",
            options: isEN
              ? ["1 person", "2 people", "3 people", "4 people"]
              : ["1 pessoa", "2 pessoas", "3 pessoas", "4 pessoas"],
            correctAnswer: 2,
            explanation: isEN
              ? "Peak hours require at least 3 people (e.g., manager + 2 Sales Specialists) to maintain service quality and meet customer needs."
              : "Horas de pico requerem pelo menos 3 pessoas (ex: gerente + 2 Especialistas em Vendas) para manter qualidade de serviço e atender necessidades de cliente.",
          },
          {
            id: "q2-delegation-task",
            question: isEN
              ? "Which of these tasks is BEST to delegate to a Sales Specialist?"
              : "Qual uma destas tarefas é MELHOR para delegar a um Especialista em Vendas?",
            options: isEN
              ? [
                  "Making discount decisions",
                  "Daily inventory checks",
                  "Hiring new employees",
                  "Performance evaluations",
                ]
              : [
                  "Tomar decisões de desconto",
                  "Verificações diárias de inventário",
                  "Contratação de novos funcionários",
                  "Avaliações de desempenho",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Daily inventory checks are ideal for delegation—they build systems knowledge and free the manager for strategic work."
              : "Verificações diárias de inventário são ideais para delegação—constroem conhecimento de sistemas e liberam o gerente para trabalho estratégico.",
          },
          {
            id: "q3-monthly-review",
            question: isEN
              ? "What should be the primary focus of a monthly 1-on-1 review?"
              : "Qual deve ser o foco primário de uma revisão 1-a-1 mensal?",
            options: isEN
              ? [
                  "Criticizing past mistakes",
                  "Numbers review + strengths + one development area",
                  "Discussing personal life",
                  "Threatening poor performers",
                ]
              : [
                  "Criticar erros passados",
                  "Revisão de números + forças + uma área de desenvolvimento",
                  "Discutir vida pessoal",
                  "Ameaçar performers fracos",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Monthly reviews should balance numbers (factual), strengths (motivating), and one development area (growth-focused). This approach builds confidence and improves performance."
              : "Revisões mensais devem equilibrar números (factual), forças (motivador), e uma área de desenvolvimento (crescimento-focado). Esta abordagem constrói confiança e melhora desempenho.",
          },
        ] as QuizQuestion[],
        passingScore: 66,
      },
    },
  ];

  return (
    <ModuleLayout
      moduleId="business-leadership"
      title={isEN ? "Business Leadership" : "Liderança de Negócio"}
      description={isEN
        ? "Master the business model, team leadership, and daily operations"
        : "Domine o modelo de negócio, liderança de equipa, e operações diárias"}
      heroImage="/src/assets/store-interior.jpg"
      area="4"
    >
      <PhaseSystem
        phases={phases}
        currentPhase={currentPhase}
        onPhaseChange={setCurrentPhase}
      />
    </ModuleLayout>
  );
}
