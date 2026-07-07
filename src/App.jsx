import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Shield, BookOpen, Key, Server, Check, ArrowRight, X, Mail, User, Info, FileText } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

// Shared Layout Component
function Layout({ children, openLoginModal }) {
  return (
    <div className="min-h-screen bg-slate-950 grid-bg text-slate-100 flex flex-col justify-between">
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="font-extrabold text-xl tracking-wider text-gradient">GORDON IT ACADEMY</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-semibold text-slate-300">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-400 transition">About</Link>
            <Link to="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
            <Link to="/blog" className="hover:text-blue-400 transition">Blog</Link>
            <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              onClick={openLoginModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full transition shadow-lg shadow-blue-900/30 text-sm"
            >
              Sign In
            </button>
            <a 
              href="http://localhost:3001" 
              className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold py-2 px-5 rounded-full transition text-sm"
            >
              Go to Portal
            </a>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500 space-y-4">
          <p>© 2026 Gordon IT Academy. All rights reserved.</p>
          <p className="text-slate-600">Expert-led training for Cisco CCNA, CCNP, Cybersecurity and IT Careers.</p>
        </div>
      </footer>
    </div>
  );
}

// Pages
function Home({ openLoginModal }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/courses`)
      .then(res => setCourses(res.data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 bg-blue-900/40 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400">
          <Server className="h-4 w-4" />
          <span>New CCNA 200-301 & CCNP Modules Active</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Master Enterprise Networking & <span className="text-gradient">Cybersecurity</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Pass your CCNA/CCNP exams on the first try. High-quality video lectures, lab download centers, and a comprehensive practice exam engine.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={openLoginModal}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full transition flex items-center justify-center space-x-2 text-base shadow-xl shadow-blue-900/40"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <a 
            href="http://localhost:3001/exams"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold py-3.5 px-8 rounded-full transition text-center text-base"
          >
            Take Free Practice Exam
          </a>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Our Premium Courses</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Learn from structured modules covering essential technologies.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map(course => (
            <div key={course.id} className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between">
              <img src={course.thumbnailUrl} alt={course.title} className="w-full h-48 object-cover opacity-80" />
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
                    {course.difficulty}
                  </span>
                  <h3 className="text-xl font-bold pt-2">{course.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{course.description}</p>
                </div>
                <button 
                  onClick={openLoginModal}
                  className="mt-6 w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded-2xl font-bold transition text-sm flex items-center justify-center space-x-2"
                >
                  <span>Explore Syllabus</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gradient text-center">About Gordon IT Academy</h1>
      <div className="glass-panel p-8 rounded-3xl space-y-6 text-slate-300 leading-relaxed">
        <p>
          Gordon IT Academy was founded by Gordon, a CCIE-certified professional, to deliver direct, effective, and real-world networking training without the typical fluff.
        </p>
        <p>
          Instead of relying on rigid, outdated training platforms, we built a custom web app focused on speed, efficiency, and interactive question banks. Our platform is heavily inspired by industry leaders like KodeKloud, bringing state-of-the-art interactive labs, practice exam portals, and highly structured video lectures to our students.
        </p>
      </div>
    </div>
  );
}

function Pricing({ openLoginModal }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Flexible Membership Plans</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Get full access to all courses, configuration downloads, and the unlimited Practice Exam Portal.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monthly Plan */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col justify-between border-slate-800">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Premium Monthly</h2>
              <p className="text-slate-500 text-sm mt-1">Best for short-term intense study</p>
            </div>
            <div className="flex items-baseline">
              <span className="text-5xl font-extrabold text-white">$15</span>
              <span className="text-slate-400 text-lg ml-2">/ month</span>
            </div>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-blue-500" />
                <span>Unlimited Practice Exam Engine</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-blue-500" />
                <span>All CCNA & CCNP Course Access</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-blue-500" />
                <span>Download Center (Labs & PDF guides)</span>
              </li>
            </ul>
          </div>
          <button 
            onClick={openLoginModal}
            className="mt-8 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition shadow-lg shadow-blue-900/30"
          >
            Upgrade to Premium Monthly
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col justify-between border-blue-500/30 relative">
          <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-400 shadow-md">
            SAVE 33%
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gradient">Premium Yearly</h2>
              <p className="text-slate-500 text-sm mt-1">Best value for long-term career growth</p>
            </div>
            <div className="flex items-baseline">
              <span className="text-5xl font-extrabold text-white">$120</span>
              <span className="text-slate-400 text-lg ml-2">/ year</span>
            </div>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-blue-500" />
                <span>Everything in Monthly Plan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-blue-500" />
                <span>Priority email & discord support</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-blue-500" />
                <span>Free updates to future exams</span>
              </li>
            </ul>
          </div>
          <button 
            onClick={openLoginModal}
            className="mt-8 w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold transition shadow-lg shadow-indigo-900/30"
          >
            Upgrade to Premium Yearly
          </button>
        </div>
      </div>
    </div>
  );
}

function Blog() {
  const posts = [
    { id: 1, title: "How to Pass CCNA 200-301 in 30 Days", category: "CCNA", excerpt: "A structured study guide outlining hours required, recommended lab setups, and top exam pitfalls.", date: "July 2026" },
    { id: 2, title: "Understanding BGP Path Attributes for CCNP", category: "CCNP", excerpt: "An intuitive explanation of Local Preference, MED, Weight, and AS-Path evaluation sequence.", date: "June 2026" },
    { id: 3, title: "Top 5 Networking Security Rules to Implement Now", category: "Cybersecurity", excerpt: "Configuring port security, AAA authentication, and disabling unused interfaces on Cisco Catalyst switches.", date: "May 2026" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-center">Industry Insights & Blog</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
                {post.category}
              </span>
              <h2 className="text-xl font-bold pt-2">{post.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{post.excerpt}</p>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 pt-6">
              <span>{post.date}</span>
              <button className="text-blue-400 font-bold hover:underline flex items-center space-x-1">
                <span>Read More</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gradient text-center">Contact Support</h1>
      <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }} className="glass-panel p-8 rounded-3xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Your Email</label>
          <input type="email" required className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Message Topic</label>
          <select className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm">
            <option>General Question</option>
            <option>Billing Support</option>
            <option>Course & Lab Help</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Message</label>
          <textarea rows="4" required className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm resize-none"></textarea>
        </div>
        <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition">
          Send Message
        </button>
      </form>
    </div>
  );
}

// Authentication Modal Component
function LoginModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    try {
      const res = await axios.post(`${API_BASE}${endpoint}`, { email, password });
      const { access_token, membership_level, email: userEmail } = res.data;
      
      // Single Sign-On Redirect to Dashboard Project (runs on 3001)
      window.location.href = `http://localhost:3001/?token=${access_token}&email=${userEmail}&membership=${membership_level}`;
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed');
    }
  };

  const handleGoogleLogin = () => {
    // Generate dummy google token for testing SSO login flow
    const dummyEmail = email || 'dummygoogleuser@example.com';
    const dummyGoogleId = 'googleid1234567890';
    const dummyToken = `dummy_google_${dummyEmail}_${dummyGoogleId}`;
    
    axios.post(`${API_BASE}/auth/google`, { id_token: dummyToken })
      .then(res => {
        const { access_token, membership_level, email: userEmail } = res.data;
        window.location.href = `http://localhost:3001/?token=${access_token}&email=${userEmail}&membership=${membership_level}`;
      })
      .catch(err => {
        setError(err.response?.data?.detail || 'Google Login failed');
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-md rounded-3xl p-8 relative space-y-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300">
          <X className="h-6 w-6" />
        </button>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-sm text-slate-400">{isRegister ? 'Register for free access to courses & quizzes' : 'Login to access your learning portal'}</p>
        </div>

        {error && <div className="bg-red-900/30 border border-red-500/50 text-red-400 text-xs px-4 py-2 rounded-xl text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 flex items-center space-x-2">
              <Mail className="h-3.5 w-3.5" />
              <span>Email Address</span>
            </label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 flex items-center space-x-2">
              <Key className="h-3.5 w-3.5" />
              <span>Password</span>
            </label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-slate-100 outline-none transition text-sm" 
            />
          </div>
          <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition text-sm mt-4">
            {isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-xs font-bold">OR</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold transition text-sm flex items-center justify-center space-x-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.68 14.93 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.05 7.34 8.78 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.21-2.25H12v4.26h6.45c-.28 1.47-1.11 2.72-2.36 3.56l3.6 2.8c2.1-1.94 3.81-4.78 3.81-8.37z" />
            <path fill="#FBBC05" d="M5.1 14.7c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.5 7.5C.54 9.4 0 11.64 0 14s.54 4.6 1.5 6.5l3.6-2.8z" />
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.9l-3.6-2.8c-1.1.74-2.52 1.18-4.36 1.18-3.22 0-5.95-2.3-6.9-5.46l-3.6 2.8C3.4 20.35 7.35 23 12 23z" />
          </svg>
          <span>Continue with Google (Dummy Setup)</span>
        </button>

        <div className="text-center pt-2">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-blue-400 hover:underline"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Router>
      <Layout openLoginModal={() => setIsLoginOpen(true)}>
        <Routes>
          <Route path="/" element={<Home openLoginModal={() => setIsLoginOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing openLoginModal={() => setIsLoginOpen(true)} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </Layout>
    </Router>
  );
}
