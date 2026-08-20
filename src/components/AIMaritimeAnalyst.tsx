import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, Compass, Ship, Loader2, MessageSquare, AlertCircle, HelpCircle, Mic, MicOff, Volume2, Radio, CheckCircle2 } from 'lucide-react';

export const AIMaritimeAnalyst: React.FC = () => {
  // Voyage Risk Analyzer state
  const [origin, setOrigin] = useState('Mumbai Port, India');
  const [destination, setDestination] = useState('Colombo Harbour, Sri Lanka');
  const [vesselName, setVesselName] = useState('Cordelia Empress');
  const [travelMonth, setTravelMonth] = useState('August (Southwest Monsoon)');
  const [isAnalyzingVoyage, setIsAnalyzingVoyage] = useState(false);
  const [voyageAdvisoryHtml, setVoyageAdvisoryHtml] = useState<string | null>(null);

  // Custom QA Assistant state
  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [qaHistory, setQaHistory] = useState<Array<{ q: string; a: string }>>([
    {
      q: "How many nations belong to South Asia?",
      a: "South Asia comprises **8 sovereign member nations**: India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, and Afghanistan (which joined SAARC in 2007). Five of these nations have coastal ocean access while three are landlocked."
    }
  ]);

  // Voice-to-Text State (Web Speech API)
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const startVoiceInput = (targetSetter?: (val: string) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError('Web Speech API is not supported in this browser environment.');
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      setIsListening(false);
      setInterimTranscript('');
      return;
    }

    setSpeechError(null);
    setInterimTranscript('');

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInterimTranscript(currentTranscript);

        if (targetSetter) {
          targetSetter(currentTranscript);
        } else {
          setQuestion(currentTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission was denied. Please allow microphone access in your browser.');
        } else if (event.error === 'no-speech') {
          setSpeechError('No speech detected. Please speak into your microphone and try again.');
        } else {
          setSpeechError(`Voice error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      setSpeechError('Could not start microphone voice capture.');
    }
  };

  const handleVoyageAnalysis = async () => {
    setIsAnalyzingVoyage(true);
    try {
      const res = await fetch('/api/gemini/voyage-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          vesselName,
          month: travelMonth,
          passengerCount: 800
        })
      });
      const data = await res.json();
      if (data.advisory) {
        setVoyageAdvisoryHtml(data.advisory);
      } else {
        setVoyageAdvisoryHtml('<p>Unable to generate advisory. Please check connection.</p>');
      }
    } catch (err: any) {
      setVoyageAdvisoryHtml(`<p class="text-rose-400">Error: ${err.message || 'Failed to connect to AI server.'}</p>`);
    } finally {
      setIsAnalyzingVoyage(false);
    }
  };

  const handleAskQuestion = async (promptText?: string) => {
    const qToAsk = promptText || question;
    if (!qToAsk.trim()) return;

    setIsAsking(true);
    if (!promptText) setQuestion('');

    try {
      const res = await fetch('/api/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: qToAsk })
      });
      const data = await res.json();
      if (data.answer) {
        setQaHistory((prev) => [{ q: qToAsk, a: data.answer }, ...prev]);
      }
    } catch (err: any) {
      setQaHistory((prev) => [
        { q: qToAsk, a: `Sorry, an error occurred: ${err.message}` },
        ...prev
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const samplePrompts = [
    "What are the 8 nations of South Asia and their major seaports?",
    "When is the safest season for cruise ships traveling to the Maldives?",
    "How does the Southwest Monsoon affect ferry lines between India and Sri Lanka?",
    "Which South Asian ports are most at risk from Bay of Bengal cyclones?"
  ];

  return (
    <div id="ai-analyst-view" className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 rounded-2xl p-6 border border-purple-800/40 shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">GEMINI 3.6 FLASH MARITIME INTELLIGENCE</span>
              <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                <Mic className="w-3 h-3 text-rose-400" />
                <span>Hands-Free Speech API Active</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              AI Climate & Cruise Safety Analyst
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Generate voyage weather risk reports, ocean swell forecasts & regional South Asia geographic intelligence hands-free with voice queries.
            </p>
          </div>
        </div>

        <button
          onClick={() => startVoiceInput(setQuestion)}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
            isListening
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse shadow-lg shadow-rose-500/20'
              : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white hover:border-purple-500/50'
          }`}
        >
          <Mic className={`w-4 h-4 ${isListening ? 'text-rose-400 animate-bounce' : 'text-purple-400'}`} />
          <span>{isListening ? 'LISTENING NOW...' : 'VOICE COMMAND'}</span>
        </button>
      </div>

      {/* Grid: 1. Voyage Risk Form & Output | 2. Q&A Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Voyage Risk Generator */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-5">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-base">
            <Ship className="w-5 h-5" />
            <span>AI Cruise Voyage Climate & Sea Risk Analyzer</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1 block">Origin Port</label>
              <div className="relative">
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-3 pr-8 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => startVoiceInput(setOrigin)}
                  title="Speak Origin Port"
                  className="absolute right-2 top-2 text-slate-500 hover:text-purple-400"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1 block">Destination Port</label>
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-3 pr-8 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => startVoiceInput(setDestination)}
                  title="Speak Destination Port"
                  className="absolute right-2 top-2 text-slate-500 hover:text-purple-400"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1 block">Vessel Name / Line</label>
              <input
                type="text"
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1 block">Travel Season / Month</label>
              <select
                value={travelMonth}
                onChange={(e) => setTravelMonth(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="August (Southwest Monsoon Peak)">August (SW Monsoon Peak)</option>
                <option value="November (Northeast Monsoon & Cyclone Season)">November (NE Monsoon & Cyclones)</option>
                <option value="February (Calm Season / Dry Window)">February (Calm Dry Window)</option>
                <option value="May (Pre-Monsoon Squall Period)">May (Pre-Monsoon Squall Window)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleVoyageAnalysis}
            disabled={isAnalyzingVoyage}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-sm text-white flex items-center justify-center space-x-2 transition-all shadow-lg shadow-purple-900/30 disabled:opacity-50"
          >
            {isAnalyzingVoyage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
                <span>Simulating Ocean Climate Risk...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Voyage Risk Advisory</span>
              </>
            )}
          </button>

          {/* Render HTML Report */}
          {voyageAdvisoryHtml && (
            <div className="bg-slate-950 p-5 rounded-xl border border-purple-900/50 space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar text-xs leading-relaxed text-slate-200">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm border-b border-slate-800 pb-2">
                <Compass className="w-4 h-4" />
                <span>AI Voyage Advisory Report</span>
              </div>
              <div
                className="prose prose-invert max-w-none prose-sm text-xs"
                dangerouslySetInnerHTML={{ __html: voyageAdvisoryHtml }}
              />
            </div>
          )}
        </div>

        {/* Q&A Natural Language Assistant */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-base">
              <MessageSquare className="w-5 h-5" />
              <span>Ask AI About South Asian Climate & Nations</span>
            </div>

            {/* Quick Sample Prompts */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 font-semibold block">Suggested Questions:</span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((promptText, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskQuestion(promptText)}
                    disabled={isAsking}
                    className="text-[11px] bg-slate-950 hover:bg-purple-950/60 hover:text-purple-300 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 transition-all text-left"
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            </div>

            {/* QA Output Stream */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 max-h-[360px] overflow-y-auto custom-scrollbar">
              {qaHistory.map((item, index) => (
                <div key={index} className="space-y-2 text-xs pb-3 border-b border-slate-900 last:border-0">
                  <div className="font-bold text-purple-300 flex items-start space-x-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Q: {item.q}</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                    {item.a}
                  </div>
                </div>
              ))}
              {isAsking && (
                <div className="flex items-center space-x-2 text-purple-400 text-xs py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gemini AI is analyzing South Asian climate database...</span>
                </div>
              )}
            </div>
          </div>

          {/* Voice Listening Overlay / Error Banner */}
          {isListening && (
            <div className="bg-rose-950/80 border border-rose-500/50 p-3 rounded-xl flex items-center justify-between gap-2 text-xs text-rose-200 animate-pulse">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <Mic className="w-4 h-4 text-rose-400" />
                <span className="font-bold">Hands-Free Voice Capture Active:</span>
                <span className="text-slate-300 italic">{interimTranscript || 'Listening... Speak your query or observation'}</span>
              </div>
              <button
                onClick={() => startVoiceInput()}
                className="px-2 py-1 bg-rose-900 hover:bg-rose-800 text-rose-100 rounded text-[10px] font-bold"
              >
                Stop
              </button>
            </div>
          )}

          {speechError && (
            <div className="bg-amber-950/60 border border-amber-500/40 p-2.5 rounded-xl flex items-center space-x-2 text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{speechError}</span>
            </div>
          )}

          {/* Input field */}
          <div className="flex items-center space-x-2 pt-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={isListening ? "Listening to voice input..." : "Ask about South Asia climate, nations, or speak hands-free..."}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                className={`w-full bg-slate-950 border rounded-xl pl-3 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  isListening ? 'border-rose-500 ring-1 ring-rose-500/50' : 'border-slate-800 focus:border-purple-500'
                }`}
              />
              {/* Mic button inside input field */}
              <button
                type="button"
                onClick={() => startVoiceInput(setQuestion)}
                title={isListening ? "Stop listening" : "Start voice-to-text input"}
                className={`absolute right-2 top-2 p-1.5 rounded-lg transition-all ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/50'
                    : 'bg-slate-800 text-slate-400 hover:text-purple-300 hover:bg-purple-900/50'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              onClick={() => handleAskQuestion()}
              disabled={isAsking || !question.trim()}
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
