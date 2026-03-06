import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, AlertCircle, Settings } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are a helpful assistant for a gym management system. 
You help staff members answer questions about gym operations, member management, 
access codes, policies, schedules, equipment, and any other gym-related topics.
Be concise, friendly, and professional. Answer in the same language the user writes in.`;

const API_KEY_STORAGE = "gym-openai-api-key";

const GymAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Olá! Sou o assistente da academia. Posso ajudar com questões sobre gestão de membros, códigos de acesso, operações e muito mais. Como posso ajudar?",
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
    toast.success("API key saved");
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE);
    setApiKey("");
    setShowKeyInput(false);
    toast.success("API key removed");
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
      toast.error("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Assistant</h2>
          <p className="text-muted-foreground text-sm">
            Ask questions about gym operations, members, and policies
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setShowKeyInput((v) => !v);
            setKeyDraft("");
          }}
        >
          <Settings className="w-4 h-4 mr-2" />
          {apiKey ? "Change API Key" : "Set API Key"}
        </Button>
      </div>

      {/* API Key configuration */}
      {showKeyInput && (
        <Card className="border-dashed">
          <CardContent className="pt-4 pb-4 space-y-3">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                Enter your OpenAI API key. It is stored only in your browser and never sent
                anywhere except directly to OpenAI.
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="sk-…"
                value={keyDraft}
                onChange={(e) => setKeyDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveApiKey()}
                className="font-mono text-xs"
              />
              <Button size="sm" onClick={saveApiKey} disabled={!keyDraft.trim()}>
                Save
              </Button>
              {apiKey && (
                <Button size="sm" variant="destructive" onClick={clearApiKey}>
                  Remove
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat area */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "assistant"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] space-y-1 ${
                    msg.role === "user" ? "items-end" : "items-start"
                  } flex flex-col`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-muted-foreground px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border/30 p-3">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                apiKey
                  ? "Ask a question about gym operations…"
                  : "Configure your OpenAI API key to start chatting…"
              }
              disabled={loading || !apiKey}
              className="flex-1"
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim() || !apiKey}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
          {!apiKey && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Click <strong>Set API Key</strong> above to configure your OpenAI key
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default GymAIChat;
