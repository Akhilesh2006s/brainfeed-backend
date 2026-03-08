import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import News from "./pages/News";
import Subscribe from "./pages/Subscribe";
import Contact from "./pages/Contact";
import CancellationRefundPolicy from "./pages/CancellationRefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { AdminProvider } from "@/context/AdminContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminPostList from "./pages/admin/AdminPostList";
import AdminPostForm from "./pages/admin/AdminPostForm";
import AdminPageList from "./pages/admin/AdminPageList";
import AdminPageForm from "./pages/admin/AdminPageForm";
import PageView from "./pages/PageView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <AuthProvider>
          <AdminProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/news" element={<News />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Navigate to="/admin/posts" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/posts" element={<AdminLayout />}>
                  <Route index element={<AdminPostList />} />
                  <Route path="new" element={<AdminPostForm />} />
                  <Route path=":id/edit" element={<AdminPostForm />} />
                </Route>
                <Route path="/admin/pages" element={<AdminLayout />}>
                  <Route index element={<AdminPageList />} />
                  <Route path="new" element={<AdminPageForm />} />
                  <Route path=":id/edit" element={<AdminPageForm />} />
                </Route>
                <Route path="/page/:slug" element={<PageView />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AdminProvider>
        </AuthProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
