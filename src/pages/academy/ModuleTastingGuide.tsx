import { ModuleLayout, ContentBlock, KeyTakeaway, ImageBlock, ExpandableSection, ReflectionBlock, QuizBlock } from "@/components/ModuleComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import tastingImg from "@/assets/academy/tasting-ritual.jpg";
import portWineImg from "@/assets/academy/port-wine-pour.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { Wine, Clock, Eye, Droplets, Heart, MessageCircle } from "lucide-react";

const ModuleTastingGuide = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const ritualSteps = isEN ? [
    {
      num: "01", icon: MessageCircle, title: "The Welcome",
      phrase: '"Leave your time behind. You\'re entering a time capsule."',
      desc: "Greet the visitor with calm confidence. Never rush. The first 10 seconds set the tone for the entire experience.",
      tips: [
        "Make eye contact and smile warmly — you are the guardian of this space.",
        "If they seem curious, say: 'Would you like to discover what a Memory Capsule is?'",
        "If they are in a hurry, respect that: 'Take your time — the capsules aren't going anywhere.'",
      ],
    },
    {
      num: "02", icon: Eye, title: "The Discovery",
      phrase: '"Each capsule holds a piece of time — 100ml of Port wine history."',
      desc: "Guide them gently through the space. Let the products speak. Point, don't push.",
      tips: [
        "Let them touch the materials — cork, ceramic, wood, brass.",
        "Mention the Second Life concept: 'Once the wine is gone, this becomes a decorative object.'",
        "Connect to their trip: 'Where are you visiting from? This will remind you of Porto forever.'",
      ],
    },
    {
      num: "03", icon: Wine, title: "The Tasting",
      phrase: '"This isn\'t just wine — it\'s a sensory memory."',
      desc: "The tasting is the emotional climax of the visit. It uses unconventional formats — gummies, gelatin cubes, lollipops — infused with Port wine essence.",
      tips: [
        "Always start with the youngest (Tawny 10y) and progress to older (30y, 50y).",
        "Describe what they'll taste: 'Caramel, dried fruit, a hint of spice — the signature of decades in the barrel.'",
        "Ask them to close their eyes: 'Now imagine 30 years condensed into this moment.'",
        "If they try the White: 'This one is lighter — honey, citrus, almonds. Summer in a capsule.'",
      ],
    },
    {
      num: "04", icon: Heart, title: "The Emotional Connection",
      phrase: '"What moment in your life would you seal in time?"',
      desc: "Guide them to the Memory Zone. This is where the visit transforms from a shopping experience into a personal story.",
      tips: [
        "Encourage them to write a note to their future self.",
        "Mention the 1-year reminder: 'Exactly one year from now, you'll receive a message with this memory.'",
        "If they hesitate: 'It can be anything — a wish, a feeling, a name. It's yours.'",
      ],
    },
    {
      num: "05", icon: Clock, title: "The Personalisation",
      phrase: '"This bottle now belongs to a single moment in history."',
      desc: "If they want to personalise, guide them to the engraving station. The Time Stamp is what makes it unique in the world.",
      tips: [
        "Explain: 'You choose the date and time — a birthday, an anniversary, today.'",
        "Emphasise uniqueness: 'No other bottle in the world will carry this exact second.'",
        "This is a strong upsell moment — it adds emotional value far beyond the price.",
      ],
    },
    {
      num: "06", icon: Droplets, title: "The Farewell",
      phrase: '"In your hands is a piece of time."',
      desc: "The final act is quiet theatre. As they approach the exit, let the store do the work.",
      tips: [
        "Don't rush the checkout. Wrap the product carefully, as if sealing a gift.",
        "If they notice the floor inscription, let them read it in silence.",
        "Final words: 'Thank you for visiting. Until next time — carry this piece of time with you.'",
      ],
    },
  ] : [
    {
      num: "01", icon: MessageCircle, title: "A Boas-Vindas",
      phrase: '"Leave your time behind. Estás a entrar numa cápsula do tempo."',
      desc: "Recebe o visitante com calma e confiança. Nunca apresses. Os primeiros 10 segundos definem o tom de toda a experiência.",
      tips: [
        "Faz contacto visual e sorri — és o guardião deste espaço.",
        "Se parecem curiosos: 'Gostariam de descobrir o que é uma Cápsula de Memória?'",
        "Se estão com pressa: 'Tomem o vosso tempo — as cápsulas não vão a lado nenhum.'",
      ],
    },
    {
      num: "02", icon: Eye, title: "A Descoberta",
      phrase: '"Cada cápsula guarda um pedaço de tempo — 100ml de história do Vinho do Porto."',
      desc: "Guia-os suavemente pelo espaço. Deixa os produtos falarem. Aponta, não empurres.",
      tips: [
        "Deixa-os tocar nos materiais — cortiça, cerâmica, madeira, latão.",
        "Menciona o conceito de Segunda Vida: 'Quando o vinho acabar, isto torna-se um objeto decorativo.'",
        "Liga à viagem: 'De onde vêm? Isto vai lembrá-los do Porto para sempre.'",
      ],
    },
    {
      num: "03", icon: Wine, title: "A Prova",
      phrase: '"Isto não é apenas vinho — é uma memória sensorial."',
      desc: "A prova é o clímax emocional da visita. Usa formatos não convencionais — gomas, cubos de gelatina, pirulitos — infundidos com essência de Vinho do Porto.",
      tips: [
        "Começa sempre pelo mais jovem (Tawny 10 anos) e progride para os mais velhos (30, 50 anos).",
        "Descreve o que vão provar: 'Caramelo, fruta seca, um toque de especiaria — a assinatura de décadas em barril.'",
        "Pede-lhes para fechar os olhos: 'Agora imagina 30 anos condensados neste momento.'",
        "Se provarem o Branco: 'Este é mais leve — mel, citrinos, amêndoas. O verão numa cápsula.'",
      ],
    },
    {
      num: "04", icon: Heart, title: "A Conexão Emocional",
      phrase: '"Que momento da tua vida selarias no tempo?"',
      desc: "Guia-os até à Zona de Memória. É aqui que a visita se transforma de experiência de compra em história pessoal.",
      tips: [
        "Encoraja-os a escrever uma nota para o seu eu futuro.",
        "Menciona o lembrete de 1 ano: 'Daqui a exatamente um ano, vão receber uma mensagem com esta memória.'",
        "Se hesitarem: 'Pode ser qualquer coisa — um desejo, um sentimento, um nome. É vosso.'",
      ],
    },
    {
      num: "05", icon: Clock, title: "A Personalização",
      phrase: '"Esta garrafa pertence agora a um único momento na história."',
      desc: "Se quiserem personalizar, guia-os à estação de gravação. O Carimbo de Tempo é o que a torna única no mundo.",
      tips: [
        "Explica: 'Escolhem a data e hora — um aniversário, uma data especial, hoje.'",
        "Enfatiza a unicidade: 'Nenhuma outra garrafa no mundo terá este segundo exato.'",
        "Este é um forte momento de upsell — acrescenta valor emocional muito além do preço.",
      ],
    },
    {
      num: "06", icon: Droplets, title: "A Despedida",
      phrase: '"Nas tuas mãos está um pedaço de tempo."',
      desc: "O ato final é teatro silencioso. Quando se aproximam da saída, deixa a loja fazer o trabalho.",
      tips: [
        "Não apresses o checkout. Embrulha o produto com cuidado, como se selasses um presente.",
        "Se notarem a inscrição no chão, deixa-os ler em silêncio.",
        "Palavras finais: 'Obrigado por visitarem. Até à próxima — levem este pedaço de tempo convosco.'",
      ],
    },
  ];

  const dosDonts = isEN ? {
    dos: [
      "Speak slowly and calmly — match the rhythm of the store",
      "Let them explore before offering guidance",
      "Ask open questions: 'What brings you to Porto?'",
      "Always offer a tasting — it's the key to emotional engagement",
      "Use storytelling: connect age of wine to their personal timeline",
      "Handle products with visible care and respect",
    ],
    donts: [
      "Never say 'Can I help you?' — say 'Welcome to The 100's' instead",
      "Never push a sale — the experience sells itself",
      "Don't describe it as 'a shop' — it's 'an experience' or 'a time capsule'",
      "Don't rush the tasting — silence is part of the moment",
      "Never compare to competitors — The 100's is in a category of its own",
      "Don't ignore children — offer them the non-alcoholic story too",
    ],
  } : {
    dos: [
      "Fala devagar e com calma — acompanha o ritmo da loja",
      "Deixa-os explorar antes de oferecer orientação",
      "Faz perguntas abertas: 'O que vos traz ao Porto?'",
      "Oferece sempre uma prova — é a chave do envolvimento emocional",
      "Usa storytelling: liga a idade do vinho à timeline pessoal deles",
      "Manuseia os produtos com cuidado e respeito visíveis",
    ],
    donts: [
      "Nunca digas 'Posso ajudar?' — diz 'Bem-vindos ao The 100's'",
      "Nunca forces uma venda — a experiência vende-se sozinha",
      "Não descrevas como 'uma loja' — é 'uma experiência' ou 'uma cápsula do tempo'",
      "Não apresses a prova — o silêncio faz parte do momento",
      "Nunca compares com concorrentes — o The 100's está numa categoria própria",
      "Não ignores crianças — oferece-lhes a história não-alcoólica também",
    ],
  };

  return (
    <ModuleLayout
      moduleId="tasting-guide"
      moduleNumber={9}
      title={isEN ? "Tasting Guide & Sales Ritual" : "Guia de Prova & Ritual de Vendas"}
      subtitle={isEN ? "The art of presenting The 100's — every word, every gesture matters." : "A arte de apresentar o The 100's — cada palavra, cada gesto conta."}
      heroImage={tastingImg}
    >
      <ContentBlock title={isEN ? "You Are the Experience" : "Tu És a Experiência"}>
        <p>{isEN
          ? "At The 100's, you are not a salesperson — you are a storyteller, a guide, a guardian of time. The way you speak, move and connect with visitors defines whether they leave with a product or with a memory."
          : "No The 100's, não és um vendedor — és um contador de histórias, um guia, um guardião do tempo. A forma como falas, te moves e te conectas com os visitantes define se saem com um produto ou com uma memória."}</p>
        <p>{isEN
          ? "This module teaches you the complete ritual: from the moment they see the window to the moment they walk out carrying a piece of time."
          : "Este módulo ensina-te o ritual completo: desde o momento em que veem a montra até ao momento em que saem a carregar um pedaço de tempo."}</p>
      </ContentBlock>

      <ContentBlock title={isEN ? "The Six-Step Sales Ritual" : "O Ritual de Vendas em Seis Passos"}>
        <p>{isEN
          ? "Each step corresponds to a zone in the store. Your role changes at each stage — from host, to guide, to sommelier, to confidant."
          : "Cada passo corresponde a uma zona na loja. O teu papel muda em cada etapa — de anfitrião, a guia, a sommelier, a confidente."}</p>
      </ContentBlock>

      <div className="space-y-8">
        {ritualSteps.map((step) => {
          const Icon = step.icon;
          return (
            <ScrollReveal key={step.num}>
              <div className="border border-border/30 overflow-hidden group hover:border-primary/20 transition-all duration-500">
                <div className="flex items-center gap-6 px-8 py-6 border-b border-border/20 bg-card/20">
                  <span className="text-3xl font-light text-primary/20 shrink-0">{step.num}</span>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-primary/5 rounded-sm">
                      <Icon className="w-5 h-5 text-primary/60" />
                    </div>
                    <div>
                      <p className="text-lg font-light text-primary">{step.title}</p>
                      <p className="text-sm text-foreground/50 font-light italic mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-6 space-y-4">
                  <p className="text-primary/70 italic text-base font-light border-l-2 border-primary/30 pl-4">{step.phrase}</p>
                  <div className="space-y-2 pt-2">
                    {step.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                        <p className="text-sm text-foreground/60 font-light leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ContentBlock title={isEN ? "The Tasting — Sensory Breakdown" : "A Prova — Análise Sensorial"}>
        <p>{isEN
          ? "When presenting the tasting, guide visitors through three sensory layers:"
          : "Ao apresentar a prova, guia os visitantes por três camadas sensoriais:"}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(isEN ? [
          { title: "Visual", icon: "👁️", desc: "Notice the colour — amber for Tawny (decades in wood), golden for White, deep ruby for younger. Each colour tells an age story." },
          { title: "Aroma", icon: "👃", desc: "Dried fruit, caramel, vanilla, honey, spices. Ask them to identify what they smell — it makes the experience personal." },
          { title: "Taste", icon: "👅", desc: "Sweetness, warmth, complexity. The finish lingers — that's decades of patience in every drop. The longer it lasts, the older the wine." },
        ] : [
          { title: "Visual", icon: "👁️", desc: "Repara na cor — âmbar para Tawny (décadas em madeira), dourado para Branco, rubi profundo para os mais jovens. Cada cor conta uma idade." },
          { title: "Aroma", icon: "👃", desc: "Fruta seca, caramelo, baunilha, mel, especiarias. Pede-lhes para identificar o que cheiram — torna a experiência pessoal." },
          { title: "Sabor", icon: "👅", desc: "Doçura, calor, complexidade. O final persiste — são décadas de paciência em cada gota. Quanto mais dura, mais velho é o vinho." },
        ]).map(sense => (
          <ScrollReveal key={sense.title}>
            <div className="border border-border/30 p-6 hover:border-primary/20 transition-all duration-500 h-full">
              <p className="text-2xl mb-3">{sense.icon}</p>
              <p className="text-primary font-light text-lg mb-2">{sense.title}</p>
              <p className="text-sm text-foreground/60 font-light leading-relaxed">{sense.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ContentBlock title={isEN ? "Do's & Don'ts" : "O que Fazer e Não Fazer"}>
        <p>{isEN
          ? "These guidelines separate a good visit from an unforgettable one."
          : "Estas orientações separam uma boa visita de uma inesquecível."}</p>
      </ContentBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScrollReveal>
          <div className="border border-primary/20 bg-primary/[0.03] p-8 h-full">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">✓ {isEN ? "DO" : "FAZER"}</p>
            <div className="space-y-3">
              {dosDonts.dos.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-sm text-foreground/70 font-light">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="border border-destructive/20 bg-destructive/[0.03] p-8 h-full">
            <p className="text-xs tracking-[0.3em] uppercase text-destructive mb-6">✗ {isEN ? "DON'T" : "NÃO FAZER"}</p>
            <div className="space-y-3">
              {dosDonts.donts.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0" />
                  <p className="text-sm text-foreground/70 font-light">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ExpandableSection title={isEN ? "Handling Difficult Situations" : "Lidar com Situações Difíceis"}>
        <p><strong>{isEN ? "\"It's too expensive\"" : "\"É muito caro\""}</strong></p>
        <p>{isEN
          ? "→ Never defend the price. Redirect: 'You're not buying a bottle of wine — you're buying a piece of time. This Tawny has been aging for 30 years, waiting for this exact moment.'"
          : "→ Nunca defendas o preço. Redireciona: 'Não estás a comprar uma garrafa de vinho — estás a comprar um pedaço de tempo. Este Tawny envelheceu 30 anos, à espera deste momento exato.'"}</p>
        <p><strong>{isEN ? "\"I don't drink wine\"" : "\"Eu não bebo vinho\""}</strong></p>
        <p>{isEN
          ? "→ 'That's perfectly fine! The beauty of The 100's is the object itself. Many of our clients buy these as decorative pieces — candle holders, diffusers. And we have olive oil too.'"
          : "→ 'Sem problema! A beleza do The 100's é o próprio objeto. Muitos dos nossos clientes compram como peças decorativas — suportes de velas, difusores. E temos também azeite.'"}</p>
        <p><strong>{isEN ? "\"I'm just looking\"" : "\"Estou só a ver\""}</strong></p>
        <p>{isEN
          ? "→ 'Of course. Feel free to explore — this is a time capsule, not a shop. If anything catches your eye, I'm here.'"
          : "→ 'Claro. Explora à vontade — isto é uma cápsula do tempo, não uma loja. Se algo chamar a atenção, estou aqui.'"}</p>
      </ExpandableSection>

      <KeyTakeaway items={isEN ? [
        "You are not selling wine — you are guiding visitors through a time capsule experience",
        "Six-step ritual: Welcome → Discovery → Tasting → Emotion → Personalisation → Farewell",
        "The tasting uses unconventional formats (gummies, cubes, lollipops) — it's a sensory memory",
        "Always start with younger wines and progress to older — build the journey",
        "Never push a sale. The experience, the story and the materials sell the product",
        "The farewell is as important as the welcome — make them feel they carry time with them",
      ] : [
        "Não estás a vender vinho — estás a guiar visitantes por uma experiência de cápsula do tempo",
        "Ritual em seis passos: Boas-Vindas → Descoberta → Prova → Emoção → Personalização → Despedida",
        "A prova usa formatos não convencionais (gomas, cubos, pirulitos) — é uma memória sensorial",
        "Começa sempre pelos vinhos mais jovens e progride para os mais velhos — constrói a jornada",
        "Nunca forces uma venda. A experiência, a história e os materiais vendem o produto",
        "A despedida é tão importante como as boas-vindas — faz sentir que levam tempo com eles",
      ]} />

      <QuizBlock moduleId="tasting-guide" questions={isEN ? [
        { question: "What should you say instead of 'Can I help you?'", options: ["'What are you looking for?'", "'Welcome to The 100's'", "'Would you like to buy something?'", "'Are you looking for wine?'"], correct: 1 },
        { question: "In which order should you present wines during a tasting?", options: ["White first, then Tawny", "Oldest to youngest", "Youngest to oldest", "Random order for surprise"], correct: 2 },
        { question: "A visitor says 'It's too expensive.' What's the best response?", options: ["Offer a discount", "Explain production costs", "Redirect to the emotional value of time sealed in the bottle", "Suggest the cheapest product"], correct: 2 },
      ] : [
        { question: "O que deves dizer em vez de 'Posso ajudar?'", options: ["'O que procura?'", "'Bem-vindo ao The 100's'", "'Quer comprar algo?'", "'Está à procura de vinho?'"], correct: 1 },
        { question: "Em que ordem deves apresentar os vinhos numa prova?", options: ["Branco primeiro, depois Tawny", "Do mais velho para o mais novo", "Do mais novo para o mais velho", "Ordem aleatória para surpresa"], correct: 2 },
        { question: "Um visitante diz 'É muito caro.' Qual a melhor resposta?", options: ["Oferecer desconto", "Explicar custos de produção", "Redirecionar para o valor emocional do tempo selado na garrafa", "Sugerir o produto mais barato"], correct: 2 },
      ]} />

      <ReflectionBlock questions={isEN ? [
        "Write your own version of the Welcome phrase. How would you make a visitor feel they've entered a different world?",
        "A couple visits the store. She loves wine, he doesn't drink. How do you engage both of them?",
        "Describe a moment during a tasting where you would use silence instead of words. Why?",
      ] : [
        "Escreve a tua versão da frase de Boas-Vindas. Como farias um visitante sentir que entrou noutro mundo?",
        "Um casal visita a loja. Ela adora vinho, ele não bebe. Como os envolves a ambos?",
        "Descreve um momento durante uma prova em que usarias silêncio em vez de palavras. Porquê?",
      ]} />
    </ModuleLayout>
  );
};

export default ModuleTastingGuide;
