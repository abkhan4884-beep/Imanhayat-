import React from 'react';
import { TabType } from '../types';
import { Film, Sparkles, MessageCircle, Users, Bookmark, PlusSquare } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenUpload: () => void;
  unreadMessages: number;
  pendingRequests: number;
  savedCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  onOpenUpload,
  unreadMessages,
  pendingRequests,
  savedCount
}) => {
  const navItems = [
    { id: 'reels', label: 'Reels', icon: Film },
    { id: 'stories', label: 'Stories', icon: Sparkles },
    { id: 'upload_btn', label: 'Create', icon: PlusSquare, isUpload: true },
    { id: 'messages', label: 'Friends Chat', icon: MessageCircle, badge: unreadMessages },
    { id: 'friends', label: 'Network', icon: Users, badge: pendingRequests },
    { id: 'profile', label: 'Saved & Me', icon: Bookmark, badge: 0 }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-2 sm:py-3 select-none">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          if (item.isUpload) {
            return (
              <button
                key={item.id}
                onClick={onOpenUpload}
                className="flex flex-col items-center justify-center p-1 group scale-105"
              >
                <div className="w-11 h-9 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg group-hover:opacity-90 transition duration-200">
                  <PlusSquare className="w-5 h-5 text-white" />
                </div>
              </button>
            );
          }

          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id as TabType)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition duration-200 relative ${
                isActive ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 transition duration-200 ${isActive ? 'scale-110 text-rose-500' : ''}`} />
                {item.badge ? item.badge > 0 : false ? (
                  <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
