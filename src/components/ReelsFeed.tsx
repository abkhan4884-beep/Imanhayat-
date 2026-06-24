import React, { useState, useRef } from 'react';
import { Reel, Comment, PrivacySetting } from '../types';
import { 
  Heart, MessageCircle, Repeat2, Bookmark, Share2, 
  Volume2, VolumeX, Globe, Users, Lock, Eye, Send, Sparkles, Check
} from 'lucide-react';

interface ReelsFeedProps {
  reels: Reel[];
  onLike: (reelId: string) => void;
  onSave: (reelId: string) => void;
  onRepost: (reelId: string) => void;
  onAddComment: (reelId: string, text: string) => void;
  currentUserId: string;
}

export const ReelsFeed: React.FC<ReelsFeedProps> = ({
  reels,
  onLike,
  onSave,
  onRepost,
  onAddComment,
  currentUserId
}) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [commentDrawerReel, setCommentDrawerReel] = useState<Reel | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [heartAnim, setHeartAnim] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDoubleTap = (reelId: string, isLiked: boolean) => {
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 800);
    if (!isLiked) {
      onLike(reelId);
    }
  };

  const handleLikeClick = (reel: Reel) => {
    onLike(reel.id);
    if (!reel.isLiked) {
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 800);
    }
  };

  const handleSaveClick = (reel: Reel) => {
    onSave(reel.id);
    showToast(reel.isSaved ? 'Removed from saved reels' : '🔖 Reel saved to your collection!');
  };

  const handleRepostClick = (reel: Reel) => {
    onRepost(reel.id);
    showToast(reel.isReposted ? 'Repost undone' : '🔁 Reposted to your followers feed!');
  };

  const handleShareClick = () => {
    showToast('🔗 Link copied to clipboard!');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !commentDrawerReel) return;
    onAddComment(commentDrawerReel.id, newCommentText);
    setNewCommentText('');
  };

  const getPrivacyBadge = (privacy: PrivacySetting) => {
    switch (privacy) {
      case 'public':
        return <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-full text-[11px] text-slate-300 border border-slate-700"><Globe className="w-3 h-3 text-sky-400" /> Public</span>;
      case 'friends':
        return <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-full text-[11px] text-amber-300 border border-amber-500/40"><Users className="w-3 h-3 text-amber-400" /> Friends Only</span>;
      case 'private':
        return <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-full text-[11px] text-rose-300 border border-rose-500/40"><Lock className="w-3 h-3 text-rose-400" /> Private</span>;
      case 'close_friends':
        return <span className="flex items-center gap-1 bg-emerald-950/90 px-2 py-1 rounded-full text-[11px] text-emerald-300 border border-emerald-500/50"><Sparkles className="w-3 h-3 text-emerald-400" /> Close Friends</span>;
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[calc(100vh-130px)] overflow-y-scroll snap-y snap-mandatory bg-slate-950 rounded-xl shadow-2xl border border-slate-800 scrollbar-none">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 border border-rose-500/50 text-white px-4 py-2 rounded-full text-xs font-medium shadow-2xl backdrop-blur animate-bounce">
          {toastMessage}
        </div>
      )}

      {reels.map((reel, index) => (
        <div
          key={reel.id}
          className="relative w-full h-full snap-start snap-always flex flex-col justify-between bg-black overflow-hidden select-none group"
        >
          {/* Video / Visual Container */}
          <div 
            className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center bg-slate-900 overflow-hidden"
            onDoubleClick={() => handleDoubleTap(reel.id, reel.isLiked)}
          >
            <video
              src={reel.videoUrl}
              poster={reel.thumbnailUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Double Tap Heart Pop Animation */}
            {heartAnim && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <Heart className="w-32 h-32 text-rose-500 fill-rose-500 animate-ping drop-shadow-2xl" />
              </div>
            )}
          </div>

          {/* Top Gradient Overlay & Controls */}
          <div className="relative z-20 p-4 bg-gradient-to-b from-black/70 via-black/20 to-transparent flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-purple-400 text-sm">
                KAMASHUNO REELS
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {getPrivacyBadge(reel.privacy)}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur border border-white/10 transition"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Bottom Gradient Overlay (User info & actions) */}
          <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-between gap-4">
            {/* Left Column: Creator info & Caption */}
            <div className="flex-1 flex flex-col space-y-3 pb-2">
              {/* Creator Info */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={reel.userAvatar}
                    alt={reel.username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-rose-500 shadow-lg"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 text-black">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm leading-tight flex items-center gap-1.5 drop-shadow">
                    @{reel.username}
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-normal">Friend</span>
                  </span>
                  <span className="text-xs text-slate-300">{reel.timestamp}</span>
                </div>
              </div>

              {/* Caption */}
              <p className="text-white text-sm leading-relaxed line-clamp-3 drop-shadow">
                {reel.caption}
              </p>

              {/* Music Ticker */}
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full w-fit max-w-[220px] border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin flex-shrink-0" />
                <span className="text-xs text-slate-200 truncate font-medium">
                  {reel.musicTrack}
                </span>
              </div>
            </div>

            {/* Right Column: Interaction Action Buttons */}
            <div className="flex flex-col items-center space-y-4 pb-2">
              {/* Views Quantity Display */}
              <div className="flex flex-col items-center" title="Total reel views">
                <div className="p-2.5 rounded-full bg-slate-900/80 border border-emerald-500/40 text-emerald-400 backdrop-blur-md shadow-xl">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-extrabold text-emerald-300 mt-0.5 drop-shadow">
                  {reel.viewsCount > 999 ? (reel.viewsCount / 1000).toFixed(1) + 'k' : reel.viewsCount}
                </span>
              </div>

              {/* Like Button */}
              <button
                onClick={() => handleLikeClick(reel)}
                className="flex flex-col items-center group/btn"
              >
                <div className={`p-3 rounded-full backdrop-blur-md border transition duration-200 shadow-xl ${
                  reel.isLiked 
                    ? 'bg-rose-500/30 border-rose-500 text-rose-500 scale-110' 
                    : 'bg-slate-900/60 border-white/15 text-white group-hover/btn:scale-110'
                }`}>
                  <Heart className={`w-7 h-7 ${reel.isLiked ? 'fill-rose-500' : ''}`} />
                </div>
                <span className="text-xs font-bold text-white mt-1 drop-shadow">{reel.likes}</span>
              </button>

              {/* Comment Button */}
              <button
                onClick={() => setCommentDrawerReel(reel)}
                className="flex flex-col items-center group/btn"
              >
                <div className="p-3 rounded-full bg-slate-900/60 border border-white/15 text-white backdrop-blur-md group-hover/btn:scale-110 transition duration-200 shadow-xl">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-white mt-1 drop-shadow">{reel.comments.length}</span>
              </button>

              {/* Repost Button */}
              <button
                onClick={() => handleRepostClick(reel)}
                className="flex flex-col items-center group/btn"
              >
                <div className={`p-3 rounded-full backdrop-blur-md border transition duration-200 shadow-xl ${
                  reel.isReposted 
                    ? 'bg-emerald-500/30 border-emerald-500 text-emerald-400 scale-110' 
                    : 'bg-slate-900/60 border-white/15 text-white group-hover/btn:scale-110'
                }`}>
                  <Repeat2 className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-white mt-1 drop-shadow">{reel.repostsCount}</span>
              </button>

              {/* Save / Bookmark Button */}
              <button
                onClick={() => handleSaveClick(reel)}
                className="flex flex-col items-center group/btn"
              >
                <div className={`p-3 rounded-full backdrop-blur-md border transition duration-200 shadow-xl ${
                  reel.isSaved 
                    ? 'bg-amber-500/30 border-amber-500 text-amber-400 scale-110' 
                    : 'bg-slate-900/60 border-white/15 text-white group-hover/btn:scale-110'
                }`}>
                  <Bookmark className={`w-7 h-7 ${reel.isSaved ? 'fill-amber-400' : ''}`} />
                </div>
                <span className="text-xs font-bold text-white mt-1 drop-shadow">{reel.savesCount}</span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShareClick}
                className="flex flex-col items-center group/btn"
              >
                <div className="p-3 rounded-full bg-slate-900/60 border border-white/15 text-white backdrop-blur-md group-hover/btn:scale-110 transition duration-200 shadow-xl">
                  <Share2 className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Comments Drawer Modal */}
      {commentDrawerReel && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-end justify-center backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-700 rounded-t-3xl max-h-[70vh] flex flex-col shadow-2xl">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-white text-sm">
                  Comments ({commentDrawerReel.comments.length})
                </h3>
              </div>
              <button
                onClick={() => setCommentDrawerReel(null)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                ✕
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {commentDrawerReel.comments.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">
                  No comments yet. Be the first friend to comment! ✨
                </div>
              ) : (
                commentDrawerReel.comments.map(c => (
                  <div key={c.id} className="flex space-x-3 items-start">
                    <img src={c.userAvatar} alt={c.username} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                    <div className="flex-1 bg-slate-800/80 rounded-2xl px-3.5 py-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-rose-300">@{c.username}</span>
                        <span className="text-[10px] text-slate-500">{c.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200 mt-1">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleCommentSubmit} className="p-4 border-t border-slate-800 bg-slate-950 flex items-center space-x-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add a friendly comment..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-full py-2.5 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="p-2.5 bg-gradient-to-r from-rose-500 to-purple-600 disabled:opacity-50 text-white rounded-full transition hover:opacity-90 shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
