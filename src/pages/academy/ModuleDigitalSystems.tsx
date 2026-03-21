import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, QuizBlock, ReflectionBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Monitor, Smartphone, MessageSquare, Database, ShoppingCart } from "lucide-react";
import digitalSystemsImg from "@/assets/academy/digital-systems.svg";

const ModuleDigitalSystems = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const systems = isEN ? [
    {
      icon: Monitor,
      title: "POS WinMax4",
      desc: "Point of Sale system",
      details: "3 fixed terminals + 4 floor tablets (V3 Mix). Handles all payments, inventory, and transactions.",
    },
    {
      icon: Smartphone,
      title: "Floor Tablets",
      desc: "Mobile support & sales",
      details: "Real-time stock check, payment processing, tasting notes, customer guidance. Use to bring WiFi-enabled sales anywhere in store.",
    },
    {
      icon: MessageSquare,
      title: "AI Concierge",
      desc: "WhatsApp + GPT integration",
      details: "WhatsApp bot, 3 specialized GPTs (Educational, Commercial, Operational). Know when to redirect customer to human.",
    },
    {
      icon: Database,
      title: "CRM Zoho",
      desc: "Customer relationship management",
      details: "Register client info, view history, schedule follow-ups, build loyalty profiles. Every sale is a data point.",
    },
    {
      icon: ShoppingCart,
      title: "Shopify/Omnium",
      desc: "E-commerce & inventory",
      details: "Real-time stock sync, Send a Memory workflow, international shipping. Unified inventory across channels.",
    },
  ] : [
    {
      icon: Monitor,
      title: "POS WinMax4",
      desc: "Sistema de Ponto de Venda",
      details: "3 terminais fixos + 4 tablets no chão (V3 Mix). Trata de todos os pagamentos, inventário e transações.",
    },
    {
      icon: Smartphone,
      title: "Tablets de Chão",
      desc: "Suporte e vendas móveis",
      details: "Verificação de stock em tempo real, processamento de pagamentos, notas de prova, orientação do cliente. Use para trazer vendas ativadas em WiFi em qualquer lugar da loja.",
    },
    {
      icon: MessageSquare,
      title: "AI Concierge",
      desc: "Integração WhatsApp + GPT",
      details: "Bot WhatsApp, 3 GPTs especializados (Educacional, Comercial, Operacional). Sabe quando redirecionar cliente para humano.",
    },
    {
      icon: Database,
      title: "CRM Zoho",
      desc: "Gestão de relacionamento com cliente",
      details: "Registar informações do cliente, ver histórico, agendar follow-ups, construir perfis de fidelização. Toda a venda é um ponto de dados.",
    },
    {
      icon: ShoppingCart,
      title: "Shopify/Omnium",
      desc: "E-commerce & inventário",
      details: "Sincronização de stock em tempo real, fluxo Send a Memory, envio internacional. Inventário unificado entre canais.",
    },
  ];

  const botUsage = isEN ? [
    { situation: "Customer: 'What ages do you have?'", action: "AI Concierge answers", detail: "Bot provides tasting notes, age ranges, pricing instantly" },
    { situation: "Customer: 'Is this available internationally?'", action: "AI Concierge handles", detail: "Bot explains Send a Memory, shipping times, costs" },
    { situation: "Customer: 'I need help with a technical issue'", action: "Redirect to staff", detail: "AI Concierge knows its limits and transfers to you" },
    { situation: "Customer: 'Can you hold this for me?'", action: "Redirect to store staff", detail: "This requires human judgment and CRM access" },
  ] : [
    { situation: "Cliente: 'Que idades têm?'", action: "AI Concierge responde", detail: "Bot fornece notas de prova, gamas de idade, preços instantaneamente" },
    { situation: "Cliente: 'Isto está disponível internacionalmente?'", action: "AI Concierge trata", detail: "Bot explica Send a Memory, tempos de envio, custos" },
    { situation: "Cliente: 'Preciso de ajuda com um problema técnico'", action: "Redirecionar para staff", detail: "AI Concierge conhece os seus limites e transfere para ti" },
    { situation: "Cliente: 'Podes guardar isto para mim?'", action: "Redirecionar para staff", detail: "Isto requer julgamento humano e acesso CRM" },
  ];

  return (
    <ModuleLayout
      moduleId="digital-systems"
      moduleNumber={16}
      title={isEN ? "Digital Systems & Tools" : "Digital & Sistemas"}
      subtitle={isEN ? "Technology enables better service. Learn the tools, master the workflow." : "Tecnologia permite melhor serviço. Aprende as ferramentas, domina o fluxo."}
      heroImage={digitalSystemsImg}
    >
      <ContentBlock title={isEN ? "Technology in the Premium Experience" : "Tecnologia na Experiência Premium"}>
        <p>{isEN
          ? "At The 100's, technology is not about automating away the human touch — it's about enhancing it. Our digital systems are designed to make your job easier, not replace you."
          : "No The 100's, a tecnologia não é sobre automatizar o toque humano — é sobre aprimorá-lo. Os nossos sistemas digitais são projetados para tornar o teu trabalho mais fácil, não para te substituir."}</p>
        <p>{isEN
          ? "Whether you're using a POS terminal, a floor tablet, or WhatsApp with our AI Concierge, the goal is always the same: give every customer an exceptional experience while capturing data that helps us serve them better next time."
          : "Quer estejas a usar um terminal POS, um tablet no chão, ou WhatsApp com o nosso AI Concierge, o objetivo é sempre o mesmo: dar a cada cliente uma experiência excecional enquanto capturas dados que nos ajudam a servir melhor da próxima vez."}</p>
      </ContentBlock>

      <VideoBlock
        title="Sistemas Digitais"
        description="POS, tablets, CRM e ferramentas da loja."
        duration="11:30"
        poster={digitalSystemsImg}
      />

      <ContentBlock title={isEN ? "The Five Core Digital Systems" : "Os Cinco Sistemas Digitais Principais"}>
        <p>{isEN
          ? "Master these five systems and you'll have all the tools you need to deliver an exceptional, seamless experience."
          : "Domina estes cinco sistemas e terás todas as ferramentas que precisas para entregar uma experiência excecional e perfeita."}</p>
      </ContentBlock>

      <div className="space-y-4">
        {systems.map((sys, i) => {
          const Icon = sys.icon;
          return (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500">
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-2.5 bg-primary/5 rounded-sm shrink-0">
                    <Icon className="w-5 h-5 text-primary/60" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-light text-primary">{sys.title}</p>
                    <p className="text-xs text-primary/50 tracking-widest uppercase mt-0.5">{sys.desc}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/60 font-light ml-14">{sys.details}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ExpandableSection title={isEN ? "POS & Floor Tablets: Day-to-Day Usage" : "POS & Tablets: Uso Diário"}>
        <div className="space-y-4 text-sm text-foreground/70 font-light">
          <p><span className="text-primary/70 font-medium">{isEN ? "POS WinMax4:" : "POS WinMax4:"}</span> {isEN ? "This is your main checkout system. Ring up sales, process payments (card, cash, mobile), print receipts. Tablets sync with the POS in real-time, so floor sales feed directly into inventory." : "Este é o teu sistema de checkout principal. Registar vendas, processar pagamentos (cartão, dinheiro, móvel), imprimir recibos. Os tablets sincronizam com o POS em tempo real, para que as vendas no chão alimentem o inventário diretamente."}</p>
          <p><span className="text-primary/70 font-medium">{isEN ? "Floor Tablets:" : "Tablets de Chão:"}</span> {isEN ? "Use these to check stock while with a customer, show product details, process mobile payments, and enter personalization info. They're WiFi-connected and always in sync." : "Use-os para verificar o stock enquanto está com um cliente, mostrar detalhes do produto, processar pagamentos móveis e introduzir informações de personalização. Estão conectados a WiFi e sempre sincronizados."}</p>
        </div>
      </ExpandableSection>

      <ContentBlock title={isEN ? "AI Concierge: Your Digital Assistant" : "AI Concierge: O Teu Assistente Digital"}>
        <p>{isEN
          ? "The AI Concierge is our WhatsApp-integrated chatbot powered by three specialized GPTs. It handles customer questions before they even visit, and answers common questions while you focus on high-touch customer service."
          : "O AI Concierge é o nosso chatbot integrado no WhatsApp alimentado por três GPTs especializados. Ele trata das questões dos clientes antes de visitarem, e responde às perguntas comuns enquanto tu te concentras no serviço personalizado."}</p>
      </ContentBlock>

      <div className="space-y-3">
        {botUsage.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-4 hover:border-primary/20 transition-all duration-500">
              <p className="text-xs text-primary/60 uppercase tracking-wider mb-2">{isEN ? "Scenario" : "Cenário"}</p>
              <p className="text-sm text-foreground/70 font-light mb-2">{item.situation}</p>
              <p className="text-xs text-primary/70 font-medium mb-1">{item.action}</p>
              <p className="text-xs text-foreground/60 font-light">{item.detail}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "CRM Zoho: Building Customer Profiles" : "CRM Zoho: Construindo Perfis de Cliente"}>
        <div className="space-y-3 text-sm text-foreground/70 font-light">
          <p>{isEN
            ? "Every customer interaction is an opportunity to learn. Use CRM Zoho to:"
            : "Cada interação com cliente é uma oportunidade de aprender. Use o CRM Zoho para:"}</p>
          <ul className="space-y-1 ml-4">
            <li>• {isEN ? "Log new customer info (name, email, preferences, purchase history)" : "Registar informações de novo cliente (nome, email, preferências, histórico de compras)"}</li>
            <li>• {isEN ? "Record what they bought and when — this informs future recommendations" : "Registar o que compraram e quando — isto informa recomendações futuras"}</li>
            <li>• {isEN ? "Note if they're international, local, returning, or a group" : "Notar se são internacionais, locais, de retorno, ou grupo"}</li>
            <li>• {isEN ? "Schedule follow-ups for repeat customers (loyalty birthdays, anniversary messages)" : "Agendar follow-ups para clientes repetidos (aniversários de fidelização, mensagens de aniversário)"}</li>
            <li>• {isEN ? "Build segments for marketing (e.g., 'American tourists' to target for ads)" : "Construir segmentos para marketing (por exemplo, 'turistas americanos' para direcionar para anúncios)"}</li>
          </ul>
        </div>
      </ExpandableSection>

      <ContentBlock title={isEN ? "Shopify/Omnium: Send a Memory Workflow" : "Shopify/Omnium: Fluxo Send a Memory"}>
        <p>{isEN
          ? "Shopify handles our e-commerce, Omnium handles international shipping logistics. When a customer chooses Send a Memory:"
          : "Shopify trata do nosso e-commerce, Omnium trata da logística de envio internacional. Quando um cliente escolhe Send a Memory:"}</p>
        <p className="text-sm text-foreground/70 mt-2">{isEN
          ? "1) You process their order in the system 2) They select destination and shipping method 3) Omnium generates customs documentation 4) Package is tracked and shipped 5) Customer receives premium unboxing experience"
          : "1) Tu processa o pedido no sistema 2) Escolhem destino e método de envio 3) Omnium gera documentação de alfândega 4) Pacote é rastreado e enviado 5) Cliente recebe experiência de desembalamento premium"}</p>
      </ContentBlock>

      <KeyTakeaway items={isEN ? [
        "Five core systems: POS WinMax4, Floor Tablets, AI Concierge, CRM Zoho, Shopify/Omnium",
        "POS: checkout and payment processing. Tablets: stock check, mobile payments, personalization info",
        "AI Concierge: WhatsApp bot handles common questions and redirects when needed",
        "Know when the AI bot should redirect: complex issues, personal requests, anything requiring human judgment",
        "CRM Zoho: log every customer interaction to build profiles and enable personalization",
        "Shopify/Omnium: handles e-commerce and international shipping (Send a Memory)",
        "Technology enables better service, never replaces it — always use systems to enhance human connection",
      ] : [
        "Cinco sistemas principais: POS WinMax4, Tablets, AI Concierge, CRM Zoho, Shopify/Omnium",
        "POS: checkout e processamento de pagamentos. Tablets: verificação de stock, pagamentos móveis, info de personalização",
        "AI Concierge: bot WhatsApp trata das perguntas comuns e redireciona quando necessário",
        "Sabe quando o bot IA deve redirecionar: problemas complexos, pedidos pessoais, qualquer coisa que requeira julgamento humano",
        "CRM Zoho: registar cada interação para construir perfis e permitir personalização",
        "Shopify/Omnium: trata de e-commerce e envio internacional (Send a Memory)",
        "Tecnologia permite melhor serviço, nunca substitui — sempre usa sistemas para aprimorar conexão humana",
      ]} />

      <QuizBlock moduleId="digital-systems" questions={isEN ? [
        { question: "What are the two main uses of floor tablets?", options: ["Gaming and entertainment", "Stock check and mobile payments", "Social media browsing", "Customer complaints"], correct: 1 },
        { question: "When should you redirect an AI Concierge chat to a human staff member?", options: ["Never", "Always", "When there's a complex issue or personal request", "Only on weekends"], correct: 2 },
        { question: "What is the primary purpose of logging data in CRM Zoho?", options: ["Track employee hours", "Build customer profiles for personalization", "Calculate sales taxes", "Store company secrets"], correct: 1 },
        { question: "Which system handles international shipping for Send a Memory?", options: ["POS WinMax4", "CRM Zoho", "Omnium", "AI Concierge"], correct: 2 },
      ] : [
        { question: "Quais são os dois usos principais dos tablets de chão?", options: ["Jogos e entretenimento", "Verificação de stock e pagamentos móveis", "Navegação nas redes sociais", "Reclamações de clientes"], correct: 1 },
        { question: "Quando devias redirecionar um chat AI Concierge para um membro da equipa?", options: ["Nunca", "Sempre", "Quando há um problema complexo ou pedido pessoal", "Apenas nos fins de semana"], correct: 2 },
        { question: "Qual é o objetivo principal de registar dados no CRM Zoho?", options: ["Rastrear horas dos funcionários", "Construir perfis de clientes para personalização", "Calcular impostos sobre vendas", "Armazenar segredos da empresa"], correct: 1 },
        { question: "Qual sistema trata do envio internacional para Send a Memory?", options: ["POS WinMax4", "CRM Zoho", "Omnium", "AI Concierge"], correct: 2 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "Describe how you would use a floor tablet to enhance a customer's experience during their visit.",
        "A customer asks the AI Concierge a question about personalization options. Should the bot answer or redirect? Why?",
        "How would logging customer data in CRM Zoho help you serve them better on a future visit?",
      ] : [
        "Descreve como usarias um tablet de chão para aprimorar a experiência de um cliente durante a sua visita.",
        "Um cliente pergunta ao AI Concierge sobre opções de personalização. O bot deve responder ou redirecionar? Por quê?",
        "Como ajudaria registar dados de cliente no CRM Zoho a servi-lo melhor numa visita futura?",
      ]} />

      <ModuleQuizGate
        moduleId="digital-systems"
        questions={[
          { question: "Qual é o sistema de POS (ponto de venda) usado na loja?", options: ["Uma caixa registadora manual", "Sistema digital com tablet para simulação e faturação", "Apenas multibanco", "Um caderno de apontamentos"], correctIndex: 1 },
          { question: "O que é o sistema Concierge do The 100's?", options: ["Um porteiro", "QR Code → captura contacto → follow-up automático", "Um chatbot no site", "Um serviço de entrega"], correctIndex: 1 },
          { question: "Como se processa o Tax Free para turistas?", options: ["Não existe", "Através do sistema de POS para clientes fora da UE", "Apenas para compras acima de €1000", "O cliente pede no aeroporto"], correctIndex: 1 },
          { question: "Que meios de pagamento deve a loja aceitar?", options: ["Apenas dinheiro", "Multibanco, Contactless, Apple/Google Pay, cartões internacionais", "Apenas Visa e Mastercard", "Apenas MB Way"], correctIndex: 1 },
          { question: "Para que serve o CRM na operação The 100's?", options: ["Controlar o stock", "Gerir relação com clientes, follow-up e fidelização", "Fazer contabilidade", "Gerir horários da equipa"], correctIndex: 1 },
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleDigitalSystems;
