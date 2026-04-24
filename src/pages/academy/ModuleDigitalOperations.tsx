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

export default function ModuleDigitalOperations() {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases: Phase[] = [
    {
      id: "phase-1-digital-systems",
      title: isEN ? "Digital Systems" : "Sistemas Digitais",
      description: isEN
        ? "POS, CRM, and inventory management essentials"
        : "Essenciais de POS, CRM e gestão de inventário",
      slides: [
        {
          id: "slide-1-pos-system",
          title: isEN ? "POS System Overview" : "Visão Geral do Sistema POS",
          content: isEN
            ? "THE 100'S POINT OF SALE (POS) SYSTEM\n\nPURPOSE:\nThe POS system is your central hub for:\n• Processing transactions (cash, card, mobile)\n• Managing inventory in real-time\n• Recording customer data\n• Generating daily reports\n\nKEY FEATURES:\n• Split transactions (split payment between methods)\n• Receipt customization (includes tier info, transport tips)\n• Customer database integration\n• Sale tracking by product category\n\nDAILY WORKFLOW:\n1. System opens at 09:00 with day code\n2. Each transaction logged automatically\n3. Tender count reconciliation\n4. Evening close-out (17:30 standard)\n5. Daily report sent to HQ\n\nSECURITY:\n• Never share POS password\n• Log out after every shift\n• Report suspicious activity immediately\n• Card details never displayed (PCI compliant)"
            : "SISTEMA PONTO DE VENDA (POS) DA THE 100'S\n\nFINALIDADE:\nO sistema POS é seu hub central para:\n• Processar transações (dinheiro, cartão, móvel)\n• Gerir inventário em tempo real\n• Registar dados de cliente\n• Gerar relatórios diários\n\nCARACTERÍSTICAS-CHAVE:\n• Transações divididas (dividir pagamento entre métodos)\n• Personalização de recibos (inclui info de tier, dicas de transporte)\n• Integração de base de dados de clientes\n• Rastreamento de vendas por categoria de produto\n\nFLUXO DE TRABALHO DIÁRIO:\n1. Sistema abre às 09:00 com código de dia\n2. Cada transação registada automaticamente\n3. Reconciliação de contagem de tender\n4. Encerramento de noite (17:30 padrão)\n5. Relatório diário enviado para HQ\n\nSEGURANÇA:\n• Nunca compartilhe senha POS\n• Termine sessão após cada turno\n• Denuncie atividade suspeita imediatamente\n• Detalhes de cartão nunca exibidos (PCI compliant)",
          notes: isEN
            ? "The POS system is your single source of truth for sales and inventory."
            : "O sistema POS é sua única fonte de verdade para vendas e inventário.",
        },
        {
          id: "slide-2-zoho-crm",
          title: isEN ? "Zoho CRM Basics" : "Básicos de Zoho CRM",
          content: isEN
            ? "ZOHO CRM — CUSTOMER RELATIONSHIP MANAGEMENT\n\nWHY WE USE IT:\nZoho CRM tracks customer relationships, repeat purchases, and communication history. It's how we deliver personalized service at scale.\n\nYOUR ROLE AS STORE STAFF:\n• Input customer info: name, email, phone, purchase history\n• Note special requests: 'Prefers gift wrapping', 'Travels to Berlin quarterly'\n• Record spending tier: Tier 1, 2, 3, or 4\n• Flag VIP customers: High-value, frequent, or referral sources\n• Update follow-up needs: 'Email about new collection'\n\nHOW IT HELPS YOU:\n• When a customer returns, their history is visible\n• You can say: 'I remember you were interested in Scotch last month—we just got...'\n• Personalization = higher sales, higher satisfaction\n\nEXAMPLE WORKFLOW:\nCustomer: 'I'm back! Do you have anything new?'\nYour system check: [Opens Zoho] → 'Last purchase: 3 months ago, Tier 2, loves premium whiskey'\nYour response: 'Welcome back! Actually, we just got a limited single-malt that I think you'll love...'\n\nRESULT:\nCustomer feels recognized. Conversion increases. Loyalty builds."
            : "ZOHO CRM — GESTÃO DE RELACIONAMENTO COM CLIENTE\n\nPOR QUE USAMOS:\nZoho CRM rastreia relacionamentos com clientes, compras repetidas, e histórico de comunicação. É como fornecemos serviço personalizado em escala.\n\nSEU PAPEL COMO PESSOAL DE LOJA:\n• Introduzir informações de cliente: nome, email, telefone, histórico de compras\n• Anotar pedidos especiais: 'Prefere embrulho de presente', 'Viaja para Berlim trimestralmente'\n• Registar tier de gastos: Tier 1, 2, 3, ou 4\n• Sinalizar clientes VIP: Alto valor, frequentes, ou fontes de referência\n• Atualizar necessidades de acompanhamento: 'Email sobre nova coleção'\n\nCOMO LHE AJUDA:\n• Quando um cliente volta, seu histórico é visível\n• Pode dizer: 'Lembro-me que estava interessado em Scotch no mês passado—acabámos de receber...'\n• Personalização = vendas mais altas, satisfação mais alta\n\nEXEMPLO DE FLUXO DE TRABALHO:\nCliente: 'Estou de volta! Tem algo novo?'\nVerificação do seu sistema: [Abre Zoho] → 'Última compra: há 3 meses, Tier 2, ama whiskey premium'\nSua resposta: 'Bem-vindo de volta! Na verdade, acabámos de receber um single-malt limitado que acho que vai amar...'\n\nRESULTADO:\nCliente sente-se reconhecido. Conversão aumenta. Lealdade constrói.",
          notes: isEN
            ? "CRM data is your superpower. Use it to be better than your competitors."
            : "Dados de CRM são seu superpoder. Use-os para ser melhor que seus concorrentes.",
        },
        {
          id: "slide-3-inventory",
          title: isEN ? "Inventory Management" : "Gestão de Inventário",
          content: isEN
            ? "REAL-TIME INVENTORY MANAGEMENT\n\nHOW IT WORKS:\n• POS system automatically updates stock when you process a sale\n• Physical inventory syncs with system inventory daily\n• Low-stock alerts trigger at 3 units\n• Out-of-stock items marked immediately\n\nYOUR RESPONSIBILITIES:\n1. DAILY MORNING CHECK (09:30)\n   • Verify system inventory matches shelf\n   • Note damaged or missing items\n   • Report discrepancies to manager\n\n2. THROUGHOUT THE DAY\n   • Maintain shelf presentation (full shelves = more sales)\n   • Move older stock forward (FIFO: First In, First Out)\n   • Flag customers: 'This is our last bottle of that tier'\n\n3. STOCK UPDATES\n   • When items arrive, scan and log immediately\n   • Update location tags (Shelf A, Back Stock, Display)\n   • Check expiration dates (rare but critical)\n\n4. REPORTING\n   • Weekly stock report to manager\n   • Flag items trending toward out-of-stock\n   • Suggest reorders for seasonal items\n\nPRO TIP:\nOut-of-stock is a missed opportunity. Proactively suggest alternatives: 'That tier is selling beautifully—can I show you our comparable option that's in stock?'"
            : "GESTÃO DE INVENTÁRIO EM TEMPO REAL\n\nCOMO FUNCIONA:\n• Sistema POS atualiza automaticamente estoque quando processa uma venda\n• Inventário físico sincroniza com inventário de sistema diariamente\n• Alertas de estoque baixo disparam em 3 unidades\n• Itens fora de estoque marcados imediatamente\n\nSUAS RESPONSABILIDADES:\n1. VERIFICAÇÃO MATINAL DIÁRIA (09:30)\n   • Verificar inventário de sistema corresponde à prateleira\n   • Anotar itens danificados ou em falta\n   • Reportar discrepâncias ao gerente\n\n2. AO LONGO DO DIA\n   • Manter apresentação de prateleira (prateleiras completas = mais vendas)\n   • Mover estoque mais antigo para frente (FIFO: Primeiro a Entrar, Primeiro a Sair)\n   • Sinalizar clientes: 'Esta é nossa última garrafa desse tier'\n\n3. ATUALIZAÇÕES DE ESTOQUE\n   • Quando itens chegam, digitalize e registre imediatamente\n   • Atualize tags de localização (Prateleira A, Estoque de Trás, Visor)\n   • Verifique datas de validade (raro mas crítico)\n\n4. RELATÓRIOS\n   • Relatório de estoque semanal ao gerente\n   • Sinalizar itens tendendo para fora de estoque\n   • Sugerir reabastecimentos para itens sazonais\n\nDICA PROFISSIONAL:\nFora de estoque é uma oportunidade perdida. Sugira proativamente alternativas: 'Esse tier está vendendo lindamente—posso mostrar-lhe nossa opção comparável que está em estoque?'",
          notes: isEN
            ? "Inventory is not just tracking—it's a sales tool."
            : "Inventário não é apenas rastreamento—é uma ferramenta de vendas.",
        },
      ] as Slide[],
      quiz: {
        questions: [
          {
            id: "q1-pos-close",
            question: isEN
              ? "What is the standard evening close-out time for the POS system?"
              : "Qual é a hora padrão de encerramento de noite do sistema POS?",
            options: isEN
              ? ["16:00", "17:30", "18:00", "19:00"]
              : ["16:00", "17:30", "18:00", "19:00"],
            correctAnswer: 1,
            explanation: isEN
              ? "The standard close-out time is 17:30. Always log this immediately to ensure daily reports are accurate."
              : "A hora de encerramento padrão é 17:30. Sempre faça isto imediatamente para garantir que relatórios diários são precisos.",
          },
          {
            id: "q2-zoho-use",
            question: isEN
              ? "What is the PRIMARY benefit of Zoho CRM for store staff?"
              : "Qual é o BENEFÍCIO PRIMARY de Zoho CRM para pessoal de loja?",
            options: isEN
              ? [
                  "Track employee performance",
                  "Personalize service and increase repeat business",
                  "Manage supplier orders",
                  "Generate accounting reports",
                ]
              : [
                  "Rastrear desempenho de funcionários",
                  "Personalizar serviço e aumentar negócio repetido",
                  "Gerir pedidos de fornecedor",
                  "Gerar relatórios contáveis",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "Zoho CRM's primary value is enabling you to deliver personalized service at scale—knowing customer preferences, purchase history, and special requests."
              : "O valor primário de Zoho CRM é permitir-lhe entregar serviço personalizado em escala—conhecendo preferências de cliente, histórico de compras, e pedidos especiais.",
          },
          {
            id: "q3-inventory-check",
            question: isEN
              ? "When should you perform your daily morning inventory check?"
              : "Quando deve fazer sua verificação de inventário matinal diária?",
            options: isEN
              ? ["08:00 before opening", "09:30 after opening", "12:00 at lunch", "16:00 before closing"]
              : ["08:00 antes de abrir", "09:30 depois de abrir", "12:00 no almoço", "16:00 antes de fechar"],
            correctAnswer: 1,
            explanation: isEN
              ? "Morning check at 09:30 ensures system inventory matches physical stock and you can flag any discrepancies early in the day."
              : "Verificação matinal às 09:30 garante que inventário de sistema corresponde a estoque físico e você pode sinalizar quaisquer discrepâncias cedo no dia.",
          },
        ] as QuizQuestion[],
        passingScore: 66,
      },
    },
    {
      id: "phase-2-uv-printer",
      title: isEN ? "UV Printer Operations" : "Operações de Impressora UV",
      description: isEN
        ? "Personalization technology for premium customization"
        : "Tecnologia de personalização para customização premium",
      slides: [
        {
          id: "slide-1-uv-intro",
          title: isEN ? "What is UV Printing?" : "O Que é Impressão UV?",
          content: isEN
            ? "UV PRINTING — PERSONALIZATION AT PREMIUM LEVEL\n\nWHAT IS IT?\nUV (Ultra-Violet) printing uses high-intensity UV light to instantly cure (dry and harden) ink on various materials. The result: stunning, permanent personalization on bottles, labels, boxes, and gifts.\n\nWHY WE USE IT AT THE 100'S:\n• Corporate gifts: Company logo on custom boxes\n• Personal gifts: Names, dates, special messages on bottles\n• Limited editions: Numbered bottles, special collection branding\n• Upsell opportunity: 'Can I personalize this bottle for you?'\n\nMATERIALS WE PRINT ON:\n• Glass (bottles, glasses) — most common\n• Ceramic and porcelain\n• Metal foils and labels\n• Cardboard and specialty boxes\n• Wood (premium, special requests)\n\nKEY ADVANTAGE:\nPersonalized gifts = higher perceived value = higher price point = higher margins\nExample: Standard bottle €85 → Personalized bottle €120 (+40% margin)"
            : "IMPRESSÃO UV — PERSONALIZAÇÃO A NÍVEL PREMIUM\n\nO QUE É?\nImpressão UV (Ultra-Violeta) usa luz UV de alta intensidade para curar instantaneamente (secar e endurecer) tinta em vários materiais. O resultado: personalização deslumbrante e permanente em garrafas, rótulos, caixas, e presentes.\n\nPOR QUE USAMOS NA THE 100'S:\n• Presentes corporativos: Logo da empresa em caixas customizadas\n• Presentes pessoais: Nomes, datas, mensagens especiais em garrafas\n• Edições limitadas: Garrafas numeradas, branding de coleção especial\n• Oportunidade de venda adicional: 'Posso personalizar esta garrafa para si?'\n\nMATERIAIS EM QUE IMPRIMIMOS:\n• Vidro (garrafas, copos) — mais comum\n• Cerâmica e porcelana\n• Metais foils e rótulos\n• Cartão e caixas especiais\n• Madeira (premium, pedidos especiais)\n\nVANTAGEM-CHAVE:\nPresentes personalizados = valor percebido mais alto = ponto de preço mais alto = margens mais altas\nExemplo: Garrafa padrão €85 → Garrafa personalizada €120 (+40% margem)",
          notes: isEN
            ? "UV personalization is your secret weapon for premium gifting."
            : "Personalização UV é sua arma secreta para presentes premium.",
        },
        {
          id: "slide-2-operation",
          title: isEN ? "How to Operate the UV Printer" : "Como Operar a Impressora UV",
          content: isEN
            ? "OPERATIONAL STEPS\n\n1. DESIGN PREPARATION\n   • Customer provides design or you assist\n   • Design software: Adobe Illustrator or CorelDRAW\n   • File format: PDF or EPS (vector format preferred)\n   • Resolution: Minimum 300 DPI for crisp output\n   • Color space: RGB or CMYK (ask manager if unsure)\n\n2. MATERIAL SETUP\n   • Place material on printing bed\n   • Secure with alignment guides (don't damage material)\n   • Close top cover\n   • Set material thickness in system (critical for focus)\n\n3. CALIBRATION\n   • Run alignment test before first print\n   • Adjust if color is off-center\n   • Check ink levels (ink cartridges are expensive)\n\n4. PRINTING\n   • Load design file into printer software\n   • Preview placement on screen\n   • Set print quality: Draft, Standard, or Premium\n   • Start print\n   • UV light will cure ink immediately\n\n5. POST-PRINT\n   • Allow slight cooling time (30 seconds)\n   • Check quality before removing from bed\n   • Package according to customer request\n\nSAFETY REMINDERS:\n• Never look directly at UV light (wear sunglasses)\n• Keep hands away from active UV area\n• Report malfunctions immediately"
            : "PASSOS OPERACIONAIS\n\n1. PREPARAÇÃO DE DESIGN\n   • Cliente fornece design ou você assiste\n   • Software de design: Adobe Illustrator ou CorelDRAW\n   • Formato de arquivo: PDF ou EPS (formato vetorial preferido)\n   • Resolução: Mínimo 300 DPI para saída nítida\n   • Espaço de cor: RGB ou CMYK (pergunte ao gerente se tiver dúvida)\n\n2. CONFIGURAÇÃO DE MATERIAL\n   • Coloque material na cama de impressão\n   • Segure com guias de alinhamento (não danifique material)\n   • Feche tampa superior\n   • Defina espessura do material no sistema (crítico para foco)\n\n3. CALIBRAÇÃO\n   • Execute teste de alinhamento antes da primeira impressão\n   • Ajuste se a cor está descentrada\n   • Verifique níveis de tinta (cartuchos de tinta são caros)\n\n4. IMPRESSÃO\n   • Carregue arquivo de design no software de impressora\n   • Pré-visualize colocação na tela\n   • Defina qualidade de impressão: Draft, Standard, ou Premium\n   • Inicie impressão\n   • Luz UV curará tinta imediatamente\n\n5. PÓS-IMPRESSÃO\n   • Permita tempo de resfriamento leve (30 segundos)\n   • Verifique qualidade antes de remover da cama\n   • Empacote de acordo com solicitação do cliente\n\nLEMBRETES DE SEGURANÇA:\n• Nunca olhe diretamente para luz UV (use óculos de sol)\n• Mantenha mãos longe da área UV ativa\n• Denuncie problemas imediatamente",
          notes: isEN
            ? "The UV printer is precise equipment. Treat it with care and attention."
            : "A impressora UV é equipamento preciso. Trate com cuidado e atenção.",
        },
        {
          id: "slide-3-personalization-sales",
          title: isEN
            ? "Selling Personalization Services"
            : "Vender Serviços de Personalização",
          content: isEN
            ? "HOW TO UPSELL PERSONALIZATION\n\nWHEN TO OFFER:\n• Corporate/bulk orders: Always mention personalization\n• Gift purchases: 'This would look even more special with their name...'\n• High-value bottles: €100+ automatically deserves personalization discussion\n• Return customers: 'Remember when we personalized your last gift?'\n\nSAMPLE PITCH:\nCustomer: 'I need a gift for my colleague's retirement.'\nYour response: 'Perfect. This premium bottle is beautiful on its own, but imagine it with their name and retirement date engraved. We can do that on the bottle itself or on a custom box. That's something they'll treasure forever. Would you like me to show you options?'\n\nPRICING EXAMPLES:\n• Simple name engraving: +€15\n• Company logo + name: +€30\n• Custom design on bottle: +€50\n• Premium custom box: +€25\n• Full personalization package: +€80-120\n\nSELLING ANGLES:\n'This isn't just a gift—it's a memory.'\n'Personalization adds meaning that off-the-shelf can't match.'\n'Corporate clients expect this level of detail.'\n'It's the difference between a nice gift and an unforgettable one.'\n\nTURNAROUND TIME:\n• Simple: Same day (1-2 hours)\n• Complex: 2-3 business days\n• Rush: Possible with manager approval (add €20 fee)"
            : "COMO VENDER SERVIÇOS DE PERSONALIZAÇÃO\n\nQUANDO OFERECER:\n• Pedidos corporativos/em lote: Sempre mencione personalização\n• Compras de presente: 'Isto ficaria ainda mais especial com seu nome...'\n• Garrafas de alto valor: €100+ automaticamente merece discussão de personalização\n• Clientes que voltam: 'Lembra-se quando personalizámos seu último presente?'\n\nPITCH DE AMOSTRA:\nCliente: 'Preciso de um presente para a aposentadoria de meu colega.'\nSua resposta: 'Perfeito. Esta garrafa premium é bonita por si só, mas imagine com seu nome e data de aposentadoria gravados. Podemos fazer isso na própria garrafa ou em uma caixa customizada. Isso é algo que eles vão valorizar para sempre. Quer que lhe mostre opções?'\n\nEXEMPLOS DE PREÇO:\n• Gravação simples de nome: +€15\n• Logo da empresa + nome: +€30\n• Design customizado na garrafa: +€50\n• Caixa customizada premium: +€25\n• Pacote de personalização completo: +€80-120\n\nÂNGULOS DE VENDA:\n'Isto não é apenas um presente—é uma memória.'\n'Personalização acrescenta significado que off-the-shelf não consegue.'\n'Clientes corporativos esperam este nível de detalhe.'\n'É a diferença entre um presente agradável e um inesquecível.'\n\nTEMPO DE RETORNO:\n• Simples: Mesmo dia (1-2 horas)\n• Complexo: 2-3 dias úteis\n• Pressa: Possível com aprovação do gerente (adicione taxa de €20)",
          notes: isEN
            ? "Personalization isn't a feature—it's a premium service that commands premium pricing."
            : "Personalização não é um recurso—é um serviço premium que ordena preço premium.",
        },
      ] as Slide[],
      quiz: {
        questions: [
          {
            id: "q1-uv-material",
            question: isEN
              ? "What is the most common material printed on with the UV printer?"
              : "Qual é o material mais comum impresso com a impressora UV?",
            options: isEN
              ? ["Ceramic", "Glass", "Plastic", "Wood"]
              : ["Cerâmica", "Vidro", "Plástico", "Madeira"],
            correctAnswer: 1,
            explanation: isEN
              ? "Glass (bottles and glasses) is the most common material for UV printing at The 100's."
              : "Vidro (garrafas e copos) é o material mais comum para impressão UV na The 100's.",
          },
          {
            id: "q2-personalization-price",
            question: isEN
              ? "What is a realistic upsell value for simple name personalization?"
              : "Qual é um valor de venda adicional realista para personalização de nome simples?",
            options: isEN
              ? ["€5", "€15", "€50", "€100"]
              : ["€5", "€15", "€50", "€100"],
            correctAnswer: 1,
            explanation: isEN
              ? "Simple name engraving typically adds €15 in perceived value and margin."
              : "Gravação simples de nome típicamente adiciona €15 em valor percebido e margem.",
          },
          {
            id: "q3-uv-safety",
            question: isEN
              ? "What safety precaution is most important when operating the UV printer?"
              : "Que precaução de segurança é mais importante ao operar a impressora UV?",
            options: isEN
              ? [
                  "Wear gloves always",
                  "Never look directly at UV light",
                  "Keep the room dark",
                  "Limit prints per day",
                ]
              : [
                  "Use sempre luvas",
                  "Nunca olhe diretamente para luz UV",
                  "Mantenha a sala escura",
                  "Limite impressões por dia",
                ],
            correctAnswer: 1,
            explanation: isEN
              ? "UV light can damage eyes. Wear sunglasses and never look directly at the active printing area."
              : "Luz UV pode danificar olhos. Use óculos de sol e nunca olhe diretamente para a área de impressão ativa.",
          },
        ] as QuizQuestion[],
        passingScore: 66,
      },
    },
    {
      id: "phase-3-daily-procedures",
      title: isEN ? "Daily Procedures" : "Processos Diários",
      description: isEN
        ? "Opening, closing, and shift management"
        : "Abertura, encerramento, e gestão de turno",
      slides: [
        {
          id: "slide-1-opening",
          title: isEN ? "Opening Procedures" : "Processos de Abertura",
          content: isEN
            ? "OPENING CHECKLIST — 08:45 ARRIVAL\n\n08:45 — SECURITY & SETUP\n□ Disarm alarm system (code in manager binder)\n□ Unlock front door\n□ Check for signs of break-in or damage\n□ Turn on all lights\n□ Unlock cash register\n□ Review overnight notes from closing staff\n\n08:55 — POS SYSTEM STARTUP\n□ Boot POS terminal\n□ Log in with your credentials\n□ Verify opening cash float (usually €200)\n□ Confirm system is ready (no error messages)\n\n09:00 — STORE PREPARATION\n□ Tidy shelves (from previous day)\n□ Straighten bottle displays\n□ Check for overnight damage or spills\n□ Ensure lighting is optimal\n□ Set temperature to 18-22°C\n\n09:15 — SECURITY LOCK VERIFICATION\n□ Confirm front door lock is functioning\n□ Set alarm to day mode (if applicable)\n□ Test panic button (silent alarm)\n\n09:30 — INVENTORY CHECK (as covered in Phase 1)\n□ Verify system inventory matches physical stock\n□ Flag any discrepancies\n□ Note low-stock items\n\n09:45 — FINAL CHECK\n□ Confirm POS register shows €200 float\n□ Test card reader\n□ Verify receipt printer is stocked\n□ Check that Zoho CRM is accessible\n□ Ensure UV printer is powered (if managing)\n\n10:00 — READY FOR BUSINESS\n✓ All systems operational\n✓ Store presentation perfect\n✓ Cash handling ready\n✓ Customer service mindset activated"
            : "CHECKLIST DE ABERTURA — CHEGADA ÀS 08:45\n\n08:45 — SEGURANÇA & CONFIGURAÇÃO\n□ Desarme sistema de alarme (código na pasta do gerente)\n□ Destrabe porta frontal\n□ Verifique sinais de invasão ou dano\n□ Ligue todas as luzes\n□ Destrabe caixa registadora\n□ Revise notas noturnas do pessoal de encerramento\n\n08:55 — INICIALIZAÇÃO DO SISTEMA POS\n□ Inicialize terminal POS\n□ Faça login com suas credenciais\n□ Verifique float de caixa de abertura (geralmente €200)\n□ Confirme que o sistema está pronto (sem mensagens de erro)\n\n09:00 — PREPARAÇÃO DE LOJA\n□ Arrume prateleiras (do dia anterior)\n□ Endireite exibições de garrafa\n□ Verifique dano noturno ou derramamento\n□ Garanta que iluminação é ideal\n□ Defina temperatura para 18-22°C\n\n09:15 — VERIFICAÇÃO DE BLOQUEIO DE SEGURANÇA\n□ Confirme que bloqueio de porta frontal está funcionando\n□ Defina alarme para modo de dia (se aplicável)\n□ Teste botão de pânico (alarme silencioso)\n\n09:30 — VERIFICAÇÃO DE INVENTÁRIO (como coberto na Fase 1)\n□ Verifique inventário de sistema corresponde a estoque físico\n□ Sinalizar quaisquer discrepâncias\n□ Anotar itens de estoque baixo\n\n09:45 — VERIFICAÇÃO FINAL\n□ Confirme que caixa POS mostra float de €200\n□ Teste leitor de cartão\n□ Verifique que impressora de recibos está abastecida\n□ Garanta que Zoho CRM está acessível\n□ Garantir que impressora UV está alimentada (se gerenciando)\n\n10:00 — PRONTO PARA NEGÓCIOS\n✓ Todos os sistemas operacionais\n✓ Apresentação de loja perfeita\n✓ Gestão de dinheiro pronta\n✓ Mentalidade de serviço ao cliente ativada",
          notes: isEN
            ? "A proper opening sets the tone for the entire day. Don't rush it."
            : "Uma abertura adequada define o tom para o dia inteiro. Não se apresse.",
        },
        {
          id: "slide-2-throughout-day",
          title: isEN ? "Throughout the Day" : "Ao Longo do Dia",
          content: isEN
            ? "SHIFT MANAGEMENT — ONGOING TASKS\n\nEVERY HOUR\n• Visual shelf check: Are items well-stocked and presented?\n• POS check: No errors or warnings in system\n• Temperature: Is store at comfortable level (18-22°C)?\n• Cleanliness: Any spills or dust? Wipe immediately.\n\nMID-SHIFT (13:00)\n• Count till: Verify cash total (should match POS)\n• Float reconciliation: Is €200 still intact?\n• Note: Any unusual transactions or issues\n• Zoho update: Did any customers need CRM notes added?\n\nAFTERNOON TASKS (15:00-16:00)\n• Restock depleted items (especially high-sellers)\n• Check shelf labels for accuracy\n• Verify all price tags match POS system\n• Clean display areas thoroughly\n• Review tomorrow's schedule/special events\n\nCRITICAL INCIDENT REPORTING:\nIf any of the following occur, notify manager IMMEDIATELY:\n• Suspected theft or security breach\n• Equipment malfunction (POS, card reader, etc.)\n• Customer incident or complaint\n• System error or data anomaly\n• Inventory discrepancy >5 units\n• Safety hazard (broken glass, wet floor, etc.)\n\nPROACTIVE SELLING (ALL DAY)\n• Ask about travel: Opens door to transport discussion\n• Suggest personalization: UV printer upsell\n• Recommend tier upgrade: 'Have you tried our Tier 3?'\n• Offer gift wrapping: Simple +€5 add-on\n• Record in CRM: Build customer profile"
            : "GESTÃO DE TURNO — TAREFAS CONTÍNUAS\n\nCASA HORA\n• Verificação visual de prateleira: Os itens estão bem abastecidos e apresentados?\n• Verificação de POS: Nenhum erro ou aviso no sistema\n• Temperatura: A loja está em nível confortável (18-22°C)?\n• Limpeza: Algum derramamento ou poeira? Limpe imediatamente.\n\nMEIO DE TURNO (13:00)\n• Contagem de caixa: Verifique total de dinheiro (deve corresponder a POS)\n• Reconciliação de float: €200 ainda está intacto?\n• Anotar: Quaisquer transações ou problemas incomuns\n• Atualização de Zoho: Algum cliente precisava que notas de CRM fossem adicionadas?\n\nTARE ALVO DE TARDE (15:00-16:00)\n• Reabasteça itens esgotados (especialmente best-sellers)\n• Verifique rótulos de prateleira para precisão\n• Verifique que todas as tags de preço correspondem ao sistema POS\n• Limpe áreas de exibição completamente\n• Revise agenda de amanhã/eventos especiais\n\nRELATÓRIO DE INCIDENTE CRÍTICO:\nSe qualquer um dos seguintes ocorrer, notifique o gerente IMEDIATAMENTE:\n• Roubo suspeito ou violação de segurança\n• Falha de equipamento (POS, leitor de cartão, etc.)\n• Incidente de cliente ou reclamação\n• Erro de sistema ou anomalia de dados\n• Discrepância de inventário >5 unidades\n• Perigo de segurança (vidro quebrado, piso molhado, etc.)\n\nVENDA PROATIVA (TODO DIA)\n• Pergunte sobre viagem: Abre porta para discussão de transporte\n• Sugira personalização: Venda adicional de impressora UV\n• Recomende atualização de tier: 'Já provou nosso Tier 3?'\n• Ofereça embrulho de presente: Simples adição de +€5\n• Registre em CRM: Construa perfil de cliente",
          notes: isEN
            ? "A day that looks chaotic is often just lots of good sales happening. Stay organized."
            : "Um dia que parece caótico é muitas vezes apenas muitas vendas boas acontecendo. Mantenha-se organizado.",
        },
        {
          id: "slide-3-closing",
          title: isEN ? "Closing Procedures" : "Processos de Encerramento",
          content: isEN
            ? "CLOSING CHECKLIST — 17:15 START\n\n17:15 — PREPARE FOR CLOSE\n□ Stop admitting new customers (if approaching closing)\n□ Inform any remaining customers: 'We close at 17:30'\n□ Begin final tidying\n□ Pause UV printer work (if any)\n□ Ensure all transactions are processed\n\n17:25 — FINAL SALES\n□ Complete final transactions\n□ Ensure all receipts printed and given to customers\n□ No transactions accepted after 17:30\n\n17:30 — POS CLOSE-OUT\n□ Log into POS final close menu\n□ Run end-of-day report\n□ Verify all transactions recorded\n□ Note any voids or returns\n\n17:35 — CASH RECONCILIATION\n□ Count all cash in register\n□ Compare to POS total\n□ Reconcile difference (should be €0, or note variance)\n□ Place cash in secure bag for deposit\n□ Initial and date cash count log\n\n17:40 — CREDIT CARD/MOBILE RECONCILIATION\n□ Verify card transactions match POS\n□ Confirm mobile payments (Apple Pay, Google Pay) recorded\n□ Note any failed transactions\n\n17:45 — STORE CLOSING\n□ Turn off UV printer\n□ Turn off POS system (graceful shutdown)\n□ Power down all displays\n□ Turn off back-office lights\n□ Lock all storage areas\n\n17:50 — FINAL WALK-THROUGH\n□ Check all shelves organized\n□ Ensure no items left on counter\n□ Check bathrooms (if applicable)\n□ Verify no equipment left on\n□ Adjust temperature for overnight (16°C)\n□ Set alarm to night mode\n□ Ensure panic button is armed\n\n17:55 — DOCUMENTATION\n□ Complete closing form:\n   - Time closed\n   - Any incidents or notes\n   - Inventory issues\n   - Tomorrow's forecast\n□ Email report to manager\n□ Store closing form in manager binder\n\n18:00 — EXIT\n□ Lock front door\n□ Verify door is secure\n□ Test panic button once outside\n□ Leave site\n\nEND-OF-DAY REPORT SHOULD INCLUDE:\n• Opening float: €200\n• Total cash sales: €XXX\n• Total card sales: €XXX\n• Total mobile payments: €XXX\n• Cash count variance: €XX or €0\n• UV printer usage hours\n• CRM updates added\n• Any special notes for manager"
            : "CHECKLIST DE ENCERRAMENTO — INÍCIO ÀS 17:15\n\n17:15 — PREPARE PARA ENCERRAR\n□ Pare de admitir novos clientes (se aproximando do fechamento)\n□ Informe qualquer cliente restante: 'Fechamos às 17:30'\n□ Comece limpeza final\n□ Pause trabalho de impressora UV (se algum)\n□ Garanta que todas as transações são processadas\n\n17:25 — VENDAS FINAIS\n□ Complete transações finais\n□ Garanta que todos os recibos estão impressos e dados a clientes\n□ Sem transações aceitas após 17:30\n\n17:30 — ENCERRAMENTO POS\n□ Faça login no menu de encerramento final de POS\n□ Execute relatório de fim de dia\n□ Verifique todas as transações registadas\n□ Anotar quaisquer void ou devoluções\n\n17:35 — RECONCILIAÇÃO DE DINHEIRO\n□ Conte todo o dinheiro no registro\n□ Compare com total de POS\n□ Reconcilie diferença (deve ser €0, ou anotar variação)\n□ Coloque dinheiro em saco seguro para depósito\n□ Inicial e data do log de contagem de dinheiro\n\n17:40 — RECONCILIAÇÃO DE CARTÃO DE CRÉDITO/MÓVEL\n□ Verifique transações de cartão correspondem a POS\n□ Confirme pagamentos móveis (Apple Pay, Google Pay) registados\n□ Anotar quaisquer transações falhadas\n\n17:45 — ENCERRAMENTO DE LOJA\n□ Desligue impressora UV\n□ Desligue sistema POS (encerramento gracioso)\n□ Desligue todos os displays\n□ Desligue luzes de back-office\n□ Tranque todas as áreas de armazenamento\n\n17:50 — CAMINHADA FINAL\n□ Verifique todas as prateleiras organizadas\n□ Garanta que nenhum item deixado no balcão\n□ Verifique banheiros (se aplicável)\n□ Verifique nenhum equipamento deixado ligado\n□ Ajuste temperatura para noite (16°C)\n□ Defina alarme para modo noturno\n□ Garanta que botão de pânico está armado\n\n17:55 — DOCUMENTAÇÃO\n□ Complete formulário de encerramento:\n   - Hora de encerramento\n   - Quaisquer incidentes ou notas\n   - Problemas de inventário\n   - Previsão de amanhã\n□ Email relatório ao gerente\n□ Armazene formulário de encerramento na pasta do gerente\n\n18:00 — SAÍDA\n□ Tranque porta frontal\n□ Verifique que porta está segura\n□ Teste botão de pânico uma vez fora\n□ Saia do local\n\nRELATÓRIO DE FIM DE DIA DEVE INCLUIR:\n• Float de abertura: €200\n• Total de vendas em dinheiro: €XXX\n• Total de vendas em cartão: €XXX\n• Total de pagamentos móveis: €XXX\n• Variação de contagem de dinheiro: €XX ou €0\n• Horas de uso da impressora UV\n• Atualizações de CRM adicionadas\n• Quaisquer notas especiais para o gerente",
          notes: isEN
            ? "A proper closing ensures tomorrow's opening goes smoothly. Don't cut corners."
            : "Um encerramento adequado garante que a abertura de amanhã corre suavemente. Não corte cantos.",
        },
      ] as Slide[],
      quiz: {
        questions: [
          {
            id: "q1-opening-time",
            question: isEN
              ? "What is the target opening time to admit customers?"
              : "Qual é a hora de abertura alvo para admitir clientes?",
            options: isEN
              ? ["08:45", "09:00", "10:00", "09:30"]
              : ["08:45", "09:00", "10:00", "09:30"],
            correctAnswer: 2,
            explanation: isEN
              ? "After all opening procedures, you should be ready for business at 10:00. Arriving at 08:45 gives you 1 hour 15 minutes for setup."
              : "Depois de todos os processos de abertura, deve estar pronto para negócios às 10:00. Chegar às 08:45 lhe dá 1 hora 15 minutos para configuração.",
          },
          {
            id: "q2-cash-float",
            question: isEN
              ? "What is the standard opening cash float amount?"
              : "Qual é o valor de float de caixa de abertura padrão?",
            options: isEN
              ? ["€50", "€100", "€200", "€300"]
              : ["€50", "€100", "€200", "€300"],
            correctAnswer: 2,
            explanation: isEN
              ? "The standard opening float is €200 to make change for customers throughout the day."
              : "O float de abertura padrão é €200 para dar troco aos clientes ao longo do dia.",
          },
          {
            id: "q3-critical-incident",
            question: isEN
              ? "What is NOT a critical incident requiring immediate manager notification?"
              : "O que NÃO é um incidente crítico que requer notificação imediata do gerente?",
            options: isEN
              ? [
                  "Security breach",
                  "Equipment malfunction",
                  "Customer complaint",
                  "Natural shelf dust",
                ]
              : [
                  "Violação de segurança",
                  "Falha de equipamento",
                  "Reclamação de cliente",
                  "Poeira natural de prateleira",
                ],
            correctAnswer: 3,
            explanation: isEN
              ? "Natural dust is managed during normal cleaning. Security breaches, equipment failures, and complaints are all critical and need immediate reporting."
              : "Poeira natural é gerenciada durante limpeza normal. Violações de segurança, falhas de equipamento, e reclamações são todas críticas e precisam de relatório imediato.",
          },
        ] as QuizQuestion[],
        passingScore: 66,
      },
    },
  ];

  return (
    <ModuleLayout
      moduleId="digital-operations"
      title={isEN ? "Digital Operations" : "Operações Digitais"}
      description={isEN
        ? "Master POS, CRM, UV printing, and daily procedures"
        : "Domine POS, CRM, impressão UV, e procedimentos diários"}
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
