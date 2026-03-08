import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { MessageSquare, CheckCircle, Search, Reply, Inbox, RefreshCw, Trash2 } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: string;
  employee_name: string;
  question: string;
  module: string | null;
  category: string | null;
  created_at: string;
  resolved: boolean;
  reply: string | null;
}

const AdminQuestions = () => {
  const { t } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("all");
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("employee_questions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setQuestions(data as Question[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("employee_questions_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "employee_questions" }, () => {
        fetchQuestions();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchQuestions]);

  const filtered = questions.filter((q) => {
    const matchesSearch =
      q.employee_name.toLowerCase().includes(search.toLowerCase()) ||
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      (q.module || "").toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "open" && !q.resolved) ||
      (filter === "resolved" && q.resolved);
    return matchesSearch && matchesFilter;
  });

  const openCount = questions.filter((q) => !q.resolved).length;
  const resolvedCount = questions.filter((q) => q.resolved).length;

  const handleReply = async () => {
    if (!replyTarget || !replyText.trim()) return;
    const { error } = await supabase
      .from("employee_questions")
      .update({ reply: replyText.trim() })
      .eq("id", replyTarget);
    if (!error) {
      setReplyTarget(null);
      setReplyText("");
      toast.success(t.admin.questions.replySent);
      fetchQuestions();
    }
  };

  const handleResolve = async (id: string) => {
    const { error } = await supabase
      .from("employee_questions")
      .update({ resolved: true })
      .eq("id", id);
    if (!error) {
      toast.success(t.admin.questions.markedResolved);
      fetchQuestions();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase
      .from("employee_questions")
      .delete()
      .eq("id", deleteTarget);
    if (!error) {
      setDeleteTarget(null);
      toast.success("Questão eliminada.");
      fetchQuestions();
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  };

  const replyingTo = questions.find((q) => q.id === replyTarget);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t.admin.questions.title}</h2>
          <p className="text-muted-foreground text-sm">{t.admin.questions.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={fetchQuestions} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Inbox className="w-4 h-4" />
            <span>{openCount} open</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{questions.length}</p>
              <p className="text-sm text-muted-foreground">{t.admin.questions.all} {t.admin.questions.tableHeaders.question}s</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{openCount}</p>
              <p className="text-sm text-muted-foreground">{t.admin.questions.open}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{resolvedCount}</p>
              <p className="text-sm text-muted-foreground">{t.admin.questions.resolved}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t.admin.questions.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs h-8"
              />
            </div>
            <div className="flex gap-1">
              {(["all", "open", "resolved"] as const).map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs capitalize"
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                    {loading ? "Loading..." : questions.length === 0 ? "No questions yet." : "No results found."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">{q.employee_name}</TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm truncate">{q.question}</p>
                      {q.reply && (
                        <p className="text-xs text-primary/60 mt-0.5 truncate">↩ {q.reply}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      {q.module ? (
                        <Badge variant="outline" className="text-xs capitalize">
                          {q.module.replace(/-/g, " ")}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{formatDate(q.created_at)}</TableCell>
                    <TableCell>
                      {q.resolved ? (
                        <Badge variant="secondary" className="text-xs">Resolved</Badge>
                      ) : (
                        <Badge className="text-xs bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">Open</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => { setReplyTarget(q.id); setReplyText(""); }}>
                          <Reply className="w-3 h-3" /> Reply
                        </Button>
                        {!q.resolved && (
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600 hover:text-green-700" onClick={() => handleResolve(q.id)}>
                            <CheckCircle className="w-3 h-3 mr-1" /> Resolve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!replyTarget} onOpenChange={(open) => !open && setReplyTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Question</DialogTitle>
          </DialogHeader>
          {replyingTo && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md space-y-1">
                <p className="text-xs text-muted-foreground font-medium">{replyingTo.employee_name}</p>
                <p className="text-sm">{replyingTo.question}</p>
                {replyingTo.module && (
                  <p className="text-xs text-primary/60 mt-1">Module: {replyingTo.module.replace(/-/g, " ")}</p>
                )}
              </div>
              <Textarea placeholder="Write your reply…" value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={4} />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setReplyTarget(null)}>Cancel</Button>
                <Button onClick={handleReply} disabled={!replyText.trim()}>Send Reply</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminQuestions;
