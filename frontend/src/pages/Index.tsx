import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LatestNews from "@/components/LatestNews";
import CategorySection from "@/components/CategorySection";
import MagazineSection from "@/components/MagazineSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import FloatingSubscribe from "@/components/FloatingSubscribe";

import news4 from "@/assets/news-4.jpg";
import news5 from "@/assets/news-5.jpg";
import news6 from "@/assets/news-6.jpg";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

const technologyArticles = [
  {
    image: news4,
    title: "How EdTech Is Reshaping Classrooms Across Rural India",
    date: "February 9, 2026",
    tag: "Technology",
    author: "Tech Desk",
    readTime: "6 min read",
  },
  {
    image: news2,
    title: "AI-Powered Learning Platforms See 300% Growth in School Adoption",
    date: "February 8, 2026",
    tag: "Innovation",
    author: "Digital Learning Team",
    readTime: "5 min read",
  },
  {
    image: news3,
    title: "Digital Infrastructure in Schools: Government Announces ₹5,000 Crore Initiative",
    date: "February 7, 2026",
    tag: "Policy Update",
    author: "Policy Bureau",
    readTime: "4 min read",
  },
];

const parentingArticles = [
  {
    image: news5,
    title: "Building Resilience: How Parents Can Support Children During Board Exam Season",
    date: "February 9, 2026",
    tag: "Student Wellbeing",
    author: "Dr. Ananya Rao",
    readTime: "6 min read",
  },
  {
    image: news1,
    title: "Expert Advice on Balancing Screen Time and Study Hours for School Students",
    date: "February 8, 2026",
    tag: "Parenting",
    author: "Counselling Desk",
    readTime: "5 min read",
  },
  {
    image: news6,
    title: "The Role of Emotional Intelligence in Modern Parenting and Child Development",
    date: "February 7, 2026",
    tag: "Emotional Intelligence",
    author: "Child Development Team",
    readTime: "7 min read",
  },
];

const expertViewArticles = [
  {
    image: news6,
    title: "NEP 2020 Implementation: Where Are We Now? An Expert Assessment",
    date: "February 9, 2026",
    tag: "Expert View",
    author: "Education Policy Panel",
    readTime: "8 min read",
  },
  {
    image: news1,
    title: "The Future of Vocational Education in India: Insights from Leading Educators",
    date: "February 8, 2026",
    tag: "Vocational Education",
    author: "Editorial Desk",
    readTime: "7 min read",
  },
  {
    image: news4,
    title: "Inclusive Education: Best Practices from Schools That Are Getting It Right",
    date: "February 7, 2026",
    tag: "Inclusive Education",
    author: "Inclusion Cell",
    readTime: "6 min read",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <LatestNews />
        <div className="border-t border-border/50">
          <CategorySection title="Expert View" articles={expertViewArticles} />
        </div>
        <div className="border-t border-border/50">
          <CategorySection title="Technology" articles={technologyArticles} />
        </div>
        <div className="border-t border-border/50">
          <CategorySection title="Parenting" articles={parentingArticles} />
        </div>
        <MagazineSection />
        <Newsletter />
      </main>
      <Footer />
      <FloatingSubscribe />
    </div>
  );
};

export default Index;
