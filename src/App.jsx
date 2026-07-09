import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, Network, Server, BookOpen, Users, Award, ChevronRight, 
  Star, Check, X, Mail, Lock, Play, Clock, BarChart2, 
  Wifi, Cpu, Globe, Menu, ArrowUpRight, Zap, Target, ChevronDown
} from 'lucide-react';
import axios from 'axios';
import InterviewPrep from './components/InterviewPrep';

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';
const PORTAL_URL = import.meta.env.VITE_PORTAL_URL || 'http://localhost:3001';

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ openLoginModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' },
    { to: '/interview-prep', label: 'Interview Prep' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-2xl shadow-black/40' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/40 transition">
            <Network className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-800 text-lg tracking-tight text-white">
            Gordon<span className="text-blue-400">IT</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-white bg-white/5'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button onClick={openLoginModal} className="text-slate-300 hover:text-white text-sm font-semibold transition px-3 py-2">
            Sign In
          </button>
          <button
            onClick={openLoginModal}
            className="btn-primary text-sm px-5 py-2.5"
          >
            Start Free →
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-slate-400 hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0E16] border-t border-white/5 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="block py-2.5 px-3 text-slate-300 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="pt-3 space-y-2">
            <button onClick={() => { openLoginModal(); setMenuOpen(false); }} className="w-full btn-secondary text-sm py-2.5">Sign In</button>
            <button onClick={() => { openLoginModal(); setMenuOpen(false); }} className="w-full btn-primary text-sm py-2.5">Start Free</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ============================================================
// LAYOUT
// ============================================================
function Layout({ children, openLoginModal }) {
  return (
    <div className="min-h-screen bg-[#0A0B10] text-slate-100 flex flex-col">
      <Navbar openLoginModal={openLoginModal} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const links = {
    'Courses': ['CCNA 200-301', 'CCNP ENCOR', 'Cybersecurity', 'Network Automation', 'Practice Exams'],
    'Company': ['About', 'Blog', 'Contact', 'Careers'],
    'Support': ['FAQ', 'Community', 'Discord', 'Changelog'],
  };

  return (
    <footer className="bg-[#07080D] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Network className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Gordon<span className="text-blue-400">IT</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Expert-led Cisco certification training. Pass your CCNA & CCNP exams with structured video courses and hands-on labs.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {['CCNA', 'CCNP', 'CyberSec'].map(cert => (
                <span key={cert} className="badge badge-blue">{cert}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">{group}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <Link to="/" className="text-slate-500 hover:text-slate-200 text-sm transition">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>© 2026 Gordon IT Academy. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-slate-400 transition">Privacy Policy</Link>
            <Link to="/" className="hover:text-slate-400 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function Home({ openLoginModal }) {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  const [testimonials, setTestimonials] = useState([]);

  const tabs = ['All', 'CCNA', 'CCNP', 'Cybersecurity', 'Automation'];

  const stats = [
    { number: '5,000+', label: 'Students Trained', icon: Users },
    { number: '95%', label: 'Exam Pass Rate', icon: Award },
    { number: '40+', label: 'Video Courses', icon: Play },
    { number: '500+', label: 'Practice Questions', icon: Target },
  ];

  const features = [
    {
      icon: Network,
      color: 'from-blue-500/20 to-blue-600/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      title: 'Cisco-Focused Curriculum',
      desc: 'Every course built specifically for Cisco certifications — CCNA, CCNP, and beyond. No generic content, only exam-relevant material.'
    },
    {
      icon: Target,
      color: 'from-purple-500/20 to-purple-600/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
      title: 'Practice Exam Engine',
      desc: 'Simulate the real CCNA/CCNP exam environment with 500+ questions, timed sessions, and instant answer explanations.'
    },
    {
      icon: Zap,
      color: 'from-emerald-500/20 to-emerald-600/10',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      title: 'Expert Cisco Instructor',
      desc: 'Learn directly from Gordon, a CCIE-certified Cisco instructor with 10+ years of enterprise networking experience.'
    },
    {
      icon: BarChart2,
      color: 'from-orange-500/20 to-orange-600/10',
      iconColor: 'text-orange-400',
      borderColor: 'border-orange-500/20',
      title: 'Progress Tracking',
      desc: 'Track lesson completion, exam scores, and certification readiness — all in your personal learning dashboard.'
    },
  ];

  const certPaths = [
    {
      cert: 'CCNA 200-301',
      badge: 'Associate',
      badgeClass: 'badge-green',
      level: 'Beginner',
      color: 'from-blue-600/20 to-indigo-600/10',
      accent: '#3B82F6',
      desc: 'The #1 entry-level networking certification. Master IP addressing, routing, switching, and basic security.',
      modules: ['Network Fundamentals', 'IP Connectivity', 'Security Fundamentals', 'Automation'],
      duration: '60+ hours',
      questions: '200+',
    },
    {
      cert: 'CCNP ENCOR 350-401',
      badge: 'Professional',
      badgeClass: 'badge-blue',
      level: 'Intermediate',
      color: 'from-purple-600/20 to-blue-600/10',
      accent: '#8B5CF6',
      desc: 'Deep-dive into enterprise network architecture, advanced routing protocols, and network programmability.',
      modules: ['Advanced Routing', 'SD-Access', 'Network Assurance', 'Infrastructure Security'],
      duration: '80+ hours',
      questions: '300+',
    },
    {
      cert: 'Cybersecurity Fundamentals',
      badge: 'Security',
      badgeClass: 'badge-orange',
      level: 'Intermediate',
      color: 'from-orange-600/20 to-red-600/10',
      accent: '#F97316',
      desc: 'Understand network threats, configure firewalls, VPNs, AAA security, and implement Cisco security features.',
      modules: ['Threat Landscape', 'Cisco Firepower', 'VPN Technologies', 'AAA & NAC'],
      duration: '40+ hours',
      questions: '150+',
    },
  ];

  useEffect(() => {
    axios.get(`${API_BASE}/courses`)
      .then(res => setCourses(res.data))
      .catch(() => {});

    axios.get(`${API_BASE}/testimonials`)
      .then(res => setTestimonials(res.data))
      .catch(() => {});
  }, []);

  const filteredCourses = activeTab === 'All' ? courses : courses.filter(c => c.title.toLowerCase().includes(activeTab.toLowerCase()) || c.description?.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div>
      {/* ---- HERO ---- */}
      <section className="hero-bg dot-grid-bg min-h-screen flex items-center relative overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Announcement badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm font-semibold text-blue-400">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span>New: CCNP 350-401 ENCOR Course Now Available</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white">
              Master Cisco.<br />
              <span className="text-gradient">Get Certified.</span>
            </h1>

            {/* Sub headline */}
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Structured CCNA, CCNP, and Cybersecurity video courses by a CCIE-certified instructor. 
              High-quality labs, practice exams, and everything you need to pass on your first try.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={openLoginModal}
                className="btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center text-base"
              >
                <span>Start Learning Free</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <a
                href={`${PORTAL_URL}/exams`}
                className="btn-secondary flex items-center space-x-2 w-full sm:w-auto justify-center text-base"
              >
                <Play className="h-4 w-4" />
                <span>Try Practice Exam</span>
              </a>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D'].map((l, i) => (
                    <div key={l} className="w-7 h-7 rounded-full border-2 border-[#0A0B10] flex items-center justify-center text-[10px] font-bold text-white" style={{ background: ['#3B82F6','#8B5CF6','#10B981','#F59E0B'][i] }}>{l}</div>
                  ))}
                </div>
                <span>5,000+ students enrolled</span>
              </div>
              <div className="flex items-center space-x-1.5 text-sm text-slate-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
                <span className="font-semibold text-white">4.9</span>
                <span>average rating</span>
              </div>
              <div className="flex items-center space-x-1.5 text-sm text-slate-400">
                <Check className="h-4 w-4 text-green-400" />
                <span>95% first-try pass rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CERT LOGOS STRIP ---- */}
      <div className="section-bg-alt py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold text-slate-600 tracking-widest uppercase mb-5">
            Certification Paths Covered
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['CCNA 200-301', 'CCNP ENCOR 350-401', 'CCNP ENARSI 300-410', 'CyberOps Associate', 'Cisco DevNet', 'Network+'].map(cert => (
              <span key={cert} className="text-slate-400 text-sm font-semibold border border-slate-800 rounded-full px-4 py-1.5 hover:border-blue-500/40 hover:text-slate-200 transition">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- STATS ---- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="glass-card-static rounded-2xl p-6 text-center space-y-2">
              <div className="stat-number">{s.number}</div>
              <p className="text-slate-500 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- CERTIFICATION PATHS ---- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <span className="badge badge-blue mx-auto">Learning Paths</span>
          <h2 className="font-display text-4xl font-extrabold text-white">
            Choose Your Cisco Certification Path
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Structured from beginner to expert. Each path includes video courses, lab exercises, and a targeted practice exam engine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {certPaths.map((path, i) => (
            <div key={i} className={`course-card bg-gradient-to-b ${path.color} rounded-2xl`}>
              <div className="card-accent-bar" style={{ background: `linear-gradient(90deg, ${path.accent}, transparent)` }} />
              <div className="p-7 space-y-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <span className={`badge ${path.badgeClass}`}>{path.badge}</span>
                    <h3 className="font-display text-xl font-bold text-white leading-tight">{path.cert}</h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-900/50 px-2 py-1 rounded-lg">{path.level}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">{path.desc}</p>

                <div className="space-y-2">
                  {path.modules.map(mod => (
                    <div key={mod} className="flex items-center space-x-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/5 pt-4">
                  <div className="flex items-center space-x-1.5"><Clock className="h-3.5 w-3.5" /><span>{path.duration}</span></div>
                  <div className="flex items-center space-x-1.5"><BookOpen className="h-3.5 w-3.5" /><span>{path.questions} questions</span></div>
                </div>

                <button
                  onClick={openLoginModal}
                  className="w-full py-3 rounded-xl font-bold text-sm transition flex items-center justify-center space-x-2"
                  style={{ background: `${path.accent}20`, color: path.accent, border: `1px solid ${path.accent}30` }}
                  onMouseOver={e => e.currentTarget.style.background = `${path.accent}30`}
                  onMouseOut={e => e.currentTarget.style.background = `${path.accent}20`}
                >
                  <span>Explore Path</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- COURSES FROM API ---- */}
      {courses.length > 0 && (
        <section className="py-20 section-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <span className="badge badge-green mx-auto">Live Courses</span>
              <h2 className="font-display text-4xl font-extrabold text-white">
                Start Your Journey Today
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">Browse all available courses. Free access to the first lesson of every course.</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-semibold transition ${activeTab === tab ? 'tab-active' : 'tab-inactive'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredCourses.length > 0 ? filteredCourses : courses).slice(0, 6).map(course => (
                <div key={course.id} className="course-card flex flex-col">
                  <div className="card-accent-bar" />
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-44 object-cover opacity-80" />
                  <div className="p-5 flex flex-col flex-grow space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`badge ${course.difficulty === 'Advanced' ? 'badge-orange' : course.difficulty === 'Intermediate' ? 'badge-purple' : 'badge-green'}`}>
                        {course.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="text-xs font-bold text-slate-300">4.9</span>
                      </div>
                    </div>
                    <div className="flex-grow space-y-2">
                      <h3 className="font-display font-bold text-white text-lg leading-snug">{course.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 border-t border-white/5 pt-3">
                      <div className="flex items-center space-x-1"><Users className="h-3.5 w-3.5" /><span>Cisco Certified</span></div>
                      <div className="flex items-center space-x-1"><Play className="h-3.5 w-3.5" /><span>Video + Labs</span></div>
                    </div>
                    <button
                      onClick={openLoginModal}
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-blue-500/30 text-slate-300 hover:text-white rounded-xl font-semibold text-sm transition flex items-center justify-center space-x-2"
                    >
                      <span>View Course</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button onClick={openLoginModal} className="btn-primary inline-flex items-center space-x-2">
                <span>View All Courses</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---- WHY GORDON IT ---- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <span className="badge badge-purple mx-auto">Why Us</span>
          <h2 className="font-display text-4xl font-extrabold text-white">
            Built for Cisco Students. By a Cisco Instructor.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Not a generic platform. Every course, question, and lab is hand-crafted by Gordon — a CCIE-certified professional with real enterprise networking experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className={`glass-card rounded-2xl p-7 flex items-start space-x-5 border ${f.borderColor}`} style={{ background: `linear-gradient(135deg, ${f.color})` }}>
              <div className={`feature-icon bg-gradient-to-br ${f.color} border ${f.borderColor}`}>
                <f.icon className={`h-5 w-5 ${f.iconColor}`} strokeWidth={1.8} />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white text-lg">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- INSTRUCTOR SPOTLIGHT ---- */}
      <section className="py-20 section-bg-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl overflow-hidden border border-white/8">
            <div className="flex flex-col md:flex-row">
              {/* Instructor Visual */}
              <div className="md:w-80 bg-gradient-to-br from-blue-600/20 to-indigo-700/10 p-10 flex flex-col items-center justify-center space-y-4 text-center border-b md:border-b-0 md:border-r border-white/5">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-display font-black text-white">G</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl text-white">Gordon Mac Donald</h3>
                  <p className="text-blue-400 text-sm font-semibold">CCIE Certified • Cisco Instructor</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="badge badge-blue">CCNA</span>
                  <span className="badge badge-purple">CCNP</span>
                  <span className="badge badge-orange">CCIE</span>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  <span className="text-slate-300 text-sm ml-1">4.9 / 5.0</span>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="flex-1 p-8 md:p-12 space-y-6">
                <h2 className="font-display text-3xl font-extrabold text-white">
                  Learn from a Real <span className="text-gradient">Cisco Professional</span>
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Gordon is a CCIE-certified networking professional with over 10 years of enterprise networking experience. 
                  As a Cisco Certified Instructor, he has helped thousands of engineers pass their CCNA and CCNP exams 
                  through focused, practical, and exam-targeted study material.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[{ n: '10+', l: 'Years Experience' }, { n: '5K+', l: 'Students Trained' }, { n: '95%', l: 'Pass Rate' }].map((s, i) => (
                    <div key={i} className="text-center p-4 rounded-2xl bg-white/3 border border-white/5">
                      <div className="text-2xl font-display font-black text-blue-400">{s.n}</div>
                      <div className="text-xs text-slate-500 font-medium mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
                <button onClick={openLoginModal} className="btn-primary inline-flex items-center space-x-2">
                  <span>Start Learning with Gordon</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- TESTIMONIALS ---- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <span className="badge badge-green mx-auto">Student Success</span>
          <h2 className="font-display text-4xl font-extrabold text-white">Certified Engineers Trust Gordon IT</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Real results from real students who passed their Cisco exams.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card rounded-2xl p-7 space-y-5">
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center space-x-3 pt-2 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- PRICING CTA ---- */}
      <section className="py-20 section-bg-alt">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="font-display text-4xl font-extrabold text-white">
            Ready to Get <span className="text-gradient">Cisco Certified?</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Join 5,000+ engineers already learning on Gordon IT. Start for free — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={openLoginModal} className="btn-primary text-base px-8 py-4 flex items-center justify-center space-x-2">
              <span>Get Started Free</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <Link to="/pricing" className="btn-secondary text-base px-8 py-4 inline-flex items-center justify-center space-x-2">
              <span>View Pricing</span>
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center space-x-1.5"><Check className="h-4 w-4 text-green-400" /><span>Free tier available</span></div>
            <div className="flex items-center space-x-1.5"><Check className="h-4 w-4 text-green-400" /><span>Cancel anytime</span></div>
            <div className="flex items-center space-x-1.5"><Check className="h-4 w-4 text-green-400" /><span>Instant access</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// PRICING PAGE
// ============================================================
function Pricing({ openLoginModal }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/subscriptions`)
      .then(res => {
        setPlans(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-slate-900 w-24 mx-auto rounded-full" />
          <div className="h-12 bg-slate-900 w-96 mx-auto rounded-2xl" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card rounded-3xl h-96 bg-slate-900/50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-16">
        <span className="badge badge-blue mx-auto">Pricing</span>
        <h1 className="font-display text-5xl font-extrabold text-white">Simple, Transparent Pricing</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          Start free. Upgrade when you're ready to unlock all Cisco certification content.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`glass-card rounded-3xl p-8 flex flex-col justify-between border relative ${
              plan.featured 
                ? 'border-blue-500/40 ring-1 ring-blue-500/40' 
                : 'border-white/10'
            }`}
          >
            {plan.badge && (
              <div className={`absolute -top-3 right-6 badge ${plan.featured ? 'badge-blue' : 'badge-green'}`}>
                {plan.badge}
              </div>
            )}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className={`font-display text-xl font-bold ${plan.featured ? 'text-blue-400' : 'text-white'}`}>{plan.name}</h2>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="font-display text-5xl font-black text-white">${plan.price}</span>
                <span className="text-slate-500 text-sm">
                  {plan.price === 0 ? 'forever' : `/${plan.billingPeriod}`}
                </span>
              </div>
              <ul className="space-y-3">
                {(plan.features || []).map((f, j) => (
                  <li key={j} className="flex items-center space-x-3 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={openLoginModal}
              className={`mt-8 w-full py-3.5 rounded-2xl font-bold text-sm transition ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 text-sm text-slate-500">
        <p>All plans include a 7-day refund guarantee. Questions? <Link to="/contact" className="text-blue-400 hover:underline">Contact support</Link></p>
      </div>
    </div>
  );
}

function About() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/about`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const iconMap = {
    Award: Award,
    Users: Users,
    Target: Target,
    BookOpen: BookOpen
  };

  if (loading) {
    return (
      <div className="py-20 max-w-6xl mx-auto px-4 text-center space-y-8 animate-pulse">
        <div className="h-8 bg-slate-900 w-48 mx-auto rounded-full" />
        <div className="h-12 bg-slate-900 w-96 mx-auto rounded-2xl" />
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="h-6 bg-slate-900 rounded-xl" />
            <div className="h-6 bg-slate-900 rounded-xl" />
            <div className="h-6 bg-slate-900 rounded-xl" />
          </div>
          <div className="h-64 bg-slate-900 rounded-3xl" />
        </div>
      </div>
    );
  }

  const aboutData = data || {
    title: "About Gordon IT Academy",
    subTitle: "About",
    paragraphs: [
      "Gordon IT Academy was founded by Gordon Mac Donald — a CCIE-certified Cisco networking professional — to deliver structured, practical, and exam-focused IT training.",
      "Unlike generic e-learning platforms, every course on this platform is hand-crafted by Gordon himself. The focus is entirely on Cisco certifications: CCNA, CCNP, and Cybersecurity — because that's what IT professionals need to advance in their careers.",
      "The platform features high-quality video lectures, downloadable lab exercises, and a comprehensive practice exam engine. Everything you need to pass your Cisco exam on the first try."
    ],
    stats: [
      { icon: 'Award', label: 'Cisco CCIE Certified', sub: 'Enterprise Infrastructure' },
      { icon: 'Users', label: '5,000+ Students Trained', sub: 'Across 50+ countries' },
      { icon: 'Target', label: '95% First-Attempt Pass Rate', sub: 'CCNA & CCNP combined' },
      { icon: 'BookOpen', label: '40+ Video Courses', sub: 'With hands-on labs' }
    ]
  };

  return (
    <div className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center space-y-4">
        <span className="badge badge-blue mx-auto">{aboutData.subTitle}</span>
        <h1 className="font-display text-5xl font-extrabold text-white">{aboutData.title}</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-slate-400 leading-relaxed">
          {(aboutData.paragraphs || []).map((para, idx) => (
            <p key={idx} className={idx === 0 ? "text-lg text-slate-300" : ""}>
              {para}
            </p>
          ))}
        </div>
        <div className="glass-card rounded-3xl p-8 space-y-6">
          {(aboutData.stats || []).map((item, i) => {
            const IconComponent = iconMap[item.icon] || Award;
            return (
              <div key={i} className="flex items-center space-x-4">
                <div className="feature-icon">
                  <IconComponent className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/blog`)
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <span className="badge badge-purple mx-auto">Blog</span>
        <h1 className="font-display text-5xl font-extrabold text-white">Networking Insights & Study Guides</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          Expert articles from Gordon on Cisco certifications, networking concepts, and career advice.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl h-64 bg-slate-900/50" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No articles published yet. Stay tuned!
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="card-accent-bar" />
                {post.coverImage && (
                  <img src={post.coverImage} alt={post.title} className="w-full h-40 object-cover opacity-75" />
                )}
                <div className="p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="badge badge-blue">{post.category}</span>
                    <span className="text-xs text-slate-500">{post.readTime}</span>
                  </div>
                  <h2 className="font-display font-bold text-white text-xl leading-snug">{post.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
              </div>
              <div className="p-7 pt-0 flex items-center justify-between text-xs text-slate-600 border-t border-white/5 pt-4">
                <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="text-blue-400 font-semibold hover:underline flex items-center space-x-1"
                >
                  <span>Read More</span><ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Details Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="glass-card w-full max-w-3xl rounded-3xl p-8 relative space-y-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition">
              <X className="h-5 w-5" />
            </button>

            {selectedPost.coverImage && (
              <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-64 object-cover rounded-2xl opacity-80" />
            )}

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <span className="badge badge-blue">{selectedPost.category}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
                <span>•</span>
                <span>{new Date(selectedPost.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <h1 className="font-display text-3xl font-extrabold text-white">{selectedPost.title}</h1>
            </div>

            <div className="divider" />

            <div className="text-slate-300 leading-relaxed text-sm whitespace-pre-line space-y-4">
              {selectedPost.content}
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                onClick={() => setSelectedPost(null)}
                className="btn-secondary text-xs px-5 py-2.5"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// COURSES PAGE (separate from Home)
// ============================================================
function CoursesPage({ openLoginModal }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');

  useEffect(() => {
    axios.get(`${API_BASE}/courses`)
      .then(res => { setCourses(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.description || '').toLowerCase().includes(search.toLowerCase());
    const matchDiff = difficulty === 'All' || c.difficulty === difficulty;
    return matchSearch && matchDiff;
  });

  const coursePaths = [
    { label: 'CCNA', desc: '200-301', color: 'badge-green', count: courses.filter(c => c.title.toLowerCase().includes('ccna')).length || '–' },
    { label: 'CCNP', desc: '350-401', color: 'badge-blue', count: courses.filter(c => c.title.toLowerCase().includes('ccnp')).length || '–' },
    { label: 'Cybersecurity', desc: 'CyberOps', color: 'badge-orange', count: courses.filter(c => c.title.toLowerCase().includes('security') || c.title.toLowerCase().includes('cyber')).length || '–' },
    { label: 'Automation', desc: 'DevNet', color: 'badge-purple', count: courses.filter(c => c.title.toLowerCase().includes('auto') || c.title.toLowerCase().includes('python')).length || '–' },
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="hero-bg py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="badge badge-blue mx-auto">Course Library</span>
          <h1 className="font-display text-5xl font-extrabold text-white">
            All Cisco <span className="text-gradient">IT Courses</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Structured video courses for CCNA, CCNP, Cybersecurity and Network Automation. 
            Every course built by a CCIE-certified instructor.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses (e.g. CCNA, routing, BGP...)"
              className="w-full bg-white/5 border border-white/10 focus:border-blue-500/60 rounded-2xl pl-10 pr-4 py-3.5 text-white outline-none text-sm placeholder-slate-500 transition"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Cert Path Quick Filter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {coursePaths.map((p, i) => (
            <button
              key={i}
              onClick={() => setSearch(p.label)}
              className="glass-card rounded-2xl p-4 text-left space-y-2 hover:border-blue-500/30 transition"
            >
              <span className={`badge ${p.color}`}>{p.label}</span>
              <div className="text-xs text-slate-500">{p.desc}</div>
              <div className="text-2xl font-display font-black text-white">{p.count}<span className="text-sm text-slate-500 font-normal ml-1">courses</span></div>
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter:</span>
          <div className="flex flex-wrap gap-2">
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-1.5 text-sm font-semibold transition ${difficulty === d ? 'tab-active' : 'tab-inactive'}`}
              >
                {d}
              </button>
            ))}
          </div>
          <span className="ml-auto text-xs text-slate-600">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</span>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card-static rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="text-5xl">🔍</div>
            <p className="text-slate-400 text-lg">No courses found matching "{search}"</p>
            <button onClick={() => { setSearch(''); setDifficulty('All'); }} className="text-blue-400 text-sm hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <div key={course.id} className="course-card flex flex-col">
                <div className="card-accent-bar" />
                {course.thumbnailUrl && (
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-44 object-cover opacity-80" />
                )}
                <div className="p-5 flex flex-col flex-grow space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`badge ${
                      course.difficulty === 'Advanced' ? 'badge-orange' :
                      course.difficulty === 'Intermediate' ? 'badge-purple' : 'badge-green'
                    }`}>{course.difficulty || 'Beginner'}</span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="text-xs font-bold text-slate-300">4.9</span>
                    </div>
                  </div>
                  <div className="flex-grow space-y-2">
                    <h3 className="font-display font-bold text-white text-lg leading-snug">{course.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{course.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 border-t border-white/5 pt-3">
                    <div className="flex items-center space-x-1">
                      <Play className="h-3.5 w-3.5" />
                      <span>Video + Labs</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>CCNA/CCNP</span>
                    </div>
                  </div>
                  <button
                    onClick={openLoginModal}
                    className="w-full py-2.5 bg-white/5 hover:bg-blue-600/10 border border-white/8 hover:border-blue-500/30 text-slate-300 hover:text-blue-300 rounded-xl font-semibold text-sm transition flex items-center justify-center space-x-2"
                  >
                    <span>Enroll Now</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="glass-card rounded-3xl p-10 text-center space-y-5 border border-blue-500/15">
          <h2 className="font-display text-3xl font-extrabold text-white">Can't find what you're looking for?</h2>
          <p className="text-slate-400 max-w-lg mx-auto">New courses are added regularly. Sign up free to get notified when new Cisco certification content launches.</p>
          <button onClick={openLoginModal} className="btn-primary inline-flex items-center space-x-2">
            <span>Create Free Account</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================
function Contact() {
  return (
    <div className="py-20 max-w-2xl mx-auto px-4 sm:px-6 space-y-12">
      <div className="text-center space-y-4">
        <span className="badge badge-green mx-auto">Contact</span>
        <h1 className="font-display text-5xl font-extrabold text-white">Get In Touch</h1>
        <p className="text-slate-400">Have a question about a course or need support? We usually respond within 24 hours.</p>
      </div>

      <div className="glass-card rounded-3xl p-8 space-y-6">
        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent! We\'ll respond within 24 hours.'); }} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">First Name</label>
              <input type="text" required className="w-full bg-white/5 border border-white/8 focus:border-blue-500/60 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm placeholder-slate-600" placeholder="Alex" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Last Name</label>
              <input type="text" required className="w-full bg-white/5 border border-white/8 focus:border-blue-500/60 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm placeholder-slate-600" placeholder="Johnson" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Email Address</label>
            <input type="email" required className="w-full bg-white/5 border border-white/8 focus:border-blue-500/60 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm placeholder-slate-600" placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Topic</label>
            <select className="w-full bg-white/5 border border-white/8 focus:border-blue-500/60 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm">
              <option>General Question</option>
              <option>Course Content Help</option>
              <option>Billing & Subscription</option>
              <option>Technical Issue</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Message</label>
            <textarea rows="4" required className="w-full bg-white/5 border border-white/8 focus:border-blue-500/60 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm resize-none placeholder-slate-600" placeholder="Describe your question or issue..."></textarea>
          </div>
          <button type="submit" className="btn-primary w-full justify-center text-sm">Send Message</button>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// LOGIN MODAL
// ============================================================
function LoginModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const res = await axios.post(`${API_BASE}${endpoint}`, { email, password });
      const { access_token, membership_level, email: userEmail } = res.data;
      window.location.href = `${PORTAL_URL}/?token=${access_token}&email=${userEmail}&membership=${membership_level}`;
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="glass-card w-full max-w-md rounded-3xl p-8 relative space-y-6 border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition">
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-3">
            <Network className="h-6 w-6 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-slate-400">
            {isRegister ? 'Join 5,000+ students learning Cisco skills' : 'Sign in to your Gordon IT portal'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
              <Mail className="h-3.5 w-3.5" /><span>Email Address</span>
            </label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/8 focus:border-blue-500/60 rounded-xl px-4 py-3 text-white outline-none transition text-sm placeholder-slate-600"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
              <Lock className="h-3.5 w-3.5" /><span>Password</span>
            </label>
            <input
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/8 focus:border-blue-500/60 rounded-xl px-4 py-3 text-white outline-none transition text-sm placeholder-slate-600"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In to Portal'}
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/6" />
          <span className="mx-4 text-slate-600 text-xs font-bold">OR</span>
          <div className="flex-grow border-t border-white/6" />
        </div>

        <button
          onClick={() => {
            setError('Google login is in setup mode. Please use email & password.');
          }}
          className="w-full py-3 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.68 14.93 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.05 7.34 8.78 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.21-2.25H12v4.26h6.45c-.28 1.47-1.11 2.72-2.36 3.56l3.6 2.8c2.1-1.94 3.81-4.78 3.81-8.37z" />
            <path fill="#FBBC05" d="M5.1 14.7c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.5 7.5C.54 9.4 0 11.64 0 14s.54 4.6 1.5 6.5l3.6-2.8z" />
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.9l-3.6-2.8c-1.1.74-2.52 1.18-4.36 1.18-3.22 0-5.95-2.3-6.9-5.46l-3.6 2.8C3.4 20.35 7.35 23 12 23z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="text-center">
          <button onClick={() => { setIsRegister(!isRegister); setError(''); }} className="text-xs text-blue-400 hover:underline">
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up Free"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Layout openLoginModal={() => setIsLoginOpen(true)}>
        <Routes>
          <Route path="/" element={<Home openLoginModal={() => setIsLoginOpen(true)} />} />
          <Route path="/courses" element={<CoursesPage openLoginModal={() => setIsLoginOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing openLoginModal={() => setIsLoginOpen(true)} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </Layout>
    </Router>
  );
}
