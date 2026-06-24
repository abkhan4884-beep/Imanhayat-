import React, { useState } from 'react';
import { User, FriendRequest } from '../types';
import { Users, UserPlus, UserCheck, Sparkles, ShieldCheck, Check, X, Lock } from 'lucide-react';

interface FriendsManagerProps {
  friends: User[];
  requests: FriendRequest[];
  exploreUsers: User[];
  onAcceptRequest: (reqId: string, userId: string) => void;
  onDeclineRequest: (reqId: string) => void;
  onToggleCloseFriend: (userId: string) => void;
  onSendRequest: (userId: string) => void;
}

export const FriendsManager: React.FC<FriendsManagerProps> = ({
  friends,
  requests,
  exploreUsers,
  onAcceptRequest,
  onDeclineRequest,
  onToggleCloseFriend,
  onSendRequest
}) => {
  const [tab, setTab] = useState<'friends' | 'requests' | 'explore'>('friends');
  const [sentReqIds, setSentReqIds] = useState<string[]>([]);

  const handleRequestSend = (id: string) => {
    onSendRequest(id);
    setSentReqIds(prev => [...prev, id]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[calc(100vh-140px)] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      {/* Header & Tabs */}
      <div className="p-5 bg-slate-900 border-b border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">Friends & Privacy Network</h2>
              <p className="text-xs text-slate-400">Strict Friend Messaging & Close Friends Circle</p>
            </div>
          </div>
        </div>

        {/* Navigation Switch */}
        <div className="grid grid-cols-3 bg-slate-950 p-1.5 rounded-xl gap-1 border border-slate-800">
          <button
            onClick={() => setTab('friends')}
            className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tab === 'friends' ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" /> My Friends ({friends.length})
          </button>
          <button
            onClick={() => setTab('requests')}
            className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 relative ${
              tab === 'requests' ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" /> Requests
            {requests.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[10px]">
                {requests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab('explore')}
            className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tab === 'explore' ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Explore
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {tab === 'friends' && (
          <div className="space-y-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>Only these mutual friends can send you DMs and view your Friends-Only reels.</span>
            </div>

            {friends.map(friend => (
              <div key={friend.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between hover:border-slate-700 transition">
                <div className="flex items-center space-x-3.5">
                  <img src={friend.avatar} alt={friend.username} className="w-11 h-11 rounded-full object-cover border border-slate-700" />
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      {friend.displayName}
                      {friend.isCloseFriend && (
                        <span className="bg-emerald-500 text-black text-[9px] font-extrabold px-1.5 py-0.2 rounded">★ CLOSE</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">@{friend.username} • {friend.followersCount} followers</div>
                  </div>
                </div>

                {/* Close Friend Toggle */}
                <button
                  onClick={() => onToggleCloseFriend(friend.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                    friend.isCloseFriend
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 hover:bg-emerald-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                  title="Toggle Close Friend status"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {friend.isCloseFriend ? 'Close Friend ★' : 'Add to ★ Circle'}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'requests' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-400 mb-2">
              Accepting friend requests grants mutual messaging permissions on Kamashuno.
            </div>

            {requests.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No pending friend requests.
              </div>
            ) : (
              requests.map(req => (
                <div key={req.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <img src={req.avatar} alt={req.username} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
                    <div>
                      <div className="font-bold text-white text-sm">{req.displayName}</div>
                      <div className="text-xs text-slate-400">@{req.username} • {req.timestamp}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => onAcceptRequest(req.id, req.userId)}
                      className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-bold text-xs hover:opacity-90 transition flex items-center gap-1 shadow-lg"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept
                    </button>
                    <button
                      onClick={() => onDeclineRequest(req.id)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'explore' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-400 mb-2">
              Connect with amazing creators. Remember: DMs unlock only after becoming mutual friends!
            </div>

            {exploreUsers.map(user => {
              const isSent = sentReqIds.includes(user.id) || user.hasPendingRequest;
              return (
                <div key={user.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <img src={user.avatar} alt={user.username} className="w-11 h-11 rounded-full object-cover border border-slate-700" />
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1">
                        {user.displayName}
                        {user.isPrivate && <Lock className="w-3 h-3 text-rose-400" title="Private Account" />}
                      </div>
                      <div className="text-xs text-slate-400">@{user.username} • {user.bio}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRequestSend(user.id)}
                    disabled={isSent}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      isSent 
                        ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700' 
                        : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md'
                    }`}
                  >
                    {isSent ? 'Request Pending' : '+ Add Friend'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
