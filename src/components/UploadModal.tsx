import React, { useState } from 'react';
import { PrivacySetting } from '../types';
import { Video, Image, Globe, Users, Lock, Sparkles, X, Upload, CheckCircle2, Film } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onUploadReel: (reel: { caption: string; privacy: PrivacySetting; videoUrl: string; musicTrack: string }) => void;
  onUploadStory: (story: { mediaUrl: string; caption: string; isCloseFriendsOnly: boolean }) => void;
  initialType?: 'reel' | 'story';
}

const SAMPLE_CLIPS = [
  {
    name: 'Neon Cyber City 🌃',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
    thumb: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&auto=format&fit=crop&q=80',
    track: 'Cyberwave Beats - Midnight Tokyo'
  },
  {
    name: 'Skate Thrash 🛹',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-skater-skating-on-the-street-43015-large.mp4',
    thumb: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=300&auto=format&fit=crop&q=80',
    track: 'Thrash Kings - Skate Street Anthem'
  },
  {
    name: 'Aesthetic Coffee ☕️',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-vertical-green-screen-43527-large.mp4',
    thumb: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format&fit=crop&q=80',
    track: 'Lo-Fi Chill - Morning Sunrise'
  }
];

export const UploadModal: React.FC<UploadModalProps> = ({
  onClose,
  onUploadReel,
  onUploadStory,
  initialType = 'reel'
}) => {
  const [tab, setTab] = useState<'reel' | 'story'>(initialType);
  const [selectedClipIndex, setSelectedClipIndex] = useState(0);
  const [caption, setCaption] = useState('');
  const [musicTrack, setMusicTrack] = useState('Kamashuno Original Sound 🎵');
  const [privacy, setPrivacy] = useState<PrivacySetting>('friends');
  const [isCloseFriendsStory, setIsCloseFriendsStory] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      if (tab === 'reel') {
        onUploadReel({
          caption: caption || 'Check out my new Kamashuno Reel! 🎬⚡️',
          privacy,
          videoUrl: SAMPLE_CLIPS[selectedClipIndex].url,
          musicTrack: SAMPLE_CLIPS[selectedClipIndex].track
        });
      } else {
        onUploadStory({
          mediaUrl: SAMPLE_CLIPS[selectedClipIndex].thumb,
          caption: caption || 'Daily Story update ✨',
          isCloseFriendsOnly: isCloseFriendsStory
        });
      }
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="w-5 h-5 text-rose-500" />
            <h2 className="font-bold text-white text-base">Create & Share</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-2 bg-slate-950 border-b border-slate-800 gap-2">
          <button
            onClick={() => setTab('reel')}
            className={`py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition ${
              tab === 'reel'
                ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" /> Upload Reel
          </button>
          <button
            onClick={() => setTab('story')}
            className={`py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition ${
              tab === 'story'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Image className="w-4 h-4" /> Daily Story (24h)
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
            <h3 className="text-xl font-bold text-white">
              {tab === 'reel' ? 'Reel Uploaded!' : 'Story Published!'}
            </h3>
            <p className="text-xs text-slate-400">Broadcasting to your privacy-safe audience...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-5 overflow-y-auto max-h-[75vh]">
            {/* Sample Video / Media Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Select Media Clip
              </label>
              <div className="grid grid-cols-3 gap-3">
                {SAMPLE_CLIPS.map((clip, idx) => (
                  <div
                    key={clip.name}
                    onClick={() => {
                      setSelectedClipIndex(idx);
                      setMusicTrack(clip.track);
                    }}
                    className={`relative rounded-xl overflow-hidden cursor-pointer aspect-[9/16] border-2 transition ${
                      selectedClipIndex === idx ? 'border-rose-500 ring-4 ring-rose-500/20 scale-105 shadow-xl' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={clip.thumb} alt={clip.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 p-1.5 text-[10px] text-white text-center font-medium truncate">
                      {clip.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. Caption & Hashtags
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
                placeholder="Write an engaging caption... #kamashuno #reels #daily"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition resize-none"
              />
            </div>

            {/* Privacy Controls */}
            {tab === 'reel' ? (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  3. Reel Privacy Settings
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'public', label: 'Public', icon: Globe, desc: 'Anyone on Kamashuno' },
                    { id: 'friends', label: 'Friends Only', icon: Users, desc: 'Mutual friends only' },
                    { id: 'close_friends', label: 'Close Friends', icon: Sparkles, desc: 'Your ★ inner circle' },
                    { id: 'private', label: 'Private (Only Me)', icon: Lock, desc: 'Archived / Draft' }
                  ].map(p => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPrivacy(p.id as PrivacySetting)}
                        className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-center transition ${
                          privacy === p.id 
                            ? 'bg-rose-500/10 border-rose-500 ring-1 ring-rose-500' 
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 ${privacy === p.id ? 'text-rose-400' : 'text-slate-400'}`} />
                          <span className="font-bold text-xs text-white">{p.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1">{p.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  3. Story Audience
                </label>
                <div 
                  onClick={() => setIsCloseFriendsStory(!isCloseFriendsStory)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                    isCloseFriendsStory 
                      ? 'bg-emerald-500/10 border-emerald-500' 
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Sparkles className={`w-5 h-5 ${isCloseFriendsStory ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-white">Close Friends Only</span>
                      <span className="text-[10px] text-slate-400">Share exclusively with friends marked with ★</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isCloseFriendsStory ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-700'
                  }`}>
                    {isCloseFriendsStory && '✓'}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" /> {tab === 'reel' ? 'Publish Reel' : 'Share Story'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
