import React, { useState } from 'react';
import { 
  Lock, Send, Paperclip, User, ShieldCheck, CheckCheck, Circle, 
  MessageSquare, Users, Sparkles, FileText, Download, ShieldAlert, Key
} from 'lucide-react';

export interface DirectMessage {
  id: string;
  senderName: string;
  senderRole: string;
  isMe: boolean;
  messageText: string;
  timestamp: string;
  attachment?: {
    fileName: string;
    fileSize: string;
    fileType: 'TELEMETRY' | 'REPORT' | 'CERTIFICATE';
  };
}

export interface PrivateConversation {
  id: string;
  participantName: string;
  participantRole: string;
  participantAvatarColor: string;
  isOnline: boolean;
  isVerifiedExpert: boolean;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: DirectMessage[];
}

export const INITIAL_PRIVATE_CONVERSATIONS: PrivateConversation[] = [
  {
    id: 'DM-001',
    participantName: 'Lt. Cmdr. Sarah Perera',
    participantRole: 'IMO Regulatory Auditor',
    participantAvatarColor: 'bg-rose-500',
    isOnline: true,
    isVerifiedExpert: true,
    unreadCount: 1,
    lastMessage: 'Please review the attached SFOC mass flow meter calibration hash for Port State Control.',
    lastTimestamp: '10 min ago',
    messages: [
      {
        id: 'MSG-101',
        senderName: 'Lt. Cmdr. Sarah Perera',
        senderRole: 'IMO Auditor',
        isMe: false,
        messageText: 'Greetings Officer. I saw your query on MARPOL Annex VI compliance for your upcoming Singapore berth.',
        timestamp: '15 min ago'
      },
      {
        id: 'MSG-102',
        senderName: 'Lt. Cmdr. Sarah Perera',
        senderRole: 'IMO Auditor',
        isMe: false,
        messageText: 'Please review the attached SFOC mass flow meter calibration hash for Port State Control verification.',
        timestamp: '10 min ago',
        attachment: {
          fileName: 'SFOC_MassFlowMeter_Calibration_Hash_2026.pdf',
          fileSize: '1.4 MB',
          fileType: 'CERTIFICATE'
        }
      }
    ]
  },
  {
    id: 'DM-002',
    participantName: 'Dr. Aris Thorne',
    participantRole: 'Chief Oceanographer',
    participantAvatarColor: 'bg-emerald-500',
    isOnline: false,
    isVerifiedExpert: true,
    unreadCount: 0,
    lastMessage: 'The coastal pH telemetry values from Sundarbans match our Copernicus SAR dataset.',
    lastTimestamp: '2 hours ago',
    messages: [
      {
        id: 'MSG-201',
        senderName: 'Dr. Aris Thorne',
        senderRole: 'Chief Oceanographer',
        isMe: false,
        messageText: 'The coastal pH telemetry values from Sundarbans match our Copernicus SAR dataset. Great data contribution!',
        timestamp: '2 hours ago'
      }
    ]
  }
];

interface PrivateThreadDMsProps {
  onRewardXPAndOD: (xp: number, od: number, msg: string) => void;
  onTriggerToast: (msg: string) => void;
  initialRecipientName?: string;
}

export const PrivateThreadDMs: React.FC<PrivateThreadDMsProps> = ({
  onRewardXPAndOD,
  onTriggerToast,
  initialRecipientName
}) => {
  const [conversations, setConversations] = useState<PrivateConversation[]>(INITIAL_PRIVATE_CONVERSATIONS);
  const [selectedConvoId, setSelectedConvoId] = useState<string>('DM-001');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [showAttachModal, setShowAttachModal] = useState<boolean>(false);
  const [attachedFileName, setAttachedFileName] = useState<string>('');

  const activeConvo = conversations.find(c => c.id === selectedConvoId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() && !attachedFileName) return;

    const newMsg: DirectMessage = {
      id: `MSG-${Date.now()}`,
      senderName: 'You (Officer)',
      senderRole: 'Naval Officer',
      isMe: true,
      messageText: inputMessage.trim() || 'Attached telemetry document for private audit review.',
      timestamp: 'Just now',
      attachment: attachedFileName
        ? {
            fileName: attachedFileName,
            fileSize: '2.1 MB',
            fileType: 'TELEMETRY'
          }
        : undefined
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === selectedConvoId) {
          return {
            ...c,
            lastMessage: newMsg.messageText,
            lastTimestamp: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    setInputMessage('');
    setAttachedFileName('');
    setShowAttachModal(false);
    onTriggerToast('🔒 Encrypted Private DM sent successfully!');
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl font-mono text-white animate-fadeIn">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-500/20 border border-indigo-400/40 rounded-xl">
            <Lock className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">END-TO-END ENCRYPTED CHANNELS</span>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                AES-256 SECURE
              </span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">Private Thread DMs &amp; Specialist Consultation</h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-mono">
          <Key className="w-4 h-4 text-emerald-400" />
          <span>PORTAL KEYS VALIDATED</span>
        </div>
      </div>

      {/* DM WORKSPACE: SIDEBAR & MESSAGING CHAT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CONVERSATION LIST SIDEBAR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-800 pb-2">
            PRIVATE MESSAGING ROOMS ({conversations.length})
          </span>

          <div className="space-y-2">
            {conversations.map((convo) => {
              const isSelected = convo.id === selectedConvoId;
              return (
                <button
                  key={convo.id}
                  onClick={() => {
                    setSelectedConvoId(convo.id);
                    setConversations(prev =>
                      prev.map(c => c.id === convo.id ? { ...c, unreadCount: 0 } : c)
                    );
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all space-y-1.5 ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500/50 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div className={`w-7 h-7 rounded-full ${convo.participantAvatarColor} flex items-center justify-center font-black text-slate-950 text-xs`}>
                          {convo.participantName[0]}
                        </div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-slate-950 ${
                          convo.isOnline ? 'bg-emerald-400' : 'bg-slate-500'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <strong className="text-white text-xs font-bold">{convo.participantName}</strong>
                          {convo.isVerifiedExpert && (
                            <span className="text-amber-400 text-[10px]" title="Accredited Expert">★</span>
                          )}
                        </div>
                        <span className="text-[9px] text-indigo-300 font-sans block">{convo.participantRole}</span>
                      </div>
                    </div>

                    <span className="text-[9px] text-slate-500 font-mono">{convo.lastTimestamp}</span>
                  </div>

                  <p className="text-[10px] text-slate-400 font-sans line-clamp-1 pl-9">
                    {convo.lastMessage}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE CHAT WINDOW */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 min-h-[420px]">
          {/* CHAT RECIPIENT HEADER */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 rounded-full ${activeConvo.participantAvatarColor} flex items-center justify-center font-black text-slate-950 text-sm`}>
                {activeConvo.participantName[0]}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-white text-sm">{activeConvo.participantName}</h3>
                  {activeConvo.isVerifiedExpert && (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[8px] font-black px-2 py-0.5 rounded flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      <span>UN ACCREDITED EXPERT</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-sans">
                  <span>{activeConvo.participantRole}</span>
                  <span>•</span>
                  <span className={activeConvo.isOnline ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {activeConvo.isOnline ? '● Online & Encrypted' : '○ Offline'}
                  </span>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-slate-500 font-mono">
              CHANNEL ID: {activeConvo.id}
            </span>
          </div>

          {/* MESSAGES FEED */}
          <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
            {activeConvo.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="text-[9px] text-slate-500 font-mono px-1">
                  {msg.senderName} • {msg.timestamp}
                </div>

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-sans space-y-2 ${
                    msg.isMe
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.messageText}</p>

                  {/* ATTACHMENT CARD */}
                  {msg.attachment && (
                    <div className="bg-slate-900/90 border border-slate-700/80 p-2.5 rounded-xl flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="font-bold text-white text-[11px] block">{msg.attachment.fileName}</span>
                          <span className="text-[9px] text-slate-400 block">{msg.attachment.fileSize} • {msg.attachment.fileType}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onTriggerToast(`📥 Downloaded file attachment: ${msg.attachment?.fileName}`)}
                        className="p-1 text-slate-300 hover:text-white"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* MESSAGE INPUT FORM */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 space-y-2">
            {attachedFileName && (
              <div className="bg-slate-950 border border-indigo-500/40 px-3 py-1.5 rounded-xl text-xs font-mono text-indigo-300 flex items-center justify-between">
                <span>📎 Attachment ready: {attachedFileName}</span>
                <button
                  type="button"
                  onClick={() => setAttachedFileName('')}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  setAttachedFileName('Vessel_Telemetry_Sensor_Log_2026.csv');
                  onTriggerToast('📎 Vessel Telemetry CSV log attached to private DM!');
                }}
                className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                title="Attach Vessel Telemetry File"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type an end-to-end encrypted private message or query..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-400"
              />

              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-black text-xs uppercase rounded-xl transition-all flex items-center space-x-1 shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>SEND</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
