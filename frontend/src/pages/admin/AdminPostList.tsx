import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Newspaper, BookOpen } from "lucide-react";
import { toast } from "sonner";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

type Post = {
  _id: string;
  type: string;
  title: string;
  category: string;
  views: number;
  createdAt: string;
};

const AdminPostList = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") === "blog" ? "blog" : "news";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { token } = useAdmin();

  useEffect(() => {
    if (!token) return;
    const url = `${API_BASE}/api/admin/posts?type=${type}`;
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setSelectedPost(null);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [token, type]);

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Delete this post?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setPosts((prev) => prev.filter((p) => p._id !== id));
      setSelectedPost(null);
      toast.success("Post deleted.");
    } catch {
      toast.error("Failed to delete post.");
    }
  };

  const title = type === "news" ? "News posts" : "Blog posts";
  const Icon = type === "news" ? Newspaper : BookOpen;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Icon className="h-6 w-6 text-accent" />
        <h1 className="font-serif text-2xl text-foreground">{title}</h1>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground py-8">No posts yet. Add one from the sidebar.</p>
      ) : (
        <div className="rounded-lg border border-border/60 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border/60">
              <tr>
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Category</th>
                <th className="text-left p-3 font-medium">Views</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className={`border-b border-border/40 hover:bg-muted/30 ${selectedPost?._id === post._id ? "bg-accent/5" : ""}`}
                >
                  <td className="p-3 font-medium max-w-[200px] truncate">{post.title}</td>
                  <td className="p-3 text-muted-foreground">{post.category}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {post.views ?? 0}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8"
                        onClick={() => setSelectedPost(selectedPost?._id === post._id ? null : post)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Link to={`/admin/posts/${post._id}/edit?type=${type}`}>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(post._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedPost && (
        <div className="mt-6 p-4 rounded-lg border border-border/60 bg-card/60">
          <h3 className="font-semibold text-foreground mb-2">Selected post – Views</h3>
          <p className="text-2xl font-serif text-accent">{selectedPost.views ?? 0}</p>
          <p className="text-sm text-muted-foreground mt-1">{selectedPost.title}</p>
        </div>
      )}
    </div>
  );
};

export default AdminPostList;
