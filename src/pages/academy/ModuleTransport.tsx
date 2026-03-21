import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, QuizBlock, ReflectionBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Plane, AlertCircle } from "lucide-react";
import transportImg from "@/assets/academy/transport-rules.svg";

const ModuleTransport = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const options = isEN ? [
    { option: "Carry-on Luggage", limit: "100ml max per container, total 1 liter", desc: "Perfect for The 100's bottles (100ml). Fits TSA 3-1-1 rule." },
    { option: "Checked Baggage", limit: "5 liters max", desc: "Can carry larger quantities. No size restrictions per container." },
    { option: "Send a Memory (International)", limit: "Unlimited", desc: "Ship directly to their home worldwide. Premium packaging. No limits." },
  ] : [
    { option: "Bagagem de Mão", limit: "100ml máx por recipiente, total 1 litro", desc: "Perfeito para garrafas The 100's (100ml). Cumpre regra TSA 3-1-1." },
    { option: "Bagagem Despachada", limit: "5 litros máx", desc: "Pode transportar quantidades maiores. Sem restrições de tamanho por recipiente." },
    { option: "Send a Memory (Internacional)", limit: "Ilimitado", desc: "Enviar diretamente para casa em todo o mundo. Embalagem premium. Sem limites." },
  ];

  const faqs = isEN ? [
    { q: "Can I carry Port wine on a plane?", a: "Yes, but only in checked baggage, not carry-on. Our 100ml bottles are perfect for checked luggage." },
    { q: "Can I bring an unopened bottle through security?", a: "Only in checked baggage after security. Not in carry-on under any circumstances." },
    { q: "What if the client is driving (not flying)?", a: "No restrictions. They can carry as much as they want in their car." },
    { q: "Does 'Send a Memory' work worldwide?", a: "Yes, we ship globally. Some countries have import restrictions on alcohol — we handle documentation." },
    { q: "How long does 'Send a Memory' take?", a: "Typically 7-14 days for EU, 14-21 days for international. Premium packaging included." },
  ] : [
    { q: "Posso transportar Vinho do Porto num avião?", a: "Sim, mas apenas na bagagem despachada, não na mão. As nossas garrafas de 100ml são perfeitas para bagagem despachada." },
    { q: "Posso trazer uma garrafa fechada através da segurança?", a: "Apenas em bagagem despachada após a segurança. Nunca na mão em nenhuma circunstância." },
    { q: "E se o cliente estiver a conduzir (não a voar)?", a: "Sem restrições. Pode transportar o quanto quiser no seu carro." },
    { q: "O 'Send a Memory' funciona em todo o mundo?", a: "Sim, enviamos globalmente. Alguns países têm restrições de importação de álcool — tratamos a documentação." },
    { q: "Quanto tempo leva o 'Send a Memory'?", a: "Tipicamente 7-14 dias para UE, 14-21 dias para internacional. Embalagem premium incluída." },
  ];

  return (
    <ModuleLayout
      moduleId="transport-rules"
      moduleNumber={15}
      title={isEN ? "Transport Rules & Solutions" : "Regras de Transporte & Soluções"}
      subtitle={isEN ? "Know the regulations. Master the solutions. Never let logistics stop a sale." : "Conhece as regulações. Domina as soluções. Nunca deixa a logística parar uma venda."}
      heroImage={transportImg}
    >
      <ContentBlock title={isEN ? "The TSA/IATA Liquid Rule" : "A Regra de Líquidos TSA/IATA"}>
        <p>{isEN
          ? "For American tourists and anyone flying internationally, TSA (Transportation Security Administration) and IATA (International Air Transport Association) rules apply. The key rule: 100ml containers, maximum 1 liter per passenger."
          : "Para turistas americanos e qualquer pessoa que voa internacionalmente, as regras TSA (Administração de Segurança dos Transportes) e IATA (Associação de Transporte Aéreo Internacional) aplicam-se. A regra-chave: recipientes de 100ml, máximo 1 litro por passageiro."}</p>
        <p className="text-sm text-foreground/70 italic mt-2">{isEN
          ? "Good news: Our 100ml bottles fit perfectly into this regulation."
          : "Boas notícias: As nossas garrafas de 100ml encaixam-se perfeitamente nesta regulação."}</p>
      </ContentBlock>

      <VideoBlock
        title="Regras de Transporte"
        description="Regulamentação TSA/IATA e envio internacional."
        duration="5:45"
        poster={transportImg}
      />

      <div className="border border-primary/20 bg-primary/5 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-primary/60 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary mb-2">{isEN ? "The 3-1-1 Rule" : "A Regra 3-1-1"}</p>
            <p className="text-sm text-foreground/70 font-light">
              {isEN
                ? "3 ounces (100ml) per container • 1 quart-sized clear plastic bag • 1 bag per passenger. Our bottles = 100ml exactly."
                : "3 onças (100ml) por recipiente • 1 saco de plástico transparente tamanho quarte • 1 saco por passageiro. As nossas garrafas = 100ml exatamente."}
            </p>
          </div>
        </div>
      </div>

      <ContentBlock title={isEN ? "Three Transport Options" : "Três Opções de Transporte"}>
        <p>{isEN
          ? "Every customer is different. Offer these three solutions and you'll cover 100% of scenarios:"
          : "Cada cliente é diferente. Oferece estas três soluções e vais cobrir 100% dos cenários:"}</p>
      </ContentBlock>

      <div className="space-y-4">
        {options.map((opt, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500">
              <div className="flex items-start gap-3 mb-2">
                <Plane className="w-5 h-5 text-primary/60 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-base font-light text-primary">{opt.option}</p>
                  <p className="text-xs text-primary/50 tracking-wider uppercase mt-0.5">{opt.limit}</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 font-light">{opt.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "How to Explain to the Tourist" : "Como Explicar ao Turista"}>
        <div className="space-y-4 text-sm text-foreground/70 font-light">
          <p>{isEN
            ? "American tourist with checked baggage: 'You can carry our bottles in your checked baggage — no restrictions. Perfect for bringing home a Memory Capsule.'"
            : "Turista americano com bagagem despachada: 'Podes transportar as nossas garrafas na tua bagagem despachada — sem restrições. Perfeito para trazer uma Memory Capsule para casa.'"}</p>
          <p>{isEN
            ? "Tourist with only carry-on: 'Our 100ml bottles fit the carry-on liquid rule perfectly. You can take it through security and enjoy it on the plane.'"
            : "Turista apenas com mão: 'As nossas garrafas de 100ml encaixam-se perfeitamente na regra de líquidos da mão. Podes levá-la através da segurança e desfrutá-la no avião.'"}</p>
          <p>{isEN
            ? "Tourist worried about luggage space: 'If you're tight on luggage, we can ship it directly to your home through Send a Memory. Same premium experience, no luggage weight.'"
            : "Turista preocupado com espaço na bagagem: 'Se estás apertado no espaço, podemos enviá-lo diretamente para a tua casa através do Send a Memory. Mesma experiência premium, sem peso de bagagem.'"}</p>
          <p>{isEN
            ? "Tourist with multiple purchases: 'You can carry one 100ml in your carry-on and more in checked baggage. Or, better yet, Send a Memory handles all of it hassle-free.'"
            : "Turista com múltiplas compras: 'Podes levar um 100ml na tua mão e mais na bagagem despachada. Ou, melhor ainda, Send a Memory trata tudo sem complicações.'"}</p>
        </div>
      </ExpandableSection>

      <ContentBlock title={isEN ? "Send a Memory: The International Solution" : "Send a Memory: A Solução Internacional"}>
        <p>{isEN
          ? "'Send a Memory' is our premium international shipping service. It removes all logistics concerns and opens the door to unlimited sales."
          : "O 'Send a Memory' é o nosso serviço de envio internacional premium. Remove todas as preocupações logísticas e abre a porta a vendas ilimitadas."}</p>
        <p>{isEN
          ? "How it works: Client chooses products, we handle packaging, customs documentation, and shipping. It arrives at their doorstep in premium condition."
          : "Como funciona: O cliente escolhe produtos, nós tratamos da embalagem, documentação de alfândega e envio. Chega à sua porta em condição premium."}</p>
      </ContentBlock>

      <div className="space-y-3">
        {(isEN ? [
          { phase: "Customer Chooses", desc: "They select their Memory Capsules and other products. No luggage weight limit." },
          { phase: "We Handle Everything", desc: "Premium packaging, customs forms, insurance, tracking. Their only job is to enjoy the memory." },
          { phase: "Arrives at Home", desc: "Tracked delivery to their address. Unopened, premium presentation. Like opening a gift." },
          { phase: "They Share", desc: "Unboxing experience. Social media moment. Brand advocacy. This is marketing gold." },
        ] : [
          { phase: "Cliente Escolhe", desc: "Escolhem as suas Memory Capsules e outros produtos. Sem limite de peso de bagagem." },
          { phase: "Nós Tratamos Tudo", desc: "Embalagem premium, formulários de alfândega, seguros, rastreamento. O único trabalho deles é aproveitar a memória." },
          { phase: "Chega a Casa", desc: "Entrega rastreada para o seu endereço. Fechada, apresentação premium. Como abrir um presente." },
          { phase: "Partilham", desc: "Experiência de desembalamento. Momento nas redes sociais. Brand advocacy. Isto é ouro de marketing." },
        ]).map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-4 hover:border-primary/20 transition-all duration-500">
              <p className="text-sm font-light text-primary mb-1">{item.phase}</p>
              <p className="text-xs text-foreground/60 font-light">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "FAQ: Transport & Logistics" : "FAQ: Transporte & Logística"}>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border/20 pb-4 last:border-b-0">
              <p className="text-sm font-light text-primary/70 mb-2">{faq.q}</p>
              <p className="text-sm text-foreground/60 font-light">{faq.a}</p>
            </div>
          ))}
        </div>
      </ExpandableSection>

      <KeyTakeaway items={isEN ? [
        "TSA/IATA liquid rule: 100ml containers max, 1 liter total per passenger",
        "Our 100ml bottles fit perfectly into carry-on liquid regulations",
        "Three transport solutions: Carry-on, Checked baggage, Send a Memory",
        "For checked baggage: no restrictions, unlimited quantity",
        "Send a Memory is premium international shipping — removes all logistics concerns",
        "Use transport options to upsell: if luggage is full, offer Send a Memory",
        "Always explain the solution in the client's language — make it simple and stress-free",
      ] : [
        "Regra de líquidos TSA/IATA: 100ml máx por recipiente, 1 litro total por passageiro",
        "As nossas garrafas de 100ml encaixam-se perfeitamente nas regulações de mão",
        "Três soluções de transporte: Mão, Bagagem despachada, Send a Memory",
        "Para bagagem despachada: sem restrições, quantidade ilimitada",
        "Send a Memory é envio internacional premium — remove todas as preocupações logísticas",
        "Use as opções de transporte para upsell: se a bagagem está cheia, oferece Send a Memory",
        "Sempre explica a solução na língua do cliente — torna-o simples e sem stress",
      ]} />

      <QuizBlock moduleId="transport-rules" questions={isEN ? [
        { question: "What is the TSA liquid rule for carry-on?", options: ["No liquids allowed", "100ml containers, 1 liter max", "200ml containers, 2 liters max", "Any amount in checked baggage"], correct: 1 },
        { question: "Can a tourist carry a 100ml bottle through TSA security?", options: ["Yes, in carry-on", "Only if unopened", "Only in checked baggage", "Never"], correct: 2 },
        { question: "What is the main advantage of 'Send a Memory'?", options: ["It's cheaper", "Unlimited quantity, no luggage limits, premium experience", "It's faster", "It's only for locals"], correct: 1 },
      ] : [
        { question: "Qual é a regra de líquidos TSA para mão?", options: ["Sem líquidos permitidos", "100ml por recipiente, 1 litro máx", "200ml por recipiente, 2 litros máx", "Qualquer quantidade em bagagem despachada"], correct: 1 },
        { question: "Pode um turista transportar uma garrafa de 100ml através da segurança TSA?", options: ["Sim, na mão", "Apenas se fechada", "Apenas na bagagem despachada", "Nunca"], correct: 2 },
        { question: "Qual é a principal vantagem do 'Send a Memory'?", options: ["É mais barato", "Quantidade ilimitada, sem limites de bagagem, experiência premium", "É mais rápido", "É apenas para locais"], correct: 1 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "A tourist asks: 'Can I bring this on the plane?' Write your response.",
        "How would you explain Send a Memory to someone worried about luggage weight?",
        "Describe three scenarios where transport options become a selling point.",
      ] : [
        "Um turista pergunta: 'Posso trazer isto no avião?' Escreve a tua resposta.",
        "Como explicarias Send a Memory a alguém preocupado com peso de bagagem?",
        "Descreve três cenários em que as opções de transporte se tornam um ponto de venda.",
      ]} />

      <ModuleQuizGate
        moduleId="transport-rules"
        questions={[
          { question: "Quantos ml de líquido pode um passageiro levar na cabine do avião?", options: ["50ml", "100ml por recipiente (max 1L total em saco transparente)", "250ml", "Sem limite"], correctIndex: 1 },
          { question: "As garrafas The 100's de 100ml podem ir na bagagem de cabine?", options: ["Nunca", "Sim, dentro do saco de líquidos transparente", "Apenas em voos domésticos", "Só com autorização especial"], correctIndex: 1 },
          { question: "O que deve a equipa saber sobre envio internacional?", options: ["Não é possível enviar", "Opções de envio, tracking e comunicação ao cliente", "Apenas envio dentro de Portugal", "O cliente trata de tudo"], correctIndex: 1 },
          { question: "Qual organização define as regras de transporte aéreo de líquidos?", options: ["UEFA", "TSA/IATA", "UNESCO", "NATO"], correctIndex: 1 },
          { question: "Como tranquilizar um cliente preocupado com o transporte?", options: ["Ignorar a preocupação", "Explicar as regras, oferecer opções de envio e embalar com cuidado", "Dizer que é problema dele", "Sugerir que não compre"], correctIndex: 1 },
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleTransport;
