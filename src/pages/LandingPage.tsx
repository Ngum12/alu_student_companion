import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Compass,
  GraduationCap,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Real ALU assets served from /public. The leading slash makes Vite resolve
// these against the deployment root, so they work both locally and on Vercel.
// Filenames with spaces are URL-encoded so the browser fetches them correctly.
const HERO_IMAGE = "/Andrew%20ALUSIVE.jpg.jpeg";
const COMPANION_LOGO = "/logo%20(3).png";

// The two below remain Unsplash placeholders until real ALU photos land.
const STUDY_IMAGE =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";
const CAMPUS_IMAGE =
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80";

export default function LandingPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (currentUser) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      {/* Top nav */}
      <header
        className={`sticky top-0 z-40 transition-all ${
          scrolled
            ? "bg-white/90 backdrop-blur border-b border-[#E8DDB0]"
            : "bg-transparent"
        }`}
      >
        <div className="h-1 w-full bg-[#D4AF37]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={COMPANION_LOGO}
              alt="ALU Student Companion logo"
              className="w-8 h-8 rounded-md object-contain"
            />
            <span className="font-semibold tracking-tight">ALU Student Companion</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-[#1A1A1A] hover:bg-[#FBF7E9]"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
            <Button
              className="bg-[#1A1A1A] hover:bg-black text-white"
              onClick={() => navigate("/signup")}
            >
              Get started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF7E9] border border-[#E8DDB0] text-xs font-medium text-[#B8941F] mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Built for ALU students, by the ALU community
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#1A1A1A]">
              Your AI Assistant for{" "}
              <span className="text-[#D4AF37]">Smarter Learning.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#1A1A1A]/70 max-w-xl leading-relaxed">
              Your AI companion for every step of the ALU journey — from
              academics and campus life to graduation and beyond.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-[#1A1A1A] hover:bg-black text-white h-12 px-7 text-base"
                onClick={() => navigate("/signup")}
              >
                Get started — it's free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-[#1A1A1A]/20 hover:bg-[#FBF7E9] text-[#1A1A1A] h-12 px-7 text-base"
                onClick={() => navigate("/login")}
              >
                I already have an account
              </Button>
            </div>
            <p className="mt-6 text-sm text-[#1A1A1A]/50">
              For students with <span className="font-medium text-[#1A1A1A]/80">@alustudent.com</span>{" "}
              or <span className="font-medium text-[#1A1A1A]/80">@alueducation.com</span> emails.
            </p>
          </div>

          {/* Hero image with gold offset */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-3 lg:-inset-4 bg-[#D4AF37] rounded-3xl rotate-1" />
            <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl">
              <img
                src={HERO_IMAGE}
                alt="ALU students at an ALUSIVE community event"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-medium opacity-90">Join 2,000+ students</p>
                <p className="text-xs opacity-70 mt-1">already using the Companion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-y border-[#E8DDB0] bg-[#FBF7E9]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "2,000+", label: "Active students" },
            { value: "24/7", label: "Instant answers" },
            { value: "3", label: "ALU campuses" },
            { value: "100%", label: "ALU-specific" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#1A1A1A]/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="max-w-2xl mb-16">
          <p className="text-sm uppercase tracking-widest text-[#B8941F] font-medium mb-4">
            What you can do
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A1A] tracking-tight">
            Built around the way ALU students actually learn.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: "Academic resources",
              body: "Course materials, grading policies, academic calendars and graduation pathways — answered instantly.",
            },
            {
              icon: Compass,
              title: "Campus navigation",
              body: "Find the right department, contact or service across all ALU campuses without the runaround.",
            },
            {
              icon: MessageSquare,
              title: "Quick answers",
              body: "Policies, procedures, deadlines — get clarity in seconds, with context from your conversation history.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group p-8 rounded-2xl border border-[#E8DDB0] bg-white hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FBF7E9] border border-[#E8DDB0] flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
                <Icon className="h-5 w-5 text-[#B8941F] group-hover:text-[#1A1A1A]" />
              </div>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3">{title}</h3>
              <p className="text-[#1A1A1A]/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Split image feature */}
      <section className="bg-[#FBF7E9]/40 border-y border-[#E8DDB0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl aspect-[5/4] shadow-xl">
              <img
                src={STUDY_IMAGE}
                alt="Student studying"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden md:block absolute -bottom-6 -right-6 bg-white border border-[#E8DDB0] rounded-2xl p-5 shadow-lg max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/60 font-medium">
                  Deadlines
                </span>
              </div>
              <p className="text-sm text-[#1A1A1A]">
                "When is the registration deadline for the next term?"
              </p>
              <p className="mt-2 text-xs text-[#1A1A1A]/60">Answered in 1.2s</p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-[#B8941F] font-medium mb-4">
              Always on
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A1A] tracking-tight leading-tight">
              Knowledge of the entire ALU handbook, ready when you need it.
            </h2>
            <p className="mt-6 text-lg text-[#1A1A1A]/70 leading-relaxed">
              No more digging through PDFs or waiting for office hours. Ask in
              plain English. Get a clear, sourced answer — at 2pm or 2am.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Academic policies and graduation requirements",
                "Department contacts and campus services",
                "Course descriptions and learning resources",
                "Events, deadlines and important dates",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                  <span className="text-[#1A1A1A]/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] text-white p-10 md:p-16">
          <div className="absolute inset-0 opacity-20">
            <img
              src={CAMPUS_IMAGE}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute top-0 left-0 h-1 w-full bg-[#D4AF37]" />
          <div className="relative max-w-2xl">
            <GraduationCap className="h-10 w-10 text-[#D4AF37] mb-6" />
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">
              Start your journey with the Companion today.
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Free for every ALU student. Sign up with your ALU email and start
              asking questions in under a minute.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#1A1A1A] h-12 px-7 text-base font-medium"
                onClick={() => navigate("/signup")}
              >
                Create your account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/30 hover:bg-white/10 text-white h-12 px-7 text-base"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8DDB0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#1A1A1A]/60">
            <div className="w-6 h-6 rounded bg-[#D4AF37] flex items-center justify-center text-[#1A1A1A] font-bold text-xs">
              A
            </div>
            <span>African Leadership University Student Companion</span>
          </div>
          <p className="text-xs text-[#1A1A1A]/50">
            © {new Date().getFullYear()} ALU. Built for students.
          </p>
        </div>
      </footer>
    </div>
  );
}
