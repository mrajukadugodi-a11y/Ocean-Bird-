import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Bot,
  User,
  Sparkles,
  Radio,
  RotateCcw,
  Square,
  HelpCircle,
  Copy,
  Check,
  Zap,
  Globe2,
  Compass,
  Anchor,
  Flame,
  ShieldAlert,
  MessageSquare,
  Maximize2,
  Minimize2
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  speechText?: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  'What is the eco-speed path from Mumbai to Singapore?',
  'What are the mandatory port entry documents for Colombo?',
  'What is the current VLSFO fuel price in Fujairah and Singapore?',
  'Are there active monsoonal storm warnings in Bay of Bengal?',
  'Explain Adams Bridge depth risk in Palk Strait for vessel grounding.'
];

export const AIVoiceTextChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Ahoy, Captain! I am OCEAN BIRD AI, your 24/7 Automated Voice & Text Maritime Co-Pilot. You can speak to me using your microphone or type your query below. How can I assist your vessel today?',
      speechText: 'Ahoy Captain! I am OCEAN BIRD AI, your automated voice and text maritime co-pilot. How can I assist your vessel today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Voice Speech Recognition (STT) State
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Voice Speech Synthesis (TTS) State
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Chatbot Server Connection Monitoring State
  const [serverConnected, setServerConnected] = useState<boolean | null>(null);
  const [serverLatencyMs, setServerLatencyMs] = useState<number | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState<boolean>(false);
  const [serverDetails, setServerDetails] = useState<{ model?: string; endpoint?: string; hasApiKey?: boolean } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check Chatbot Server Connection Status
  const testServerConnection = async () => {
    setIsTestingConnection(true);
    const start = Date.now();
    try {
      const res = await fetch('/api/gemini/chat/status');
      const latency = Date.now() - start;
      if (res.ok) {
        const data = await res.json();
        setServerConnected(true);
        setServerLatencyMs(latency);
        setServerDetails({
          model: data.model || 'gemini-3.6-flash',
          endpoint: data.endpoint || '/api/gemini/chat',
          hasApiKey: data.hasApiKey ?? true
        });
      } else {
        setServerConnected(false);
      }
    } catch (err) {
      console.warn('Server status check failed:', err);
      setServerConnected(false);
    } finally {
      setIsTestingConnection(false);
    }
  };

  useEffect(() => {
    testServerConnection();
  }, []);

  // Auto-scroll chat log to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');

        setInputQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Toggle Microphone Listening
  const toggleListening = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in your current browser session. Please type your query in text format.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        if (isSpeaking && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
        }
        recognitionRef.current?.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  // Speak AI Response using Web SpeechSynthesis
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop previous voice
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Send Message to Gemini AI Chat Endpoint
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    // Stop recording or speaking
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    if (isSpeaking) {
      stopSpeaking();
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ sender: m.sender, text: m.text })),
          userMessage: query.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.reply || "I am processing your query. Please retry in a moment.";
      const speechVersion = data.speechText || aiReply;

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        speechText: speechVersion,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Auto read response aloud if enabled
      if (autoSpeak) {
        speakText(speechVersion);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: `⚠️ Telemetry Connection Warning: Unable to connect to server. ${err.message || ''}. Please verify server status.`,
        speechText: 'Telemetry warning: Connection error occurred.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChatHistory = () => {
    stopSpeaking();
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: 'Chat history cleared. I am ready for your next maritime telemetry or navigation question.',
        speechText: 'Chat history cleared. I am ready for your next question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div id="ai-voice-text-chatbot" className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>AUTOMATED AI MARITIME VOICE & TEXT CO-PILOT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Bot className="w-6 h-6 text-cyan-400" />
              <span>Ocean Bird AI Voice & Text Chatbot</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Hands-free voice recognition and speech synthesis powered by Gemini 3.6 Flash. Ask questions about vessel routes, fuel pricing, port entry, tides, and weather alerts.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
            {/* Auto Read Aloud Toggle */}
            <button
              onClick={() => {
                if (autoSpeak) stopSpeaking();
                setAutoSpeak(!autoSpeak);
              }}
              className={`px-3 py-1.5 rounded-lg border flex items-center space-x-1.5 font-bold transition-all ${
                autoSpeak
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              {autoSpeak ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{autoSpeak ? 'AUTO VOICE: ON' : 'AUTO VOICE: OFF'}</span>
            </button>

            <button
              onClick={clearChatHistory}
              className="p-1.5 hover:text-rose-400 text-slate-400 transition-colors"
              title="Clear Chat History"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot Server Connection Status & Telemetry Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg text-xs font-mono flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span
              className={`w-3 h-3 rounded-full ${
                serverConnected === true
                  ? 'bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50'
                  : serverConnected === false
                  ? 'bg-rose-500'
                  : 'bg-amber-400 animate-ping'
              }`}
            />
            <span className="font-extrabold uppercase text-slate-200">
              CHATBOT SERVER STATUS:
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                serverConnected === true
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : serverConnected === false
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {serverConnected === true
                ? 'CONNECTED (ONLINE)'
                : serverConnected === false
                ? 'DISCONNECTED'
                : 'TESTING CONNECTION...'}
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-3 text-slate-400">
            <span>• Engine: <strong className="text-cyan-300 font-bold">{serverDetails?.model || 'gemini-3.6-flash'}</strong></span>
            <span>• Route: <strong className="text-slate-300">{serverDetails?.endpoint || '/api/gemini/chat'}</strong></span>
            {serverLatencyMs !== null && (
              <span>• Latency: <strong className="text-emerald-400">{serverLatencyMs}ms</strong></span>
            )}
            <span>• API Key: <strong className="text-emerald-400">SERVER-SIDE INJECTED</strong></span>
          </div>
        </div>

        <button
          onClick={testServerConnection}
          disabled={isTestingConnection}
          className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 font-bold text-[11px] transition-all flex items-center justify-center space-x-1.5 shrink-0 self-start md:self-auto disabled:opacity-50"
        >
          <Radio className={`w-3.5 h-3.5 ${isTestingConnection ? 'animate-spin text-amber-400' : 'text-cyan-400'}`} />
          <span>{isTestingConnection ? 'PINGING SERVER...' : 'PING CHATBOT SERVER'}</span>
        </button>
      </div>

      {/* Main Chat Interface Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Suggested Prompt Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold flex items-center space-x-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>SUGGESTED MARITIME SPEECH & TEXT QUERIES:</span>
          </span>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl whitespace-nowrap transition-all font-mono hover:border-cyan-500 shrink-0"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Chat Transcript Log Box */}
        <div className="h-[420px] bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-y-auto space-y-4 shadow-inner">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isCopied = copiedId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Content Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-xs leading-relaxed shadow-lg ${
                    isUser
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-b border-slate-800/80 pb-1.5 gap-4">
                    <span className="font-bold text-slate-300">
                      {isUser ? 'VESSEL OFFICER / CAPTAIN' : 'OCEAN BIRD AI'}
                    </span>
                    <span className="text-[9px]">{msg.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                    {msg.text}
                  </p>

                  {/* Message Action Tools */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.speechText || msg.text)}
                        className="flex items-center space-x-1 hover:text-cyan-300 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Read Aloud</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleCopyText(msg.text, msg.id)}
                      className="flex items-center space-x-1 hover:text-white transition-colors ml-auto"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center space-x-3 text-cyan-400 text-xs font-mono animate-pulse p-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <span>OCEAN BIRD AI processing maritime telemetry & generating speech response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Speech Recognition & Text Input Control Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-1"
        >
          {/* Microphone Recording Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-center shrink-0 ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse shadow-lg shadow-rose-500/30'
                : 'bg-slate-950 text-cyan-400 border-slate-800 hover:border-cyan-500 hover:text-white'
            }`}
            title={isListening ? 'Stop Listening' : 'Speak to AI Co-Pilot (Microphone)'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input Field */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              isListening
                ? 'Listening... Speak your question into microphone now'
                : 'Ask AI Co-Pilot about fuel, weather, routes, tides, or port entry...'
            }
            className={`flex-1 bg-slate-950 border rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors ${
              isListening ? 'border-rose-500/80 text-rose-200' : 'border-slate-800'
            }`}
          />

          {/* Stop Audio Button if currently speaking */}
          {isSpeaking && (
            <button
              type="button"
              onClick={stopSpeaking}
              className="px-3 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-rose-400 hover:text-rose-300 text-xs font-mono flex items-center space-x-1"
              title="Stop Speech Output"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          )}

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send Query</span>
          </button>
        </form>

        {/* Audio Wave Visualizer bar during listening */}
        {isListening && (
          <div className="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-300 font-mono flex items-center justify-between animate-pulse">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-rose-400 animate-ping" />
              <span>Microphone Active — Speak your maritime prompt clearly...</span>
            </div>
            <span className="text-[10px] text-rose-400 font-bold">LIVE STT ENGINES</span>
          </div>
        )}
      </div>
    </div>
  );
};
