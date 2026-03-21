import { ModuleLayout, ContentBlock, KeyTakeaway, ExpandableSection, ReflectionBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Users } from "lucide-react";
import clientProfilesImg from "@/assets/academy/client-profiles.svg";

const ModuleClientProfiles = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const personas = isEN ? [
    {
      name: "European Tourist",
      desc: "Authentic souvenir, storytelling, personalization",
      price: "€30-110",
      products: "Cylinders, Cubes",
      behavior: "Walks slowly, takes photos, listens carefully",
    },
    {
      name: "American Tourist",
      desc: "Wow factor, exclusivity, premium packaging, TSA rules",
      price: "€70-345",
      products: "Cubes, Wood",
      behavior: "Enters with energy, asks questions, buys premium",
    },
    {
      name: "Cruise Passenger",
      desc: "Speed, 2-3 options, ready to go",
      price: "€20-50",
      products: "Entry, Cylinders",
      behavior: "Limited time, part of group, quick decision",
    },
    {
      name: "Local Resident",
      desc: "Special gift, premium collections, loyalty building",
      price: "€80-375",
      products: "Legacy, Icon",
      behavior: "Solo, wine knowledge, returns regularly",
    },
    {
      name: "Wine Connoisseur",
      desc: "Quality, rarity, technical language",
      price: "€110-1000",
      products: "Legacy, Icon, HUNDRED",
      behavior: "Technical questions, appreciates complexity",
    },
    {
      name: "No Wine Knowledge",
      desc: "Simplicity, tasting, no jargon",
      price: "€20-70",
      products: "Entry, Cylinders",
      behavior: "Hesitant, asks for recommendation, needs reassurance",
    },
    {
      name: "Premium Couple",
      desc: "Romantic experience, date personalization",
      price: "Custom €80-200+",
      products: "Cubes, Wood (personalized)",
      behavior: "Want shared memory, will engrave together",
    },
    {
      name: "Group / Family",
      desc: "Multiple gifts, group tasting experience",
      price: "Mix of all tiers",
      products: "All collections",
      behavior: "Each person different, enjoy collective experience",
    },
  ] : [
    {
      name: "Turista Europeu",
      desc: "Souvenir autêntico, storytelling, personalização",
      price: "€30-110",
      products: "Cilindros, Cubos",
      behavior: "Caminha devagar, fotografa, ouve atentamente",
    },
    {
      name: "Turista Americano",
      desc: "Fator WOW, exclusividade, packaging premium, regras TSA",
      price: "€70-345",
      products: "Cubos, Madeira",
      behavior: "Entra com energia, faz perguntas, compra premium",
    },
    {
      name: "Cruzeirista",
      desc: "Rapidez, 2-3 opções, ready to go",
      price: "€20-50",
      products: "Entrada, Cilindros",
      behavior: "Pouco tempo, parte de grupo, decisão rápida",
    },
    {
      name: "Residente/Local",
      desc: "Presente especial, gamas superiores, fidelização",
      price: "€80-375",
      products: "Legacy, Icon",
      behavior: "Sozinho, conhecimento de vinho, retorna regularmente",
    },
    {
      name: "Conhecedor de Vinhos",
      desc: "Qualidade, raridade, linguagem técnica",
      price: "€110-1000",
      products: "Legacy, Icon, HUNDRED",
      behavior: "Perguntas técnicas, aprecia complexidade",
    },
    {
      name: "Sem Conhecimento de Vinho",
      desc: "Simplicidade, prova, sem jargão",
      price: "€20-70",
      products: "Entrada, Cilindros",
      behavior: "Hesitante, pede recomendação, precisa de segurança",
    },
    {
      name: "Casal Premium",
      desc: "Experiência romântica, personalização de data",
      price: "Custom €80-200+",
      products: "Cubos, Madeira (personalizados)",
      behavior: "Querem memória partilhada, gravação em conjunto",
    },
    {
      name: "Grupo/Família",
      desc: "Múltiplos presentes, experiência de prova em grupo",
      price: "Mix de todas as gamas",
      products: "Todas as coleções",
      behavior: "Cada pessoa diferente, aprecia experiência coletiva",
    },
  ];

  return (
    <ModuleLayout
      moduleId="client-profiles"
      moduleNumber={12}
      title={isEN ? "Client Profiles & Personas" : "Perfis de Cliente & Personas"}
      subtitle={isEN ? "Know your customers. Understand their needs. Deliver the right experience." : "Conhece os teus clientes. Compreende as suas necessidades. Entrega a experiência certa."}
      heroImage={clientProfilesImg}
    >
      <ContentBlock title={isEN ? "Why Client Profiles Matter" : "Por que os Perfis de Cliente Importam"}>
        <p>{isEN
          ? "Every customer who enters The 100's has a unique story, background, and set of expectations. By understanding these eight client profiles, you can instantly recognize who is walking through the door and adapt your approach to maximize their experience and satisfaction."
          : "Cada cliente que entra no The 100's tem uma história única, um background e um conjunto de expectativas. Ao compreender estes oito perfis de cliente, podes reconhecer instantaneamente quem entra pela porta e adaptar a tua abordagem para maximizar a sua experiência e satisfação."}</p>
        <p>{isEN
          ? "This is not about stereotyping — it's about being perceptive, responsive, and authentic to each person's needs."
          : "Isto não é sobre estereótipos — é sobre ser perceptivo, responsivo e autêntico às necessidades de cada pessoa."}</p>
      </ContentBlock>

      <VideoBlock
        title="Perfis de Cliente"
        description="Os 8 perfis que vais encontrar na loja e como abordá-los."
        duration="13:45"
        poster={clientProfilesImg}
      />

      <ContentBlock title={isEN ? "The Eight Client Personas" : "As Oito Personas de Cliente"}>
        <p>{isEN
          ? "Master these personas and you will naturally know how to guide each visitor toward their perfect Memory Capsule."
          : "Domina estas personas e saberás naturalmente como guiar cada visitante hacia a sua Memory Capsule perfeita."}</p>
      </ContentBlock>

      <div className="space-y-4">
        {personas.map((persona, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/5 rounded-sm shrink-0">
                  <Users className="w-5 h-5 text-primary/60" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-light text-primary mb-1">{persona.name}</p>
                  <div className="space-y-2 text-sm text-foreground/60 font-light">
                    <p><span className="text-primary/70 font-medium">{isEN ? "Profile:" : "Perfil:"}</span> {persona.desc}</p>
                    <p><span className="text-primary/70 font-medium">{isEN ? "Price Range:" : "Intervalo de Preço:"}</span> {persona.price}</p>
                    <p><span className="text-primary/70 font-medium">{isEN ? "Products:" : "Produtos:"}</span> {persona.products}</p>
                    <p><span className="text-primary/70 font-medium">{isEN ? "Behavior:" : "Comportamento:"}</span> {persona.behavior}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ExpandableSection title={isEN ? "Adaptations for Each Persona" : "Adaptações para Cada Persona"}>
        <div className="space-y-4">
          <p className="text-sm text-foreground/70">{isEN
            ? "European Tourist: Use storytelling. Take time. Show the heritage. Personalization is key."
            : "Turista Europeu: Usa storytelling. Dedica tempo. Mostra a herança. Personalização é chave."}</p>
          <p className="text-sm text-foreground/70">{isEN
            ? "American Tourist: Show the premium experience, exclusive designs. Address TSA liquid rules early."
            : "Turista Americano: Mostra a experiência premium, designs exclusivos. Aborda as regras de líquidos TSA cedo."}</p>
          <p className="text-sm text-foreground/70">{isEN
            ? "Cruise Passenger: Be efficient. Have 2-3 curated options ready. Quick, memorable service."
            : "Cruzeirista: Sé eficiente. Tem 2-3 opções curadas prontas. Serviço rápido e memorável."}</p>
          <p className="text-sm text-foreground/70">{isEN
            ? "Local Resident: Build relationship. Premium collections. Loyalty program potential. Return visits."
            : "Residente Local: Constrói relacionamento. Coleções premium. Potencial de programa de fidelização. Visitas de retorno."}</p>
          <p className="text-sm text-foreground/70">{isEN
            ? "Wine Connoisseur: Technical language OK. Discuss complexity, aging, terroir. Offer rare editions."
            : "Conhecedor de Vinho: Linguagem técnica OK. Discute complexidade, envelhecimento, terroir. Oferece edições raras."}</p>
          <p className="text-sm text-foreground/70">{isEN
            ? "No Wine Knowledge: Simplify. Tasting session. No jargon. Build confidence. Guide naturally."
            : "Sem Conhecimento: Simplifica. Sessão de prova. Sem jargão. Constrói confiança. Guia naturalmente."}</p>
          <p className="text-sm text-foreground/70">{isEN
            ? "Premium Couple: Romance angle. Shared experience. Dual engraving. Memory building."
            : "Casal Premium: Ângulo romântico. Experiência partilhada. Gravação dupla. Construção de memória."}</p>
          <p className="text-sm text-foreground/70">{isEN
            ? "Group/Family: Engage each person. Multiple tastes. Multiple price points. Inclusive experience."
            : "Grupo/Família: Envolve cada pessoa. Múltiplos gostos. Múltiplos preços. Experiência inclusiva."}</p>
        </div>
      </ExpandableSection>

      <KeyTakeaway items={isEN ? [
        "Eight distinct client personas enter The 100's: European Tourist, American Tourist, Cruise Passenger, Local Resident, Wine Connoisseur, Non-Wine Knowledge, Premium Couple, Group/Family",
        "Each persona has different needs, budgets, time availability, and communication styles",
        "European Tourists want storytelling and personalization; Americans want exclusivity and wow factor",
        "Cruise passengers need speed and clarity; locals build long-term relationships",
        "Wine connoisseurs appreciate technical language; non-wine drinkers need simplicity and reassurance",
        "Recognize the persona in the first 30 seconds, then adapt your entire approach",
      ] : [
        "Oito personas de cliente distintas entram no The 100's: Turista Europeu, Turista Americano, Cruzeirista, Residente Local, Conhecedor de Vinho, Sem Conhecimento, Casal Premium, Grupo/Família",
        "Cada persona tem diferentes necessidades, orçamentos, disponibilidade de tempo e estilos de comunicação",
        "Turistas Europeus querem storytelling e personalização; Americanos querem exclusividade e wow factor",
        "Cruzeiristas precisam de rapidez e clareza; locais constroem relacionamentos a longo prazo",
        "Conhecedores de vinho apreciam linguagem técnica; quem não bebe precisa de simplicidade e segurança",
        "Reconheça a persona nos primeiros 30 segundos, depois adapte toda a sua abordagem",
      ]} />

      <ModuleQuizGate
        moduleId="client-profiles"
        questions={[
          { question: "Quantos perfis de cliente estão mapeados no The 100's?", options: ["4", "6", "8", "10"], correctIndex: 2 },
          { question: "Como identificar rapidamente um cruzeirista?", options: ["Veste roupa elegante", "Tem pouco tempo, anda em grupo, pergunta logo o preço", "Fala apenas inglês", "Entra sozinho e com calma"], correctIndex: 1 },
          { question: "Qual a melhor abordagem para um conhecedor de vinhos?", options: ["Evitar falar de vinhos", "Linguagem técnica, notas de prova, comparar com 750ml", "Focar apenas no packaging", "Oferecer o produto mais barato"], correctIndex: 1 },
          { question: "O que motiva o turista americano?", options: ["Preço baixo", "Gift impactante e wow factor", "Tradição portuguesa", "Rapidez no atendimento"], correctIndex: 1 },
          { question: "Como abordar um casal premium?", options: ["Ignorar e deixar explorar", "Criar momento especial, personalização com data do casal", "Ser direto sobre preços", "Sugerir apenas entry gifts"], correctIndex: 1 },
        ]}
      />

      <ReflectionBlock questions={isEN ? [
        "Think of a recent customer. Which persona did they most resemble? What clues helped you identify them?",
        "How would you approach an American tourist differently from a European tourist?",
        "Describe how you would serve a couple without wine knowledge who have 30 minutes.",
      ] : [
        "Pensa num cliente recente. Qual persona mais se assemelhava? Que pistas te ajudaram a identificá-la?",
        "Como aborderias um turista americano diferentemente de um turista europeu?",
        "Descreve como servias um casal sem conhecimento de vinho que tem 30 minutos.",
      ]} />
    </ModuleLayout>
  );
};

export default ModuleClientProfiles;
