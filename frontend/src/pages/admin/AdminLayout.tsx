import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { useEffect } from "react";
import { Newspaper, BookOpen, PlusCircle, LogOut, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { token, isLoading, logout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!token) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-56 border-r border-border/60 bg-card/60 flex flex-col">
        <div className="p-4 border-b border-border/60">
          <h1 className="font-serif text-lg font-semibold text-foreground">Brainfeed Admin</h1>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <Link
            to="/admin/posts?type=news"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <Newspaper className="h-4 w-4" />
            News posts
          </Link>
          <Link
            to="/admin/posts?type=blog"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Blog posts
          </Link>
          <div className="pt-2 mt-2 border-t border-border/60">
            <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Pages</p>
            <Link
              to="/admin/pages"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
            >
              <List className="h-4 w-4" />
              All Pages
            </Link>
            <Link
              to="/admin/pages/new"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-accent hover:bg-accent/10 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Page
            </Link>
          </div>
          <div className="pt-2 mt-2 border-t border-border/60">
            <Link
              to="/admin/posts/new?type=news"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-accent hover:bg-accent/10 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              Add news
            </Link>
            <Link
              to="/admin/posts/new?type=blog"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-accent hover:bg-accent/10 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              Add blog
            </Link>
          </div>
        </nav>
        <div className="p-3 border-t border-border/60">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground block mb-2">
            ← Back to site
          </Link>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={() => { logout(); navigate("/admin/login", { replace: true }); }}>
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
