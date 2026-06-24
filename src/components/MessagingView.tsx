import React, { useState } from 'react';
import { Chat, User } from '../types';
import { MessageCircle, Send, Lock, Search, ShieldAlert, UserPlus, Check } from 'lucide-react';

interface MessagingViewProps {
  chats: Chat[];
  allUsers: User[];
  onSendMessage: (chatId: string, text: string) => void;
  onSendFriendRequest: (userId: string) => void;
}

export const MessagingView: React.FC<MessagingViewProps> = ({
  chats,
  allUsers,
  onSendMessage,
  onSendFriendRequest
}) => {
  const [selectedChatId, setSelectedChatId] = useState<string>(chats[0]?.id || '');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [restrictedUser, setRestrictedUser] = useState<User | null>(null);
  const [requestSentUserIds, setRequestSentUserIds] = useState<string[]>([]);

  const activeChat = chats.find(c => c.id === selectedChatId);

  const filteredUsers = allUsers.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user: User) => {
    // Strict Friend Rule Check: "not msg any one unless they are friends"
    if (!user.isFriend) {
      setRestrictedUser(user);
    } else {
      const existingChat = chats.find(c => c.friendId === user.id);
      if (existingChat) {
        setSelectedChatId(existingChat.id);
        setSearchQuery('');
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChatId) return;
    onSendMessage(selectedChatId, messageInput);
    setMessageInput('');
  };

  const handleSendRequest = (userId: string) => {
    onSendFriendRequest(userId);
    setRequestSentUserIds(prev => [...prev, userId]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-140px)] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
      {/* Left Pane: Friends & Chats Directory */}
      <div className="w-full md:w-80 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col">
        {/* Header & Search */}
        <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-950">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white text-base flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-rose-500" /> Friend Messages
            </h2>
            <span className="bg-rose-500/10 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-500/30">
              🔒 Friends Only
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search people to message..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
            />
          </div>
        </div>

        {/* Search Results / Directory when searching */}
        {searchQuery.trim() ? (
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1">Directory Search Results</div>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-500">No users found.</div>
            ) : (
              filteredUsers.map(u => (
                <div
                  key={u.id}
                  onClick={() => handleUserSelect(u)}
                  className="p-3 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between transition group"
                >
                  <div className="flex items-center space-x-3">
                    <img src={u.avatar} alt={u.username} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-white flex items-center gap-1">
                        {u.displayName}
                        {!u.isFriend && <Lock className="w-3 h-3 text-rose-400" />}
                      </span>
                      <span className="text-[10px] text-slate-400">@{u.username}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-md font-semibold ${
                    u.isFriend 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {u.isFriend ? 'Friend ✨' : 'Locked 🔒'}
                  </span>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Active Chat List */
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1">Active Friends Chats</div>
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition ${
                  selectedChatId === chat.id ? 'bg-rose-500/15 border border-rose-500/40 shadow-md' : 'hover:bg-slate-800 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <img src={chat.friendAvatar} alt={chat.friendName} className="w-11 h-11 rounded-full object-cover border border-slate-700 flex-shrink-0" />
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-xs text-white truncate">{chat.friendName}</span>
                    <span className="text-[11px] text-slate-400 truncate">{chat.lastMessage}</span>
                  </div>
                </div>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Security Footer Notice */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5 justify-center">
          <Lock className="w-3 h-3 text-rose-500 flex-shrink-0" />
          <span>Kamashuno Anti-Spam: Strangers cannot DM you.</span>
        </div>
      </div>

      {/* Right Pane: Active Chat Window */}
      <div className="flex-1 bg-slate-950 flex flex-col h-full relative">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between backdrop-blur">
              <div className="flex items-center space-x-3">
                <img src={activeChat.friendAvatar} alt={activeChat.friendName} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div className="flex flex-col">
                  <span className="font-bold text-white text-sm flex items-center gap-1.5">
                    {activeChat.friendName}
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/30">Verified Friend ✨</span>
                  </span>
                  <span className="text-[11px] text-slate-400">@{activeChat.friendUsername}</span>
                </div>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="text-center my-4">
                <span className="bg-slate-900 text-slate-400 text-[10px] px-3 py-1 rounded-full border border-slate-800">
                  End-to-end encrypted friend communication 🔒
                </span>
              </div>

              {activeChat.messages.map(msg => {
                const isMe = msg.senderId === 'user_me';
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-lg ${
                      isMe 
                        ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-br-none font-medium' 
                        : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={`Message ${activeChat.friendName}...`}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-full py-3 px-5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="p-3 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white shadow-xl transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
            Select a friend chat to start messaging.
          </div>
        )}

        {/* RESTRICTED USER MODAL (Triggered when attempting to DM non-friends) */}
        {restrictedUser && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md bg-slate-900 border border-rose-500/50 rounded-3xl p-6 text-center space-y-5 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500 flex items-center justify-center mx-auto text-rose-500 shadow-lg">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Messaging Restricted 🔒</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  On <strong className="text-rose-400">Kamashuno</strong>, you cannot message anyone unless they are your confirmed friend. This keeps DMs 100% spam-free!
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center space-x-3 text-left">
                <img src={restrictedUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div className="flex-1 truncate">
                  <div className="font-bold text-xs text-white truncate">{restrictedUser.displayName}</div>
                  <div className="text-[10px] text-slate-400 truncate">@{restrictedUser.username} • Not Friends</div>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setRestrictedUser(null)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleSendRequest(restrictedUser.id);
                    setRestrictedUser(null);
                  }}
                  disabled={requestSentUserIds.includes(restrictedUser.id) || restrictedUser.hasPendingRequest}
                  className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-bold text-xs shadow-lg hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-1.5"
                >
                  {requestSentUserIds.includes(restrictedUser.id) || restrictedUser.hasPendingRequest ? (
                    <><Check className="w-4 h-4" /> Request Pending</>
                  ) : (
                    <><UserPlus className="w-4 h-4" /> Send Friend Request</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
