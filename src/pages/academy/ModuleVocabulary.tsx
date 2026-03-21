import { ModuleLayout, ContentBlock, KeyTakeaway, QuizBlock, ReflectionBlock, VideoBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Languages } from "lucide-react";
import vocabularyImg from "@/assets/academy/vocabulary.svg";

const ModuleVocabulary = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const greetings = isEN ? [
    { pt: "Olá, bem-vindo ao The 100's", en: "Hello, welcome to The 100's" },
    { pt: "Como posso ajudar?", en: "How can I help you?" },
    { pt: "Qual é o seu nome?", en: "What's your name?" },
    { pt: "De onde vêm?", en: "Where are you from?" },
    { pt: "É a primeira vez que nos visitam?", en: "Is this your first time visiting us?" },
    { pt: "Obrigado pela sua visita", en: "Thank you for visiting" },
    { pt: "Tenha um ótimo dia!", en: "Have a wonderful day!" },
    { pt: "Muito prazer em encontrá-lo", en: "Pleasure to meet you" },
  ] : [
    { pt: "Olá, bem-vindo ao The 100's", en: "Hello, welcome to The 100's" },
    { pt: "Como posso ajudar?", en: "How can I help you?" },
    { pt: "Qual é o seu nome?", en: "What's your name?" },
    { pt: "De onde vêm?", en: "Where are you from?" },
    { pt: "É a primeira vez que nos visitam?", en: "Is this your first time visiting us?" },
    { pt: "Obrigado pela sua visita", en: "Thank you for visiting" },
    { pt: "Tenha um ótimo dia!", en: "Have a wonderful day!" },
    { pt: "Muito prazer em encontrá-lo", en: "Pleasure to meet you" },
  ];

  const packaging = isEN ? [
    { pt: "Cilindro / Garrafa", en: "Cylinder / Bottle", use: "Entry-level, travel-friendly" },
    { pt: "Cubo", en: "Cube", use: "Premium, decorative display" },
    { pt: "Madeira / Wooden Box", en: "Wooden Box", use: "Luxury gift, timeless piece" },
    { pt: "Carvalho / Oak", en: "Oak", use: "Ultimate luxury, collector's item" },
    { pt: "Cortiça", en: "Cork", use: "Sustainable, natural aesthetic" },
    { pt: "Embrulho / Wrapping", en: "Wrapping", use: "Ceremony, gift presentation" },
    { pt: "Personalização", en: "Personalisation", use: "Engraving, custom design" },
    { pt: "Impressão UV", en: "UV Printing", use: "Permanent, high-quality customization" },
  ] : [
    { pt: "Cilindro / Garrafa", en: "Cylinder / Bottle", use: "Entry-level, travel-friendly" },
    { pt: "Cubo", en: "Cube", use: "Premium, decorative display" },
    { pt: "Madeira / Wooden Box", en: "Wooden Box", use: "Luxury gift, timeless piece" },
    { pt: "Carvalho / Oak", en: "Oak", use: "Ultimate luxury, collector's item" },
    { pt: "Cortiça", en: "Cork", use: "Sustainable, natural aesthetic" },
    { pt: "Embrulho / Wrapping", en: "Wrapping", use: "Ceremony, gift presentation" },
    { pt: "Personalização", en: "Personalisation", use: "Engraving, custom design" },
    { pt: "Impressão UV", en: "UV Printing", use: "Permanent, high-quality customization" },
  ];

  const payment = isEN ? [
    { pt: "Cartão de crédito", en: "Credit card" },
    { pt: "Dinheiro", en: "Cash" },
    { pt: "Pagamento móvel", en: "Mobile payment" },
    { pt: "Contactless", en: "Contactless payment" },
    { pt: "Recibo", en: "Receipt" },
    { pt: "Embalagem gratuita", en: "Free wrapping" },
    { pt: "Oferta especial", en: "Special offer" },
    { pt: "Tax Free / IVA", en: "Tax Free" },
  ] : [
    { pt: "Cartão de crédito", en: "Credit card" },
    { pt: "Dinheiro", en: "Cash" },
    { pt: "Pagamento móvel", en: "Mobile payment" },
    { pt: "Contactless", en: "Contactless payment" },
    { pt: "Recibo", en: "Receipt" },
    { pt: "Embalagem gratuita", en: "Free wrapping" },
    { pt: "Oferta especial", en: "Special offer" },
    { pt: "Tax Free / IVA", en: "Tax Free" },
  ];

  const customer = isEN ? [
    { pt: "Qual é a sua preferência?", en: "What's your preference?" },
    { pt: "Deixe-me mostrar os nossos produtos.", en: "Let me show you our products." },
    { pt: "Gostaria de provar?", en: "Would you like to taste?" },
    { pt: "Qual é a ocasião?", en: "What's the occasion?" },
    { pt: "Perfeito para um presente especial", en: "Perfect for a special gift" },
    { pt: "Este é um design exclusivo", en: "This is an exclusive design" },
    { pt: "Temos entrega internacional", en: "We have international shipping" },
    { pt: "Pode personalizar com nome ou data", en: "You can personalise with name or date" },
    { pt: "Isto é uma edição limitada", en: "This is a limited edition" },
  ] : [
    { pt: "Qual é a sua preferência?", en: "What's your preference?" },
    { pt: "Deixe-me mostrar os nossos produtos.", en: "Let me show you our products." },
    { pt: "Gostaria de provar?", en: "Would you like to taste?" },
    { pt: "Qual é a ocasião?", en: "What's the occasion?" },
    { pt: "Perfeito para um presente especial", en: "Perfect for a special gift" },
    { pt: "Este é um design exclusivo", en: "This is an exclusive design" },
    { pt: "Temos entrega internacional", en: "We have international shipping" },
    { pt: "Pode personalizar com nome ou data", en: "You can personalise with name or date" },
    { pt: "Isto é uma edição limitada", en: "This is a limited edition" },
  ];

  return (
    <ModuleLayout
      moduleId="vocabulary"
      moduleNumber={18}
      title={isEN ? "Bilingual Vocabulary Guide" : "Vocabulário PT/EN"}
      subtitle={isEN ? "Master key phrases in Portuguese and English for seamless customer interactions." : "Domina frases-chave em Português e Inglês para interações perfeitas com clientes."}
      heroImage={vocabularyImg}
    >
      <ContentBlock title={isEN ? "Why Bilingual Service Matters" : "Por Que o Serviço Bilíngue Importa"}>
        <p>{isEN
          ? "The 100's serves international visitors daily. While many speak English, many more appreciate when you speak Portuguese — it creates an authentic, premium experience."
          : "O The 100's serve visitantes internacionais diariamente. Enquanto muitos falam inglês, muitos mais apreciam quando falas português — cria uma experiência autêntica e premium."}</p>
        <p>{isEN
          ? "This module is not about fluency. It's about key phrases, proper pronunciation, and the confidence to guide customers in both languages."
          : "Este módulo não é sobre fluência. É sobre frases-chave, pronúncia adequada e confiança para guiar clientes em ambas as línguas."}</p>
      </ContentBlock>

      <VideoBlock
        title="Vocabulário PT/EN"
        description="Glossário bilíngue de atendimento premium."
        duration="8:00"
        poster={vocabularyImg}
      />

      <ContentBlock title={isEN ? "Essential Greetings & Farewells" : "Saudações & Despedidas Essenciais"}>
        <p>{isEN
          ? "Start and end every interaction with warmth. These phrases set the tone:"
          : "Começa e termina cada interação com calidez. Estas frases definem o tom:"}</p>
      </ContentBlock>

      <div className="space-y-2">
        {greetings.map((phrase, i) => (
          <ScrollReveal key={i} delay={i * 0.03}>
            <div className="border border-border/30 p-4 hover:border-primary/20 transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex-1">
                  <p className="text-xs text-primary/60 uppercase tracking-wider mb-1">{isEN ? "Portuguese" : "Português"}</p>
                  <p className="text-sm font-light text-foreground/80">{phrase.pt}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-primary/60 uppercase tracking-wider mb-1">English</p>
                  <p className="text-sm font-light text-foreground/80">{phrase.en}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Packaging & Product Vocabulary" : "Vocabulário de Embalagem & Produto"}>
        <p>{isEN
          ? "Use these terms when showing products and discussing options:"
          : "Usa estes termos ao mostrar produtos e discutir opções:"}</p>
      </ContentBlock>

      <div className="space-y-2">
        {packaging.map((term, i) => (
          <ScrollReveal key={i} delay={i * 0.03}>
            <div className="border border-border/30 p-4 hover:border-primary/20 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-col gap-1">
                    <div>
                      <p className="text-xs text-primary/60 uppercase tracking-wider mb-0.5">{isEN ? "Portuguese" : "Português"}</p>
                      <p className="text-sm font-light text-foreground/80">{term.pt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary/60 uppercase tracking-wider mb-0.5">English</p>
                      <p className="text-sm font-light text-foreground/80">{term.en}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-foreground/50 italic">{term.use}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Payment & Transaction Phrases" : "Frases de Pagamento & Transação"}>
        <p>{isEN
          ? "When closing a sale, use these terms:"
          : "Ao fechar uma venda, usa estes termos:"}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {payment.map((term, i) => (
          <ScrollReveal key={i} delay={i * 0.03}>
            <div className="border border-border/30 p-4 hover:border-primary/20 transition-all duration-500">
              <p className="text-xs text-primary/60 uppercase tracking-wider mb-2">PT</p>
              <p className="text-sm font-light text-foreground/80 mb-3">{term.pt}</p>
              <p className="text-xs text-primary/60 uppercase tracking-wider mb-2">EN</p>
              <p className="text-sm font-light text-foreground/80">{term.en}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Customer Service Phrases" : "Frases de Serviço ao Cliente"}>
        <p>{isEN
          ? "Use these phrases to guide customers through their journey:"
          : "Usa estas frases para guiar clientes através da sua jornada:"}</p>
      </ContentBlock>

      <div className="space-y-2">
        {customer.map((phrase, i) => (
          <ScrollReveal key={i} delay={i * 0.03}>
            <div className="border border-border/30 p-4 hover:border-primary/20 transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex-1">
                  <p className="text-xs text-primary/60 uppercase tracking-wider mb-1">{isEN ? "Portuguese" : "Português"}</p>
                  <p className="text-sm font-light text-foreground/80">{phrase.pt}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-primary/60 uppercase tracking-wider mb-1">English</p>
                  <p className="text-sm font-light text-foreground/80">{phrase.en}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Persona-Specific Language" : "Linguagem Específica de Persona"}>
        <p>{isEN
          ? "Adapt your language to each client type:"
          : "Adapta a tua linguagem a cada tipo de cliente:"}</p>
      </ContentBlock>

      <div className="space-y-4">
        {(isEN ? [
          { persona: "European Tourist", phrases: "Use storytelling language: 'This design is inspired by Portuguese literature', 'The package reflects the heritage of Porto'", language: "Narrative, emotional, historical" },
          { persona: "American Tourist", phrases: "Use exclusivity language: 'This is a limited edition', 'You won't find this anywhere else', 'Premium craftsmanship'", language: "Exclusive, premium, impressive" },
          { persona: "Cruise Passenger", phrases: "Use clarity & speed: 'Here are your best options', 'This fits perfectly for travel', 'Decision time'", language: "Clear, efficient, decisive" },
          { persona: "Wine Connoisseur", phrases: "Use technical language: 'Aging notes', 'Terroir influence', 'Vintage characteristics'", language: "Technical, detailed, sophisticated" },
          { persona: "No Wine Knowledge", phrases: "Use simplicity: 'Smooth and easy to enjoy', 'Don't worry, I'll guide you', 'This is perfect for first-timers'", language: "Simple, reassuring, supportive" },
        ] : [
          { persona: "Turista Europeu", phrases: "Usa linguagem narrativa: 'Este design é inspirado pela literatura portuguesa', 'A embalagem reflete a herança do Porto'", language: "Narrativa, emocional, histórica" },
          { persona: "Turista Americano", phrases: "Usa linguagem de exclusividade: 'Isto é uma edição limitada', 'Não encontrarás isto em lado nenhum', 'Artesanato premium'", language: "Exclusivo, premium, impressionante" },
          { persona: "Cruzeirista", phrases: "Usa clareza e rapidez: 'Aqui estão as tuas melhores opções', 'Isto encaixa-se perfeitamente para viajar', 'Hora de decidir'", language: "Claro, eficiente, decisivo" },
          { persona: "Conhecedor de Vinho", phrases: "Usa linguagem técnica: 'Notas de envelhecimento', 'Influência de terroir', 'Características de colheita'", language: "Técnico, detalhado, sofisticado" },
          { persona: "Sem Conhecimento", phrases: "Usa simplicidade: 'Suave e fácil de aproveitar', 'Não te preocupes, vou guiar-te', 'Isto é perfeito para iniciantes'", language: "Simples, reassegurador, apoiante" },
        ]).map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-5 hover:border-primary/20 transition-all duration-500">
              <p className="text-base font-light text-primary mb-2">{item.persona}</p>
              <p className="text-sm text-foreground/70 font-light mb-2">{item.phrases}</p>
              <p className="text-xs text-primary/50 italic">{isEN ? "Tone:" : "Tom:"} {item.language}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <KeyTakeaway items={isEN ? [
        "Master greetings in Portuguese — it creates authentic connection with international visitors",
        "Know packaging & product terminology in both languages for clarity",
        "Use proper payment phrases to close sales smoothly",
        "Adapt your language style to match each client persona",
        "European tourists: narrative, emotional language; Americans: exclusive, premium language",
        "Wine connoisseurs: technical language; novices: simple, reassuring language",
        "Don't aim for perfection — confidence and warmth matter more than accent",
      ] : [
        "Domina as saudações em Português — cria conexão autêntica com visitantes internacionais",
        "Conhece terminologia de embalagem e produto em ambas as línguas para clareza",
        "Usa frases de pagamento adequadas para fechar vendas facilmente",
        "Adapta o teu estilo de linguagem para combinar com cada persona de cliente",
        "Turistas europeus: linguagem narrativa, emocional; Americanos: linguagem exclusiva, premium",
        "Conhecedores de vinho: linguagem técnica; principiantes: linguagem simples, reasseguradora",
        "Não vises perfeição — confiança e calidez importam mais do que sotaque",
      ]} />

      <QuizBlock moduleId="vocabulary" questions={isEN ? [
        { question: "How do you say 'Welcome to The 100's' in Portuguese?", options: ["Bem-vindo ao The 100's", "Olá, bem-vindo ao The 100's", "Benvindo à The 100's", "Oi, welcome"], correct: 1 },
        { question: "Which language style should you use with a wine connoisseur?", options: ["Simple and reassuring", "Exclusive and premium", "Technical and detailed", "Fast and efficient"], correct: 2 },
        { question: "What's the Portuguese word for 'Personalisation'?", options: ["Embalagem", "Personalização", "Prova", "Presente"], correct: 1 },
      ] : [
        { question: "Como dizes 'Welcome to The 100's' em Português?", options: ["Bem-vindo ao The 100's", "Olá, bem-vindo ao The 100's", "Benvindo à The 100's", "Oi, welcome"], correct: 1 },
        { question: "Que estilo de linguagem devias usar com um conhecedor de vinho?", options: ["Simples e reassegurador", "Exclusivo e premium", "Técnico e detalhado", "Rápido e eficiente"], correct: 2 },
        { question: "Qual é a palavra em Português para 'Personalisation'?", options: ["Embalagem", "Personalização", "Prova", "Presente"], correct: 1 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "Which Portuguese phrases feel most natural to you? Which ones would you like to practice more?",
        "How would you adapt the customer service phrases if someone has very limited English?",
        "Practice saying three key phrases out loud in Portuguese. How confident do you feel?",
      ] : [
        "Quais frases em Português te parecem mais naturais? Quais gostarias de praticar mais?",
        "Como adaptarias as frases de serviço ao cliente se alguém tem inglês muito limitado?",
        "Pratica dizendo três frases-chave em voz alta em Português. Como te sentes de confiante?",
      ]} />
    </ModuleLayout>
  );
};

export default ModuleVocabulary;
