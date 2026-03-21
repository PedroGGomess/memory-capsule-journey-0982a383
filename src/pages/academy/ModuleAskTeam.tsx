import { useState } from "react";
import { ModuleLayout, ContentBlock, ExpandableSection, VideoBlock, ModuleQuizGate } from "@/components/ModuleComponents";
import ScrollReveal from "@/components/ScrollReveal";
import heroDropImg from "@/assets/hero-drop.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ModuleAskTeam = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("product");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const currentModule = location.pathname.split("/module/")[1] ?? "ask-team";

  const handleSubmit = async () => {
    if (!name.trim() || !question.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("employee_questions").insert({
        employee_name: name.trim(),
        question: question.trim(),
        module: category !== "other" ? category : currentModule,
        category,
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success(language === "pt" ? "Pergunta enviada com sucesso!" : "Question submitted to the team!");
    } catch {
      toast.error(language === "pt" ? "Erro ao enviar pergunta." : "Failed to submit question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModuleLayout
      moduleId="ask-team"
      hideCompletion
      title={language === "pt" ? "Perguntar à Equipa" : "Ask the Team"}
      subtitle={language === "pt" ? "Perguntas, suporte e comunicação interna." : "Questions, support and internal communication."}
      heroImage={heroDropImg}
    >
      <ContentBlock title={language === "pt" ? "Estamos Aqui para Ajudar" : "We're Here to Help"}>
        <p>{language === "pt"
          ? "Tens uma pergunta sobre a marca, um produto ou uma situação com um cliente? Este é o teu espaço para perguntar. Não há perguntas demasiado pequenas."
          : "Have a question about the brand, a product, or a customer situation? This is your space to ask. No question is too small."
        }</p>
      </ContentBlock>

      <VideoBlock
        title="Perguntas à Equipa"
        description="Dúvidas frequentes e respostas da liderança."
        duration="7:15"
        poster={heroDropImg}
      />

      <ExpandableSection title={language === "pt" ? "Como funciona a personalização UV?" : "How does UV personalization work?"}>
        <p>{language === "pt"
          ? "A impressora UV permite personalizar garrafas com nomes, datas ou mensagens. O processo é rápido (2-3 minutos) e cria um efeito permanente. Sempre oferece como uma opção premium para tornar a compra única e memorável para o cliente."
          : "Our UV printer allows personalizing bottles with names, dates, or messages. The process is fast (2-3 minutes) and creates a permanent effect. Always offer it as a premium option to make the purchase unique and memorable for the customer."
        }</p>
      </ExpandableSection>

      <ExpandableSection title={language === "pt" ? "Quais são os tipos de Vinho do Porto que vendemos?" : "What types of Port wine do we sell?"}>
        <p>{language === "pt"
          ? "Vendemos principalmente Tawny Port (envelhecido em barril), disponível em categorias: Young/Ruby Essentials, 10 Anos (Signature), 30 Anos (Legacy), 50 Anos (The Icon), e 100 Anos (The Hundred). Também temos Vinho do Porto Branco e Azeite Premium. Cada categoria representa um valor diferente e uma história única."
          : "We primarily sell Tawny Port (barrel-aged), available in categories: Young/Ruby Essentials, 10 Years (Signature), 30 Years (Legacy), 50 Years (The Icon), and 100 Years (The Hundred). We also offer White Port and Premium Olive Oil. Each category represents a different value and unique story."
        }</p>
      </ExpandableSection>

      <ExpandableSection title={language === "pt" ? "Como faço Tax Free para turistas?" : "How do I process Tax Free for tourists?"}>
        <p>{language === "pt"
          ? "Para turistas não-residentes na UE: peça o passaporte, valida a compra no sistema de Tax Free (Global Blue ou afiliado), imprime os formulários e carimbas antes da saída do aeroporto. O cliente recebe reembolso por email ou no próprio aeroporto. Sempre confirma que a compra é elegível (mínimo geralmente €25)."
          : "For non-EU residents: ask for passport, validate the purchase in the Tax Free system (Global Blue or affiliate), print forms and stamp them before airport departure. The customer receives refund by email or at the airport. Always confirm the purchase is eligible (minimum usually €25)."
        }</p>
      </ExpandableSection>

      <ExpandableSection title={language === "pt" ? "O que é o conceito 'Second Life'?" : "What is the 'Second Life' concept?"}>
        <p>{language === "pt"
          ? "Após consumir o vinho, a garrafa pode ter uma 'segunda vida': servir como suporte para velas, difusor de aromas, porta-joias ou peça decorativa. Isto é parte da nossa história de sustentabilidade e luxo. Sempre menciona isto ao cliente — transforma a compra numa lembrança permanente da experiência."
          : "After drinking the wine, the bottle can have a 'second life': serve as a candle holder, aroma diffuser, jewelry stand, or decorative piece. This is part of our sustainability and luxury story. Always mention this to the customer — it transforms the purchase into a permanent reminder of the experience."
        }</p>
      </ExpandableSection>

      <ExpandableSection title={language === "pt" ? "Como usar o POS WinMax4?" : "How to use the WinMax4 POS?"}>
        <p>{language === "pt"
          ? "O WinMax4 é o nosso sistema de Point of Sale. Teclado numérico para inserir quantidades, ecrã tátil para selecionar produtos, e botão de pagamento no final. Sempre confirma a quantidade de itens, o desconto (se aplicável), e o método de pagamento. Contacta o gerente se houver problemas."
          : "WinMax4 is our Point of Sale system. Use the numeric keypad to enter quantities, touch screen to select products, and payment button at the end. Always confirm the number of items, discount (if applicable), and payment method. Contact the manager if there are issues."
        }</p>
      </ExpandableSection>

      <ScrollReveal>
        <div className="border border-border/30 p-8 space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/60">{t.academy.askTeam.submitLabel}</p>
          {!submitted ? (
            <>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t.academy.askTeam.namePlaceholder}
                className="w-full bg-secondary/30 border border-border/30 text-foreground p-4 text-sm font-light focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/30"
              />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-secondary/30 border border-border/30 text-foreground/70 p-4 text-sm font-light focus:outline-none focus:border-primary/30"
              >
                <option value="product">{t.academy.askTeam.categoryProduct}</option>
                <option value="customer">{t.academy.askTeam.categoryCustomer}</option>
                <option value="brand">{t.academy.askTeam.categoryBrand}</option>
                <option value="store">{t.academy.askTeam.categoryStore}</option>
                <option value="other">{t.academy.askTeam.categoryOther}</option>
              </select>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder={t.academy.askTeam.questionPlaceholder}
                className="w-full min-h-[120px] bg-secondary/30 border border-border/30 text-foreground p-4 text-sm font-light resize-none focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/30"
              />
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !question.trim() || loading}
                className="border border-primary/30 px-8 py-3 text-sm tracking-[0.2em] uppercase text-primary transition-all duration-500 hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading
                  ? (language === "pt" ? "A enviar..." : "Submitting...")
                  : t.academy.askTeam.submitButton
                }
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-primary text-sm mb-2">{t.academy.askTeam.submittedSuccess}</p>
              <p className="text-muted-foreground text-xs">{t.academy.askTeam.submittedNote}</p>
              <button
                onClick={() => { setSubmitted(false); setName(""); setQuestion(""); setCategory("product"); }}
                className="mt-4 text-xs text-muted-foreground/50 hover:text-muted-foreground underline"
              >
                {t.academy.askTeam.submitAnother}
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>

      <ModuleQuizGate
        moduleId="ask-team"
        questions={[
          { question: "A quem deve um colaborador recorrer primeiro com dúvidas operacionais?", options: ["Ao CEO", "Ao Team Leader ou colega mais experiente", "Ao cliente", "À internet"], correctIndex: 1 },
          { question: "Como funciona o canal de comunicação interna?", options: ["Apenas presencial", "WhatsApp interno, rádio e reuniões regulares", "Email formal apenas", "Não existe canal"], correctIndex: 1 },
          { question: "Com que frequência são feitas reuniões de equipa?", options: ["Nunca", "Huddles diários + reuniões semanais de equipa", "Apenas mensalmente", "Apenas quando há problemas"], correctIndex: 1 },
          { question: "O que fazer quando não sabes a resposta a uma pergunta do cliente?", options: ["Inventar uma resposta", "Ser honesto, pedir ajuda a um colega ou verificar a informação", "Ignorar o cliente", "Mudar de assunto"], correctIndex: 1 },
          { question: "Porque é importante partilhar feedback entre a equipa?", options: ["Não é importante", "Melhora continuamente o serviço e fortalece a equipa", "Apenas para reclamar", "Só os gestores devem dar feedback"], correctIndex: 1 },
        ]}
      />
    </ModuleLayout>
  );
};

export default ModuleAskTeam;
