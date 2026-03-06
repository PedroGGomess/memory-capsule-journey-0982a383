import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, MessageCircle, Settings, AlertCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const API_KEY_STORAGE = "the100s-openai-api-key";

const MODULE_CONTEXT: Record<string, string> = {
  "story": "The employee is learning about the origin and heritage of The 100's — a premium Port wine brand with 400+ years of Portuguese winemaking tradition.",
  "philosophy": "The employee is studying The 100's brand philosophy and its five pillars: Time, Memory, Legacy, Craftsmanship and Elegance.",
  "products": "The employee is learning about The 100's product collection — 100ml Port wine bottles in Tawny and White varieties, aged from Young to 100 Years.",
  "gift": "The employee is studying the premium gift concept — packaging, presentation, and the emotional experience of gifting The 100's.",
  "store": "The employee is learning about The 100's store experience — the emotional journey, sensory atmosphere, and visitor storytelling.",
  "brand-voice": "The employee is studying The 100's brand voice and communication guidelines.",
  "customer-experience": "The employee is learning about customer interaction techniques, storytelling, and the visitor experience.",
  "ask-team": "The employee is on the Ask the Team page — they can submit questions to the team.",
  "resources": "The employee is accessing brand resources — brand book, photos, and materials.",
  "ai-assistant": "The employee is on the AI Assistant module.",
  "certification": "The employee is completing their final onboarding certification.",
};

const SYSTEM_PROMPT = `You are a knowledgeable and elegant AI assistant for The 100's — a premium Portuguese Port wine brand.
You help new employees with onboarding, brand knowledge, store operations and customer service.

Key facts about The 100's:
- Premium Port wine brand featuring 100ml bottles that encapsulate history and time
- Collections: Tawny (Young, 10 Years, 30 Years, 50 Years, 100 Years) and White (Young, 10 Years, 30 Years, 50 Years, 100 Years)
- Brand philosophy rooted in Portuguese heritage, time, memory and legacy
- Positioned as a luxury gift experience
- The store experience is designed to be an emotional, sensory journey
- Origin from the Douro Valley, Portugal, with 400+ years of winemaking history

You assist employees with:
- Brand story, values and philosophy
- Product knowledge and tasting notes
- Gift presentation and packaging
- Customer storytelling and interaction techniques
- Store procedures and operations
- Brand voice and communication style

Be refined, knowledgeable and match the luxury tone of the brand. Answer in the same language the user writes in. Keep responses concise and helpful.`;

export function AIAssistantBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your onboarding assistant for The 100's. Ask me anything about the brand, products, or your onboarding journey.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem(API_KEY_STORAGE) ?? "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const currentModule = location.pathname.split("/module/")[1] ?? "";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const saveApiKey = () => {
    const trimmed = keyDraft.trim();
    if (!trimmed) return;
    localStorage.setItem(API_KEY_STORAGE, trimmed);
    setApiKey(trimmed);
    setKeyDraft("");
    setShowKeyInput(false);
    toast.success("API key saved");
  };

  const buildSystemPrompt = () => {
    const contextNote = MODULE_CONTEXT[currentModule];
    if (contextNote) {
      return `${SYSTEM_PROMPT}\n\nCurrent context: ${contextNote}`;
    }
    return SYSTEM_PROMPT;
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    if (!apiKey) {
      setShowKeyInput(true);
      toast.error("Please configure your OpenAI API key first");
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
          messages: [{ role: "system", content: buildSystemPrompt() }, ...history],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const msg = (err as { error?: { message?: string } })?.error?.message ?? `API error ${response.status}`;
        throw new Error(msg);
      }

      const data = (await response.json()) as { choices: { message: { content: string } }[] };
      const reply = data.choices[0]?.message?.content ?? "No response received.";

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply, timestamp: new Date() },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: `⚠️ Error: ${message}`, timestamp: new Date() },
      ]);
      toast.error("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 bg-card border border-border/30 shadow-2xl flex flex-col"
            style={{ height: "480px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/20 bg-primary/5">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/90">The 100's Assistant</span>
                {currentModule && (
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/50 hidden sm:inline">
                    · {currentModule.replace(/-/g, " ")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowKeyInput((v) => !v)}
                  title="API Key settings"
                >
                  <Settings className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* API Key input */}
            {showKeyInput && (
              <div className="px-4 py-3 border-b border-border/20 bg-secondary/20 space-y-2">
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <AlertCircle className="w-3 h-3 mt-0.5 shrink-0 text-primary/40" />
                  <span>Enter your OpenAI API key — stored locally in your browser only.</span>
                </div>
                <div className="flex gap-1.5">
                  <Input
                    type="password"
                    placeholder="sk-…"
                    value={keyDraft}
                    onChange={(e) => setKeyDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveApiKey()}
                    className="text-xs h-7 font-mono bg-background/50 border-border/30"
                  />
                  <Button size="sm" className="h-7 text-xs px-2" onClick={saveApiKey} disabled={!keyDraft.trim()}>
                    Save
                  </Button>
                </div>
                {apiKey && (
                  <p className="text-[10px] text-green-500/70">✓ API key configured</p>
                )}
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 px-4 py-3">
              <div className="space-y-3 pr-1">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`w-6 h-6 border flex items-center justify-center shrink-0 mt-0.5 ${
                        msg.role === "assistant" ? "border-primary/20 text-primary/60" : "border-border/30 text-muted-foreground"
                      }`}
                    >
                      {msg.role === "assistant" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    </div>
                    <div className={`max-w-[78%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-3 py-2 text-xs leading-relaxed font-light whitespace-pre-wrap ${
                          msg.role === "user"
                            ? "bg-primary/10 border border-primary/20 text-foreground/90"
                            : "bg-secondary/30 border border-border/20 text-foreground/80"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[9px] text-muted-foreground/30 px-0.5 mt-0.5">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2">
                    <div className="w-6 h-6 border border-primary/20 text-primary/60 flex items-center justify-center shrink-0">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-secondary/30 border border-border/20 px-3 py-2">
                      <div className="flex gap-1">
                        <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0ms]" />
                        <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border/20 px-3 py-2.5">
              <form onSubmit={sendMessage} className="flex gap-1.5">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={apiKey ? "Ask anything…" : "Set API key to chat…"}
                  disabled={loading}
                  className="flex-1 h-8 text-xs bg-background/50 border-border/30 font-light focus:border-primary/30"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-8 w-8 border border-primary/30 bg-transparent hover:bg-primary/10 text-primary shrink-0"
                  disabled={loading || !input.trim()}
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
              {!apiKey && (
                <p className="text-[10px] text-muted-foreground/40 mt-1 text-center">
                  Click <strong className="text-muted-foreground/60">Settings</strong> to set your OpenAI key
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
