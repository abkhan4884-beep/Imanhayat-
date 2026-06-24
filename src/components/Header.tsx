import React, { useState } from 'react';
import { TabType, User, NotificationItem } from '../types';
import { Film, Bell, Shield, PlusCircle, Heart, MessageCircle, UserPlus, Eye, CheckCheck } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onOpenUpload: () => void;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadMessagesCount: number;
  pendingRequestsCount: number;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenUpload,
  activeTab,
  onSelectTab,
  unreadMessagesCount,
  pendingRequestsCount,
  notifications,
  onMarkAllRead,
  onNotificationClick
}) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'like': return <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />;
      case 'comment': return <MessageCircle className="w-3.5 h-3.5 text-sky-400" />;
      case 'request': return <UserPlus className="w-3.5 h-3.5 text-amber-400" />;
      case 'view': return <Eye className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <div 
          onClick={() => onSelectTab('reels')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-amber-400 p-[2px] shadow-lg group-hover:scale-105 transition duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Film className="w-5 h-5 text-rose-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-rose-400">
              Kamashuno
            </span>
            <span className="text-[9px] font-semibold text-rose-400 tracking-widest uppercase -mt-1">
              Social • Reels
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Quick Upload CTA */}
          <button
            onClick={onOpenUpload}
            className="hidden sm:flex items-center space-x-1.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg transition duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create</span>
          </button>

          {/* Privacy Badge */}
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-[11px] text-slate-300">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline font-medium">Friend-Protected DMs</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className={`p-2 rounded-full border transition relative ${
                showNotifs 
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-lg animate-pulse border border-slate-950">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover Dropdown */}
            {showNotifs && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in flex flex-col max-h-[75vh]">
                  {/* Dropdown Header */}
                  <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-rose-500" />
                      <span className="font-bold text-white text-xs">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="bg-rose-500/20 text-rose-400 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => {
                          onMarkAllRead();
                        }}
                        className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition"
                      >
                        <CheckCheck className="w-3 h-3" /> Mark all read
                      </button>
                    )}
                  </div>

                  {/* Notification Items */}
                  <div className="overflow-y-auto divide-y divide-slate-800/60 p-1">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-500">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            onNotificationClick(notif);
                            setShowNotifs(false);
                          }}
                          className={`p-3 rounded-xl cursor-pointer flex items-start space-x-3 transition ${
                            !notif.read ? 'bg-rose-500/10 hover:bg-rose-500/15' : 'hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="relative flex-shrink-0">
                            <img src={notif.userAvatar} alt={notif.username} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-950 border border-slate-800 shadow">
                              {getNotifIcon(notif.type)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-slate-200 leading-snug">
                              <span className="font-bold text-white">@{notif.username}</span> {notif.text}
                            </p>
                            <span className="text-[10px] text-slate-500 mt-1 block">{notif.timestamp}</span>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-rose-500 self-center flex-shrink-0 animate-ping" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Mini Switcher / Avatar */}
          <div 
            onClick={() => onSelectTab('profile')}
            className={`relative cursor-pointer rounded-full p-[2px] transition ${
              activeTab === 'profile' ? 'bg-gradient-to-r from-rose-500 to-amber-400 ring-2 ring-rose-500/50' : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

