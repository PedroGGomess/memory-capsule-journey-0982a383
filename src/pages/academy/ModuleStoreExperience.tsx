import { useState } from "react";
import { ModuleLayout } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  SlideViewer,
  TipBlock,
  type Phase,
  type Slide,
  type QuizQuestion,
} from "@/components/InteractiveModule";
import { useLanguage } from "@/contexts/LanguageContext";

// Import images
import heroDrop from "@/assets/hero-drop.jpg";
import storeInterior from "@/assets/store-interior.jpg";
import planta0 from "@/assets/planta-piso0.jpg";
import planta1 from "@/assets/planta-piso1.jpg";
import plantaMinus1 from "@/assets/planta-piso-minus1.jpg";

export default function ModuleStoreExperience() {
  const { language } = useLanguage();
  const isEN = language === "en";

  // PHASE 1: As 5 Zonas
  const phase1Slides: Slide[] = [
    {
      title: isEN ? "The 5 Store Zones" : "As 5 Zonas da Loja",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "The 100's stores are organized into 5 distinct zones, each representing a different collection and sales contribution. Our layout is strategically designed to guide customers through a sensorial journey."
              : "As lojas The 100's são organizadas em 5 zonas distintas, cada uma representando uma coleção diferente e contribuição de vendas. Nosso layout é estrategicamente designed para guiar clientes através de uma jornada sensorial."}
          </p>
        </div>
      ),
      image: storeInterior,
    },
    {
      title: isEN ? "The Cellar (55%)" : "A Adega (55%)",
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-primary">
            {isEN ? "Primary Revenue Zone" : "Zona de Receita Principal"}
          </p>
          <p className="text-base leading-relaxed">
            {isEN
              ? "The Cellar is our flagship zone showcasing Port Wine across all 4 tiers. Premium lighting, wooden shelving, and calm atmosphere encourage contemplation and premium purchases."
              : "A Adega é nossa zona de destaque mostrando Vinho do Porto em todos os 4 tiers. Iluminação premium, prateleiras de madeira e atmosfera calma encorajam contemplação e compras premium."}
          </p>
          <TipBlock
            type="core"
            title={isEN ? "Customer Journey in The Cellar" : "Jornada do Cliente na Adega"}
            items={[
              isEN
                ? "Approach: Invite customers to 'discover their Port Wine'"
                : "Abordagem: Convide clientes a 'descobrir seu Vinho do Porto'",
              isEN
                ? "Tasting: Offer 2–3 tastings from different tiers"
                : "Degustação: Ofereça 2–3 degustações de tiers diferentes",
              isEN
                ? "Upsell: Guide from Essentials → Signature → Icon naturally"
                : "Aumento de venda: Guie de Essenciais → Assinatura → Ícone naturalmente",
              isEN
                ? "Close: Premium gift wrapping, premium tier bottles"
                : "Encerramento: Embrulho de presente premium, garrafas de tier premium",
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Ancient Flavours (27.7%)" : "Sabores Antigos (27,7%)",
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-primary">
            {isEN ? "Secondary Revenue Zone" : "Zona de Receita Secundária"}
          </p>
          <p className="text-base leading-relaxed">
            {isEN
              ? "Pantry collection zone: Olive Gold, Sea Salt, Heritage Tea, Artisan Honey. Sensorial displays with tasting stations invite customers to explore beyond Port Wine."
              : "Zona de coleção de pantry: Ouro de Oliva, Sal do Mar, Chá de Herança, Mel Artesanal. Exibições sensoriais com estações de degustação convidam clientes a explorar além do Vinho do Porto."}
          </p>
          <TipBlock
            type="core"
            title={isEN ? "Engagement in Ancient Flavours" : "Engajamento em Sabores Antigos"}
            items={[
              isEN
                ? "Offer samples of each pantry item"
                : "Ofereça amostras de cada item de pantry",
              isEN
                ? "Highlight heritage and sourcing stories"
                : "Destaque histórias de herança e sourcing",
              isEN
                ? "Bundle with Port Wine for gift packages"
                : "Combine com Vinho do Porto para pacotes de presentes",
              isEN
                ? "Educate on tasting and pairing"
                : "Eduque sobre degustação e combinação",
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "The Still Hours (11%)" : "As Horas Paradas (11%)",
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-primary">
            {isEN ? "Atmosphere & Ritual Zone" : "Zona de Atmosfera & Ritual"}
          </p>
          <p className="text-base leading-relaxed">
            {isEN
              ? "Candles, diffusers, and home fragrance. Soft lighting, comfortable seating. This zone invites customers to slow down and experience The 100's as a ritual brand, not just a retailer."
              : "Velas, difusores e fragrância para casa. Iluminação suave, assentos confortáveis. Esta zona convida clientes a desacelerar e experimentar The 100's como marca de ritual, não apenas varejista."}
          </p>
        </div>
      ),
    },
    {
      title: isEN ? "The Numbered (5%) & The Vault (2.3%)" : "O Numerado (5%) & O Cofre (2,3%)",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-primary">
                {isEN ? "The Numbered (5%)" : "O Numerado (5%)"}
              </p>
              <p className="text-sm text-foreground/80">
                {isEN
                  ? "Limited edition releases, seasonal collections, special collaborations. Generates urgency and repeat visits."
                  : "Lançamentos de edição limitada, coleções sazonais, colaborações especiais. Gera urgência e visitas repetidas."}
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary">
                {isEN ? "The Vault (2.3%)" : "O Cofre (2,3%)"}
              </p>
              <p className="text-sm text-foreground/80">
                {isEN
                  ? "Ultra-rare, 100-year Port Wine, collector's items. Reserved, by-appointment only. Builds prestige and long-term customer relationships."
                  : "Ultra-raro, Vinho do Porto de 100 anos, itens de colecionador. Reservado, apenas por agendamento. Constrói prestígio e relacionamentos de clientes de longo prazo."}
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
        ? "What percentage of sales does The Cellar zone generate?"
        : "Que percentual de vendas a zona Adega gera?",
      options: ["27.7%", "11%", "55%", "5%"],
      correctIndex: 2,
    },
    {
      question: isEN
        ? "Which zone is for pantry items like Olive Oil and Sea Salt?"
        : "Qual zona é para itens de pantry como Azeite e Sal do Mar?",
      options: [
        isEN ? "The Cellar" : "A Adega",
        isEN ? "The Still Hours" : "As Horas Paradas",
        isEN ? "Ancient Flavours" : "Sabores Antigos",
        isEN ? "The Vault" : "O Cofre",
      ],
      correctIndex: 2,
    },
  ];

  // PHASE 2: Planta & Layout
  const phase2Slides: Slide[] = [
    {
      title: isEN ? "Store Layout Overview" : "Visão Geral do Layout da Loja",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "The 100's stores span multiple floors, each with a specific purpose. Below you see the floor plans for each level."
              : "As lojas The 100's abrangem múltiplos andares, cada um com propósito específico. Abaixo você vê os planos de piso para cada nível."}
          </p>
          <div className="bg-foreground/5 p-4 rounded">
            <p className="text-sm font-semibold mb-2">
              {isEN ? "Floor Structure:" : "Estrutura de Andares:"}
            </p>
            <ul className="text-sm space-y-1 text-foreground/80">
              <li>
                <span className="font-semibold">{isEN ? "Ground Floor (Piso 0)" : "Piso Térreo (Piso 0)"}: </span>
                {isEN
                  ? "Main entrance, The Cellar, customer service"
                  : "Entrada principal, A Adega, atendimento ao cliente"}
              </li>
              <li>
                <span className="font-semibold">{isEN ? "Upper Floor (Piso 1)" : "Piso Superior (Piso 1)"}: </span>
                {isEN
                  ? "Ancient Flavours, The Still Hours, events space"
                  : "Sabores Antigos, As Horas Paradas, espaço para eventos"}
              </li>
              <li>
                <span className="font-semibold">{isEN ? "Lower Floor (Piso -1)" : "Piso Inferior (Piso -1)"}: </span>
                {isEN
                  ? "The Numbered, The Vault, climate-controlled storage"
                  : "O Numerado, O Cofre, armazenamento controlado por clima"}
              </li>
            </ul>
          </div>
        </div>
      ),
      image: planta0,
    },
    {
      title: isEN ? "Ground Floor (Piso 0) - Main Zone" : "Piso Térreo (Piso 0) - Zona Principal",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "The ground floor is where customers first experience The 100's. Strategic placement of The Cellar near the entrance encourages immediate engagement with our flagship product."
              : "O piso térreo é onde clientes primeiro experimentam The 100's. Colocação estratégica da Adega perto da entrada encoraja engajamento imediato com nosso produto de destaque."}
          </p>
          <TipBlock
            type="core"
            title={isEN ? "Ground Floor Navigation" : "Navegação do Piso Térreo"}
            items={[
              isEN
                ? "Entrance: Warm greeting, visual of Port Wine tiers"
                : "Entrada: Saudação calorosa, visual de tiers de Vinho do Porto",
              isEN
                ? "Customer Service: Positioned for easy access"
                : "Atendimento ao Cliente: Posicionado para fácil acesso",
              isEN
                ? "The Cellar: Main showcase, premium lighting"
                : "A Adega: Vitrine principal, iluminação premium",
              isEN
                ? "Transition to Upper Floor: Subtle signage, natural flow"
                : "Transição para Piso Superior: Sinalização sutil, fluxo natural",
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Upper Floor (Piso 1) & Lower Floor (Piso -1)" : "Piso Superior (Piso 1) & Piso Inferior (Piso -1)",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-primary text-sm">
                {isEN ? "Upper Floor (Piso 1):" : "Piso Superior (Piso 1):"}
              </p>
              <p className="text-sm text-foreground/80">
                {isEN
                  ? "Open layout encourages exploration. Ancient Flavours with tasting stations. The Still Hours creates intimate atmosphere. Event space for tastings and private appointments."
                  : "Layout aberto encoraja exploração. Sabores Antigos com estações de degustação. As Horas Paradas cria atmosfera íntima. Espaço para eventos para degustações e consultas privadas."}
              </p>
            </div>
            <div>
              <p className="font-semibold text-primary text-sm">
                {isEN ? "Lower Floor (Piso -1):" : "Piso Inferior (Piso -1):"}
              </p>
              <p className="text-sm text-foreground/80">
                {isEN
                  ? "Climate-controlled for wine storage. The Numbered for limited editions. The Vault reserved for 100-year Port Wine and by-appointment viewings. Limited customer access (creates prestige)."
                  : "Controlado por clima para armazenamento de vinho. O Numerado para edições limitadas. O Cofre reservado para Vinho do Porto de 100 anos e visualizações por agendamento. Acesso limitado de clientes (cria prestígio)."}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const phase2Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "Where is The Vault located in the store?"
        : "Onde o Cofre está localizado na loja?",
      options: [
        isEN ? "Ground Floor (Piso 0)" : "Piso Térreo (Piso 0)",
        isEN ? "Upper Floor (Piso 1)" : "Piso Superior (Piso 1)",
        isEN ? "Lower Floor (Piso -1)" : "Piso Inferior (Piso -1)",
        isEN ? "In a separate building" : "Em um prédio separado",
      ],
      correctIndex: 2,
    },
  ];

  // PHASE 3: Visual Merchandising
  const phase3Slides: Slide[] = [
    {
      title: isEN ? "Visual Merchandising Principles" : "Princípios de Merchandising Visual",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Every visual element in The 100's stores is intentional. Our merchandising philosophy treats the store itself as a premium brand experience."
              : "Cada elemento visual nas lojas The 100's é intencional. Nossa filosofia de merchandising trata a loja em si como uma experiência de marca premium."}
          </p>
          <TipBlock
            type="core"
            title={isEN ? "Display Principles" : "Princípios de Exibição"}
            items={[
              isEN
                ? "Lighting: Warm, indirect light emphasizes craftsmanship (never harsh fluorescents)"
                : "Iluminação: Luz quente e indireta enfatiza artesanato (nunca fluorescente áspero)",
              isEN
                ? "Color Palette: Gold (#C9A96E), deep wood tones, neutral backgrounds"
                : "Paleta de Cores: Ouro (#C9A96E), tons de madeira profunda, fundos neutros",
              isEN
                ? "Typography: Premium serif fonts for signs and labels"
                : "Tipografia: Fontes serif premium para sinais e rótulos",
              isEN
                ? "Height Variation: Eye-level displays for premium items; lower shelves for pantry"
                : "Variação de Altura: Exibições no nível dos olhos para itens premium; prateleiras inferiores para pantry",
              isEN
                ? "Negative Space: Don't overcrowd—breathing room conveys luxury"
                : "Espaço Negativo: Não sobrecarregue—espaço respira convida luxo",
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Bottle and Product Display" : "Exibição de Garrafa e Produto",
      content: (
        <div className="space-y-4">
          <TipBlock
            type="warning"
            title={isEN ? "Display Standards" : "Padrões de Exibição"}
            items={[
              isEN
                ? "Port Wine: Diagonal or pyramid arrangement by tier (Essentials base, Hundred apex)"
                : "Vinho do Porto: Arranjo diagonal ou piramidal por tier (base Essenciais, ápice Centenário)",
              isEN
                ? "Packaging visibility: Show all 3 angles (front, side, top) when possible"
                : "Visibilidade de embalagem: Mostre todos os 3 ângulos (frente, lateral, topo) quando possível",
              isEN
                ? "Tasting bottles: Always have 2-3 open for customer interaction"
                : "Garrafas de degustação: Sempre tenha 2-3 abertos para interação do cliente",
              isEN
                ? "Price signage: Subtle, elegant, never aggressive (customers know what they're paying for prestige)"
                : "Sinalização de preço: Sutil, elegante, nunca agressiva (clientes sabem o que estão pagando por prestígio)",
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Seasonal & Thematic Displays" : "Exibições Sazonais e Temáticas",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Rotate displays seasonally and for special occasions. Tie themes to our core philosophy."
              : "Rode exibições sazonalmente e para ocasiões especiais. Prenda temas à nossa filosofia central."}
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div className="border-l-4 border-primary bg-primary/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Spring: 'New Beginnings'" : "Primavera: 'Novos Começos'"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Signature tier Port Wine, pantry items, gift bundles"
                  : "Tier Assinatura de Vinho do Porto, itens de pantry, pacotes de presentes"}
              </p>
            </div>
            <div className="border-l-4 border-yellow-600 bg-yellow-500/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Summer: 'Golden Hours'" : "Verão: 'Horas Douradas'"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Focus on heritage, olive oil, sea salt, outdoor entertaining"
                  : "Foco em herança, azeite, sal do mar, entretenimento ao ar livre"}
              </p>
            </div>
            <div className="border-l-4 border-orange-600 bg-orange-500/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Autumn: 'Time & Memory'" : "Outono: 'Tempo e Memória'"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Icon tier, candles, tea, gifts for reflection"
                  : "Tier Ícone, velas, chá, presentes para reflexão"}
              </p>
            </div>
            <div className="border-l-4 border-blue-600 bg-blue-500/5 p-3 rounded">
              <p className="font-semibold text-xs">
                {isEN ? "Winter: 'Luxury & Legacy'" : "Inverno: 'Luxo & Legado'"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "The Hundred tier, premium gift sets, celebration bundles"
                  : "Tier Centenário, conjuntos de presentes premium, pacotes de celebração"}
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
        ? "What color palette defines The 100's visual merchandising?"
        : "Qual paleta de cores define o merchandising visual The 100's?",
      options: [
        isEN
          ? "Bright primary colors"
          : "Cores primárias brilhantes",
        isEN
          ? "Gold (#C9A96E), wood tones, neutral backgrounds"
          : "Ouro (#C9A96E), tons de madeira, fundos neutros",
        isEN
          ? "Black and silver only"
          : "Apenas preto e prata",
        isEN
          ? "Neon and chrome"
          : "Neon e cromo",
      ],
      correctIndex: 1,
    },
  ];

  // PHASE 4: Conduta & Imagem
  const phase4Slides: Slide[] = [
    {
      title: isEN ? "Staff Conduct & Appearance" : "Conduta & Aparência do Pessoal",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Every staff member is a brand ambassador. Your appearance, posture, and communication represent The 100's premium philosophy."
              : "Cada membro da equipe é um embaixador da marca. Sua aparência, postura e comunicação representam a filosofia premium The 100's."}
          </p>
          <TipBlock
            type="core"
            title={isEN ? "Dress Code Standards" : "Padrões de Código de Vestuário"}
            items={[
              isEN
                ? "Tailored blazer or vest (dark navy, charcoal, or black)"
                : "Blazer ou colete bem ajustado (azul-marinho escuro, cinza carvão ou preto)",
              isEN
                ? "Crisp white or off-white shirt (long sleeves preferred)"
                : "Camisa branca ou off-white imaculada (mangas compridas preferidas)",
              isEN
                ? "Dress trousers (matching jacket colour) or elegant skirt (knee-length)"
                : "Calças de dress (cor combinando com blazer) ou saia elegante (comprimento até joelho)",
              isEN
                ? "Closed-toe shoes (polished leather, comfortable for standing 8 hours)"
                : "Sapatos fechados (couro polido, confortáveis para estar de pé 8 horas)",
              isEN
                ? "Optional: The 100's pin or subtle gold jewelry"
                : "Opcional: Alfinete The 100's ou joias sutis em ouro",
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Physical Presence & Posture" : "Presença Física & Postura",
      content: (
        <div className="space-y-4">
          <TipBlock
            type="warning"
            title={isEN ? "Posture Guidelines" : "Diretrizes de Postura"}
            items={[
              isEN
                ? "Stand tall, shoulders back (conveys confidence and premium service)"
                : "Fique em pé, ombros para trás (transmite confiança e serviço premium)",
              isEN
                ? "When behind counter: Forearms visible, hands above counter (never slouch or lean)"
                : "Quando atrás do balcão: Antebraços visíveis, mãos acima do balcão (nunca se incline ou apoie)",
              isEN
                ? "When walking the floor: Slow, measured pace (never rushing, always available)"
                : "Ao caminhar pelo piso: Ritmo lento e medido (nunca pressa, sempre disponível)",
              isEN
                ? "Eye contact: Greet all customers within 30 seconds of entry"
                : "Contato visual: Cumprimente todos os clientes dentro de 30 segundos de entrada",
              isEN
                ? "Smile: Warm, genuine, professional"
                : "Sorriso: Caloroso, genuíno, profissional",
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Premium Service Phrases" : "Frases de Serviço Premium",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed mb-4">
            {isEN
              ? "Use these premium phrases to elevate every customer interaction:"
              : "Use estas frases premium para elevar toda interação de cliente:"}
          </p>
          <div className="space-y-3">
            <div className="bg-primary/5 p-3 rounded">
              <p className="text-xs font-semibold text-primary">
                {isEN ? "Opening:" : "Abertura:"}
              </p>
              <p className="text-xs text-foreground/80 italic">
                {isEN
                  ? '"Welcome to The 100\'s. May I invite you to discover a memory today?"'
                  : '"Bem-vindo a The 100\'s. Posso convidá-lo a descobrir uma memória hoje?"'}
              </p>
            </div>
            <div className="bg-blue-500/5 p-3 rounded">
              <p className="text-xs font-semibold text-blue-600">
                {isEN ? "During Tasting:" : "Durante Degustação:"}
              </p>
              <p className="text-xs text-foreground/80 italic">
                {isEN
                  ? '"Notice the complexity—this Port has been aging 10 years in oak. What memories does it evoke for you?"'
                  : '"Repare na complexidade—este Porto tem envelhecido 10 anos em carvalho. Que memórias evoca para você?"'}
              </p>
            </div>
            <div className="bg-orange-500/5 p-3 rounded">
              <p className="text-xs font-semibold text-orange-600">
                {isEN ? "For Gift Selection:" : "Para Seleção de Presente:"}
              </p>
              <p className="text-xs text-foreground/80 italic">
                {isEN
                  ? '"Who is this gift for? Let\'s curate something that will mark this moment for them."'
                  : '"Quem é este presente? Vamos curar algo que marque este momento para eles."'}
              </p>
            </div>
            <div className="bg-green-500/5 p-3 rounded">
              <p className="text-xs font-semibold text-green-600">
                {isEN ? "Closing:" : "Fechamento:"}
              </p>
              <p className="text-xs text-foreground/80 italic">
                {isEN
                  ? '"Your memory is bottled. We\'ll see you again. Time is always in your hands."'
                  : '"Sua memória está engarrafada. Nos vemos novamente. O tempo está sempre nas suas mãos."'}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: isEN ? "Brand Conduct Rules" : "Regras de Conduta da Marca",
      content: (
        <div className="space-y-4">
          <TipBlock
            type="error"
            title={isEN ? "Never Do This:" : "Nunca Faça Isso:"}
            items={[
              isEN
                ? "Refer to customers as 'dude', 'mate', 'guys' (too casual)"
                : "Refira-se a clientes como 'colega', 'amigo', 'pessoal' (muito casual)",
              isEN
                ? "Check your phone or appear distracted"
                : "Verifique seu telefone ou pareça distraído",
              isEN
                ? "Interrupt a customer's contemplation (give them space to explore)"
                : "Interrompa a contemplação de um cliente (dê espaço para explorar)",
              isEN
                ? "Push sales aggressively ('You need this tier', 'Buy more')"
                : "Faça venda agressiva ('Você precisa deste tier', 'Compre mais')",
              isEN
                ? "Gossip about other customers or internal issues in earshot"
                : "Fofoque sobre outros clientes ou problemas internos ao alcance",
              isEN
                ? "Lean on counters, cross arms, or appear bored"
                : "Incline-se em balcões, cruze os braços ou pareça entediado",
            ]}
          />
        </div>
      ),
    },
  ];

  const phase4Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "What is the correct dress code for The 100's staff?"
        : "Qual é o código de vestuário correto para o pessoal The 100's?",
      options: [
        isEN ? "Casual jeans and t-shirt" : "Jeans casual e camiseta",
        isEN
          ? "Tailored dark blazer, white shirt, dress trousers, polished shoes"
          : "Blazer escuro bem ajustado, camisa branca, calças de dress, sapatos polidos",
        isEN
          ? "Sportswear and trainers"
          : "Roupas esportivas e tênis",
        isEN
          ? "Any outfit as long as it's clean"
          : "Qualquer outfit desde que esteja limpo",
      ],
      correctIndex: 1,
    },
    {
      question: isEN
        ? "What should you do if a customer enters the store?"
        : "O que você deve fazer se um cliente entrar na loja?",
      options: [
        isEN ? "Ignore them until they approach you" : "Ignore-os até se aproximarem",
        isEN ? "Immediately bombard them with sales talk" : "Bombardeie-os imediatamente com discurso de vendas",
        isEN
          ? "Greet them with eye contact and a warm smile within 30 seconds"
          : "Cumprimente-os com contato visual e sorriso caloroso dentro de 30 segundos",
        isEN
          ? "Ask them to wait while you finish your break"
          : "Peça que esperem enquanto termina sua pausa",
      ],
      correctIndex: 2,
    },
    {
      question: isEN
        ? "Which phrase best embodies The 100's service philosophy?"
        : "Qual frase melhor encarna a filosofia de serviço The 100's?",
      options: [
        isEN ? "'Buy now, limited stock'" : "'Compre agora, estoque limitado'",
        isEN
          ? "'May I invite you to discover a memory today?'"
          : "'Posso convidá-lo a descobrir uma memória hoje?'",
        isEN ? "'This bottle is very expensive'" : "'Esta garrafa é muito cara'",
        isEN ? "'You need this product'" : "'Você precisa deste produto'",
      ],
      correctIndex: 1,
    },
  ];

  // Phase structure
  const phases: Phase[] = [
    {
      id: "cinco-zonas",
      title: isEN ? "5 Store Zones" : "5 Zonas da Loja",
      subtitle: isEN ? "Revenue & experience breakdown" : "Detalhamento de receita e experiência",
      content: <SlideViewer slides={phase1Slides} onComplete={() => {}} />,
      quiz: phase1Quiz,
      passingScore: 50,
    },
    {
      id: "planta-layout",
      title: isEN ? "Store Layout" : "Layout da Loja",
      subtitle: isEN ? "Floor plans and navigation" : "Planos de piso e navegação",
      content: <SlideViewer slides={phase2Slides} onComplete={() => {}} />,
      quiz: phase2Quiz,
      passingScore: 50,
    },
    {
      id: "visual-merchandising",
      title: isEN ? "Visual Merchandising" : "Merchandising Visual",
      subtitle: isEN ? "Display and presentation" : "Exibição e apresentação",
      content: <SlideViewer slides={phase3Slides} onComplete={() => {}} />,
      quiz: phase3Quiz,
      passingScore: 50,
    },
    {
      id: "conduta-imagem",
      title: isEN ? "Conduct & Image" : "Conduta & Imagem",
      subtitle: isEN ? "Staff excellence and brand ambassadorship" : "Excelência de pessoal e embaixada de marca",
      content: <SlideViewer slides={phase4Slides} onComplete={() => {}} />,
      quiz: phase4Quiz,
      passingScore: 66,
    },
  ];

  return (
    <ModuleLayout
      moduleId="store-experience"
      moduleNumber={3}
      title={isEN ? "Store Experience" : "Experiência da Loja"}
      subtitle={isEN
        ? "Zones, Layout, and Staff Excellence"
        : "Zonas, Layout e Excelência de Pessoal"}
      heroImage={storeInterior}
    >
      <PhaseSystem moduleId="store-experience" phases={phases} />
    </ModuleLayout>
  );
}
