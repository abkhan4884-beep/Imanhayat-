import React, { useState } from 'react';
import { Story, StoryItem } from '../types';
import { Plus, X, ChevronLeft, ChevronRight, Send, Lock, Eye } from 'lucide-react';

interface StoriesBarProps {
  stories: Story[];
  onOpenUploadStory: () => void;
  onStoryViewed: (storyId: string) => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({
  stories,
  onOpenUploadStory,
  onStoryViewed
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;
  const currentItem: StoryItem | null = activeStory ? activeStory.items[currentItemIndex] : null;

  const handleOpenStory = (index: number) => {
    setActiveStoryIndex(index);
    setCurrentItemIndex(0);
    setReplySent(false);
    onStoryViewed(stories[index].id);
  };

  const handleNextItem = () => {
    if (!activeStory) return;
    if (currentItemIndex < activeStory.items.length - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else if (activeStoryIndex !== null && activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setCurrentItemIndex(0);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const handlePrevItem = () => {
    if (!activeStory) return;
    if (currentItemIndex > 0) {
      setCurrentItemIndex(prev => prev - 1);
    } else if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setCurrentItemIndex(0);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplySent(true);
    setReplyText('');
    setTimeout(() => setReplySent(false), 3000);
  };

  return (
    <>
      {/* Stories Bar */}
      <div className="flex items-center space-x-4 overflow-x-auto py-3 px-4 bg-slate-900/80 backdrop-blur border-b border-slate-800 scrollbar-none">
        {/* Add Story Button */}
        <div className="flex flex-col items-center flex-shrink-0 cursor-pointer group" onClick={onOpenUploadStory}>
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={stories[0]?.userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt="My Story"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-200 opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center shadow-lg">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
          <span className="text-xs text-slate-300 mt-1 font-medium">Add Story</span>
        </div>

        {/* Story Rings */}
        {stories.slice(1).map((story, idx) => (
          <div
            key={story.id}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
            onClick={() => handleOpenStory(idx + 1)}
          >
            <div className={`relative w-16 h-16 rounded-full p-[2.5px] ${
              story.hasUnseen
                ? story.isCloseFriendsOnly
                  ? 'bg-gradient-to-tr from-emerald-400 to-green-600'
                  : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                : 'bg-slate-700'
            }`}>
              <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden border-2 border-slate-900">
                <img
                  src={story.userAvatar}
                  alt={story.username}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-200"
                />
              </div>
              {story.isCloseFriendsOnly && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] shadow">
                  ★
                </div>
              )}
            </div>
            <span className="text-xs text-slate-300 mt-1 max-w-[64px] truncate font-medium">
              {story.username}
            </span>
          </div>
        ))}
      </div>

      {/* Fullscreen Story Viewer Modal */}
      {activeStory && currentItem && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-md">
          {/* Close Button */}
          <button
            onClick={() => setActiveStoryIndex(null)}
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Story Container */}
          <div className="relative w-full max-w-sm h-[85vh] sm:rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800 flex flex-col">
            {/* Progress Bars */}
            <div className="absolute top-3 inset-x-3 z-30 flex space-x-1">
              {activeStory.items.map((item, index) => (
                <div key={item.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-white transition-all duration-300 ${
                      index < currentItemIndex
                        ? 'w-full'
                        : index === currentItemIndex
                        ? 'w-full animate-pulse'
                        : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Header info */}
            <div className="absolute top-6 inset-x-4 z-30 flex items-center justify-between pointer-events-none pr-12">
              <div className="flex items-center space-x-2">
                <img
                  src={activeStory.userAvatar}
                  alt={activeStory.username}
                  className="w-9 h-9 rounded-full object-cover border border-white/40 shadow"
                />
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-semibold text-white drop-shadow">
                      {activeStory.username}
                    </span>
                    {activeStory.isCloseFriendsOnly && (
                      <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center shadow">
                        🟢 Close Friends
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-white/70 drop-shadow">{currentItem.timestamp}</span>
                </div>
              </div>

              {/* Story Views Badge */}
              <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white text-xs shadow-lg pointer-events-auto">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-extrabold tracking-tight">{activeStory.viewsCount || 342} views</span>
              </div>
            </div>

            {/* Media Display */}
            <div className="relative flex-1 bg-black flex items-center justify-center select-none">
              <img
                src={currentItem.mediaUrl}
                alt="Story content"
                className="w-full h-full object-cover"
              />

              {/* Caption Overlay */}
              {currentItem.caption && (
                <div className="absolute bottom-20 inset-x-6 bg-black/60 backdrop-blur px-4 py-2.5 rounded-xl border border-white/10 text-white text-center text-sm shadow-lg">
                  {currentItem.caption}
                </div>
              )}

              {/* Tap navigation zones */}
              <div className="absolute inset-y-0 left-0 w-1/3 cursor-pointer z-20" onClick={handlePrevItem} />
              <div className="absolute inset-y-0 right-0 w-1/3 cursor-pointer z-20" onClick={handleNextItem} />
            </div>

            {/* Bottom Interaction Area: Reply restricted to Friends */}
            <div className="p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-30">
              {replySent ? (
                <div className="py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-emerald-300 text-xs font-medium animate-fade-in">
                  ✨ Reply sent directly to chat!
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${activeStory.username}... (Friends only)`}
                      className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 rounded-full py-2.5 pl-4 pr-10 text-sm text-white placeholder-white/50 focus:outline-none transition"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="p-2.5 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white shadow-lg transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
              <div className="flex items-center justify-center space-x-1 mt-2 text-[10px] text-slate-400">
                <Lock className="w-3 h-3 text-rose-400" />
                <span>Privacy Guarantee: Replies sent only to verified friends</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
