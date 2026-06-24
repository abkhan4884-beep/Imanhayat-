import React, { useState } from 'react';
import { User, Reel } from '../types';
import { Bookmark, Repeat2, Film, Lock, Shield, Sparkles, Check, Settings } from 'lucide-react';

interface ProfileViewProps {
  currentUser: User;
  savedReels: Reel[];
  myReels: Reel[];
  repostedReels: Reel[];
  onTogglePrivateAccount: () => void;
  onSelectReel: (reel: Reel) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  savedReels,
  myReels,
  repostedReels,
  onTogglePrivateAccount,
  onSelectReel
}) => {
  const [tab, setTab] = useState<'my' | 'reposts' | 'saved'>('saved');

  const getActiveReelsList = () => {
    switch (tab) {
      case 'my': return myReels;
      case 'reposts': return repostedReels;
      case 'saved': return savedReels;
    }
  };

  const activeList = getActiveReelsList();

  return (
    <div className="w-full max-w-3xl mx-auto h-[calc(100vh-140px)] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto scrollbar-none flex flex-col">
      {/* Profile Header Banner */}
      <div className="relative h-40 bg-gradient-to-r from-rose-600 via-purple-700 to-amber-600 p-6 flex items-end justify-between select-none">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        <div className="relative z-10 flex items-end space-x-4 translate-y-10">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-950 shadow-2xl bg-slate-900"
            />
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-black shadow">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </div>
          <div className="pb-2">
            <h1 className="text-xl font-extrabold text-white drop-shadow-md flex items-center gap-2">
              {currentUser.displayName}
              {currentUser.isPrivate && <Lock className="w-4 h-4 text-amber-300" title="Private Account" />}
            </h1>
            <span className="text-xs text-slate-200 font-medium">@{currentUser.username}</span>
          </div>
        </div>

        <div className="relative z-10 pb-2 flex items-center space-x-2">
          <span className="bg-slate-950/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full border border-white/20 font-bold">
            Creator Pro
          </span>
        </div>
      </div>

      {/* Profile Stats & Bio */}
      <div className="pt-14 px-6 pb-6 border-b border-slate-800 bg-slate-900/50 space-y-4">
        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
          {currentUser.bio}
        </p>

        {/* Counts */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-white text-sm">3</span>
            <span className="text-xs text-slate-400">Friends</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-white text-sm">{currentUser.followersCount}</span>
            <span className="text-xs text-slate-400">Followers</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-white text-sm">{currentUser.followingCount}</span>
            <span className="text-xs text-slate-400">Following</span>
          </div>
        </div>

        {/* Privacy Control Switch Card */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                Private Account Protection
                <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded border border-rose-500/30">Privacy First</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                When enabled, only approved friends can DM you or view your private reels.
              </div>
            </div>
          </div>

          <button
            onClick={onTogglePrivateAccount}
            className={`w-12 h-6 rounded-full p-1 transition duration-300 flex items-center ${
              currentUser.isPrivate ? 'bg-rose-500 justify-end' : 'bg-slate-800 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md" />
          </button>
        </div>
      </div>

      {/* Gallery Tabs */}
      <div className="grid grid-cols-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
        <button
          onClick={() => setTab('saved')}
          className={`py-3.5 text-xs font-bold border-b-2 transition flex items-center justify-center gap-2 ${
            tab === 'saved' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" /> Savings ({savedReels.length})
        </button>
        <button
          onClick={() => setTab('my')}
          className={`py-3.5 text-xs font-bold border-b-2 transition flex items-center justify-center gap-2 ${
            tab === 'my' ? 'border-rose-500 text-rose-500 bg-rose-500/5' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Film className="w-4 h-4" /> My Reels ({myReels.length})
        </button>
        <button
          onClick={() => setTab('reposts')}
          className={`py-3.5 text-xs font-bold border-b-2 transition flex items-center justify-center gap-2 ${
            tab === 'reposts' ? 'border-emerald-400 text-emerald-400 bg-emerald-400/5' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Repeat2 className="w-4 h-4" /> Reposts ({repostedReels.length})
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="p-4 flex-1">
        {activeList.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-xs">
            No reels found in this collection.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {activeList.map(reel => (
              <div
                key={reel.id}
                onClick={() => onSelectReel(reel)}
                className="relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-900 cursor-pointer group border border-slate-800 hover:border-rose-500 transition shadow-lg"
              >
                <video src={reel.videoUrl} poster={reel.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 opacity-90 group-hover:opacity-100 transition">
                  <div className="text-[10px] text-white font-bold truncate">@{reel.username}</div>
                  <div className="flex items-center space-x-2 text-[9px] text-slate-300 mt-0.5">
                    <span>❤️ {reel.likes}</span>
                    <span>💬 {reel.commentsCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
