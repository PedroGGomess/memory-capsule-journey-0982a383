import { useState } from "react";
import { ModuleLayout } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  SlideViewer,
  TipBlock,
  PhraseCard,
  type Phase,
  type Slide,
  type QuizQuestion,
} from "@/components/InteractiveModule";
import { useLanguage } from "@/contexts/LanguageContext";
import { RotateCcw } from "lucide-react";

// Import hero image
import heroDrop from "@/assets/hero-drop.jpg";

export default function ModuleGlossaryVocab() {
  const { language } = useLanguage();
  const isEN = language === "en";
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // PHASE 1: Port Wine Terms
  const phase1Slides: Slide[] = [
    {
      title: isEN ? "Port Wine Terminology" : "Terminologia de Vinho do Porto",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Understanding Port Wine terminology is essential for credible communication with customers. Below are key terms and their definitions."
              : "Compreender a terminologia do Vinho do Porto é essencial para comunicação credível com clientes. Abaixo estão termos-chave e suas definições."}
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Tawny" : "Tawny"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "A style of Port Wine aged in oak, developing a light amber-brown colour. Ranges from basic (3 years) to 40+ years. Smooth, slightly sweet, nutty notes."
                  : "Um estilo de Vinho do Porto envelhecido em carvalho, desenvolvendo uma cor âmbar-marrom claro. Varia de básico (3 anos) a 40+ anos. Suave, ligeiramente doce, notas de noz."}
              </p>
            </div>

            <div className="bg-blue-500/5 border-l-4 border-blue-500 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Ruby" : "Ruby"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "Port Wine aged in bottle, maintaining deep ruby-red colour. Fruit-forward, less oxidized than Tawny. Younger, more vibrant."
                  : "Vinho do Porto envelhecido em garrafa, mantendo cor vermelho-rubi profunda. Orientado para frutas, menos oxidado que Tawny. Mais jovem, mais vibrante."}
              </p>
            </div>

            <div className="bg-purple-500/5 border-l-4 border-purple-500 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Vintage" : "Vintage"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "Port from a single exceptional harvest year. Declared only in great years. Aged 2 years in oak, then 10+ years in bottle. Powerful, complex, investment-grade."
                  : "Porto de uma safra excepcional única. Declarado apenas em grandes anos. Envelhecido 2 anos em carvalho, depois 10+ anos em garrafa. Poderoso, complexo, classe de investimento."}
              </p>
            </div>

            <div className="bg-amber-500/5 border-l-4 border-amber-600 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "LBV (Late Bottled Vintage)" : "LBV (Vintage Engarrafado Tardiamente)"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "Port from a single year, aged 4–6 years in oak (longer than Vintage). Bottled 'late' in the process. Bridge between Vintage and Tawny styles. Good aging potential."
                  : "Porto de um único ano, envelhecido 4–6 anos em carvalho (mais longo que Vintage). Engarrafado 'tarde' no processo. Ponte entre estilos Vintage e Tawny. Bom potencial de envelhecimento."}
              </p>
            </div>

            <div className="bg-red-500/5 border-l-4 border-red-600 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Colheita (Single Harvest)" : "Colheita (Safra Única)"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "Tawny Port from a single harvest year, aged minimum 7 years in oak. Label shows vintage year. More complexity than basic Tawny."
                  : "Porto Tawny de uma safra única, envelhecido mínimo 7 anos em carvalho. Rótulo mostra ano da safra. Mais complexidade que Tawny básico."}
              </p>
            </div>

            <div className="bg-yellow-500/5 border-l-4 border-yellow-600 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "ABV / Vol.Alc." : "ABV / Vol.Alc."}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "Alcohol by Volume. Port Wine typically 19–20% ABV (fortified wine). Higher than table wines."
                  : "Álcool por Volume. Vinho do Porto tipicamente 19–20% ABV (vinho fortificado). Maior que vinhos de mesa."}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: isEN ? "Tasting & Pairing Vocabulary" : "Vocabulário de Degustação e Pareamento",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "When describing Port Wine to customers, use these tasting notes and descriptors:"
              : "Ao descrever Vinho do Porto para clientes, use estas notas de degustação e descritores:"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Colour:" : "Cor:"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Ruby, garnet, tawny, amber"
                  : "Rubi, granada, tawny, âmbar"}
              </p>
            </div>
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Aroma:" : "Aroma:"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Dark fruit, stone fruit, caramel, spice, chocolate, leather, tobacco"
                  : "Fruta escura, fruta de caroço, caramelo, especiaria, chocolate, couro, tabaco"}
              </p>
            </div>
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Palate:" : "Paladar:"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Dry, off-dry, slightly sweet, sweet"
                  : "Seco, meio-seco, ligeiramente doce, doce"}
              </p>
            </div>
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Body:" : "Corpo:"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Light, medium, full-bodied"
                  : "Leve, médio, encorpado"}
              </p>
            </div>
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Finish:" : "Finalização:"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Short, medium, long (how long flavour lingers)"
                  : "Curta, média, longa (quanto tempo o sabor permanece)"}
              </p>
            </div>
            <div className="bg-foreground/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Pairing:" : "Pareamento:"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Cheese, chocolate, nuts, cured meats"
                  : "Queijo, chocolate, nozes, carnes curadas"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const phase1Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "What does ABV stand for and what is typical for Port Wine?"
        : "O que ABV significa e qual é típico para Vinho do Porto?",
      options: [
        isEN
          ? "Alcohol By Volume; 12-14% (like table wine)"
          : "Álcool Por Volume; 12-14% (como vinho de mesa)",
        isEN
          ? "Alcohol By Volume; 19-20% (fortified)"
          : "Álcool Por Volume; 19-20% (fortificado)",
        isEN
          ? "Average Bottle Volume; 750ml"
          : "Volume Médio de Garrafa; 750ml",
        isEN
          ? "Alcohol Beverage Value; pricing metric"
          : "Valor de Bebida Alcoólica; métrica de preço",
      ],
      correctIndex: 1,
    },
    {
      question: isEN
        ? "What is the key difference between Vintage and LBV Port Wine?"
        : "Qual é a diferença-chave entre Vinho do Porto Vintage e LBV?",
      options: [
        isEN
          ? "Vintage is younger, LBV is older"
          : "Vintage é mais jovem, LBV é mais velho",
        isEN
          ? "Vintage: declared exceptional years, 2 years in oak; LBV: 4-6 years in oak"
          : "Vintage: anos excepcionais declarados, 2 anos em carvalho; LBV: 4-6 anos em carvalho",
        isEN
          ? "There is no difference"
          : "Não há diferença",
        isEN
          ? "Vintage is cheaper"
          : "Vintage é mais barato",
      ],
      correctIndex: 1,
    },
  ];

  // PHASE 2: Premium Phrases PT/EN
  const phase2Slides: Slide[] = [
    {
      title: isEN ? "Essential Customer Phrases" : "Frases Essenciais para Cliente",
      content: (
        <div className="space-y-3">
          <PhraseCard
            pt="Bem-vindo a The 100's. Posso ajudá-lo a descobrir um presente que marca este momento?"
            en="Welcome to The 100's. May I help you discover a gift that marks this moment?"
            context={isEN ? "Opening greeting" : "Saudação de abertura"}
          />
          <PhraseCard
            pt="Posso oferecer uma degustação? Assim você pode sentir a complexidade do nosso Porto de 10 anos."
            en="May I offer you a tasting? This way you can feel the complexity of our 10-year Port Wine."
            context={isEN ? "Inviting to taste" : "Convidando para degustar"}
          />
          <PhraseCard
            pt="Este Porto envelheceu em carvalho, desenvolvendo notas de caramelo e avelã. Que sabor procura?"
            en="This Port aged in oak, developing caramel and hazelnut notes. What flavour profile do you prefer?"
            context={isEN ? "Product description" : "Descrição de produto"}
          />
          <PhraseCard
            pt="O nosso Porto de 50 anos é um investimento em memória. Cada gota conta uma história de tempo."
            en="Our 50-year Port Wine is an investment in memory. Every drop tells a story of time."
            context={isEN ? "Premium tier positioning" : "Posicionamento de tier premium"}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Gift Recommendation Phrases" : "Frases de Recomendação de Presente",
      content: (
        <div className="space-y-3">
          <PhraseCard
            pt="Para um presente de celebração, sugiro o nosso Assinatura de 10 anos com embalagem em cerâmica."
            en="For a celebration gift, I suggest our 10-year Signature with ceramic packaging."
            context={isEN ? "Gift suggestion" : "Sugestão de presente"}
          />
          <PhraseCard
            pt="Se o destinatário aprecia coleção, o nosso Porto de 100 anos é uma peça de investimento."
            en="If the recipient is a collector, our 100-year Port Wine is an investment piece."
            context={isEN ? "Luxury positioning" : "Posicionamento de luxo"}
          />
          <PhraseCard
            pt="Pode combinar o Vinho do Porto com o nosso Sal do Mar—um duo sensorial completo."
            en="You can pair the Port Wine with our Sea Salt—a complete sensorial duo."
            context={isEN ? "Bundling suggestion" : "Sugestão de combo"}
          />
          <PhraseCard
            pt="A embalagem em cortiça é sustentável e durável. O cliente pode guardar a caixa como memória."
            en="The cork packaging is sustainable and durable. The recipient can keep the box as a memento."
            context={isEN ? "Packaging benefit" : "Benefício de embalagem"}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Handling Objections Gracefully" : "Resolvendo Objeções com Elegância",
      content: (
        <div className="space-y-3">
          <PhraseCard
            pt="Compreendo a preocupação. O preço reflete 10 anos de envelhecimento. É um investimento, não consumo."
            en="I understand your concern. The price reflects 10 years of aging. It's an investment, not consumption."
            context={isEN ? "Addressing price objection" : "Abordando objeção de preço"}
          />
          <PhraseCard
            pt="Talvez começar com o nosso tier Essencial seja perfeito. Você experimenta a qualidade sem grande investimento."
            en="Perhaps starting with our Essentials tier is perfect. You experience quality without major investment."
            context={isEN ? "Offering alternatives" : "Oferecendo alternativas"}
          />
          <PhraseCard
            pt="Não é apenas um Porto—é uma experiência. Quando o abre, você entende o porquê do valor."
            en="It's not just a Port Wine—it's an experience. When you open it, you'll understand why it's worth it."
            context={isEN ? "Reframing value" : "Reformulando valor"}
          />
          <PhraseCard
            pt="Pode devolver em 30 dias se não ficar satisfeito. Mas tenho certeza que a qualidade fala por si."
            en="You can return it in 30 days if unsatisfied. But I'm confident the quality speaks for itself."
            context={isEN ? "Building confidence" : "Construindo confiança"}
          />
        </div>
      ),
    },
  ];

  const phase2Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "What's the best opening phrase for a customer entering The 100's?"
        : "Qual é a melhor frase de abertura para um cliente entrando The 100's?",
      options: [
        isEN ? "'Can I help you?' (too casual)" : "'Posso ajudá-lo?' (muito casual)",
        isEN
          ? "'May I help you discover a gift that marks this moment?' (elevates experience)"
          : "'Posso ajudá-lo a descobrir um presente que marca este momento?' (eleva experiência)",
        isEN ? "'Buy something today'" : "'Compre algo hoje'",
        isEN ? "'We have a sale on'" : "'Temos uma promoção'",
      ],
      correctIndex: 1,
    },
  ];

  // PHASE 3: Tasting Guide
  const phase3Slides: Slide[] = [
    {
      title: isEN ? "How to Guide a Tasting" : "Como Guiar uma Degustação",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "A professional tasting elevates the customer experience and builds credibility. Follow this step-by-step guide."
              : "Uma degustação profissional eleva a experiência do cliente e constrói credibilidade. Siga este guia passo a passo."}
          </p>
          <div className="space-y-3">
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "1. SET THE SCENE" : "1. PREPARE O CENÁRIO"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "Lead customer to calm tasting area. Offer seat. Provide proper glassware (Port-specific tulip glass if possible). Neutral temperature."
                  : "Leve cliente a área de degustação calma. Ofereça assento. Forneça vidro apropriado (tulipa específica para Porto se possível). Temperatura neutra."}
              </p>
            </div>

            <div className="bg-blue-500/5 border-l-4 border-blue-500 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "2. VISUAL EXAMINATION" : "2. EXAME VISUAL"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "'Notice the colour—deep ruby for young Ports, amber-tawny for aged. What do you observe?'"
                  : "'Repare na cor—rubi profundo para Portos jovens, âmbar-tawny para envelhecidos. O que você observa?'"}
              </p>
            </div>

            <div className="bg-green-500/5 border-l-4 border-green-500 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "3. AROMAS & NOSE" : "3. AROMAS & NARIZ"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "Encourage slow inhalation. 'Breathe gently. What notes come to mind? Dark fruit? Caramel? Spice?'"
                  : "Encoraje inalação lenta. 'Respire gentilmente. Que notas vêm à mente? Fruta escura? Caramelo? Especiaria?'"}
              </p>
            </div>

            <div className="bg-yellow-500/5 border-l-4 border-yellow-600 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "4. PALATE & TASTE" : "4. PALADAR & GOSTO"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "'Take a small sip. Let it rest on your tongue. Notice body, sweetness, finish. How does it feel?'"
                  : "'Tome um pequeno gole. Deixe descansar na sua língua. Repare corpo, doçura, finalização. Como se sente?'"}
              </p>
            </div>

            <div className="bg-orange-500/5 border-l-4 border-orange-600 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "5. FINISH & REFLECTION" : "5. FINALIZAÇÃO & REFLEXÃO"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "'The finish—how long does the flavour linger? This Port has been aging 10 years. That's why it's complex.'"
                  : "'A finalização—quanto tempo o sabor permanece? Este Porto tem envelhecido 10 anos. É por isso que é complexo.'"}
              </p>
            </div>

            <div className="bg-purple-500/5 border-l-4 border-purple-600 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "6. CLOSE THE TASTING" : "6. FECHE A DEGUSTAÇÃO"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "'Would you like to invest in a bottle? Perhaps with our ceramic packaging to mark this moment?'"
                  : "'Gostaria de investir em uma garrafa? Talvez com nossa embalagem cerâmica para marcar este momento?'"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: isEN ? "Tasting Notes Template" : "Modelo de Notas de Degustação",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-foreground/70 mb-4">
            {isEN
              ? "Use this template when describing any Port Wine to customers:"
              : "Use este modelo ao descrever qualquer Vinho do Porto para clientes:"}
          </p>
          <div className="bg-foreground/5 p-4 rounded space-y-3">
            <div>
              <p className="font-semibold text-sm">
                {isEN ? "Name & Tier:" : "Nome & Tier:"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "e.g., 'The 100's Signature 10-Year Port Wine, Tawny style'"
                  : "ex.: 'Vinho do Porto Assinatura The 100's de 10 Anos, estilo Tawny'"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">
                {isEN ? "Colour:" : "Cor:"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "e.g., 'Warm amber-brown, reflecting age in oak'"
                  : "ex.: 'Âmbar-marrom quente, refletindo idade em carvalho'"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">
                {isEN ? "Aroma:" : "Aroma:"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "e.g., 'Notes of caramel, hazelnut, dried apricot, subtle spice'"
                  : "ex.: 'Notas de caramelo, avelã, damasco seco, especiaria sutil'"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">
                {isEN ? "Palate:" : "Paladar:"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "e.g., 'Slightly sweet, full-bodied, silky texture, warming finish'"
                  : "ex.: 'Ligeiramente doce, encorpado, textura sedosa, finalização aquecedora'"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">
                {isEN ? "Heritage Context:" : "Contexto de Herança:"}
              </p>
              <p className="text-xs text-foreground/80">
                {isEN
                  ? "e.g., 'Aged 10 years in Portuguese oak, from vines in the Douro Valley, bottled by The 100's'"
                  : "ex.: 'Envelhecido 10 anos em carvalho português, de vinhas no Vale do Douro, engarrafado por The 100's'"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const phase3Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "What is the correct order for guiding a tasting?"
        : "Qual é a ordem correta para guiar uma degustação?",
      options: [
        isEN
          ? "Taste first, then look at colour"
          : "Degustar primeiro, depois olhar para cor",
        isEN
          ? "Visual exam → Aroma → Palate → Finish → Close sale"
          : "Exame visual → Aroma → Paladar → Finalização → Feche venda",
        isEN
          ? "Just hand them a glass and let them taste"
          : "Apenas dê-lhes um copo e deixe degustar",
        isEN
          ? "Talk about price first"
          : "Fale sobre preço primeiro",
      ],
      correctIndex: 1,
    },
  ];

  // PHASE 4: Flashcard Quiz
  const flashcards = [
    {
      front: isEN ? "Tawny" : "Tawny",
      back: isEN
        ? "Port Wine aged in oak, amber-brown colour, smooth, nutty notes. Ranges 3-40+ years."
        : "Vinho do Porto envelhecido em carvalho, cor âmbar-marrom, suave, notas de noz. Varia 3-40+ anos.",
    },
    {
      front: isEN ? "Vintage" : "Vintage",
      back: isEN
        ? "Port from exceptional years only. 2 years in oak, 10+ in bottle. Powerful, investment-grade."
        : "Porto apenas de anos excepcionais. 2 anos em carvalho, 10+ em garrafa. Poderoso, classe de investimento.",
    },
    {
      front: isEN ? "LBV" : "LBV",
      back: isEN
        ? "Late Bottled Vintage. 4-6 years in oak, longer aging than Vintage, before bottling. Bridge between styles."
        : "Vintage Engarrafado Tardiamente. 4-6 anos em carvalho, envelhecimento mais longo que Vintage. Ponte entre estilos.",
    },
    {
      front: isEN ? "Colheita" : "Colheita",
      back: isEN
        ? "Tawny from single harvest year, minimum 7 years in oak. Label shows vintage. More complex than basic Tawny."
        : "Tawny de safra única, mínimo 7 anos em carvalho. Rótulo mostra vintage. Mais complexo que Tawny básico.",
    },
    {
      front: isEN ? "Ruby" : "Ruby",
      back: isEN
        ? "Port aged in bottle, deep ruby-red colour, fruit-forward, less oxidized. Younger, more vibrant than Tawny."
        : "Porto envelhecido em garrafa, cor vermelho-rubi profunda, orientado para frutas, menos oxidado. Mais jovem que Tawny.",
    },
    {
      front: isEN ? "ABV" : "ABV",
      back: isEN
        ? "Alcohol by Volume. Port Wine typically 19-20% (fortified wine), higher than table wines (12-14%)."
        : "Álcool por Volume. Vinho do Porto tipicamente 19-20% (vinho fortificado), maior que vinhos de mesa (12-14%).",
    },
    {
      front: isEN ? "Finish" : "Finalização",
      back: isEN
        ? "How long flavour lingers after swallowing. Short, medium, or long finish. Indicates complexity."
        : "Quanto tempo o sabor permanece após engolir. Finalização curta, média ou longa. Indica complexidade.",
    },
    {
      front: isEN ? "Palate" : "Paladar",
      back: isEN
        ? "Flavour profile on the tongue. Descriptors: dry, off-dry, slightly sweet, sweet. Also body (light, medium, full)."
        : "Perfil de sabor na língua. Descritores: seco, meio-seco, ligeiramente doce, doce. Também corpo (leve, médio, encorpado).",
    },
  ];

  const phase4Slides: Slide[] = [
    {
      title: isEN ? "Vocabulary Quiz - Flashcards" : "Quiz de Vocabulário - Cartões de Memória",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Click through the flashcards below. Click to flip and test your knowledge of key terminology."
              : "Clique através dos cartões de memória abaixo. Clique para virar e teste seu conhecimento de terminologia-chave."}
          </p>

          <div className="flex flex-col items-center gap-4">
            <div
              onClick={() => setFlipped(!flipped)}
              className="w-full max-w-md h-48 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/60 transition-all"
            >
              <p className="text-xs text-foreground/60 mb-4">
                {isEN ? "Click to flip" : "Clique para virar"}
              </p>
              <p className="text-2xl font-bold text-primary text-center">
                {flipped
                  ? flashcards[flashcardIndex].back
                  : flashcards[flashcardIndex].front}
              </p>
              <div className="mt-4 text-primary/40">
                <RotateCcw size={20} />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setFlipped(false);
                  setFlashcardIndex(
                    flashcardIndex === 0
                      ? flashcards.length - 1
                      : flashcardIndex - 1
                  );
                }}
                className="px-4 py-2 border border-primary/30 rounded text-sm hover:bg-primary/10 transition-colors"
              >
                {isEN ? "← Previous" : "← Anterior"}
              </button>

              <div className="px-4 py-2 bg-foreground/5 rounded text-sm font-semibold">
                {flashcardIndex + 1} / {flashcards.length}
              </div>

              <button
                onClick={() => {
                  setFlipped(false);
                  setFlashcardIndex((flashcardIndex + 1) % flashcards.length);
                }}
                className="px-4 py-2 border border-primary/30 rounded text-sm hover:bg-primary/10 transition-colors"
              >
                {isEN ? "Next →" : "Próximo →"}
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: isEN ? "Final Vocabulary Quiz" : "Quiz Final de Vocabulário",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Test your knowledge with the quiz below. You must pass 75% to complete this module."
              : "Teste seu conhecimento com o quiz abaixo. Você deve passar 75% para completar este módulo."}
          </p>
          <TipBlock
            type="core"
            title={isEN ? "You've Learned:" : "Você Aprendeu:"}
            items={[
              isEN
                ? "Port Wine terminology (Tawny, Vintage, LBV, Colheita, Ruby)"
                : "Terminologia de Vinho do Porto (Tawny, Vintage, LBV, Colheita, Ruby)",
              isEN
                ? "Tasting vocabulary (colour, aroma, palate, finish)"
                : "Vocabulário de degustação (cor, aroma, paladar, finalização)",
              isEN
                ? "Premium customer service phrases"
                : "Frases de serviço ao cliente premium",
              isEN
                ? "How to guide professional tastings"
                : "Como guiar degustações profissionais",
              isEN
                ? "Glossary of essential brand vocabulary"
                : "Glossário de vocabulário de marca essencial",
            ]}
          />
        </div>
      ),
    },
  ];

  const phase4Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "What is the primary difference between Tawny and Ruby Port Wine?"
        : "Qual é a diferença primária entre Vinho do Porto Tawny e Ruby?",
      options: [
        isEN
          ? "Tawny is aged in oak; Ruby is aged in bottle"
          : "Tawny é envelhecido em carvalho; Ruby é envelhecido em garrafa",
        isEN
          ? "They taste the same"
          : "Têm o mesmo gosto",
        isEN
          ? "Ruby is more expensive"
          : "Ruby é mais caro",
        isEN
          ? "Tawny has no alcohol"
          : "Tawny não tem álcool",
      ],
      correctIndex: 0,
    },
    {
      question: isEN
        ? "Which Port Wine style is investment-grade and collector's item?"
        : "Qual estilo de Vinho do Porto é classe de investimento e item de colecionador?",
      options: [
        isEN ? "Tawny" : "Tawny",
        isEN ? "Ruby" : "Ruby",
        isEN ? "Vintage (from exceptional years)" : "Vintage (de anos excepcionais)",
        isEN ? "Colheita" : "Colheita",
      ],
      correctIndex: 2,
    },
    {
      question: isEN
        ? "What are the 5 steps of guiding a professional tasting?"
        : "Quais são os 5 passos para guiar uma degustação profissional?",
      options: [
        isEN
          ? "Just hand them a glass"
          : "Apenas dê-lhes um copo",
        isEN
          ? "Visual → Aroma → Palate → Finish → Close sale"
          : "Visual → Aroma → Paladar → Finalização → Feche venda",
        isEN
          ? "Taste first, ask questions later"
          : "Degustar primeiro, fazer perguntas depois",
        isEN
          ? "Skip to price"
          : "Pule para preço",
      ],
      correctIndex: 1,
    },
    {
      question: isEN
        ? "What does 'finish' mean in Port Wine tasting?"
        : "O que significa 'finalização' na degustação de Vinho do Porto?",
      options: [
        isEN
          ? "The final price"
          : "O preço final",
        isEN
          ? "How long the flavour lingers after swallowing"
          : "Quanto tempo o sabor permanece após engolir",
        isEN
          ? "When the customer leaves"
          : "Quando o cliente sai",
        isEN
          ? "The bottle is empty"
          : "A garrafa está vazia",
      ],
      correctIndex: 1,
    },
    {
      question: isEN
        ? "Which premium phrase best reflects The 100's brand voice?"
        : "Qual frase premium melhor reflete a voz da marca The 100's?",
      options: [
        isEN
          ? "'Buy now, limited stock'"
          : "'Compre agora, estoque limitado'",
        isEN
          ? "'Every drop tells a story of time'"
          : "'Cada gota conta uma história de tempo'",
        isEN
          ? "'This wine is expensive'"
          : "'Este vinho é caro'",
        isEN
          ? "'Just a bottle of Port'"
          : "'Apenas uma garrafa de Porto'",
      ],
      correctIndex: 1,
    },
  ];

  // Phase structure
  const phases: Phase[] = [
    {
      id: "port-wine-terms",
      title: isEN ? "Port Wine Terms" : "Termos de Vinho do Porto",
      subtitle: isEN ? "Essential vocabulary" : "Vocabulário essencial",
      content: <SlideViewer slides={phase1Slides} onComplete={() => {}} />,
      quiz: phase1Quiz,
      passingScore: 50,
    },
    {
      id: "premium-phrases",
      title: isEN ? "Premium Phrases" : "Frases Premium",
      subtitle: isEN ? "PT/EN customer service language" : "Linguagem de serviço ao cliente PT/EN",
      content: <SlideViewer slides={phase2Slides} onComplete={() => {}} />,
      quiz: phase2Quiz,
      passingScore: 50,
    },
    {
      id: "tasting-guide",
      title: isEN ? "Tasting Guide" : "Guia de Degustação",
      subtitle: isEN ? "How to conduct professional tastings" : "Como conduzir degustações profissionais",
      content: <SlideViewer slides={phase3Slides} onComplete={() => {}} />,
      quiz: phase3Quiz,
      passingScore: 50,
    },
    {
      id: "flashcard-quiz",
      title: isEN ? "Vocabulary Quiz" : "Quiz de Vocabulário",
      subtitle: isEN ? "Test your knowledge with flashcards" : "Teste seu conhecimento com cartões",
      content: <SlideViewer slides={phase4Slides} onComplete={() => {}} />,
      quiz: phase4Quiz,
      passingScore: 75,
    },
  ];

  return (
    <ModuleLayout
      moduleId="glossary-vocab"
      moduleNumber={4}
      title={isEN ? "Glossary & Vocabulary" : "Glossário e Vocabulário"}
      subtitle={isEN
        ? "Port Wine Terms, Phrases, and Tasting"
        : "Termos de Vinho do Porto, Frases e Degustação"}
      heroImage={heroDrop}
    >
      <PhaseSystem moduleId="glossary-vocab" phases={phases} />
    </ModuleLayout>
  );
}
