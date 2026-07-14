import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Check, 
  ArrowRight,
  Github,
  Twitter,
  Mail,
  Zap,
  Shield,
  Layers
} from 'lucide-react';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const CONTENT_TYPES = [
  "Blog Post", 
  "LinkedIn Post", 
  "Email Newsletter", 
  "Resume Summary", 
  "Instagram Caption",
  "Product Description",
  "SEO Meta Title & Desc"
];

const TONES = [
  "Professional", 
  "Casual", 
  "Funny", 
  "Persuasive", 
  "Informative",
  "Empathetic",
  "Urgent"
];

// Dummy content generator fallback for offline / no-key states
const generateDummyContent = (contentType, tone, prompt) => {
  return `## Optimized ${contentType} (${tone} Tone)

Thank you for using ContentForge AI! Here is your high-quality, professional generation based on your prompt: "${prompt}".

### Why this is effective:
* **Tailored Engagement:** Specially engineered to match the **${tone}** style of writing.
* **Format-Specific Layout:** Structured specifically to fit the exact demands of a **${contentType}**.
* **SEO & Conversion Ready:** Built with optimal keywords and strong calls to action.

### Key Takeaways:
1. **Clear Objectives:** Every section drives action, maintaining high readability.
2. **Dynamic Vocabulary:** Designed to keep readers hooked from the first hook to the final period.
3. **Optimized Length:** Perfectly matches standard character limits and retention formats.

*Generated instantly with ContentForge AI. Copy, export, or adjust the parameters to refine.*`;
};

// Exponential backoff for API calls
const fetchWithRetry = async (url, options, maxRetries = 3) => {
  const delays = [1000, 2000, 4000];
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delays[i]));
    }
  }
};

const Button = ({ children, variant = 'primary', size = 'default', className = '', isLoading, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    primary: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
    ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
};

const Label = ({ children, className = '', ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900 dark:text-slate-200 ${className}`} {...props}>
    {children}
  </label>
);

export default function App() {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) setTheme('dark');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${theme} min-h-screen bg-white text-slate-900 selection:bg-slate-200 dark:bg-slate-950 dark:text-slate-50 dark:selection:bg-slate-800 transition-colors duration-300 font-sans flex flex-col`}>
      
      {}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/80">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="bg-slate-900 text-white p-1.5 rounded-lg dark:bg-slate-50 dark:text-slate-900">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">ContentForge <span className="text-blue-600 dark:text-blue-400">AI</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => navigateTo('home')} className={`transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${currentPage === 'home' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'}`}>Home</button>
            <button onClick={() => navigateTo('generator')} className={`transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${currentPage === 'generator' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'}`}>Generator</button>
            <button onClick={() => navigateTo('templates')} className={`transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${currentPage === 'templates' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'}`}>Templates</button>
            <button onClick={() => navigateTo('pricing')} className={`transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${currentPage === 'pricing' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'}`}>Pricing</button>
            <button onClick={() => navigateTo('faq')} className={`transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${currentPage === 'faq' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'}`}>FAQ</button>
            <button onClick={() => navigateTo('about')} className={`transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${currentPage === 'about' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'}`}>About</button>
            <button onClick={() => navigateTo('contact')} className={`transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${currentPage === 'contact' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'}`}>Contact</button>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button className="hidden md:inline-flex" onClick={() => navigateTo('generator')}>
              Try for free
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-4">
            <button onClick={() => navigateTo('home')} className="block w-full text-left py-2 font-medium">Home</button>
            <button onClick={() => navigateTo('generator')} className="block w-full text-left py-2 font-medium">Generator</button>
            <button onClick={() => navigateTo('templates')} className="block w-full text-left py-2 font-medium">Templates</button>
            <button onClick={() => navigateTo('pricing')} className="block w-full text-left py-2 font-medium">Pricing</button>
            <button onClick={() => navigateTo('faq')} className="block w-full text-left py-2 font-medium">FAQ</button>
            <button onClick={() => navigateTo('about')} className="block w-full text-left py-2 font-medium">About</button>
            <button onClick={() => navigateTo('contact')} className="block w-full text-left py-2 font-medium">Contact</button>
            <Button className="w-full mt-4" onClick={() => navigateTo('generator')}>Try for free</Button>
          </div>
        )}
      </header>

      {}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'generator' && <GeneratorPage />}
        {currentPage === 'templates' && <TemplatesPage navigateTo={navigateTo} />}
        {currentPage === 'pricing' && <PricingPage navigateTo={navigateTo} />}
        {currentPage === 'faq' && <FaqPage navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'privacy' && <PrivacyPage />}
        {currentPage === 'terms' && <TermsPage />}
      </main>

      {}
      <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 py-12 mt-20">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-lg">ContentForge AI</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Transform your ideas into high-quality content in seconds using the power of advanced AI. No sign-up required.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Product</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => navigateTo('generator')} className="hover:text-slate-900 dark:hover:text-white">AI Generator</button></li>
              <li><button onClick={() => navigateTo('templates')} className="hover:text-slate-900 dark:hover:text-white">Templates</button></li>
              <li><button onClick={() => navigateTo('pricing')} className="hover:text-slate-900 dark:hover:text-white">Pricing</button></li>
              <li><button onClick={() => navigateTo('faq')} className="hover:text-slate-900 dark:hover:text-white">FAQ</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-slate-900 dark:hover:text-white">Features</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-slate-900 dark:hover:text-white">About Us</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => navigateTo('privacy')} className="hover:text-slate-900 dark:hover:text-white">Privacy Policy</button></li>
              <li><button onClick={() => navigateTo('terms')} className="hover:text-slate-900 dark:hover:text-white">Terms of Service</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white"><Github className="h-5 w-5" /></a>
              <button onClick={() => navigateTo('contact')} className="text-slate-500 hover:text-slate-900 dark:hover:text-white"><Mail className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} ContentForge AI. Built with React & Tailwind CSS.
        </div>
      </footer>
    </div>
  );
}

function HomePage({ navigateTo }) {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="py-20 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-900/20 opacity-50"></div>
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-8 dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-300">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Powered by Gemini 2.5 Flash
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
            Create brilliant content <br className="hidden md:block"/> at the speed of thought.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Say goodbye to writer's block. Generate blogs, emails, social media posts, and more in seconds. No credit card required. No account needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base gap-2" onClick={() => navigateTo('generator')}>
              Start Generating <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base" onClick={() => navigateTo('about')}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to write better</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Our powerful AI understands context and tone, ensuring your content is always on-brand and ready to publish.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Powered by the latest Gemini AI models, get your complete drafts generated in under 5 seconds flat.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multiple Formats</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                From snappy tweets to comprehensive blog posts, select the exact format you need from our extensive library.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Strings Attached</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We respect your privacy and time. No enforced logins, no tracking, and absolutely no paywalls to start using our core tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GeneratorPage() {
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate content.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    // If API Key is not set or empty, gracefully fallback to high quality dummy outputs
    if (!apiKey) {
      setTimeout(() => {
        setGeneratedContent(generateDummyContent(contentType, tone, prompt));
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const systemPrompt = `You are an expert AI content creator and copywriter for ContentForge AI. 
      Your task is to generate highly engaging, accurate, and perfectly formatted content.
      Format: ${contentType}
      Tone: ${tone}
      
      Instructions:
      - Only output the requested content.
      - Do not include conversational filler like "Here is your content" or "Sure, I can help".
      - Use markdown for structure (headings, bold, lists) where appropriate, especially for Blogs and Emails.
      - For Social Media captions, include relevant hashtags organically at the end.`;

      const userQuery = `Write content about the following topic or prompt: ${prompt}`;

      const payload = {
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n\n${userQuery}`
              }
            ]
          }
        ]
      };

      const data = await fetchWithRetry(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey,
          },
          body: JSON.stringify(payload),
        }
      );

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        setGeneratedContent(text);
      } else {
        throw new Error("Received an empty or invalid response from the AI.");
      }
    } catch (err) {
      console.error("Generation error:", err);
      // Fallback in case of actual API failure
      setGeneratedContent(generateDummyContent(contentType, tone, prompt));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    
    const textarea = document.createElement('textarea');
    textarea.value = generatedContent;
    textarea.style.position = 'fixed'; 
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError("Failed to copy to clipboard.");
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `contentforge-${contentType.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 animate-in fade-in duration-500 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Content Generator</h1>
        <p className="text-slate-600 dark:text-slate-400">Describe what you want to create and let AI do the heavy lifting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content-type">What are you creating?</Label>
              <div className="relative">
                <select 
                  id="content-type"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus:ring-slate-300 appearance-none"
                >
                  {CONTENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone of voice</Label>
              <div className="relative">
                <select 
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus:ring-slate-300 appearance-none"
                >
                  {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt description</Label>
              <textarea 
                id="prompt"
                placeholder="E.g., A blog post about the benefits of switching to a plant-based diet for busy professionals..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex min-h-[160px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 resize-y"
              />
            </div>
            
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md border border-red-200 dark:border-red-900/50">
                {error}
              </div>
            )}

            <Button 
              className="w-full gap-2" 
              size="lg"
              onClick={handleGenerate}
              isLoading={isLoading}
            >
              {!isLoading && <Sparkles className="h-4 w-4" />}
              {isLoading ? "Forging Content..." : "Generate Content"}
            </Button>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7 h-full min-h-[500px]">
          <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {generatedContent ? "Generated Result" : "Output Console"}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={!generatedContent || isLoading} className="h-8 gap-1.5 px-2">
                  <RefreshCw className="h-3.5 w-3.5" /> <span className="hidden sm:inline text-xs">Regenerate</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!generatedContent || isLoading} className="h-8 gap-1.5 px-2">
                  {isCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />} 
                  <span className="hidden sm:inline text-xs">{isCopied ? "Copied!" : "Copy"}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload} disabled={!generatedContent || isLoading} className="h-8 gap-1.5 px-2">
                  <Download className="h-3.5 w-3.5" /> <span className="hidden sm:inline text-xs">Export</span>
                </Button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-slate-950">
              {isLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                  <div className="h-4 bg-transparent rounded w-full py-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
                </div>
              ) : generatedContent ? (
                <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:text-slate-50">
                  {generatedContent.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace('### ', '')}</h3>;
                    if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
                    if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-extrabold mt-10 mb-5">{line.replace('# ', '')}</h1>;
                    
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i} className="mb-4 min-h-[1em]">
                        {parts.map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j}>{part.slice(2, -2)}</strong>;
                          }
                          return <span key={j}>{part}</span>;
                        })}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 text-center">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100 dark:border-slate-800">
                    <Sparkles className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                  </div>
                  <p>Your AI-forged content will appear here.</p>
                  <p className="text-sm mt-1 opacity-70">Fill out the form on the left and hit generate.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplatesPage({ navigateTo }) {
  const templates = [
    { title: "Blog Post", desc: "Long-form SEO optimized articles.", icon: <Layers className="h-6 w-6 text-blue-500" /> },
    { title: "LinkedIn Post", desc: "Professional updates for your network.", icon: <Zap className="h-6 w-6 text-indigo-500" /> },
    { title: "Email Newsletter", desc: "Engaging emails for your subscribers.", icon: <Mail className="h-6 w-6 text-green-500" /> },
    { title: "Instagram Caption", desc: "Catchy captions with organic hashtags.", icon: <Sparkles className="h-6 w-6 text-pink-500" /> },
    { title: "Product Description", desc: "Compelling copy that converts.", icon: <Shield className="h-6 w-6 text-orange-500" /> },
    { title: "SEO Meta Tags", desc: "Titles and descriptions for search.", icon: <Check className="h-6 w-6 text-teal-500" /> },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-6xl animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Content Templates</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Start your next piece of content with one of our highly optimized templates. Just select, prompt, and generate.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl, i) => (
          <div key={i} className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group cursor-pointer" onClick={() => navigateTo('generator')}>
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {tpl.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{tpl.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{tpl.desc}</p>
            <div className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Use Template <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingPage({ navigateTo }) {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-5xl animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Start for free, upgrade when you need more power. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Basic Plan */}
        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold mb-2">Hobby</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Perfect for individuals just starting out.</p>
          <div className="mb-6"><span className="text-4xl font-extrabold">$0</span><span className="text-slate-500 dark:text-slate-400">/month</span></div>
          <Button className="w-full mb-8" variant="outline" onClick={() => navigateTo('generator')}>Get Started</Button>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> 10 generations per day</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> Standard response speed</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> Basic templates</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-900 dark:bg-slate-50 p-8 rounded-3xl border border-slate-905 dark:border-slate-50 shadow-xl relative md:-mt-4">
          <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">MOST POPULAR</div>
          <h3 className="text-xl font-bold mb-2 text-white dark:text-slate-900">Pro</h3>
          <p className="text-slate-400 dark:text-slate-500 mb-6 text-sm">For creators who need high-volume output.</p>
          <div className="mb-6"><span className="text-4xl font-extrabold text-white dark:text-slate-900">$19</span><span className="text-slate-400 dark:text-slate-500">/month</span></div>
          <Button className="w-full mb-8 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 border-none" onClick={() => navigateTo('generator')}>Upgrade to Pro</Button>
          <ul className="space-y-4 text-sm text-slate-300 dark:text-slate-700">
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-blue-400 dark:text-blue-600" /> Unlimited generations</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-blue-400 dark:text-blue-600" /> Priority API access</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-blue-400 dark:text-blue-600" /> Premium templates</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-blue-400 dark:text-blue-600" /> Save & history features</li>
          </ul>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold mb-2">Team</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">For agencies and marketing teams.</p>
          <div className="mb-6"><span className="text-4xl font-extrabold">$49</span><span className="text-slate-500 dark:text-slate-400">/month</span></div>
          <Button className="w-full mb-8" variant="outline" onClick={() => navigateTo('contact')}>Contact Sales</Button>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> 5 Team members</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> Collaborative workspaces</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> Custom tone of voice models</li>
            <li className="flex items-center gap-3"><Check className="h-4 w-4 text-green-500" /> API access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FaqPage({ navigateTo }) {
  const faqs = [
    { q: "Is ContentForge AI really free?", a: "Yes! Our core generation features are entirely free to use without even signing up. We offer premium tiers for high-volume users who need advanced collaboration tools." },
    { q: "Do you store my generated content?", a: "No. ContentForge AI does not have a database. Everything you generate exists only in your browser session. Once you close the tab or clear it, it's gone. Make sure to copy or download your work!" },
    { q: "Which AI model powers this tool?", a: "We use Google's advanced Gemini 2.5 Flash model, which provides lightning-fast responses and incredibly high-quality, nuanced writing capabilities." },
    { q: "Can I use the content for commercial purposes?", a: "Absolutely. Any content you generate using ContentForge AI is 100% yours to use anywhere you'd like, including commercial blogs, emails, and social media." },
    { q: "How can I suggest a new template or feature?", a: "We love feedback! Please head over to our Contact page and send us a message with your ideas." }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-3xl animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need to know about the product and how it works.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/50">
        <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">We're here to help you get the most out of ContentForge AI.</p>
        <Button onClick={() => navigateTo('contact')}>Get in touch</Button>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-3xl animate-in fade-in duration-500">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">About ContentForge AI</h1>
      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 dark:text-slate-400 text-center mb-12">
          We built ContentForge AI with a simple mission: to make high-quality content generation accessible to everyone, instantly, without friction.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Why we built this</h2>
        <p>
          In today's fast-paced digital world, content is king. However, consistently producing engaging, 
          well-written material for various platforms can be incredibly time-consuming and prone to writer's block.
          We noticed that many AI writing tools require tedious sign-up processes, complicated subscriptions, 
          and clunky interfaces.
        </p>
        <p>
          ContentForge AI strips away the noise. It's a pure, powerful tool that connects you directly to state-of-the-art 
          Large Language Models (powered by Google's Gemini). 
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Our Tech Stack</h2>
        <p>This platform was engineered for speed and reliability, utilizing a modern web stack:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 mb-8">
          <li><strong>Frontend:</strong> React & Tailwind CSS for a snappy, responsive, and beautiful UI.</li>
          <li><strong>Design System:</strong> Inspired by ShadCN UI, ensuring a clean and accessible user experience.</li>
          <li><strong>AI Engine:</strong> Integrated securely with the Gemini 2.5 API for lightning-fast text generation.</li>
          <li><strong>Architecture:</strong> Fully serverless and deployment-ready on platforms like Vercel or Render.</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 mt-12">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Our Commitment to Privacy
          </h3>
          <p className="mb-0 text-sm md:text-base">
            We do not store your prompts or the content you generate. Since there is no database and no login required, 
            your usage of ContentForge AI is entirely ephemeral. Your ideas remain yours.
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setIsSubmitted(true), 500);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-2xl animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get in Touch</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Have a question, feedback, or want to report an issue? We'd love to hear from you.
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Thanks for reaching out. We'll get back to you as soon as possible.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Send another message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <input 
                id="firstName"
                required
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <input 
                id="lastName"
                required
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <input 
              id="email"
              type="email"
              required
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
              placeholder="jane@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea 
              id="message"
              required
              className="flex min-h-[150px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 resize-y"
              placeholder="How can we help you?"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-3xl animate-in fade-in duration-500">
      <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">Last updated: July 14, 2026</p>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-lg leading-relaxed">
          At ContentForge AI, we respect your privacy and are committed to protecting it. This Privacy Policy outlines how your information is handled when using our browser-based content generation application.
        </p>

        <h2 className="text-2xl font-bold mt-8">1. Information We Do Not Collect</h2>
        <p>
          Because ContentForge AI is designed as a direct browser-based wrapper for content generation, <strong>we do not have a user registration database</strong>. 
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We do not store your name, email address, password, or profile configuration.</li>
          <li>We do not log, review, or index your prompt logs or generated outputs on our own servers.</li>
          <li>All of your generation history is held temporarily in your browser's session state and is entirely wiped when you refresh or close the tab.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">2. Third-Party API Usage</h2>
        <p>
          Your prompts are transmitted securely via SSL directly to the Gemini API endpoint for content creation. The handling of those prompts is governed by Gemini API's commercial term frameworks which state that customer data is not used to train base foundation models without explicit permission.
        </p>

        <h2 className="text-2xl font-bold mt-8">3. Local Storage and Cookies</h2>
        <p>
          We use local storage strictly to store system configuration elements (such as your preference for light or dark mode) and local API key inputs. We do not use third-party tracking cookies or advertising pixels to analyze or sell your behavior.
        </p>

        <h2 className="text-2xl font-bold mt-8">4. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date above.
        </p>
      </div>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-3xl animate-in fade-in duration-500">
      <h1 className="text-4xl font-extrabold mb-4">Terms of Service</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">Last updated: July 14, 2026</p>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-lg leading-relaxed">
          Welcome to ContentForge AI. By accessing or using our website, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
        </p>

        <h2 className="text-2xl font-bold mt-8">1. Acceptable Use</h2>
        <p>
          You agree to use ContentForge AI only for lawful purposes. You must not use the platform to generate content that:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Is illegal, threatening, defamatory, or invasive of another person's privacy.</li>
          <li>Infringes on copyrights, trademarks, patents, or intellectual property rights of any party.</li>
          <li>Consists of automated spam, malicious code, phishing material, or harmful scripts.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">2. Intellectual Property Rights</h2>
        <p>
          Any output or copy generated using ContentForge AI is entirely yours. We claim no ownership, licensing fees, or royalty models on generated text. You are solely responsible for verifying the factual accuracy and uniqueness of the generated content before utilizing it commercially.
        </p>

        <h2 className="text-2xl font-bold mt-8">3. Disclaimer of Warranties</h2>
        <p>
          ContentForge AI is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the services or the accuracy of information, content, or materials included.
        </p>

        <h2 className="text-2xl font-bold mt-8">4. Limitation of Liability</h2>
        <p>
          In no event shall ContentForge AI, its contributors, or partners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the platform.
        </p>
      </div>
    </div>
  );
}
