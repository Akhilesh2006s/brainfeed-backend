import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Heading2, Link as LinkIcon, Eraser } from "lucide-react";
import { toast } from "sonner";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

function slugFromTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "page";
}

/** Simple rich text editor for page content */
function RichTextEditor({ value, onChange, placeholder }: { value: string; onChange: (html: string) => void; placeholder?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInternal = useRef(false);
  const [formatState, setFormatState] = useState({ bold: false, italic: false, underline: false, strike: false });

  const updateFormatState = () => {
    const el = ref.current;
    if (!el || !document.contains(el)) return;
    const sel = window.getSelection();
    const inEditor = sel && (el.contains(sel.anchorNode) || el.contains(sel.focusNode));
    if (!inEditor) return;
    setFormatState({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strike: document.queryCommandState("strikeThrough"),
    });
  };

  useEffect(() => {
    if (!ref.current) return;
    if (isInternal.current) {
      isInternal.current = false;
      return;
    }
    if (ref.current.innerHTML !== value) ref.current.innerHTML = value || "";
  }, [value]);

  useEffect(() => {
    document.addEventListener("selectionchange", updateFormatState);
    return () => document.removeEventListener("selectionchange", updateFormatState);
  }, []);

  const emit = () => {
    if (!ref.current) return;
    isInternal.current = true;
    onChange(ref.current.innerHTML);
  };

  const cmd = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    ref.current?.focus();
    emit();
    setTimeout(updateFormatState, 0);
  };

  const addLink = () => {
    const url = window.prompt("Link URL:");
    if (url) cmd("createLink", url);
  };

  const btn = (active: boolean) =>
    active ? "h-8 w-8 bg-accent/20 text-accent hover:bg-accent/30" : "h-8 w-8";

  return (
    <div className="rounded-md border border-input bg-background overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-input bg-muted/50">
        <Button type="button" variant="ghost" size="icon" className={btn(formatState.bold)} onClick={() => cmd("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className={btn(formatState.italic)} onClick={() => cmd("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className={btn(formatState.underline)} onClick={() => cmd("underline")} title="Underline">
          <Underline className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className={btn(formatState.strike)} onClick={() => cmd("strikeThrough")} title="Strikethrough">
          <Strikethrough className="h-4 w-4" />
        </Button>
        <span className="w-px h-6 bg-border mx-0.5" />
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => cmd("formatBlock", "h2")} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => cmd("insertUnorderedList")} title="Bullet list">
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => cmd("insertOrderedList")} title="Numbered list">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={addLink} title="Insert link">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => cmd("removeFormat")} title="Clear formatting">
          <Eraser className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={ref}
        contentEditable
        className="rich-editor-body min-h-[200px] p-3 text-foreground focus:outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_h2]:text-xl [&_h2]:font-semibold empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground"
        data-placeholder={placeholder}
        onInput={emit}
        suppressContentEditableWarning
      />
    </div>
  );
}

type PageOption = { _id: string; title: string; slug: string };

const AdminPageForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { token } = useAdmin();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [parent, setParent] = useState<string>("");
  const [order, setOrder] = useState(0);
  const [parentOptions, setParentOptions] = useState<PageOption[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/admin/pages`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : []))
      .then((pages: PageOption[]) => setParentOptions(Array.isArray(pages) ? pages.filter((p) => p._id !== id) : []))
      .catch(() => setParentOptions([]));
  }, [token, id]);

  useEffect(() => {
    if (!title && !isEdit) setSlug("");
    else if (!isEdit) setSlug(slugFromTitle(title));
  }, [title, isEdit]);

  useEffect(() => {
    if (isEdit && id && token) {
      fetch(`${API_BASE}/api/admin/pages/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => (res.ok ? res.json() : null))
        .then((p: { title?: string; slug?: string; content?: string; parent?: string | null; order?: number } | null) => {
          if (!p) return;
          setTitle(String(p.title || ""));
          setSlug(String(p.slug || ""));
          setContent(String(p.content || ""));
          setParent(p.parent ? String(p.parent) : "");
          setOrder(Number(p.order) ?? 0);
        })
        .catch(() => toast.error("Failed to load page"))
        .finally(() => setLoading(false));
    }
  }, [isEdit, id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !title.trim()) {
      toast.error("Title is required.");
      return;
    }
    setSaving(true);
    const body = JSON.stringify({
      title: title.trim(),
      slug: slug.trim() || slugFromTitle(title),
      content,
      parent: parent || null,
      order,
    });
    try {
      const url = isEdit ? `${API_BASE}/api/admin/pages/${id}` : `${API_BASE}/api/admin/pages`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      toast.success(isEdit ? "Page updated." : "Page created.");
      navigate("/admin/pages");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save page.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-serif text-2xl text-foreground mb-6">
        {isEdit ? "Edit page" : "Add page"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label>Page title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. About Us, Contact, Services"
            required
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">This also becomes the URL slug if you don’t set one below.</p>
        </div>
        <div className="space-y-2">
          <Label>URL slug (optional)</Label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. about-us, contact"
            className="h-11 font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">Page URL: /page/{slug || slugFromTitle(title) || "…"}</p>
        </div>
        <div className="space-y-2">
          <Label>Parent page (optional)</Label>
          <Select value={parent || "none"} onValueChange={(v) => setParent(v === "none" ? "" : v)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="None (top level)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (top level)</SelectItem>
              {parentOptions.map((p) => (
                <SelectItem key={p._id} value={p._id}>{p.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">For hierarchy, e.g. Services → Web Development.</p>
        </div>
        <div className="space-y-2">
          <Label>Order (optional)</Label>
          <Input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value) || 0)}
            className="h-11 w-24"
          />
        </div>
        <div className="space-y-2">
          <Label>Content</Label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Add content using the toolbar: headings, lists, links, etc."
          />
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Update page" : "Publish page"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/pages")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminPageForm;
