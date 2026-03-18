import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const MODULE_ID = "ai-assistant";

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok || !resp.body) {
    const err = await resp.json().catch(() => ({}));
    onError(err.error || "Failed to connect to AI.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  while (!done) {
    const { done: readerDone, value } = await reader.read();
    if (readerDone) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  if (buffer.trim()) {
    for (let raw of buffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (!raw.startsWith("data: ")) continue;
      const json = raw.slice(6).trim();
      if (json === "[DONE]") continue;
      try {
        const c = JSON.parse(json).choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {}
    }
  }
  onDone();
}

const ModuleAIAssistant = () => {
  const { completeModule } = useProgress();
  const { t, language } = useLanguage();

  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: t.academy.aiAssistant.welcomeMessage },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Suggestion prompts
  const suggestions = [
    language === "pt" ? "Pergunta-me sobre os nossos vinhos" : "Ask me about our wines",
    language === "pt" ? "Como fazer upsell para turistas?" : "How to upsell to tourists?",
    language === "pt" ? "Explica-me o conceito Memory Capsule" : "Explain the Memory Capsule concept",
    language === "pt" ? "Ajuda-me com um cliente que não fala português" : "Help me with a customer who doesn't speak Portuguese",
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const formatTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const send = async (e: React.FormEvent, text?: string) => {
    if (e instanceof Event) e.preventDefault();
    const messageText = (text || input).trim();
    if (!messageText || loading) return;

    const userMsg: Msg = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError(null);
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && assistantSoFar.startsWith(chunk.length > 0 ? assistantSoFar.slice(0, chunk.length) : "")) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        if (last?.role === "assistant" && assistantSoFar.length > chunk.length) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant" as const, content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg].filter((_, i) => i > 0 || messages.length <= 1).map(m => ({ role: m.role, content: m.content })),
        onDelta: upsert,
        onDone: () => {
          setLoading(false);
          // ai-assistant is a tool, not a trackable module
        },
        onError: (msg) => {
          const errorMsg = language === "pt"
            ? "⚠️ Não conseguimos conectar ao assistente. Tenta de novo mais tarde ou contacta o apoio."
            : "⚠️ We couldn't connect to the assistant. Please try again later or contact support.";
          setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
          setError(msg);
          setLoading(false);
        },
      });
    } catch (err) {
      const errorMsg = language === "pt"
        ? "⚠️ Algo correu mal. Tenta novamente."
        : "⚠️ Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
      setError(String(err));
      setLoading(false);
    }
  };

  return (
    <div className="section-padding py-16 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)] space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-light text-gold-gradient">
          {t.academy.aiAssistant.title}
        </h1>
        <p className="text-sm text-muted-foreground font-light mt-1">
          {t.academy.aiAssistant.subtitle}
        </p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-border/30 bg-card/20">
        <ScrollArea className="flex-1 p-5">
          <div className="space-y-5 pr-2">
            {/* Initial suggestions - shown only when no user messages */}
            {messages.length === 1 && messages[0].role === "assistant" && (
              <div className="space-y-3 py-4">
                <p className="text-xs text-muted-foreground/60 tracking-[0.15em] uppercase">
                  {language === "pt" ? "Sugestões para começar:" : "Suggestions to get started:"}
                </p>
                <div className="space-y-2">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        send(e, suggestion);
                      }}
                      disabled={loading}
                      className="w-full text-left px-4 py-3 border border-border/30 hover:border-primary/30 bg-secondary/20 hover:bg-primary/5 transition-all text-sm font-light text-foreground/70 hover:text-foreground/90"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
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
                    className={`px-4 py-3 text-sm leading-relaxed font-light ${
                      msg.role === "user"
                        ? "bg-primary/10 border border-primary/20 text-foreground/90"
                        : "bg-secondary/30 border border-border/20 text-foreground/80"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none [&>p]:m-0 [&>ul]:my-1 [&>ol]:my-1">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground/40 px-1 tracking-wider">
                    {formatTime()}
                  </span>
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role !== "assistant" && (
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

            {error && (
              <div className="p-4 border border-red-500/30 bg-red-950/20 text-red-400/80 text-sm rounded-sm">
                <p className="font-light">
                  {language === "pt"
                    ? "Houve um erro ao conectar. Tenta novamente."
                    : "There was an error connecting. Please try again."}
                </p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-border/20 p-4">
          <form onSubmit={send} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.academy.aiAssistant.inputPlaceholder}
              disabled={loading}
              className="flex-1 bg-background/50 border-border/30 font-light text-sm focus:border-primary/30"
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="border border-primary/30 bg-transparent hover:bg-primary/10 text-primary shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ModuleAIAssistant;
