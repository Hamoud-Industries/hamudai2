import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, Loader2, Trash2, Bot, User, Menu, Plus, MessageSquare, X, Globe, UploadCloud, BrainCircuit, Baby, Flame, GraduationCap, Mic, MicOff, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { cn } from '../utils/cn';
import Groq from 'groq-sdk';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/useLanguage';
import AsteriskLogo from './AsteriskLogo';

// Setup PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface SearchSource {
  title: string;
  uri: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
  searchSources?: SearchSource[];
}

interface ChatSession {
  id: string;
  title: string;
  updatedAt: number;
  messages: Message[];
}

export default function SchoolAIChatbot() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [input, setInput] = useState('');
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // New Features State
  const [persona, setPersona] = useState<'standard' | 'socratic' | 'eli5' | 'genz'>('standard');
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const { t, lang } = useLanguage();

  // Mouse tracking for subtle 3D effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Load sessions from local storage
  useEffect(() => {
    const saved = localStorage.getItem('hamudai_sessions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setSessions(parsed);
          setCurrentSessionId(parsed[0].id);
        } else {
          createNewSession();
        }
      } catch (e) {
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, []);

  // Save sessions to local storage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('hamudai_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang === 'de' ? 'de-DE' : 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              setInput(prev => prev + transcript + ' ');
            } else {
              currentTranscript += transcript;
            }
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [lang]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(t('micError', 'chat'));
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'Neuer Chat',
      updatedAt: Date.now(),
      messages: []
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setIsSidebarOpen(false);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      if (filtered.length === 0) {
        // If we deleted the last one, create a new empty one
        const newSession: ChatSession = {
          id: Date.now().toString(),
          title: 'Neuer Chat',
          updatedAt: Date.now(),
          messages: []
        };
        setCurrentSessionId(newSession.id);
        return [newSession];
      }
      if (currentSessionId === id) {
        setCurrentSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  const updateCurrentSession = (newMessages: Message[]) => {
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        let title = session.title;
        if (title === 'Neuer Chat' && newMessages.length > 0) {
          const firstUserMsg = newMessages.find(m => m.role === 'user');
          if (firstUserMsg) {
            title = firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? '...' : '');
          }
        }
        return { ...session, messages: newMessages, title, updatedAt: Date.now() };
      }
      return session;
    }).sort((a, b) => b.updatedAt - a.updatedAt));
  };

  const processFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    
    setIsProcessingFiles(true);
    setUploadProgress(0);
    const newImages: string[] = [];
    const totalFiles = files.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        const promise = new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
        });
        reader.readAsDataURL(file);
        newImages.push(await promise);
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
      } else if (file.type === 'application/pdf') {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const maxPages = Math.min(pdf.numPages, 5); // Limit to 5 pages to avoid overload
          
          for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              await page.render({ canvasContext: context, viewport } as any).promise;
              newImages.push(canvas.toDataURL('image/jpeg', 0.8));
            }
            // Calculate progress including pages
            const fileProgress = i / totalFiles;
            const pageProgress = (pageNum / maxPages) * (1 / totalFiles);
            setUploadProgress(Math.round((fileProgress + pageProgress) * 100));
          }
        } catch (error) {
          console.error("Error processing PDF", error);
          alert("Failed to process PDF file.");
        }
      }
    }

    setAttachedImages((prev) => [...prev, ...newImages]);
    setIsProcessingFiles(false);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    setAttachedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachedImages.length === 0) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      images: attachedImages.length > 0 ? [...attachedImages] : undefined
    };

    const newMessages = [...messages, userMessage];
    updateCurrentSession(newMessages);
    setInput('');
    setAttachedImages([]);
    setIsLoading(true);

    try {
      let searchContext = "";
      let searchSources: SearchSource[] = [];

      // Simple heuristic: if the user asks a question about current events or facts, try to search.
      // This is a basic implementation since Groq doesn't have native tool calling for web search yet.
      const searchKeywords = ["wer", "was", "wann", "wo", "warum", "wie", "heute", "aktuell", "nachrichten", "wetter", "who", "what", "when", "where", "why", "how", "today", "news", "weather"];
      const shouldSearch = searchKeywords.some(keyword => input.toLowerCase().includes(keyword)) || input.includes("?");

      if (shouldSearch) {
        try {
          // Use DuckDuckGo HTML search (no API key required, free)
          // We use a CORS proxy to bypass browser restrictions
          const searchQuery = encodeURIComponent(input);
          const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://html.duckduckgo.com/html/?q=${searchQuery}`)}`);
          
          if (response.ok) {
            const data = await response.json();
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            
            const results = Array.from(doc.querySelectorAll('.result__body')).slice(0, 3);
            
            if (results.length > 0) {
              searchContext = "Hier sind einige aktuelle Informationen aus dem Internet, die dir bei der Beantwortung helfen könnten:\n\n";
              
              results.forEach((result: any) => {
                const titleEl = result.querySelector('.result__title .result__a');
                const snippetEl = result.querySelector('.result__snippet');
                
                if (titleEl && snippetEl) {
                  const title = titleEl.textContent?.trim() || '';
                  const url = titleEl.getAttribute('href') || '';
                  // DuckDuckGo redirects URLs, we try to extract the real one if possible, otherwise use the redirect
                  const realUrl = url.includes('uddg=') ? decodeURIComponent(url.split('uddg=')[1].split('&')[0]) : url;
                  const snippet = snippetEl.textContent?.trim() || '';
                  
                  searchContext += `Titel: ${title}\nZusammenfassung: ${snippet}\n\n`;
                  
                  searchSources.push({
                    title: title,
                    uri: realUrl.startsWith('http') ? realUrl : `https:${realUrl}`
                  });
                }
              });
            }
          }
        } catch (searchError) {
          console.error("Search failed, continuing without context:", searchError);
        }
      }

      const groqMessages = newMessages.map(msg => {
        // Groq vision models expect a specific format for images
        if (msg.images && msg.images.length > 0) {
          const content = [
            { type: "text", text: msg.content || "Bitte analysiere diese Bilder." }
          ];
          
          msg.images.forEach(img => {
            content.push({
              type: "image_url",
              image_url: { url: img }
            } as any);
          });
          
          return {
            role: msg.role,
            content: content
          };
        }
        
        return {
          role: msg.role,
          content: msg.content
        };
      });

      // Add system instruction and search context
      let personaInstruction = "";
      switch (persona) {
        case 'socratic':
          personaInstruction = "WICHTIG: Du bist ein Sokratischer Lehrer. Gib NIEMALS die direkte Lösung oder Antwort! Stelle stattdessen gezielte Leitfragen, damit der Schüler selbst auf die Lösung kommt. Lobe den Schüler, wenn er Fortschritte macht.";
          break;
        case 'eli5':
          personaInstruction = "WICHTIG: Erkläre alles so einfach wie möglich, als würdest du mit einem 5-Jährigen sprechen. Verwende einfache Analogien aus dem Alltag. Vermeide komplizierte Fachbegriffe.";
          break;
        case 'genz':
          personaInstruction = "WICHTIG: Antworte komplett im Gen Z Slang (wie 'fr fr', 'no cap', 'slay', 'sus', 'wild', 'cringe', 'rizz'). Sei lustig und übertrieben, aber beantworte die Frage trotzdem korrekt und hilfreich.";
          break;
        default:
          personaInstruction = "Gib klare, strukturierte und Schritt-für-Schritt-Erklärungen.";
      }

      const systemPrompt = `Du bist HamudAI, ein intelligenter und hilfreicher KI-Assistent für Schüler. Du hilfst Schülern bei ihren Hausaufgaben, erklärst Konzepte klar und verständlich und analysierst hochgeladene Bilder oder PDFs. Antworte immer auf Deutsch. Verwende für mathematische Formeln immer LaTeX-Formatierung mit $ für Inline-Mathe und $$ für Block-Mathe. ${personaInstruction}\n\n${searchContext ? searchContext + "\nBitte beziehe diese Informationen in deine Antwort ein, wenn sie relevant sind." : ""}`;

      const finalMessages = [
        { role: 'system', content: systemPrompt },
        ...groqMessages
      ];

      // Use the requested Llama 4 Scout model for everything
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: finalMessages,
          model: "llama-3.3-70b-versatile",
          temperature: 0.5,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch response from server");
      }

      const chatCompletion = await response.json();
      const text = chatCompletion.choices[0]?.message?.content || '';

      // Easter Egg: Confetti if the user understood something or says thanks
      const successWords = ['danke', 'verstanden', 'kapiert', 'richtig', 'geschafft', '1', 'a', 'super'];
      if (successWords.some(word => input.toLowerCase().includes(word))) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#aaaaaa', '#555555']
        });
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        searchSources: searchSources.length > 0 ? searchSources : undefined
      };

      updateCurrentSession([...newMessages, assistantMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      updateCurrentSession([...newMessages, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `**Fehler:** ${error.message}\n\n*Hinweis: Bitte stelle sicher, dass du den \`GROQ_API_KEY\` in deinen Umgebungsvariablen gesetzt hast.*`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div
      ref={containerRef}
      animate={{
        rotateY: isMobile ? 0 : mousePos.x * 2,
        rotateX: isMobile ? 0 : -mousePos.y * 2,
      }}
      transition={{ type: 'spring', stiffness: 75, damping: 15 }}
      className={cn(
        "w-full max-w-6xl h-full md:h-[90vh] flex relative rounded-none md:rounded-3xl glass-panel glass-reflection overflow-hidden z-10 shadow-2xl transition-colors duration-1000"
      )}
      style={{ perspective: 1000 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="absolute inset-0 p-[1px] rounded-none md:rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-white/20 pointer-events-none z-50" />
      
      {/* Drag & Drop Overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/50"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <UploadCloud size={48} className="text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Dateien hier ablegen</h2>
            <p className="text-gray-400">Unterstützt Bilder und PDFs (max. 5 Seiten)</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="absolute md:relative h-full border-r border-white/10 bg-black/95 md:bg-black/80 backdrop-blur-xl flex flex-col shrink-0 overflow-hidden z-[70]"
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <h2 className="text-white font-medium tracking-wide">{t('history', 'chat')}</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-2">
              <Link
                to="/"
                className="w-full flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white py-3 px-4 rounded-xl transition-colors border border-white/5"
              >
                <ArrowLeft size={18} />
                <span className="font-medium">{t('backHome', 'chat')}</span>
              </Link>
              <button
                onClick={createNewSession}
                className="w-full flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl transition-colors border border-white/10"
              >
                <Plus size={18} />
                <span className="font-medium">{t('newChat', 'chat')}</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {sessions.map(session => (
                <div
                  key={session.id}
                  onClick={() => {
                    setCurrentSessionId(session.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all group",
                    currentSessionId === session.id ? "bg-white/15 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  )}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare size={16} className="shrink-0" />
                    <span className="truncate text-sm font-medium">{session.title}</span>
                  </div>
                  <button
                    onClick={(e) => deleteSession(session.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white transition-all shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative z-10 bg-black/40">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-white/5 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <Menu size={24} />
              </button>
            )}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden group shrink-0">
              <AsteriskLogo size={20} className="text-white relative z-10 md:w-6 md:h-6" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-white tracking-wide leading-tight">Hamud<span className="text-gray-400">AI</span></h1>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium tracking-wider uppercase mt-0.5 md:mt-1">Academic Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Persona Selector */}
            <div className="hidden md:flex bg-black/40 border border-white/10 rounded-xl p-1">
              <button onClick={() => setPersona('standard')} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2", persona === 'standard' ? "bg-white/20 text-white" : "text-gray-400 hover:text-gray-200")}>
                <GraduationCap size={14} /> Standard
              </button>
              <button onClick={() => setPersona('socratic')} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2", persona === 'socratic' ? "bg-white/20 text-white" : "text-gray-400 hover:text-gray-200")}>
                <BrainCircuit size={14} /> Sokratisch
              </button>
              <button onClick={() => setPersona('eli5')} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2", persona === 'eli5' ? "bg-white/20 text-white" : "text-gray-400 hover:text-gray-200")}>
                <Baby size={14} /> ELI5
              </button>
              <button onClick={() => setPersona('genz')} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2", persona === 'genz' ? "bg-white/20 text-white" : "text-gray-400 hover:text-gray-200")}>
                <Flame size={14} /> Gen Z
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8 scroll-smooth relative">
          {messages.length === 0 && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-6 md:p-8 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 md:mb-6">
                <Bot size={28} className="text-gray-400 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-300 mb-2">Wie kann ich dir heute helfen?</h3>
              <p className="max-w-md text-xs md:text-sm">Lade Bilder von deinen Hausaufgaben hoch, stelle Fragen zu PDFs oder lass dir komplexe Themen erklären. Ich kann jetzt auch im Internet suchen!</p>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={cn(
                "flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 mt-1 shadow-lg border",
                msg.role === 'user' 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-black/50 border-white/10 text-gray-300"
              )}>
                {msg.role === 'user' ? <User size={14} className="md:w-[18px] md:h-[18px]" /> : <Bot size={14} className="md:w-[18px] md:h-[18px]" />}
              </div>
              
              <div className={cn(
                "rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl backdrop-blur-md flex flex-col gap-2 md:gap-3 overflow-hidden",
                msg.role === 'user' 
                  ? "bg-white/10 border border-white/20 text-white rounded-tr-sm" 
                  : "glass-panel-light text-gray-200 rounded-tl-sm"
              )}>
                {msg.images && msg.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {msg.images.map((img, idx) => (
                      <img key={idx} src={img} alt="Uploaded" className="h-24 md:h-32 rounded-lg md:rounded-xl object-cover border border-white/20 shadow-md" />
                    ))}
                  </div>
                )}
                <div className="prose prose-sm md:prose-base prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:backdrop-blur-xl prose-pre:rounded-xl prose-pre:p-3 prose-pre:text-xs md:prose-pre:text-sm break-words">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
                
                {/* Search Sources Display */}
                {msg.searchSources && msg.searchSources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">
                      <Globe size={12} />
                      <span>Quellen aus dem Internet</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.searchSources.map((source, idx) => (
                        <a 
                          key={idx} 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs bg-black/40 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300 hover:text-white transition-colors truncate max-w-[200px]"
                        >
                          {source.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%]">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-black/50 border border-white/10 text-gray-300 flex items-center justify-center shrink-0 mt-1 shadow-lg">
                <Bot size={14} className="md:w-[18px] md:h-[18px]" />
              </div>
              <div className="rounded-2xl md:rounded-3xl rounded-tl-sm p-4 md:p-5 glass-panel-light text-gray-200 flex items-center gap-3">
                <Loader2 size={16} className="animate-spin text-white md:w-[18px] md:h-[18px]" />
                <span className="text-xs md:text-sm text-gray-400 font-medium tracking-wide">Sucht & Denkt nach...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-6 border-t border-white/10 bg-white/5 backdrop-blur-md shrink-0">
          {attachedImages.length > 0 && (
            <div className="flex gap-2 md:gap-3 mb-3 md:mb-4 overflow-x-auto pb-2">
              {attachedImages.map((img, idx) => (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} key={idx} className="relative shrink-0">
                  <img src={img} alt="Attachment" className="h-16 w-16 md:h-24 md:w-24 object-cover rounded-xl md:rounded-2xl border border-white/20 shadow-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-2 -right-2 bg-gray-800/80 backdrop-blur-md border border-white/20 text-white p-1 md:p-1.5 rounded-full hover:bg-gray-700 transition-colors shadow-lg"
                  >
                    <Trash2 size={12} className="md:w-3.5 md:h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3 items-end relative">
            <div className="flex-1 glass-panel-light rounded-2xl md:rounded-3xl focus-within:bg-white/10 focus-within:border-white/40 transition-all overflow-hidden flex flex-col shadow-inner relative">
              
              {/* Upload Progress Bar */}
              {isProcessingFiles && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                  <motion.div 
                    className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              )}

              <div className="flex items-end w-full">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 md:p-4 text-gray-400 hover:text-white transition-colors shrink-0"
                  disabled={isProcessingFiles || isLoading}
                >
                  {isProcessingFiles ? <Loader2 size={20} className="animate-spin md:w-[22px] md:h-[22px]" /> : <Paperclip size={20} className="md:w-[22px] md:h-[22px]" />}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept="image/*,application/pdf"
                  className="hidden"
                />
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  onPaste={(e) => {
                    const items = e.clipboardData?.items;
                    if (!items) return;
                    
                    for (let i = 0; i < items.length; i++) {
                      if (items[i].type.indexOf('image') !== -1) {
                        const blob = items[i].getAsFile();
                        if (blob) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              setAttachedImages(prev => [...prev, event.target!.result as string]);
                            }
                          };
                          reader.readAsDataURL(blob);
                        }
                      }
                    }
                  }}
                  placeholder={isListening ? "Hört zu..." : "Nachricht an HamudAI..."}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-white p-3 md:p-4 max-h-32 min-h-[50px] md:min-h-[60px] text-sm md:text-base resize-none outline-none placeholder:text-gray-500"
                  rows={1}
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  className={cn(
                    "p-3 md:p-4 transition-colors shrink-0",
                    isListening ? "text-white animate-pulse" : "text-gray-400 hover:text-white"
                  )}
                  title="Spracheingabe"
                >
                  {isListening ? <Mic size={20} className="md:w-[22px] md:h-[22px]" /> : <MicOff size={20} className="md:w-[22px] md:h-[22px]" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || isProcessingFiles || (!input.trim() && attachedImages.length === 0)}
              className="h-[50px] w-[50px] md:h-[60px] md:w-[60px] flex items-center justify-center bg-white hover:bg-gray-200 text-black rounded-2xl md:rounded-3xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <Send size={20} className="ml-0.5 md:ml-1 md:w-[22px] md:h-[22px]" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
