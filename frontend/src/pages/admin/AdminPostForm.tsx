import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePlus, Video, Music, Link2, Quote, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Heading2, Link as LinkIcon, Eraser } from "lucide-react";
import { toast } from "sonner";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

const NEWS_CATEGORIES = ["Achievement", "Press Release", "Expert View"];
const BLOG_CATEGORIES = ["Education", "Policy", "Parenting", "Expert View", "Technology"];
const FORMATS = [
  { value: "standard", label: "Standard" },
  { value: "gallery", label: "Gallery" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "link", label: "Link" },
  { value: "quote", label: "Quote" },
];

/** Simple rich text editor with toolbar (no external deps). */
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

const AdminPostForm = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const type = searchParams.get("type") === "blog" ? "blog" : "news";
  const isEdit = Boolean(id);
  const { token } = useAdmin();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [format, setFormat] = useState("standard");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [readTime, setReadTime] = useState("4 min read");
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  const categories = type === "news" ? NEWS_CATEGORIES : BLOG_CATEGORIES;

  useEffect(() => {
    if (!category && categories.length) setCategory(categories[0]);
  }, [type, categories, category]);

  useEffect(() => {
    if (isEdit && id && token) {
      fetch(`${API_BASE}/api/admin/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => (res.ok ? res.json() : null))
        .then((p: Record<string, unknown> | null) => {
          if (!p) return;
          setTitle(String(p.title || ""));
          setSubtitle(String(p.subtitle || ""));
          setContent(String(p.content || ""));
          setFormat(String(p.format || "standard"));
          setCategory(String(p.category || categories[0]));
          setExcerpt(String(p.excerpt || ""));
          setReadTime(String(p.readTime || "4 min read"));
          setVideoUrl(String((p.media as { videoUrl?: string })?.videoUrl || ""));
          setAudioUrl(String((p.media as { audioUrl?: string })?.audioUrl || ""));
          setLinkUrl(String((p.media as { linkUrl?: string })?.linkUrl || ""));
          setQuoteText(String((p.media as { quoteText?: string })?.quoteText || ""));
        })
        .catch(() => toast.error("Failed to load post"))
        .finally(() => setLoading(false));
    }
  }, [isEdit, id, token, type, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !title.trim() || !category.trim()) {
      toast.error("Title and category are required.");
      return;
    }
    setSaving(true);
    const formData = new FormData();
    formData.set("type", type);
    formData.set("title", title.trim());
    formData.set("subtitle", subtitle.trim());
    formData.set("content", content);
    formData.set("format", format);
    formData.set("category", category.trim());
    formData.set("excerpt", excerpt.trim());
    formData.set("readTime", readTime.trim());
    formData.set("videoUrl", videoUrl.trim());
    formData.set("audioUrl", audioUrl.trim());
    formData.set("linkUrl", linkUrl.trim());
    formData.set("quoteText", quoteText.trim());
    if (featuredImage) formData.set("featuredImage", featuredImage);
    galleryFiles.forEach((f, i) => formData.append("gallery", f));
    if (videoFile) formData.set("videoFile", videoFile);
    if (audioFile) formData.set("audioFile", audioFile);

    try {
      const url = isEdit ? `${API_BASE}/api/admin/posts/${id}` : `${API_BASE}/api/admin/posts`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      toast.success(isEdit ? "Post updated." : "Post created.");
      navigate(`/admin/posts?type=${type}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-serif text-2xl text-foreground mb-6">
        {isEdit ? "Edit post" : type === "news" ? "Add news" : "Add blog"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add title" required className="h-11" />
        </div>
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Add sub title here" className="h-11" />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Content (paragraph / article body)</Label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your article here. Use the toolbar for bold, italic, underline, headings, lists and links."
          />
          <p className="text-xs text-muted-foreground">Use the toolbar for bold, italic, underline, headings, lists and links.</p>
        </div>
        <div className="space-y-2">
          <Label>Excerpt (short summary)</Label>
          <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief excerpt for cards" className="h-11" />
        </div>
        <div className="space-y-2">
          <Label>Read time</Label>
          <Input value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="4 min read" className="h-11" />
        </div>

        <div className="space-y-2">
          <Label>Featured image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
            className="h-11"
          />
        </div>

        <Tabs value={format} onValueChange={(v) => setFormat(v)}>
          <Label className="block mb-2">Post format</Label>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1">
            {FORMATS.map((f) => (
              <TabsTrigger key={f.value} value={f.value} className="text-xs">
                {f.value === "gallery" && <ImagePlus className="h-3.5 w-3.5 mr-1" />}
                {f.value === "video" && <Video className="h-3.5 w-3.5 mr-1" />}
                {f.value === "audio" && <Music className="h-3.5 w-3.5 mr-1" />}
                {f.value === "link" && <Link2 className="h-3.5 w-3.5 mr-1" />}
                {f.value === "quote" && <Quote className="h-3.5 w-3.5 mr-1" />}
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="gallery" className="mt-3">
            <Label>Gallery images</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
              className="h-11 mt-1"
            />
          </TabsContent>
          <TabsContent value="video" className="mt-3 space-y-2">
            <Label>Video URL (or upload file)</Label>
            <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://..." className="h-11" />
            <Input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="h-11" />
          </TabsContent>
          <TabsContent value="audio" className="mt-3 space-y-2">
            <Label>Audio URL (or upload file)</Label>
            <Input value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} placeholder="https://..." className="h-11" />
            <Input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} className="h-11" />
          </TabsContent>
          <TabsContent value="link" className="mt-3">
            <Label>Link URL</Label>
            <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..." className="h-11" />
          </TabsContent>
          <TabsContent value="quote" className="mt-3">
            <Label>Quote text</Label>
            <Textarea value={quoteText} onChange={(e) => setQuoteText(e.target.value)} placeholder="Quote content" className="min-h-[80px]" />
          </TabsContent>
        </Tabs>

        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Update post" : "Create post"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(`/admin/posts?type=${type}`)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminPostForm;
