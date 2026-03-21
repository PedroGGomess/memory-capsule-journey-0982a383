import { ModuleLayout, ContentBlock, KeyTakeaway, ReflectionBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import hedonismImg from "@/assets/hedonism.jpg";

const ModuleCustomerExperience = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const principles = isEN ? [
    { principle: "Storytelling", desc: "Share the brand story naturally. Let the heritage speak. Connect the visitor to the history and emotion behind each bottle." },
    { principle: "Emotion", desc: "Create a feeling, not a transaction. Ask about their journey. Listen. Connect the wine to their personal experience." },
    { principle: "Experience", desc: "Make the visit memorable. The tasting, the presentation, the farewell — every moment is part of the capsule." },
  ] : [
    { principle: "Storytelling", desc: "Partilha a história da marca de forma natural. Deixa o patrimônio falar. Liga o visitante à história e emoção por detrás de cada garrafa." },
    { principle: "Emoção", desc: "Cria um sentimento, não uma transação. Pergunta sobre a viagem deles. Escuta. Liga o vinho à experiência pessoal deles." },
    { principle: "Experiência", desc: "Torna a visita memorável. A prova, a apresentação, a despedida — cada momento faz parte da cápsula." },
  ];

  return (
    <ModuleLayout
      moduleId="customer-experience"
      moduleNumber={7}
      title={isEN ? "The Customer Experience" : "A Experiência do Cliente"}
      subtitle={isEN ? "Every interaction is part of the story." : "Cada interação é parte da história."}
      heroImage={hedonismImg}
    >
      <ContentBlock title={isEN ? "You Are a Storyteller" : "És um Contador de Histórias"}>
        <p>{isEN
          ? "As a member of The 100's team, your role is not to sell. Your role is to guide visitors through a story — the story of time, memory and legacy."
          : "Como membro da equipa do The 100's, o teu papel não é vender. O teu papel é guiar os visitantes por uma história — a história do tempo, memória e legado."}</p>
        <p>{isEN
          ? "Every interaction should feel personal, thoughtful and unhurried."
          : "Cada interação deve parecer pessoal, cuidadosa e sem pressa."}</p>
      </ContentBlock>

      <VideoBlock
        title="Experiência de Cliente"
        description="Cada touchpoint é uma oportunidade de encantamento."
        duration="11:00"
        poster={hedonismImg}
      />

      <ContentBlock title={isEN ? "The Three Principles" : "Os Três Princípios"}>
        <p>{isEN
          ? "Every visitor interaction follows three guiding principles:"
          : "Cada interação com visitantes segue três princípios orientadores:"}</p>
      </ContentBlock>

      <div className="space-y-6">
        {principles.map(p => (
          <div key={p.principle} className="border border-border/30 p-6">
            <p className="text-lg font-light text-primary mb-2">{p.principle}</p>
            <p className="text-foreground/60 font-light text-sm">{p.desc}</p>
          </div>
        ))}
      </div>

      <ContentBlock title={isEN ? "Guiding the Journey" : "Guiar a Jornada"}>
        <p>{isEN
          ? "Think of yourself as a museum guide, not a shop assistant. You are taking visitors on a journey through time. Walk slowly. Speak gently. Let silence do its work."
          : "Pensa em ti como um guia de museu, não como um assistente de loja. Estás a levar os visitantes numa jornada através do tempo. Caminha devagar. Fala suavemente. Deixa o silêncio fazer o seu trabalho."}</p>
      </ContentBlock>

      <KeyTakeaway items={isEN ? [
        "You are a storyteller, not a salesperson",
        "Three principles: Storytelling, Emotion, Experience",
        "Every interaction should feel personal and unhurried",
        "Think museum guide, not shop assistant"
      ] : [
        "És um contador de histórias, não um vendedor",
        "Três princípios: Storytelling, Emoção, Experiência",
        "Cada interação deve parecer pessoal e sem pressa",
        "Pensa em guia de museu, não em assistente de loja"
      ]} />

      <ReflectionBlock questions={isEN ? [
        "Describe how you would guide a visitor from the moment they enter to the moment they leave."
      ] : [
        "Descreve como guiarias um visitante desde o momento em que entra até ao momento em que sai."
      ]} />

      <ModuleQuizGate
        moduleId="customer-experience"
        questions={[
          { question: "O que transforma uma compra numa experiência memorável?", options: ["Preço baixo", "Detalhes: tom de voz, cerimónia do embrulho, personalização", "Rapidez no atendimento", "Grandes descontos"], correctIndex: 1 },
          { question: "Quantas pessoas um cliente satisfeito recomenda, em média?", options: ["1-2", "3-5", "10-15", "20+"], correctIndex: 1 },
          { question: "O que é Advocacy Marketing?", options: ["Publicidade paga em TV", "Clientes satisfeitos que se tornam embaixadores naturais", "Marketing de influenciadores", "Email marketing"], correctIndex: 1 },
          { question: "Em que consiste o 'momento WOW'?", options: ["Dar um desconto surpresa", "Criar uma micro-experiência de encantamento inesperada", "Oferecer amostras grátis", "Tocar música alta na loja"], correctIndex: 1 },
          { question: "O que faz um cliente voltar ao The 100's?", options: ["Apenas promoções", "Memória positiva, programa concierge e follow-up", "Localização conveniente", "Preços mais baixos que a concorrência"], correctIndex: 1 },
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleCustomerExperience;
