import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, ReflectionBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Monitor, Smartphone, Tablet, MessageSquare, Database, ShoppingCart, Wifi, AlertTriangle } from "lucide-react";
import digitalSystemsImg from "@/assets/academy/digital-systems.svg";

const ModuleDigitalSystems = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const hardwareItems = isEN ? [
    {
      icon: Monitor,
      title: "Sunmi D3 Pro",
      badge: "Fixed POS · Piso 0",
      desc: "Two fixed checkout terminals at the ground floor counter. This is the main transaction point — all payments, receipts, and fiscal documentation go through here. Windows-based, running WinMax4 (Omnium Retail).",
      tips: [
        "Always confirm the product code before confirming the sale",
        "Use this terminal for all receipts and Tax Free processing",
        "Fiscal invoice (fatura) is issued from here for corporate clients",
      ],
    },
    {
      icon: Smartphone,
      title: "Sunmi L3",
      badge: "Handheld · All floors",
      desc: "One per sales staff member (~5 units). These are your mobile command centres. Consult stock, process payments on the floor, show product information, and accompany the client throughout their journey — without ever leaving their side.",
      tips: [
        "Ideal for consultative sales in The Vault and The Numbered",
        "Use to show product details and collections while walking the store",
        "Processes card payments via integrated reader — no need to go to the counter",
        "Connected to WinMax4 in real time — stock is always live",
      ],
    },
    {
      icon: Tablet,
      title: "Sunmi CPad Pay",
      badge: "Premium Tablet · Piso 1",
      desc: "Two premium tablets positioned in The Vault and The Numbered zones on Piso 1. Designed for ceremonial, personalised sales interactions. The large screen allows you to showcase The Icon and THE HUNDRED collections with the gravity they deserve.",
      tips: [
        "Treat the CPad as a stage, not a checkout — present first, process second",
        "Ideal for showing the full collection context before a €275–€1,000 sale",
        "Use the screen to display wine details, age, and story before tasting",
        "Payment processing runs through WinMax4 via the CPad Pay integration",
      ],
    },
  ] : [
    {
      icon: Monitor,
      title: "Sunmi D3 Pro",
      badge: "POS Fixo · Piso 0",
      desc: "Dois terminais de checkout fixos no balcão do piso térreo. Este é o ponto de transação principal — todos os pagamentos, recibos e documentação fiscal passam por aqui. Windows-based, a correr WinMax4 (Omnium Retail).",
      tips: [
        "Confirma sempre o código do produto antes de confirmar a venda",
        "Usa este terminal para todos os recibos e processamento Tax Free",
        "A fatura fiscal é emitida aqui para clientes empresariais",
      ],
    },
    {
      icon: Smartphone,
      title: "Sunmi L3",
      badge: "Handheld · Todos os pisos",
      desc: "Um por membro da equipa de vendas (~5 unidades). Os teus centros de comando móveis. Consulta stock, processa pagamentos no chão de loja, mostra informação de produtos e acompanha o cliente ao longo da sua jornada — sem sair do seu lado.",
      tips: [
        "Ideal para vendas consultivas em The Vault e The Numbered",
        "Usa para mostrar detalhes e coleções enquanto percorres a loja",
        "Processa pagamentos por cartão via leitor integrado — sem precisar ir ao balcão",
        "Ligado ao WinMax4 em tempo real — o stock está sempre atualizado",
      ],
    },
    {
      icon: Tablet,
      title: "Sunmi CPad Pay",
      badge: "Tablet Premium · Piso 1",
      desc: "Dois tablets premium posicionados em The Vault e The Numbered no Piso 1. Concebidos para interações de venda cerimoniais e personalizadas. O ecrã grande permite mostrar as coleções The Icon e THE HUNDRED com a gravidade que merecem.",
      tips: [
        "Trata o CPad como um palco, não como uma caixa — apresenta primeiro, processa depois",
        "Ideal para mostrar o contexto completo da coleção antes de uma venda de €275–€1.000",
        "Usa o ecrã para mostrar detalhes do vinho, idade e história antes da prova",
        "O processamento de pagamentos corre através do WinMax4 via integração CPad Pay",
      ],
    },
  ];

  const softwareItems = isEN ? [
    {
      icon: Monitor,
      title: "WinMax4 (Omnium Retail)",
      badge: "POS Software",
      desc: "The source of truth for all stock and sales. Every transaction across all devices (D3 Pro, L3, CPad Pay) feeds into WinMax4. This is your inventory bible — if it's not in WinMax4, it doesn't exist.",
      tips: [
        "Stock is real-time across all devices — never guess availability",
        "End-of-day reconciliation happens through WinMax4",
        "Tax Free processing is built in — use it for all non-EU customers",
      ],
    },
    {
      icon: MessageSquare,
      title: "AI Concierge",
      badge: "WhatsApp + GPT",
      desc: "WhatsApp-integrated bot with three specialised GPTs: Educational (product knowledge), Commercial (availability, pricing, Send a Memory), and Operational (hours, location, services). Handles pre-visit queries so you can focus on in-store experience.",
      tips: [
        "Know when to redirect: complex complaints, personalised requests, anything requiring human judgment",
        "Never compete with the bot — let it handle FAQs, you handle humans",
      ],
    },
    {
      icon: Database,
      title: "CRM Zoho",
      badge: "Customer Profiles",
      desc: "Log every significant customer interaction. A returning customer who once bought The Icon 50yr and receives a personalised follow-up two months later — that is the power of the CRM used correctly.",
      tips: [
        "Log: name, nationality, purchase, preferences, group type",
        "Mark VIP clients — they deserve recognition on return",
        "Zoho feeds the Send a Memory workflow for future touchpoints",
      ],
    },
    {
      icon: ShoppingCart,
      title: "Omnium / Send a Memory",
      badge: "E-commerce & Shipping",
      desc: "International shipping and e-commerce backbone. Handles Send a Memory orders end-to-end: packaging, customs documentation, tracking. Unified inventory synced with WinMax4.",
      tips: [
        "Always offer Send a Memory when a client mentions luggage weight concerns",
        "Customs documentation is handled automatically — no extra work for staff",
        "Premium unboxing experience is included — make that clear to the client",
      ],
    },
  ] : [
    {
      icon: Monitor,
      title: "WinMax4 (Omnium Retail)",
      badge: "Software POS",
      desc: "A fonte da verdade para todo o stock e vendas. Cada transação em todos os dispositivos (D3 Pro, L3, CPad Pay) alimenta o WinMax4. Esta é a tua bíblia de inventário — se não está no WinMax4, não existe.",
      tips: [
        "O stock é em tempo real em todos os dispositivos — nunca adivinhes a disponibilidade",
        "A reconciliação de fim de dia acontece através do WinMax4",
        "O processamento Tax Free está integrado — usa para todos os clientes não-UE",
      ],
    },
    {
      icon: MessageSquare,
      title: "AI Concierge",
      badge: "WhatsApp + GPT",
      desc: "Bot integrado no WhatsApp com três GPTs especializados: Educacional (conhecimento de produto), Comercial (disponibilidade, preços, Send a Memory) e Operacional (horários, localização, serviços). Trata das consultas pré-visita para que te possas focar na experiência em loja.",
      tips: [
        "Sabe quando redirecionar: reclamações complexas, pedidos personalizados, qualquer coisa que exija julgamento humano",
        "Nunca compitas com o bot — deixa-o tratar das FAQs, tu tratas dos humanos",
      ],
    },
    {
      icon: Database,
      title: "CRM Zoho",
      badge: "Perfis de Cliente",
      desc: "Regista cada interação significativa com clientes. Um cliente recorrente que comprou The Icon 50a e recebe um follow-up personalizado dois meses depois — esse é o poder do CRM usado corretamente.",
      tips: [
        "Regista: nome, nacionalidade, compra, preferências, tipo de grupo",
        "Marca clientes VIP — merecem reconhecimento no regresso",
        "Zoho alimenta o fluxo Send a Memory para touchpoints futuros",
      ],
    },
    {
      icon: ShoppingCart,
      title: "Omnium / Send a Memory",
      badge: "E-commerce & Envio",
      desc: "Backbone de e-commerce e envio internacional. Trata das encomendas Send a Memory de ponta a ponta: embalagem, documentação alfandegária, rastreamento. Inventário unificado sincronizado com o WinMax4.",
      tips: [
        "Oferece sempre Send a Memory quando um cliente menciona preocupações com peso de bagagem",
        "A documentação alfandegária é tratada automaticamente — sem trabalho extra para a equipa",
        "A experiência de desembalamento premium está incluída — deixa isso claro ao cliente",
      ],
    },
  ];

  const networkNote = isEN
    ? "The store runs on a dedicated NOS Corporate fibre connection — not shared, not consumer-grade. If you experience connectivity issues on any device, report immediately to the team leader. Never process offline transactions without explicit authorisation."
    : "A loja funciona numa ligação de fibra NOS Corporate dedicada — não partilhada, não de grau doméstico. Se tiveres problemas de conectividade em qualquer dispositivo, reporta imediatamente ao team leader. Nunca processe transações offline sem autorização explícita.";

  const taxFreeSteps = isEN ? [
    "Confirm client is non-EU resident (ask for passport)",
    "Process the sale normally on WinMax4",
    "Select 'Tax Free' option in the POS — it generates the required documentation",
    "Client receives the stamped form at exit — they present it at the airport",
    "Our 100ml format qualifies — no restriction on quantity in checked baggage",
  ] : [
    "Confirma que o cliente é residente fora da UE (pede passaporte)",
    "Processa a venda normalmente no WinMax4",
    "Seleciona a opção 'Tax Free' no POS — gera a documentação necessária",
    "O cliente recebe o formulário carimbado na saída — apresenta-o no aeroporto",
    "O nosso formato 100ml qualifica — sem restrição de quantidade na bagagem despachada",
  ];

  return (
    <ModuleLayout
      moduleId="digital-systems"
      moduleNumber={18}
      title={isEN ? "Digital Systems & Tools" : "Digital & Sistemas"}
      subtitle={isEN ? "Three Sunmi devices. One POS. Four software tools. Master them all." : "Três dispositivos Sunmi. Um POS. Quatro ferramentas de software. Domina todos."}
      heroImage={digitalSystemsImg}
    >
      <ContentBlock title={isEN ? "Technology Enables the Experience" : "A Tecnologia Activa a Experiência"}>
        <p>{isEN
          ? "At The 100's, technology is not a back-office concern — it is on the sales floor, in your hands, and in every client interaction. The right device, used at the right moment, elevates the experience from transactional to ceremonial."
          : "No The 100's, a tecnologia não é uma preocupação de back-office — está no chão de loja, nas tuas mãos e em cada interação com o cliente. O dispositivo certo, usado no momento certo, eleva a experiência de transacional a cerimonial."}</p>
        <p>{isEN
          ? "Master three hardware devices and four software systems. That's all you need to run an exceptional operation."
          : "Domina três dispositivos de hardware e quatro sistemas de software. É tudo o que precisas para operar de forma excecional."}</p>
      </ContentBlock>

      <VideoBlock
        title="Sistemas Digitais"
        description="Hardware Sunmi, WinMax4, CRM e ferramentas da loja."
        duration="11:30"
        poster={digitalSystemsImg}
      />

      {/* ── Hardware ── */}
      <ContentBlock title={isEN ? "Hardware: The Three Devices" : "Hardware: Os Três Dispositivos"}>
        <p>{isEN
          ? "Each device has a specific role. Use the right one for the right context — this is what separates a premium experience from a generic one."
          : "Cada dispositivo tem um papel específico. Usa o correto para o contexto correto — é o que separa uma experiência premium de uma genérica."}</p>
      </ContentBlock>

      <div className="space-y-4">
        {hardwareItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2.5 bg-primary/5 rounded-sm shrink-0">
                    <Icon className="w-5 h-5 text-primary/60" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-0.5">
                      <p className="text-base font-light text-primary">{item.title}</p>
                      <span className="text-[9px] tracking-wider uppercase text-muted-foreground/50 border border-border/30 px-2 py-0.5">{item.badge}</span>
                    </div>
                    <p className="text-sm text-foreground/60 font-light leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="ml-14 space-y-1.5 border-l border-border/20 pl-4">
                  {item.tips.map((tip, j) => (
                    <p key={j} className="text-xs text-muted-foreground/60 font-light">→ {tip}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ── Software ── */}
      <ContentBlock title={isEN ? "Software: The Four Systems" : "Software: Os Quatro Sistemas"}>
        <p>{isEN
          ? "WinMax4 is the source of truth. Everything else integrates with it. Know each system's role — and when to use which."
          : "WinMax4 é a fonte da verdade. Tudo o resto integra com ele. Conhece o papel de cada sistema — e quando usar qual."}</p>
      </ContentBlock>

      <div className="space-y-4">
        {softwareItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2.5 bg-primary/5 rounded-sm shrink-0">
                    <Icon className="w-5 h-5 text-primary/60" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-0.5">
                      <p className="text-base font-light text-primary">{item.title}</p>
                      <span className="text-[9px] tracking-wider uppercase text-muted-foreground/50 border border-border/30 px-2 py-0.5">{item.badge}</span>
                    </div>
                    <p className="text-sm text-foreground/60 font-light leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="ml-14 space-y-1.5 border-l border-border/20 pl-4">
                  {item.tips.map((tip, j) => (
                    <p key={j} className="text-xs text-muted-foreground/60 font-light">→ {tip}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ── Network ── */}
      <div className="border border-amber-500/20 bg-amber-950/10 p-5 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-500/60 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-amber-500/70 font-medium tracking-wider uppercase mb-1">{isEN ? "Network" : "Rede"}</p>
          <p className="text-sm text-foreground/60 font-light leading-relaxed">{networkNote}</p>
        </div>
      </div>

      {/* ── Tax Free ── */}
      <ExpandableSection title={isEN ? "Tax Free: Step-by-Step" : "Tax Free: Passo a Passo"}>
        <p className="text-sm text-foreground/60 font-light mb-4">
          {isEN
            ? "Tax Free is a strong sales argument for non-EU tourists — and a process that must be done correctly."
            : "O Tax Free é um forte argumento de venda para turistas fora da UE — e um processo que tem de ser feito corretamente."}
        </p>
        <div className="space-y-2">
          {taxFreeSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 border border-border/20 p-3">
              <span className="text-xs text-primary/50 font-light w-4 shrink-0">{i + 1}</span>
              <p className="text-sm text-foreground/60 font-light">{step}</p>
            </div>
          ))}
        </div>
      </ExpandableSection>

      <KeyTakeaway items={isEN ? [
        "Three hardware devices: Sunmi D3 Pro (fixed POS, Piso 0), Sunmi L3 (handheld, all floors), Sunmi CPad Pay (premium tablet, Piso 1)",
        "WinMax4 (Omnium Retail) is the POS software and source of truth for all stock — runs on all devices",
        "L3 handhelds enable consultative mobile sales — follow the client, process payments anywhere",
        "CPad Pay is ceremonial — use it in The Vault and The Numbered to elevate the experience",
        "AI Concierge (WhatsApp) handles pre-visit FAQs — redirect to humans for complex or personal needs",
        "CRM Zoho: log every significant interaction to enable personalised follow-up",
        "Tax Free: always offer to non-EU clients — processed directly through WinMax4",
        "Network: NOS Corporate dedicated fibre — report any connectivity issue immediately",
      ] : [
        "Três dispositivos: Sunmi D3 Pro (POS fixo, Piso 0), Sunmi L3 (handheld, todos os pisos), Sunmi CPad Pay (tablet premium, Piso 1)",
        "WinMax4 (Omnium Retail) é o software POS e fonte da verdade para todo o stock — corre em todos os dispositivos",
        "Os L3 handhelds permitem vendas consultivas móveis — segue o cliente, processa pagamentos em qualquer lugar",
        "CPad Pay é cerimonial — usa-o em The Vault e The Numbered para elevar a experiência",
        "AI Concierge (WhatsApp) trata das FAQs pré-visita — redireciona para humanos em necessidades complexas ou pessoais",
        "CRM Zoho: regista cada interação significativa para follow-up personalizado",
        "Tax Free: oferece sempre a clientes não-UE — processado diretamente no WinMax4",
        "Rede: fibra NOS Corporate dedicada — reporta qualquer problema de conectividade imediatamente",
      ]} />

      <ModuleQuizGate
        moduleId="digital-systems"
        questions={[
          {
            question: isEN ? "What POS software does The 100's use?" : "Que software POS usa a The 100's?",
            options: ["Square", "WinMax4 (Omnium Retail)", "Shopify POS", "Lightspeed"],
            correctIndex: 1,
          },
          {
            question: isEN ? "Which Sunmi device is used for ceremonial sales in The Vault?" : "Qual dispositivo Sunmi é usado para vendas cerimoniais em The Vault?",
            options: ["Sunmi D3 Pro", "Sunmi L3", "Sunmi CPad Pay", "Sunmi T2"],
            correctIndex: 2,
          },
          {
            question: isEN ? "What is the Sunmi L3 used for?" : "Para que serve o Sunmi L3?",
            options: isEN
              ? ["Fixed checkout only", "Consultative mobile sales, stock check, and payment processing on the floor", "Only for stock management", "Ceremonial presentations in The Vault"]
              : ["Apenas checkout fixo", "Vendas consultivas móveis, verificação de stock e pagamentos no chão de loja", "Apenas para gestão de stock", "Apresentações cerimoniais em The Vault"],
            correctIndex: 1,
          },
          {
            question: isEN ? "How many fixed POS terminals are on Piso 0?" : "Quantos terminais POS fixos existem no Piso 0?",
            options: ["1", "2", "3", "4"],
            correctIndex: 1,
          },
          {
            question: isEN ? "Tax Free should be offered to which customers?" : "O Tax Free deve ser oferecido a que clientes?",
            options: isEN
              ? ["All customers", "EU residents only", "Non-EU residents (with passport confirmation)", "Only American tourists"]
              : ["Todos os clientes", "Apenas residentes UE", "Residentes fora da UE (com confirmação do passaporte)", "Apenas turistas americanos"],
            correctIndex: 2,
          },
        ]}
      />

      <ReflectionBlock questions={isEN ? [
        "A client in The Vault wants to buy THE HUNDRED (€1,000). Which device would you use and why?",
        "A tourist asks if they can take 8 bottles on the plane. Walk through your response using your knowledge of transport rules and the Sunmi L3.",
        "At the end of the day, WinMax4 shows a discrepancy between sales and stock. What is your first action?",
      ] : [
        "Um cliente em The Vault quer comprar THE HUNDRED (€1.000). Que dispositivo usarias e porquê?",
        "Um turista pergunta se pode levar 8 garrafas no avião. Passa pela tua resposta usando o teu conhecimento de regras de transporte e o Sunmi L3.",
        "No fim do dia, o WinMax4 mostra uma discrepância entre vendas e stock. Qual é a tua primeira ação?",
      ]} />
    </ModuleLayout>
  );
};

export default ModuleDigitalSystems;
