import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Share2,
  Heart,
  Send,
  Mic,
  MicOff,
  Camera,
  Image,
  Users,
  ThumbsUp,
  Smile,
  MoreVertical,
  Globe,
  Radio,
  CheckCircle2,
  Sparkles,
  Paperclip,
  Volume2,
  Play,
  ShieldCheck,
  Search,
  Plus,
  Compass,
  MapPin,
  Clock,
  Wifi
} from 'lucide-react';
import { hapticEngine } from '../utils/hapticUtils';

export interface SocialPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  vessel: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  satcomBandwidth: string;
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  vessel: string;
  status: 'ONLINE' | 'OFFLINE' | 'SATELLITE_BUSY';
  avatar: string;
  lastMessage: string;
  lastSeen: string;
}

const INITIAL_POSTS: SocialPost[] = [
  {
    id: 'PST-101',
    author: 'Captain Vikramaditya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'Master Mariner • ULCV Ocean Titan',
    vessel: 'IMO 9821901',
    timestamp: '18 mins ago',
    content: 'Smooth passage through the Bay of Bengal today at 19.4 knots! Clear skies and 1.2m swell. Greeting all fellow seafarers across South Asian shipping corridors! 🌊⚓',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    likes: 142,
    commentsCount: 28,
    sharesCount: 14,
    isLiked: false,
    satcomBandwidth: 'Starlink Maritime 45 Mbps'
  },
  {
    id: 'PST-102',
    author: 'Chief Engineer Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    role: 'Chief Engineer • JNPT Terminal Dock',
    vessel: 'Bunker Operations Hub',
    timestamp: '1 hour ago',
    content: 'Completed zero-emission cold-ironing shore power setup for 3 berths at Mumbai Port. Reducing CO2 footprint by 14 tons per day! 🍃⚡',
    likes: 89,
    commentsCount: 12,
    sharesCount: 8,
    isLiked: true,
    satcomBandwidth: 'JNPT Shore Fiber 1 Gbps'
  },
  {
    id: 'PST-103',
    author: 'Harbor Pilot Tariq Rahman',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'Senior Harbor Pilot • Chittagong Port',
    vessel: 'Chittagong Pilot Boat #2',
    timestamp: '3 hours ago',
    content: 'High tide docking successfully maneuvered for 14,000 TEU feeder. High sea-state warnings active for southern Bay of Bengal gyre tonight. Stay safe captains!',
    likes: 215,
    commentsCount: 45,
    sharesCount: 31,
    isLiked: false,
    satcomBandwidth: 'Iridium Certus 350 Kbps'
  }
];

const CONTACTS: ChatContact[] = [
  { id: 'C-01', name: 'Capt. Vikramaditya Sharma', role: 'Master Mariner', vessel: 'ULCV Ocean Titan', status: 'ONLINE', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', lastMessage: 'Radar confirmed clear channel ahead.', lastSeen: 'Just now' },
  { id: 'C-02', name: 'Chief Eng. Ananya Roy', role: 'Chief Engineer', vessel: 'JNPT Terminal Hub', status: 'ONLINE', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', lastMessage: 'Shore power grid synchronized.', lastSeen: '2m ago' },
  { id: 'C-03', name: 'Pilot Tariq Rahman', role: 'Senior Harbor Pilot', vessel: 'Chittagong Port Control', status: 'SATELLITE_BUSY', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', lastMessage: 'Tide level peaking at 4.2m.', lastSeen: '15m ago' },
  { id: 'C-04', name: 'Colombo Fleet Operations', role: 'Dispatch Center', vessel: 'Colombo Control Tower', status: 'ONLINE', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', lastMessage: 'Gate pass verified for Berth #4.', lastSeen: '1h ago' }
];

export const MaritimeSocialMediaPortalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FEED' | 'CHAT' | 'CALLS'>('FEED');
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  
  // Direct Messaging State
  const [selectedContact, setSelectedContact] = useState<ChatContact>(CONTACTS[0]);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isMe: boolean }>>([
    { sender: 'Capt. Vikramaditya', text: 'Good day Captain! How is the swell near Malacca Strait?', time: '10:14 AM', isMe: false },
    { sender: 'You', text: 'Swell is 1.4m, speed 18.2 knots. AI navigation path optimized.', time: '10:16 AM', isMe: true },
    { sender: 'Capt. Vikramaditya', text: 'Excellent! Let us schedule a quick voice briefing at 11:00.', time: '10:18 AM', isMe: false }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Call System State (Voice & Video)
  const [activeCall, setActiveCall] = useState<{
    type: 'VOICE' | 'VIDEO';
    contact: ChatContact;
    status: 'RINGING' | 'CONNECTED' | 'ENDED';
    durationSec: number;
    isMuted: boolean;
    isVideoOff: boolean;
  } | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;
    if (activeCall && activeCall.status === 'CONNECTED') {
      timer = setInterval(() => {
        setActiveCall((prev) => (prev ? { ...prev, durationSec: prev.durationSec + 1 } : null));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeCall?.status]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    hapticEngine.trigger('success');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    hapticEngine.trigger('click');
    const newPost: SocialPost = {
      id: `PST-${Date.now()}`,
      author: 'Captain (You)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'Master Mariner • AI Ocean Explorer',
      vessel: 'IMO 9988221',
      timestamp: 'Just now',
      content: newPostText,
      likes: 1,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: true,
      satcomBandwidth: 'Starlink Maritime Direct'
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
    showToast('Maritime post shared across global seafarer network!');
  };

  const handleLikePost = (postId: string) => {
    hapticEngine.trigger('click');
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    hapticEngine.trigger('click');
    setChatMessages((prev) => [
      ...prev,
      { sender: 'You', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: true }
    ]);
    setInputMsg('');
  };

  const startCall = (type: 'VOICE' | 'VIDEO', contact: ChatContact) => {
    hapticEngine.trigger('scan');
    setActiveCall({
      type,
      contact,
      status: 'RINGING',
      durationSec: 0,
      isMuted: false,
      isVideoOff: false
    });

    setTimeout(() => {
      setActiveCall((prev) => (prev ? { ...prev, status: 'CONNECTED' } : null));
      hapticEngine.trigger('success');
    }, 2500);
  };

  const endCall = () => {
    hapticEngine.trigger('click');
    if (activeCall) {
      setActiveCall({ ...activeCall, status: 'ENDED' });
      setTimeout(() => setActiveCall(null), 1200);
      showToast(`Call ended with ${activeCall.contact.name}`);
    }
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 font-mono animate-fadeIn pb-12">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-950 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Globe className="w-5 h-5 animate-pulse text-cyan-400" />
              <span>Global Seafarers SatCom Social Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Maritime Social Media Portal & SATCOM Comms
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Connect with captains, engineers, harbor pilots, and crew worldwide. Features encrypted Voice & HD Video calls, instant chat, post sharing, and voyage updates.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => startCall('VIDEO', CONTACTS[0])}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-600 hover:from-indigo-400 hover:to-cyan-500 text-white font-black rounded-xl text-xs flex items-center space-x-2 shadow-xl transition-all"
            >
              <Video className="w-4 h-4 text-white" />
              <span>QUICK VIDEO CALL</span>
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('FEED')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'FEED'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>GLOBAL FEED</span>
        </button>

        <button
          onClick={() => setActiveTab('CHAT')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'CHAT'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>MESSAGES & CHAT</span>
        </button>

        <button
          onClick={() => setActiveTab('CALLS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'CALLS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>VOICE & VIDEO CALLS</span>
        </button>
      </div>

      {/* TAB 1: GLOBAL SOCIAL FEED */}
      {activeTab === 'FEED' && (
        <div className="space-y-6">
          {/* POST CREATOR BOX */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-cyan-500 object-cover"
              />
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Share voyage update, ocean sea state, or photo with fellow seafarers..."
                rows={2}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold">
                <button
                  onClick={() => showToast('Attached image file from ship library!')}
                  className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 flex items-center space-x-1"
                >
                  <Image className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Photo</span>
                </button>
                <button
                  onClick={() => showToast('Attached SATCOM location tag!')}
                  className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 flex items-center space-x-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Location</span>
                </button>
              </div>

              <button
                onClick={handleCreatePost}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>POST UPDATE</span>
              </button>
            </div>
          </div>

          {/* POSTS LIST */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                    <div>
                      <h3 className="text-xs font-bold text-white flex items-center space-x-1">
                        <span>{post.author}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 inline" />
                      </h3>
                      <p className="text-[10px] text-slate-400">{post.role} • {post.vessel}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.timestamp}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-sans">{post.content}</p>

                {post.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 max-h-72">
                    <img src={post.imageUrl} alt="Post media" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center space-x-1 hover:text-rose-400 transition-colors ${
                        post.isLiked ? 'text-rose-400 font-bold' : ''
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() => showToast('Opening comments thread...')}
                      className="flex items-center space-x-1 hover:text-cyan-300"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount} Comments</span>
                    </button>

                    <button
                      onClick={() => showToast('Post link copied to SATCOM clipboard!')}
                      className="flex items-center space-x-1 hover:text-amber-300"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{post.sharesCount} Shares</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-500">{post.satcomBandwidth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DIRECT MESSAGING & CHAT */}
      {activeTab === 'CHAT' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
          {/* CONTACTS SIDEBAR */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 overflow-y-auto">
            <h3 className="text-xs font-bold text-cyan-400 uppercase">Seafarers Active Directory</h3>
            <div className="space-y-2">
              {CONTACTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedContact(c);
                    hapticEngine.trigger('click');
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                    selectedContact.id === c.id
                      ? 'bg-slate-800 border-cyan-500/60 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="relative">
                    <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                      c.status === 'ONLINE' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate">{c.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CHAT THREAD WINDOW */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xl">
            {/* Thread Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <img src={selectedContact.avatar} alt={selectedContact.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h3 className="text-xs font-bold text-white">{selectedContact.name}</h3>
                  <p className="text-[10px] text-slate-400">{selectedContact.role} • {selectedContact.vessel}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => startCall('VOICE', selectedContact)}
                  className="p-2 bg-slate-950 hover:bg-slate-800 text-cyan-300 rounded-xl border border-slate-800"
                  title="Voice Call"
                >
                  <Phone className="w-4 h-4" />
                </button>

                <button
                  onClick={() => startCall('VIDEO', selectedContact)}
                  className="p-2 bg-slate-950 hover:bg-slate-800 text-indigo-300 rounded-xl border border-slate-800"
                  title="Video Call"
                >
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-2">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-xs ${
                    m.isMe ? 'bg-cyan-600 text-slate-950 font-bold rounded-tr-none' : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    <p>{m.text}</p>
                    <span className="text-[9px] opacity-70 block text-right mt-1">{m.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="flex items-center space-x-2 border-t border-slate-800 pt-3">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type seafarer message..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VOICE & VIDEO CALLS CONTROLLER */}
      {activeTab === 'CALLS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>SATCOM High-Seas Voice & Video Calling Hub</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
              Low Latency VoIP Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTACTS.map((c) => (
              <div key={c.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{c.name}</h4>
                    <p className="text-[10px] text-slate-400">{c.role} • {c.vessel}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startCall('VOICE', c)}
                    className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 rounded-xl text-xs font-bold flex items-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Voice</span>
                  </button>

                  <button
                    onClick={() => startCall('VIDEO', c)}
                    className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 rounded-xl text-xs font-bold flex items-center space-x-1"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE CALL OVERLAY MODAL (VOICE OR VIDEO) */}
      {activeCall && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 max-w-lg w-full text-center space-y-6 shadow-2xl animate-scaleUp relative overflow-hidden">
            {/* Video Call Background simulation */}
            {activeCall.type === 'VIDEO' && activeCall.status === 'CONNECTED' && (
              <div className="absolute inset-0 z-0 opacity-20">
                <img src={activeCall.contact.avatar} alt="Video feed" className="w-full h-full object-cover filter blur-sm" />
              </div>
            )}

            <div className="relative z-10 space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl relative">
                <img src={activeCall.contact.avatar} alt={activeCall.contact.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <h2 className="text-lg font-black text-white">{activeCall.contact.name}</h2>
                <p className="text-xs text-cyan-300">{activeCall.contact.role} • {activeCall.contact.vessel}</p>
                <div className="text-xs font-bold text-amber-400 mt-1">
                  {activeCall.status === 'RINGING' ? 'CONNECTING VIA INMARSAT-C...' : `CONNECTED (${formatDuration(activeCall.durationSec)})`}
                </div>
              </div>

              {/* Call Controls Bar */}
              <div className="flex items-center justify-center space-x-4 pt-4">
                <button
                  onClick={() => setActiveCall({ ...activeCall, isMuted: !activeCall.isMuted })}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    activeCall.isMuted ? 'bg-rose-500/20 text-rose-300 border-rose-500' : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  {activeCall.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {activeCall.type === 'VIDEO' && (
                  <button
                    onClick={() => setActiveCall({ ...activeCall, isVideoOff: !activeCall.isVideoOff })}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      activeCall.isVideoOff ? 'bg-rose-500/20 text-rose-300 border-rose-500' : 'bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    {activeCall.isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </button>
                )}

                <button
                  onClick={endCall}
                  className="p-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl shadow-xl transition-all"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
