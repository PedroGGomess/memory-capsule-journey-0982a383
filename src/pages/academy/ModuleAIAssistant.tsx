import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, AlertCircle, Settings } from "lucide-react";
import { toast } from "sonner";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are a knowledgeable and elegant assistant for The 100's — a premium Port wine brand from Portugal.
You help academy employees with onboarding, brand knowledge, store operations and customer service.

Key facts about The 100's:
- Premium Port wine brand featuring 100ml bottles that encapsulate history and time
- Collections: Tawny (Young, 10 Years, 30 Years, 50 Years, 100 Years) and White (Young, 10 Years, 30 Years, 50 Years, 100 Years)
- Brand philosophy rooted in Portuguese heritage, time, memory and legacy
- Positioned as a luxury gift experience
- The store experience is designed to be an emotional, sensory journey

You assist employees with:
- Brand story, values and philosophy
- Product knowledge and tasting notes
- Gift presentation and packaging
- Customer storytelling and interaction techniques
- Store procedures and operations
- Brand voice and communication style

Be refined, knowledgeable and match the luxury tone of the brand. Answer in the same language the user writes in.`;

const API_KEY_STORAGE = "the100s-openai-api-key";
const MODULE_ID = "ai-assistant";

const ModuleAIAssistant = () => {
  const { completeModule } = useProgress();
  const { t } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: t.academy.aiAssistant.welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(
    () => localStorage.getItem(API_KEY_STORAGE) ?? ""
  );
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveApiKey = () => {
    const trimmed = keyDraft.trim();
    if (!trimmed) return;
    localStorage.setItem(API_KEY_STORAGE, trimmed);
    setApiKey(trimmed);
    setKeyDraft("");
    setShowKeyInput(false);
    toast.success(t.admin.chat.apiKeySaved);
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE);
    setApiKey("");
    setShowKeyInput(false);
    toast.success(t.admin.chat.apiKeyRemoved);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    if (!apiKey) {
      setShowKeyInput(true);
      toast.error(t.admin.chat.apiKeyRequired);
      return;
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const msg =
          (err as { error?: { message?: string } })?.error?.message ??
          `API error ${response.status}`;
        throw new Error(msg);
      }

      const data = (await response.json()) as {
        choices: { message: { content: string } }[];
      };
      const reply = data.choices[0]?.message?.content ?? "No response received.";

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        },
      ]);

      completeModule(MODULE_ID);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `⚠️ Error: ${message}`,
          timestamp: new Date(),
        },
      ]);
      toast.error(t.admin.chat.failed);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="section-padding py-16 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-2">{t.academy.aiAssistant.moduleLabel}</p>
          <h1 className="text-3xl md:text-4xl font-light text-gold-gradient">{t.academy.aiAssistant.title}</h1>
          <p className="text-sm text-muted-foreground font-light mt-1">
            {t.academy.aiAssistant.subtitle}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setShowKeyInput((v) => !v);
            setKeyDraft("");
          }}
          className="border-border/40 text-muted-foreground hover:text-foreground text-xs tracking-[0.1em]"
        >
          <Settings className="w-3.5 h-3.5 mr-2" />
          {apiKey ? t.academy.aiAssistant.changeApiKey : t.academy.aiAssistant.setApiKey}
        </Button>
      </div>

      {showKeyInput && (
        <div className="border border-border/30 p-5 space-y-3 bg-card/30">
          <div className="flex items-start gap-2 text-xs text-muted-foreground font-light">
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/40" />
            <span>{t.academy.aiAssistant.apiKeyNote}</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="sk-…"
              value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveApiKey()}
              className="font-mono text-xs bg-background/50 border-border/40"
            />
            <Button size="sm" onClick={saveApiKey} disabled={!keyDraft.trim()} className="text-xs">
              {t.academy.aiAssistant.save}
            </Button>
            {apiKey && (
              <Button size="sm" variant="destructive" onClick={clearApiKey} className="text-xs">
                {t.academy.aiAssistant.remove}
              </Button>
            )}
          </div>
        </div>
      )}

      <Card className="flex-1 flex flex-col overflow-hidden border-border/30 bg-card/20">
        <ScrollArea className="flex-1 p-5">
          <div className="space-y-5 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-7 h-7 border flex items-center justify-center shrink-0 ${
                    msg.role === "assistant"
                      ? "border-primary/20 text-primary/60"
                      : "border-border/30 text-muted-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-3.5 h-3.5" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] space-y-1 ${
                    msg.role === "user" ? "items-end" : "items-start"
                  } flex flex-col`}
                >
                  <div
                    className={`px-4 py-3 text-sm leading-relaxed font-light whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary/10 border border-primary/20 text-foreground/90"
                        : "bg-secondary/30 border border-border/20 text-foreground/80"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-muted-foreground/40 px-1 tracking-wider">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 border border-primary/20 text-primary/60 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-secondary/30 border border-border/20 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-border/20 p-4">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={apiKey ? t.academy.aiAssistant.inputPlaceholder : t.academy.aiAssistant.inputPlaceholderNoKey}
              disabled={loading || !apiKey}
              className="flex-1 bg-background/50 border-border/30 font-light text-sm focus:border-primary/30"
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim() || !apiKey}
              className="border border-primary/30 bg-transparent hover:bg-primary/10 text-primary shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          {!apiKey && (
            <p className="text-xs text-muted-foreground/40 mt-2 text-center font-light">
              {t.academy.aiAssistant.configureKey}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ModuleAIAssistant;
