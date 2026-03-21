import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ReflectionBlock, QuizBlock, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import storeImg from "@/assets/store-interior.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const ModuleStore = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const zones = isEN ? [
    {
      num: "01", zone: "Shop Window — Captação", emoji: "🪟",
      desc: "The first contact with the brand happens before visitors even enter the store.",
      details: [
        "A monumental glass ampoule in the window slowly releases wine drop by drop — a dramatic contrast with the fast pace of tourists on the street.",
        "A single 100ml bottle sits on a lit central podium, bathed in a single focused beam of light.",
        "The message is immediate and wordless: time moves differently here.",
      ],
    },
    {
      num: "02", zone: "Entrance — Exploração", emoji: "🏔️",
      desc: "The visitor steps inside and enters the Douro Valley.",
      details: [
        "The entrance uses stone blocks styled after the terraced slopes of the Douro Valley.",
        "Glass ampoules filled with wine in rich Ruby, Tawny and White tones hang from above, each illuminated in precise detail.",
        "The geography and terroir of Port wine production are rendered in physical space.",
      ],
    },
    {
      num: "03", zone: "Tasting — Experimentação", emoji: "🍬",
      desc: "The tasting experience breaks with tradition to create a vivid, unforgettable sensory memory.",
      details: [
        "Rather than a conventional glass of wine, the tasting is presented as intense gummies, gelatin, or small concentrated cubes and lollipops infused with the essence of the wine.",
        "The format creates a fast but deeply vivid memory — a sensory imprint that visitors carry long after they leave.",
        "This unexpected format sparks conversation, wonder and engagement.",
      ],
    },
    {
      num: "04", zone: "Memory Zone — Envolvimento", emoji: "💌",
      desc: "The emotional centrepiece of the store.",
      details: [
        "A large glass tube at the centre of the store contains suspended messages and memories from previous visitors.",
        "Visitors approach a screen and type a 'note to the future' — a personal message, a thought, a wish.",
        "Exactly one year later, the visitor receives an SMS or WhatsApp message reminding them of their visit — and offering a discount for a new purchase.",
        "This transforms a one-time visit into a lasting relationship between visitor and brand.",
      ],
    },
    {
      num: "05", zone: "Personalisation — Personalização", emoji: "⌚",
      desc: "The visitor makes the product uniquely theirs.",
      details: [
        "A gallery-style area where bottles are physically personalised on the spot.",
        "The visitor engraves a 'Time Stamp' directly onto the bottle: the exact date and time of a personal memory.",
        "The result is a bottle that is unique in the world — sealed at a specific second in time.",
      ],
    },
    {
      num: "06", zone: "Purchase & Farewell — Compra", emoji: "✨",
      desc: "The final act — a moment of quiet theatre.",
      details: [
        "The purchase area is a visual sanctuary: ordered, golden-lit, surrounded by the full collection.",
        "As the visitor moves toward the exit, a phrase is revealed in the floor — visible only from the perfect angle, under a hidden spotlight:",
        '"In your hands is a piece of time. At the end, what you do with it becomes the memory. See you next time..."',
        "The farewell is not a goodbye. It is an invitation to return.",
      ],
    },
  ] : [
    {
      num: "01", zone: "Montra — Captação", emoji: "🪟",
      desc: "O primeiro contacto com a marca acontece antes de os visitantes entrarem na loja.",
      details: [
        "Uma ampola de vidro monumental na montra liberta vinho gota a gota — um contraste dramático com o ritmo acelerado dos turistas na rua.",
        "Uma única garrafa de 100ml assenta num pódio central iluminado, banhada por um único feixe de luz focado.",
        "A mensagem é imediata e silenciosa: o tempo move-se de forma diferente aqui.",
      ],
    },
    {
      num: "02", zone: "Entrada — Exploração", emoji: "🏔️",
      desc: "O visitante entra e chega ao Vale do Douro.",
      details: [
        "A entrada usa blocos de pedra inspirados nas encostas em socalcos do Vale do Douro.",
        "Ampolas de vidro cheias de vinho nos tons Ruby, Tawny e Branco pendem do teto, cada uma iluminada em detalhe preciso.",
        "A geografia e o terroir da produção do Vinho do Porto são materializados no espaço físico.",
      ],
    },
    {
      num: "03", zone: "Prova — Experimentação", emoji: "🍬",
      desc: "A experiência de prova rompe com a tradição para criar uma memória sensorial vívida e inesquecível.",
      details: [
        "Em vez de um copo de vinho convencional, a prova é apresentada como gomas intensas, gelatina ou pequenos cubos e pirulitos concentrados com a essência do vinho.",
        "O formato cria uma memória rápida mas profundamente vívida — uma impressão sensorial que os visitantes transportam muito depois de partir.",
        "Este formato inesperado gera conversa, admiração e envolvimento.",
      ],
    },
    {
      num: "04", zone: "Zona de Memória — Envolvimento", emoji: "💌",
      desc: "O peça emocional central da loja.",
      details: [
        "Um grande tubo de vidro no centro da loja contém mensagens e memórias suspensas de visitantes anteriores.",
        "Os visitantes aproximam-se de um ecrã e escrevem uma 'nota para o futuro' — uma mensagem pessoal, um pensamento, um desejo.",
        "Exatamente um ano depois, o visitante recebe um SMS ou WhatsApp a lembrá-lo da sua visita — e a oferecer um desconto para uma nova compra.",
        "Isto transforma uma visita única numa relação duradoura entre visitante e marca.",
      ],
    },
    {
      num: "05", zone: "Personalização — Personalização", emoji: "⌚",
      desc: "O visitante torna o produto exclusivamente seu.",
      details: [
        "Uma área de estilo galeria onde as garrafas são fisicamente personalizadas no momento.",
        "O visitante grava um 'Carimbo de Tempo' diretamente na garrafa: a data e hora exatas de uma memória pessoal.",
        "O resultado é uma garrafa única no mundo — selada num segundo específico no tempo.",
      ],
    },
    {
      num: "06", zone: "Compra e Despedida — Compra", emoji: "✨",
      desc: "O ato final — um momento de teatro tranquilo.",
      details: [
        "A área de compra é um santuário visual: ordenado, com luz dourada, rodeado pela coleção completa.",
        "À medida que o visitante se move para a saída, uma frase é revelada no chão — visível apenas do ângulo perfeito, sob um holofote escondido:",
        '"Nas tuas mãos está um pedaço de tempo. No final, o que fizeres com ele torna-se a memória. Até à próxima..."',
        "A despedida não é um adeus. É um convite para regressar.",
      ],
    },
  ];

  return (
    <ModuleLayout
      moduleId="store"
      moduleNumber={5}
      title={isEN ? "The Store Experience" : "A Experiência da Loja"}
      subtitle={isEN ? "The store is a time capsule. Visitors enter another world." : "A loja é uma cápsula do tempo. Os visitantes entram noutro mundo."}
      heroImage={storeImg}
    >
      <ContentBlock title={isEN ? "A Time Capsule, Not a Shop" : "Uma Cápsula do Tempo, Não uma Loja"}>
        <p>{isEN
          ? "When visitors enter The 100's, they should feel like they are stepping into a different dimension of time. The store is not a retail space — it is an immersive experience."
          : "Quando os visitantes entram no The 100's, devem sentir que estão a entrar numa dimensão diferente do tempo. A loja não é um espaço de retalho — é uma experiência imersiva."}</p>
        <p>{isEN
          ? "Think of it as a gallery, a museum, a memory vault. Every detail — light, sound, material, scent — is carefully curated to create a moment of contemplation."
          : "Pensa nela como uma galeria, um museu, um cofre de memórias. Cada detalhe — luz, som, material, aroma — é cuidadosamente curado para criar um momento de contemplação."}</p>
      </ContentBlock>

      <ImageBlock src={storeImg} alt={isEN ? "Store interior" : "Interior da loja"} caption={isEN ? "The store experience — museum meets time capsule" : "A experiência da loja — museu encontra cápsula do tempo"} />

      <VideoBlock
        title="A Experiência em Loja"
        description="O percurso do cliente desde a montra até à compra."
        duration="10:00"
        poster={storeImg}
      />

      <ContentBlock title={isEN ? "The Six-Zone Customer Journey" : "A Jornada do Cliente em Seis Zonas"}>
        <p>{isEN
          ? "The store is divided into six distinct zones, each designed to move the visitor through a specific emotional state — from first impression to lasting memory."
          : "A loja está dividida em seis zonas distintas, cada uma concebida para mover o visitante por um estado emocional específico — da primeira impressão à memória duradoura."}</p>
      </ContentBlock>

      <div className="space-y-8">
        {zones.map(zone => (
          <ScrollReveal key={zone.num}>
            <div className="border border-border/30 overflow-hidden">
              <div className="flex items-center gap-6 px-8 py-6 border-b border-border/20 bg-card/20">
                <span className="text-3xl font-light text-primary/20 shrink-0">{zone.num}</span>
                <div>
                  <p className="text-lg font-light text-primary">{zone.zone}</p>
                  <p className="text-sm text-foreground/50 font-light italic mt-0.5">{zone.desc}</p>
                </div>
              </div>
              <div className="px-8 py-6 space-y-3">
                {zone.details.map((detail, i) => (
                  <p key={i} className={`text-sm font-light leading-relaxed ${detail.startsWith('"') ? "text-primary/70 italic text-base" : "text-foreground/60"}`}>{detail}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Why the Experience Matters" : "Por Que a Experiência Importa"}>
        <p>{isEN
          ? "Every element of the store is designed with purpose. The drip of wine in the window, the scent in the entrance, the unexpected tasting format, the personal message sealed in glass — each moment is engineered to create an emotional memory that lasts long after the visit."
          : "Cada elemento da loja é concebido com propósito. A gota de vinho na montra, o aroma na entrada, o formato inesperado de prova, a mensagem pessoal selada no vidro — cada momento é projetado para criar uma memória emocional que dura muito após a visita."}</p>
        <p>{isEN
          ? "The store does not simply sell wine. It sells time. And the visitor leaves carrying a piece of it."
          : "A loja não vende simplesmente vinho. Vende tempo. E o visitante parte a carregar um pedaço dele."}</p>
      </ContentBlock>

      <KeyTakeaway items={isEN ? [
        "Six distinct zones: Window, Entrance, Tasting, Memory Zone, Personalisation, Purchase",
        "The giant ampoule in the window creates a first impression before visitors even enter",
        "The Memory Zone glass tube: visitors leave a note, receive an SMS reminder exactly 1 year later",
        "Tasting uses gummies, gelatin or lollipops — unexpected, memorable, sensory",
        "Personalisation engraves a unique Time Stamp directly onto the bottle",
        "Farewell inscription on the floor: visible only from the perfect angle under a hidden spotlight"
      ] : [
        "Seis zonas distintas: Montra, Entrada, Prova, Zona de Memória, Personalização, Compra",
        "A ampola gigante na montra cria uma primeira impressão antes de os visitantes entrarem",
        "O tubo de vidro da Zona de Memória: os visitantes deixam uma nota, recebem um SMS exatamente 1 ano depois",
        "A prova usa gomas, gelatina ou pirulitos — inesperado, memorável, sensorial",
        "A Personalização grava um Carimbo de Tempo único diretamente na garrafa",
        "Inscrição de despedida no chão: visível apenas do ângulo perfeito sob um holofote escondido"
      ]} />

      <QuizBlock moduleId="store" questions={isEN ? [
        { question: "What is visible in the shop window to attract visitors from the street?", options: ["A digital screen showing wine statistics", "A giant ampoule slowly releasing wine drop by drop", "A wall of product bottles", "A live tasting demonstration"], correct: 1 },
        { question: "What happens exactly one year after a visitor leaves a message in the Memory Zone?", options: ["Their message appears on social media", "They receive a free bottle by post", "They receive an SMS or WhatsApp reminding them of the visit and offering a discount", "Their message is printed and framed"], correct: 2 },
        { question: "What is the correct order of the six-zone customer journey?", options: ["Entrance, Window, Tasting, Purchase, Memory Zone, Personalisation", "Window, Entrance, Tasting, Memory Zone, Personalisation, Purchase", "Tasting, Entrance, Memory Zone, Window, Personalisation, Purchase", "Window, Tasting, Memory Zone, Entrance, Purchase, Personalisation"], correct: 1 },
      ] : [
        { question: "O que é visível na montra para atrair visitantes da rua?", options: ["Um ecrã digital com estatísticas de vinho", "Uma ampola gigante a libertar vinho gota a gota", "Uma parede de garrafas de produto", "Uma demonstração de prova ao vivo"], correct: 1 },
        { question: "O que acontece exatamente um ano depois de um visitante deixar uma mensagem na Zona de Memória?", options: ["A mensagem aparece nas redes sociais", "Recebem uma garrafa grátis por correio", "Recebem um SMS ou WhatsApp a lembrá-los da visita e a oferecer um desconto", "A mensagem é impressa e emoldurada"], correct: 2 },
        { question: "Qual é a ordem correta da jornada do cliente em seis zonas?", options: ["Entrada, Montra, Prova, Compra, Zona de Memória, Personalização", "Montra, Entrada, Prova, Zona de Memória, Personalização, Compra", "Prova, Entrada, Zona de Memória, Montra, Personalização, Compra", "Montra, Prova, Zona de Memória, Entrada, Compra, Personalização"], correct: 1 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "Describe how you would guide a visitor through all six zones. What would you say at each stage?",
        "Why is the Memory Zone important for the long-term business strategy of The 100's?",
        "How does the unconventional tasting format reinforce the brand philosophy?"
      ] : [
        "Descreve como guiarias um visitante por todas as seis zonas. O que dirias em cada etapa?",
        "Por que é a Zona de Memória importante para a estratégia de negócio a longo prazo do The 100's?",
        "Como é que o formato de prova não convencional reforça a filosofia da marca?"
      ]} />

      <ModuleQuizGate
        moduleId="store"
        questions={[
          { question: "Qual é a jornada do cliente na loja The 100's?", options: ["Entrada → Pagamento → Saída", "Montra → Entrada → Provas → Memória → Personalização → Compra", "Entrada → Escolha → Embrulho", "Montra → Degustação → Saída"], correctIndex: 1 },
          { question: "Quantos pisos tem a loja do Porto?", options: ["1 piso", "2 pisos", "3 pisos", "4 pisos"], correctIndex: 2 },
          { question: "O que deve acontecer na zona de personalização?", options: ["O cliente espera na fila", "Gravação UV/Laser ao vivo com nome, data ou mensagem", "Apenas pagamento", "Embrulho standard"], correctIndex: 1 },
          { question: "Onde fica a loja The 100's no Porto?", options: ["Ribeira", "Rua Sá da Bandeira, 150", "Avenida dos Aliados", "Rua das Flores"], correctIndex: 1 },
          { question: "Qual é o papel da montra na experiência de loja?", options: ["Apenas decoração", "Captar atenção e despertar curiosidade", "Mostrar preços", "Bloquear a visão do interior"], correctIndex: 1 },
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleStore;
