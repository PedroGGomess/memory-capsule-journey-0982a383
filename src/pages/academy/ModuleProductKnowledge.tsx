import { useState } from "react";
import { ModuleLayout } from "@/components/ModuleComponents";
import {
  PhaseSystem,
  SlideViewer,
  TipBlock,
  InteractiveGallery,
  type Phase,
  type Slide,
  type QuizQuestion,
  type ProductGalleryItem,
} from "@/components/InteractiveModule";
import { useLanguage } from "@/contexts/LanguageContext";

// Import images
import heroDrop from "@/assets/hero-drop.jpg";
import garrafasImg from "@/assets/produtos/garrafas.jpg";

// Cilindro images
import cilindro1t1 from "@/assets/produtos/cilindro-1t-1.jpg";
import cilindro1t2 from "@/assets/produtos/cilindro-1t-2.jpg";
import cilindro1t3 from "@/assets/produtos/cilindro-1t-3.jpg";

import cilindro2t1 from "@/assets/produtos/cilindro-2t-1.jpg";
import cilindro2t2 from "@/assets/produtos/cilindro-2t-2.jpg";
import cilindro2t3 from "@/assets/produtos/cilindro-2t-3.jpg";

import cilindrocork1 from "@/assets/produtos/cilindro-cork-1.jpg";
import cilindrocock2 from "@/assets/produtos/cilindro-cork-2.jpg";
import cilindrocock3 from "@/assets/produtos/cilindro-cork-3.jpg";

// Quadrado images
import quadrado2t1 from "@/assets/produtos/quadrado-2t-1.jpg";
import quadrado2t2 from "@/assets/produtos/quadrado-2t-2.jpg";
import quadrado2t3 from "@/assets/produtos/quadrado-2t-3.jpg";

import quadradoCork1 from "@/assets/produtos/quadrado-cork-1.jpg";
import quadradoCork2 from "@/assets/produtos/quadrado-cork-2.jpg";
import quadradoCork3 from "@/assets/produtos/quadrado-cork-3.jpg";

import quadradoCarvalho1 from "@/assets/produtos/quadrado-carvalho-1.jpg";
import quadradoCarvalho2 from "@/assets/produtos/quadrado-carvalho-2.jpg";
import quadradoCarvalho3 from "@/assets/produtos/quadrado-carvalho-3.jpg";

import quadradoNogueira1 from "@/assets/produtos/quadrado-nogueira-1.jpg";
import quadradoNogueira2 from "@/assets/produtos/quadrado-nogueira-2.jpg";
import quadradoNogueira3 from "@/assets/produtos/quadrado-nogueira-3.jpg";

// Linha images
import linha1 from "@/assets/produtos/linha-1.jpg";
import linha2 from "@/assets/produtos/linha-2.jpg";
import linha3 from "@/assets/produtos/linha-3.jpg";

// Lifestyle images
import lifestyle28 from "@/assets/produtos/lifestyle/photo-2026-03-28-17-38-28.jpg";
import lifestyle282 from "@/assets/produtos/lifestyle/photo-2026-03-28-17-38-28-2.jpg";
import lifestyle29 from "@/assets/produtos/lifestyle/photo-2026-03-28-17-38-29.jpg";
import lifestyle292 from "@/assets/produtos/lifestyle/photo-2026-03-28-17-38-29-2.jpg";
import lifestyle294 from "@/assets/produtos/lifestyle/photo-2026-03-28-17-38-29-4.jpg";
import lifestyle30 from "@/assets/produtos/lifestyle/photo-2026-03-28-17-38-30.jpg";

export default function ModuleProductKnowledge() {
  const { language } = useLanguage();
  const isEN = language === "en";

  // PHASE 1: Port Wine Tiers
  const phase1Slides: Slide[] = [
    {
      title: isEN ? "Port Wine Collection Tiers" : "Tiers da Coleção de Vinho do Porto",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Our Port Wine collection is organized into 4 tiers, each representing a different level of aging and investment."
              : "Nossa coleção de Vinho do Porto é organizada em 4 tiers, cada um representando um nível diferente de envelhecimento e investimento."}
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div className="border-l-4 border-primary bg-primary/5 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "ESSENTIALS" : "ESSENCIAIS"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Tawny, entry-level aged Port | €19.99–€99.99"
                  : "Tawny, Porto envelhecido de nível entrada | €19,99–€99,99"}
              </p>
            </div>
            <div className="border-l-4 border-primary/60 bg-primary/3 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "SIGNATURE" : "ASSINATURA"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "10-year-aged Port | €44.99–€130"
                  : "Porto envelhecido 10 anos | €44,99–€130"}
              </p>
            </div>
            <div className="border-l-4 border-primary/40 bg-primary/2 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "THE ICON" : "O ÍCONE"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "50-year-aged Port | €275–€375"
                  : "Porto envelhecido 50 anos | €275–€375"}
              </p>
            </div>
            <div className="border-l-4 border-yellow-600 bg-yellow-500/10 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "THE HUNDRED" : "O CENTENÁRIO"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "100-year-aged Port | €1000–€1500 (collector's item)"
                  : "Porto envelhecido 100 anos | €1000–€1500 (item de colecionador)"}
              </p>
            </div>
          </div>
        </div>
      ),
      image: garrafasImg,
    },
    {
      title: isEN ? "Understanding Price Points" : "Compreendendo Faixas de Preço",
      content: (
        <div className="space-y-4">
          <TipBlock
            type="core"
            title={isEN ? "Why Different Prices?" : "Por Que Preços Diferentes?"}
            items={[
              isEN
                ? "Essentials = shorter aging = more accessible entry point"
                : "Essenciais = envelhecimento mais curto = ponto de entrada mais acessível",
              isEN
                ? "Signature = 10 years investment = balance of rarity and affordability"
                : "Assinatura = investimento de 10 anos = equilíbrio de raridade e acessibilidade",
              isEN
                ? "Icon = 50 years = limited supply, significant prestige"
                : "Ícone = 50 anos = fornecimento limitado, prestígio significativo",
              isEN
                ? "Hundred = 100 years = ultra-rare, investment-grade, legacy items"
                : "Centenário = 100 anos = ultra-raro, classe de investimento, itens de herança",
            ]}
          />
          <p className="text-sm text-foreground/70 mt-4">
            {isEN
              ? "Price = investment in TIME. Older Port = more valuable memory."
              : "Preço = investimento em TEMPO. Porto mais antigo = memória mais valiosa."}
          </p>
        </div>
      ),
    },
  ];

  const phase1Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "What is the price range for Essentials tier Port Wine?"
        : "Qual é a faixa de preço para o Vinho do Porto tier Essenciais?",
      options: ["€100–€200", "€19.99–€99.99", "€275–€375", "€1000+"],
      correctIndex: 1,
    },
    {
      question: isEN
        ? "How old is The Icon tier Port Wine?"
        : "Quantos anos tem o Vinho do Porto tier O Ícone?",
      options: [
        isEN ? "10 years" : "10 anos",
        isEN ? "25 years" : "25 anos",
        isEN ? "50 years" : "50 anos",
        isEN ? "100 years" : "100 anos",
      ],
      correctIndex: 2,
    },
  ];

  // PHASE 2: Gift Packaging
  const packagingItems: ProductGalleryItem[] = [
    { src: cilindro1t1, label: isEN ? "Cilindro 1T - Angle 1" : "Cilindro 1T - Ângulo 1" },
    { src: cilindro1t2, label: isEN ? "Cilindro 1T - Angle 2" : "Cilindro 1T - Ângulo 2" },
    { src: cilindro1t3, label: isEN ? "Cilindro 1T - Angle 3" : "Cilindro 1T - Ângulo 3" },
    { src: cilindro2t1, label: isEN ? "Cilindro 2T - Angle 1" : "Cilindro 2T - Ângulo 1" },
    { src: cilindro2t2, label: isEN ? "Cilindro 2T - Angle 2" : "Cilindro 2T - Ângulo 2" },
    { src: cilindro2t3, label: isEN ? "Cilindro 2T - Angle 3" : "Cilindro 2T - Ângulo 3" },
    { src: cilindrocork1, label: isEN ? "Cilindro Cork - Angle 1" : "Cilindro Cork - Ângulo 1" },
    { src: cilindrocock2, label: isEN ? "Cilindro Cork - Angle 2" : "Cilindro Cork - Ângulo 2" },
    { src: cilindrocock3, label: isEN ? "Cilindro Cork - Angle 3" : "Cilindro Cork - Ângulo 3" },
    { src: quadrado2t1, label: isEN ? "Quadrado 2T - Angle 1" : "Quadrado 2T - Ângulo 1" },
    { src: quadrado2t2, label: isEN ? "Quadrado 2T - Angle 2" : "Quadrado 2T - Ângulo 2" },
    { src: quadrado2t3, label: isEN ? "Quadrado 2T - Angle 3" : "Quadrado 2T - Ângulo 3" },
    { src: quadradoCork1, label: isEN ? "Quadrado Cork - Angle 1" : "Quadrado Cork - Ângulo 1" },
    { src: quadradoCork2, label: isEN ? "Quadrado Cork - Angle 2" : "Quadrado Cork - Ângulo 2" },
    { src: quadradoCork3, label: isEN ? "Quadrado Cork - Angle 3" : "Quadrado Cork - Ângulo 3" },
    { src: quadradoCarvalho1, label: isEN ? "Quadrado Oak - Angle 1" : "Quadrado Carvalho - Ângulo 1" },
    { src: quadradoCarvalho2, label: isEN ? "Quadrado Oak - Angle 2" : "Quadrado Carvalho - Ângulo 2" },
    { src: quadradoCarvalho3, label: isEN ? "Quadrado Oak - Angle 3" : "Quadrado Carvalho - Ângulo 3" },
    { src: quadradoNogueira1, label: isEN ? "Quadrado Walnut - Angle 1" : "Quadrado Nogueira - Ângulo 1" },
    { src: quadradoNogueira2, label: isEN ? "Quadrado Walnut - Angle 2" : "Quadrado Nogueira - Ângulo 2" },
    { src: quadradoNogueira3, label: isEN ? "Quadrado Walnut - Angle 3" : "Quadrado Nogueira - Ângulo 3" },
    { src: linha1, label: isEN ? "Linha Line - Angle 1" : "Linha Linha - Ângulo 1" },
    { src: linha2, label: isEN ? "Linha Line - Angle 2" : "Linha Linha - Ângulo 2" },
    { src: linha3, label: isEN ? "Linha Line - Angle 3" : "Linha Linha - Ângulo 3" },
  ];

  const phase2Slides: Slide[] = [
    {
      title: isEN ? "Gift Packaging Overview" : "Visão Geral da Embalagem de Presente",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Every packaging style is crafted to turn the Port Wine experience into a memorable unboxing ritual. Click through the gallery below to see all options."
              : "Cada estilo de embalagem é elaborado para transformar a experiência do Vinho do Porto em um ritual de desembrulho memorável. Clique através da galeria abaixo para ver todas as opções."}
          </p>
          <TipBlock
            type="core"
            title={isEN ? "Packaging Materials" : "Materiais de Embalagem"}
            items={[
              isEN ? "Cork (traditional, sustainable)" : "Cortiça (tradicional, sustentável)",
              isEN ? "Ceramic (hand-thrown, artisan)" : "Cerâmica (moldada à mão, artesanal)",
              isEN ? "Wood (oak, walnut, choice cuts)" : "Madeira (carvalho, nogueira, cortes escolhidos)",
              isEN ? "Brass hardware (develops patina)" : "Ferragens de bronze (desenvolve pátina)",
            ]}
          />
        </div>
      ),
    },
    {
      title: isEN ? "Explore All Packaging" : "Explore Toda Embalagem",
      content: (
        <InteractiveGallery items={packagingItems} columns={3} />
      ),
    },
  ];

  const phase2Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "What materials are used in The 100's gift packaging?"
        : "Quais materiais são usados na embalagem de presente The 100's?",
      options: [
        isEN
          ? "Plastic and cardboard only"
          : "Apenas plástico e papelão",
        isEN
          ? "Cork, ceramic, wood, and brass"
          : "Cortiça, cerâmica, madeira e bronze",
        isEN
          ? "Paper and ink"
          : "Papel e tinta",
        isEN
          ? "Glass and metal only"
          : "Apenas vidro e metal",
      ],
      correctIndex: 1,
    },
  ];

  // PHASE 3: Pantry Collection
  const phase3Slides: Slide[] = [
    {
      title: isEN ? "Pantry Collection Overview" : "Visão Geral da Coleção Pantry",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Beyond Port Wine, The 100's offers a curated selection of premium pantry items. Each product represents time, tradition, and craft."
              : "Além do Vinho do Porto, The 100's oferece uma seleção selecionada de itens premium de despensa. Cada produto representa tempo, tradição e ofício."}
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div className="border-l-4 border-primary bg-primary/5 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Olive Gold (Olive Oil)" : "Ouro de Oliva (Azeite)"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Century-old olive groves, cold-pressed, premium extra virgin"
                  : "Oliveiras centenárias, prensadas a frio, azeite extra virgem premium"}
              </p>
            </div>
            <div className="border-l-4 border-blue-500 bg-blue-500/5 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Sea Salt (Heritage Salt)" : "Sal do Mar (Sal de Herança)"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Millennia of crystallization, unrefined, mineral-rich"
                  : "Milênios de cristalização, não refinado, rico em minerais"}
              </p>
            </div>
            <div className="border-l-4 border-yellow-600 bg-yellow-500/5 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Heritage Tea (Tea Blends)" : "Chá de Herança (Misturas de Chá)"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Legacy cultivars, hand-selected leaves, slow-brewing blends"
                  : "Cultivares de herança, folhas selecionadas à mão, misturas de infusão lenta"}
              </p>
            </div>
            <div className="border-l-4 border-amber-700 bg-amber-500/5 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Artisan Honey (Raw Honey)" : "Mel Artesanal (Mel Bruto)"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Annual flowering cycles, minimal processing, heritage recipes"
                  : "Ciclos de floração anuais, processamento mínimo, receitas de herança"}
              </p>
            </div>
            <div className="border-l-4 border-orange-600 bg-orange-500/5 p-4 rounded">
              <p className="font-semibold text-sm">
                {isEN ? "Flame & Scent (Candles & Diffusers)" : "Chama & Aroma (Velas & Difusores)"}
              </p>
              <p className="text-xs text-foreground/70">
                {isEN
                  ? "Hand-poured, premium wax, slow-burn, marking ritual moments"
                  : "Derramadas à mão, cera premium, queimação lenta, marcando momentos rituais"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: isEN ? "Pantry Positioning" : "Posicionamento de Pantry",
      content: (
        <div className="space-y-4">
          <TipBlock
            type="core"
            title={isEN ? "Selling Pantry Items" : "Vendendo Itens de Pantry"}
            items={[
              isEN
                ? "Frame as curated gifts, not just food items"
                : "Enquadre como presentes selecionados, não apenas itens alimentares",
              isEN
                ? "Highlight time and heritage in each product"
                : "Destaque tempo e herança em cada produto",
              isEN
                ? "Emphasize sensorial experience (taste, aroma, ritual)"
                : "Enfatize experiência sensorial (paladar, aroma, ritual)",
              isEN
                ? "Bundle with Port Wine for complete gift packages"
                : "Combine com Vinho do Porto para pacotes de presentes completos",
            ]}
          />
        </div>
      ),
    },
  ];

  const phase3Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "What is Olive Gold in The 100's collection?"
        : "O que é Ouro de Oliva na coleção The 100's?",
      options: [
        isEN ? "Olive-flavored wine" : "Vinho com sabor de oliva",
        isEN
          ? "Premium extra virgin olive oil from century-old groves"
          : "Azeite extra virgem premium de oliveiras centenárias",
        isEN ? "Olive oil soap" : "Sabonete de azeite",
        isEN ? "Canned olives" : "Azeitonas enlatadas",
      ],
      correctIndex: 1,
    },
  ];

  // PHASE 4: Full Interactive Gallery
  const allProductsItems: ProductGalleryItem[] = [
    { src: garrafasImg, label: isEN ? "Port Wine Collection" : "Coleção de Vinho do Porto" },
    { src: lifestyle28, label: isEN ? "Lifestyle Shot 1" : "Foto de Estilo de Vida 1" },
    { src: lifestyle282, label: isEN ? "Lifestyle Shot 2" : "Foto de Estilo de Vida 2" },
    { src: lifestyle29, label: isEN ? "Lifestyle Shot 3" : "Foto de Estilo de Vida 3" },
    { src: lifestyle292, label: isEN ? "Lifestyle Shot 4" : "Foto de Estilo de Vida 4" },
    { src: lifestyle294, label: isEN ? "Lifestyle Shot 5" : "Foto de Estilo de Vida 5" },
    { src: lifestyle30, label: isEN ? "Lifestyle Shot 6" : "Foto de Estilo de Vida 6" },
    { src: quadradoCork1, label: isEN ? "Quadrado Cork Premium" : "Quadrado Cork Premium" },
    { src: cilindrocock2, label: isEN ? "Cilindro Cork Edition" : "Edição Cilindro Cork" },
    { src: quadradoCarvalho1, label: isEN ? "Quadrado Oak Collection" : "Coleção Quadrado Carvalho" },
  ];

  const phase4Slides: Slide[] = [
    {
      title: isEN ? "Complete Product Gallery" : "Galeria Completa de Produtos",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "Explore our complete collection of products and packaging. Every image shows the craftsmanship and attention to detail that defines The 100's."
              : "Explore nossa coleção completa de produtos e embalagem. Cada imagem mostra o artesanato e atenção aos detalhes que definem The 100's."}
          </p>
          <InteractiveGallery items={allProductsItems} columns={2} />
        </div>
      ),
    },
    {
      title: isEN ? "Quiz Your Knowledge" : "Teste Seu Conhecimento",
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            {isEN
              ? "You've now seen our complete product range. Test your knowledge of Port Wine tiers, packaging styles, and pantry offerings with this final quiz."
              : "Você viu nossa gama completa de produtos. Teste seu conhecimento de tiers de Vinho do Porto, estilos de embalagem e ofertas de pantry com este quiz final."}
          </p>
        </div>
      ),
    },
  ];

  const phase4Quiz: QuizQuestion[] = [
    {
      question: isEN
        ? "Which tier is considered an investment-grade collector's item?"
        : "Qual tier é considerado um item de colecionador de classe de investimento?",
      options: [
        isEN ? "Essentials" : "Essenciais",
        isEN ? "Signature" : "Assinatura",
        isEN ? "The Icon" : "O Ícone",
        isEN ? "The Hundred (100-year Port)" : "O Centenário (Porto de 100 anos)",
      ],
      correctIndex: 3,
    },
    {
      question: isEN
        ? "What is unique about The 100's packaging approach?"
        : "O que é único na abordagem de embalagem The 100's?",
      options: [
        isEN ? "It's the cheapest on the market" : "É a mais barata do mercado",
        isEN
          ? "Uses only plastic and cardboard"
          : "Usa apenas plástico e papelão",
        isEN
          ? "Combines cork, ceramic, wood, and brass for artisan experience"
          : "Combina cortiça, cerâmica, madeira e bronze para experiência artesanal",
        isEN
          ? "It changes every month"
          : "Muda todo mês",
      ],
      correctIndex: 2,
    },
    {
      question: isEN
        ? "How should you position pantry items like Olive Gold?"
        : "Como você deveria posicionar itens de pantry como Ouro de Oliva?",
      options: [
        isEN
          ? "As ordinary grocery items"
          : "Como itens de mercearia ordinários",
        isEN
          ? "As premium gifts celebrating heritage and time"
          : "Como presentes premium celebrando herança e tempo",
        isEN
          ? "As cheap cooking oils"
          : "Como óleos de culinária baratos",
        isEN
          ? "As wine substitutes"
          : "Como substitutos de vinho",
      ],
      correctIndex: 1,
    },
  ];

  // Phase structure
  const phases: Phase[] = [
    {
      id: "port-wine-tiers",
      title: isEN ? "Port Wine Tiers" : "Tiers de Vinho do Porto",
      subtitle: isEN ? "From Essentials to Collector's Items" : "De Essenciais a Itens de Colecionador",
      content: <SlideViewer slides={phase1Slides} onComplete={() => {}} />,
      quiz: phase1Quiz,
      passingScore: 50,
    },
    {
      id: "gift-packaging",
      title: isEN ? "Gift Packaging" : "Embalagem de Presente",
      subtitle: isEN ? "Artisan materials and design" : "Materiais e design artesanal",
      content: <SlideViewer slides={phase2Slides} onComplete={() => {}} />,
      quiz: phase2Quiz,
      passingScore: 50,
    },
    {
      id: "pantry-collection",
      title: isEN ? "Pantry Collection" : "Coleção Pantry",
      subtitle: isEN ? "Beyond Port Wine" : "Além do Vinho do Porto",
      content: <SlideViewer slides={phase3Slides} onComplete={() => {}} />,
      quiz: phase3Quiz,
      passingScore: 50,
    },
    {
      id: "complete-gallery",
      title: isEN ? "Complete Gallery" : "Galeria Completa",
      subtitle: isEN ? "Interactive product exploration" : "Exploração interativa de produtos",
      content: <SlideViewer slides={phase4Slides} onComplete={() => {}} />,
      quiz: phase4Quiz,
      passingScore: 66,
    },
  ];

  return (
    <ModuleLayout
      moduleId="product-knowledge"
      moduleNumber={2}
      title={isEN ? "Product Knowledge" : "Conhecimento de Produtos"}
      subtitle={isEN
        ? "Wines, Packaging, and Pantry"
        : "Vinhos, Embalagem e Pantry"}
      heroImage={heroDrop}
    >
      <PhaseSystem moduleId="product-knowledge" phases={phases} />
    </ModuleLayout>
  );
}
