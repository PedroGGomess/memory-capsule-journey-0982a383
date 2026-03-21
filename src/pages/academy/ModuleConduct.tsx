import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, ReflectionBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import conductImg from "@/assets/academy/conduct.svg";

const ModuleConduct = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const dresscodes = isEN ? [
    { category: "Men", items: ["Dark suit or tailored blazer with dress trousers", "White or subtle shirt", "Silk tie (optional but recommended)", "Polished leather shoes (dark)", "No athletic wear, jeans, or casual trainers"] },
    { category: "Women", items: ["Tailored dress, skirt, or trousers (dark or neutral)", "Elegant blouse or sweater", "Closed-toe shoes (heels or smart flats)", "Minimal, refined jewelry", "No athletic wear, jeans, or casual clothes"] },
    { category: "Grooming", items: ["Clean, well-maintained hair", "Fresh appearance (showered, clean hands/nails)", "Minimal fragrance (premium, not overpowering)", "Neat grooming (beard trimmed if applicable)", "Professional appearance overall"] },
  ] : [
    { category: "Homens", items: ["Fato escuro ou blazer ajustado com calças dress", "Camisa branca ou subtil", "Gravata de seda (opcional mas recomendado)", "Sapatos de couro polidos (escuros)", "Sem roupa desportiva, jeans, ou ténis casuais"] },
    { category: "Mulheres", items: ["Vestido, saia ou calças ajustadas (escuro ou neutro)", "Blusa ou suéter elegante", "Sapatos fechados (saltos ou bailarinas inteligentes)", "Joias mínimas e refinadas", "Sem roupa desportiva, jeans ou roupas casuais"] },
    { category: "Asseio", items: ["Cabelo limpo e bem mantido", "Aparência fresca (higiene, unhas/mãos limpas)", "Fragrância mínima (premium, não avassaladora)", "Asseio organizado (barba aparada se aplicável)", "Aparência profissional geral"] },
  ];

  const principles = isEN ? [
    { title: "Posture", desc: "Shoulders back, head up, chest open. Stand like you own the space." },
    { title: "Eye Contact", desc: "Engage with confidence. Look clients in the eye when speaking — it shows respect and authenticity." },
    { title: "Pacing", desc: "Move deliberately, not rushed. Every gesture should have purpose." },
    { title: "Smile", desc: "Genuine, warm, not forced. A smile communicates welcome and care." },
    { title: "Hand Placement", desc: "Keep hands visible. Avoid crossing arms (signals defensiveness). Use hands to guide and gesture naturally." },
  ] : [
    { title: "Postura", desc: "Ombros atrás, cabeça acima, peito aberto. Fica como se possuísses o espaço." },
    { title: "Contacto Visual", desc: "Envolve-te com confiança. Olha os clientes nos olhos — mostra respeito e autenticidade." },
    { title: "Ritmo", desc: "Move-te deliberadamente, não apressadamente. Cada gesto deve ter propósito." },
    { title: "Sorriso", desc: "Genuíno, quente, não forçado. Um sorriso comunica bem-vindo e cuidado." },
    { title: "Colocação de Mãos", desc: "Mantém as mãos visíveis. Evita cruzar braços (sinal de defensividade). Usa as mãos para guiar e fazer gestos naturalmente." },
  ];

  return (
    <ModuleLayout
      moduleId="conduct"
      moduleNumber={14}
      title={isEN ? "Conduct & Image" : "Conduta e Imagem"}
      subtitle={isEN ? "You are the brand. Your presentation matters." : "Tu és a marca. A tua apresentação importa."}
      heroImage={conductImg}
    >
      <ContentBlock title={isEN ? "First Impressions Last" : "Primeiras Impressões Duram"}>
        <p>{isEN
          ? "Clients make a judgment about The 100's within the first 10 seconds of seeing you. Your appearance, posture, tone of voice, and energy communicate everything about the brand before you say a single word."
          : "Os clientes fazem um julgamento sobre The 100's nos primeiros 10 segundos de te verem. A tua aparência, postura, tom de voz e energia comunicam tudo sobre a marca antes de dizeres uma única palavra."}</p>
        <p>{isEN
          ? "This module is about understanding that you are not just an employee — you are the physical embodiment of The 100's brand promise."
          : "Este módulo é sobre compreender que não és apenas um funcionário — és a encarnação física da promessa da marca The 100's."}</p>
      </ContentBlock>

      <ContentBlock title={isEN ? "The Dress Code: Premium & Elegant" : "Código de Vestuário: Premium & Elegante"}>
        <p>{isEN
          ? "The 100's is a premium brand experience. Your clothing should reflect this at all times. Think 'gallery curator', not 'shop assistant'. Think 'luxury hotel concierge', not 'retail.'."
          : "The 100's é uma experiência de marca premium. A tua roupa deve refletir isto em todos os momentos. Pensa 'curador de galeria', não 'assistente de loja'. Pensa 'concierge de hotel de luxo', não 'varejo'."}</p>
      </ContentBlock>

      <VideoBlock
        title="Conduta e Imagem"
        description="Postura, dress code e comunicação profissional."
        duration="7:00"
        poster={conductImg}
      />

      <div className="space-y-5">
        {dresscodes.map((section, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500">
              <p className="text-base font-light text-primary mb-3">{section.category}</p>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="text-sm text-foreground/60 font-light flex items-start gap-2">
                    <span className="text-primary/40 mt-1.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Non-Verbal Communication: The Silent Influencer" : "Comunicação Não-Verbal: O Influenciador Silencioso"}>
        <p>{isEN
          ? "Your body language communicates more than your words. Master these five principles and you'll command the room without saying anything."
          : "A tua linguagem corporal comunica mais do que as tuas palavras. Domina estes cinco princípios e vais controlar a sala sem dizeres nada."}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {principles.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-5 hover:border-primary/20 transition-all duration-500">
              <p className="text-base font-light text-primary mb-2">{p.title}</p>
              <p className="text-sm text-foreground/60 font-light">{p.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "Professional Ethics & Confidentiality" : "Ética Profissional & Confidencialidade"}>
        <div className="space-y-4 text-sm text-foreground/70">
          <p>{isEN
            ? "What clients share with you stays confidential. Personal stories, preferences, budget — this is private information. Never discuss client details outside of work, and certainly never on social media."
            : "O que os clientes partilham contigo fica confidencial. Histórias pessoais, preferências, orçamento — isto é informação privada. Nunca discuta detalhes de clientes fora do trabalho, e definitivamente nunca nas redes sociais."}</p>
          <p>{isEN
            ? "Respect every person equally, regardless of their appearance, language, or purchasing power. The goal is to make every visitor feel valued."
            : "Respeita todas as pessoas igualmente, independentemente da sua aparência, língua ou poder de compra. O objetivo é fazer cada visitante sentir-se valorizado."}</p>
          <p>{isEN
            ? "If you notice a colleague not upholding these standards, speak to management privately and professionally. We maintain our culture by holding each other accountable."
            : "Se notares um colega que não está a cumprir estes padrões, fala com a gestão de forma privada e profissional. Mantemos a nossa cultura responsabilizando-nos mutuamente."}</p>
          <p>{isEN
            ? "Never accept gifts that could create a conflict of interest, and always disclose any personal relationships with clients to management."
            : "Nunca aceites presentes que possam criar um conflito de interesses, e sempre divulga qualquer relacionamento pessoal com clientes à gestão."}</p>
        </div>
      </ExpandableSection>

      <ContentBlock title={isEN ? "The Premium Service Mindset" : "A Mentalidade de Serviço Premium"}>
        <p>{isEN
          ? "Premium service is not about perfection — it's about intention. Every gesture, every word, every pause is deliberate. You're not rushing. You're not distracted. You're fully present."
          : "O serviço premium não é sobre perfeição — é sobre intenção. Cada gesto, cada palavra, cada pausa é deliberada. Não estás a apressar-te. Não estás distraído. Estás totalmente presente."}</p>
        <p>{isEN
          ? "When a client sees you in full presence — making eye contact, listening without interrupting, moving with purpose — they feel respected. That's the premium experience."
          : "Quando um cliente te vê em plena presença — fazendo contacto visual, ouvindo sem interromper, movendo-te com propósito — sente-se respeitado. Essa é a experiência premium."}</p>
      </ContentBlock>

      <KeyTakeaway items={isEN ? [
        "Your appearance and behavior embody the brand. You are The 100's premium promise",
        "Dress code: Dark suit/tailored clothing, polished shoes, minimal jewelry, impeccable grooming",
        "Five posture principles: Posture, Eye Contact, Pacing, Smile, Hand Placement",
        "Non-verbal communication is more powerful than words — master body language",
        "Confidentiality is sacred — never share client details, inside or outside work",
        "Premium service is about intention and presence — not rushing, fully engaged",
        "Treat every client with equal respect and professionalism",
      ] : [
        "A tua aparência e comportamento encarnam a marca. Tu és a promessa premium do The 100's",
        "Código de vestuário: Fato escuro/roupa ajustada, sapatos polidos, joias mínimas, asseio impecável",
        "Cinco princípios de postura: Postura, Contacto Visual, Ritmo, Sorriso, Colocação de Mãos",
        "Comunicação não-verbal é mais poderosa do que palavras — domina a linguagem corporal",
        "Confidencialidade é sagrada — nunca partilhes detalhes de clientes, dentro ou fora do trabalho",
        "Serviço premium é sobre intenção e presença — não apressar-te, totalmente envolvido",
        "Trata cada cliente com igual respeito e profissionalismo",
      ]} />

      <ModuleQuizGate
        moduleId="conduct"
        questions={[
          { question: "O que inclui o dress code do The 100's?", options: ["Roupa casual e ténis", "Apresentação profissional alinhada com o ADN premium da marca", "Uniforme de supermercado", "Qualquer roupa limpa"], correctIndex: 1 },
          { question: "Porque é importante a comunicação não-verbal?", options: ["Não é importante", "Transmite profissionalismo e confiança antes de qualquer palavra", "Apenas para gestores", "Só em eventos especiais"], correctIndex: 1 },
          { question: "Como lidar com um momento de menos movimento na loja?", options: ["Usar o telemóvel", "Manter postura profissional, organizar e preparar-se", "Sair para um café", "Sentar-se no chão"], correctIndex: 1 },
          { question: "O que deve cada colaborador usar sempre visível?", options: ["Relógio de luxo", "Crachá de identificação", "Óculos de sol", "Auricular bluetooth"], correctIndex: 1 },
          { question: "A postura na loja deve transmitir:", options: ["Descontração total", "Disponibilidade, elegância e atenção ao cliente", "Autoridade e distância", "Indiferença profissional"], correctIndex: 1 },
        ]}
      />

      <ReflectionBlock questions={isEN ? [
        "How would you describe 'premium service presence' to someone who has never heard of it?",
        "Think of a premium experience you've had (restaurant, hotel, store). How did the staff present themselves?",
        "What are three ways you could improve your personal conduct and image at The 100's?",
      ] : [
        "Como descrerias 'presença de serviço premium' a alguém que nunca ouviu falar nisso?",
        "Pensa numa experiência premium que tiveste (restaurante, hotel, loja). Como se apresentava o pessoal?",
        "Quais são três maneiras pelas quais poderias melhorar a tua conduta pessoal e imagem no The 100's?",
      ]} />
    </ModuleLayout>
  );
};

export default ModuleConduct;
