/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, User, Reel, Story, Chat, FriendRequest, PrivacySetting, NotificationItem } from './types';
import { 
  CURRENT_USER, INITIAL_USERS, INITIAL_REELS, 
  INITIAL_STORIES, INITIAL_CHATS, INITIAL_FRIEND_REQUESTS, INITIAL_NOTIFICATIONS 
} from './data';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { StoriesBar } from './components/StoriesBar';
import { ReelsFeed } from './components/ReelsFeed';
import { UploadModal } from './components/UploadModal';
import { MessagingView } from './components/MessagingView';
import { FriendsManager } from './components/FriendsManager';
import { ProfileView } from './components/ProfileView';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
  const [reels, setReels] = useState<Reel[]>(INITIAL_REELS);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [requests, setRequests] = useState<FriendRequest[]>(INITIAL_FRIEND_REQUESTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const [activeTab, setActiveTab] = useState<TabType>('reels');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadModalType, setUploadModalType] = useState<'reel' | 'story'>('reel');

  const friends = allUsers.filter(u => u.isFriend);
  const unreadMessagesCount = chats.reduce((acc, c) => acc + c.unread, 0);

  // NOTIFICATION ACTIONS
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    if (notif.type === 'request') {
      setActiveTab('friends');
    } else if (notif.type === 'like' || notif.type === 'comment' || notif.type === 'view') {
      setActiveTab('reels');
    }
  };

  // REEL ACTIONS
  const handleLike = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        const nextLiked = !r.isLiked;
        return { ...r, isLiked: nextLiked, likes: r.likes + (nextLiked ? 1 : -1) };
      }
      return r;
    }));
  };

  const handleSave = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        const nextSaved = !r.isSaved;
        return { ...r, isSaved: nextSaved, savesCount: r.savesCount + (nextSaved ? 1 : -1) };
      }
      return r;
    }));
  };

  const handleRepost = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        const nextReposted = !r.isReposted;
        return { ...r, isReposted: nextReposted, repostsCount: r.repostsCount + (nextReposted ? 1 : -1) };
      }
      return r;
    }));
  };

  const handleAddComment = (reelId: string, text: string) => {
    const newComment = {
      id: 'c_' + Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      text,
      timestamp: 'Just now',
      likes: 0
    };
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        return {
          ...r,
          commentsCount: r.commentsCount + 1,
          comments: [...r.comments, newComment]
        };
      }
      return r;
    }));
  };

  // UPLOAD ACTIONS
  const handleOpenUpload = (type: 'reel' | 'story' = 'reel') => {
    setUploadModalType(type);
    setIsUploadOpen(true);
  };

  const handleUploadReel = (data: { caption: string; privacy: PrivacySetting; videoUrl: string; musicTrack: string }) => {
    const newReel: Reel = {
      id: 'reel_' + Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      videoUrl: data.videoUrl,
      thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
      caption: data.caption,
      musicTrack: data.musicTrack,
      likes: 1,
      commentsCount: 0,
      repostsCount: 0,
      savesCount: 0,
      isLiked: true,
      isSaved: false,
      isReposted: false,
      privacy: data.privacy,
      timestamp: 'Just now',
      comments: []
    };
    setReels(prev => [newReel, ...prev]);
    setActiveTab('reels');
  };

  const handleUploadStory = (data: { mediaUrl: string; caption: string; isCloseFriendsOnly: boolean }) => {
    const newItem = {
      id: 'si_' + Date.now(),
      mediaUrl: data.mediaUrl,
      type: 'image' as const,
      caption: data.caption,
      timestamp: 'Just now'
    };

    setStories(prev => {
      const myStoryIndex = prev.findIndex(s => s.userId === currentUser.id);
      if (myStoryIndex !== -1) {
        const updated = [...prev];
        updated[myStoryIndex] = {
          ...updated[myStoryIndex],
          items: [...updated[myStoryIndex].items, newItem]
        };
        return updated;
      } else {
        return [{
          id: 's_me',
          userId: currentUser.id,
          username: 'Your Story',
          userAvatar: currentUser.avatar,
          hasUnseen: false,
          isCloseFriendsOnly: data.isCloseFriendsOnly,
          items: [newItem]
        }, ...prev];
      }
    });
  };

  const handleStoryViewed = (storyId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, hasUnseen: false } : s));
  };

  // MESSAGING ACTIONS (Strict Friend Enforcement)
  const handleSendMessage = (chatId: string, text: string) => {
    const newMsg = {
      id: 'msg_' + Date.now(),
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: text,
          lastTimestamp: 'Just now',
          unread: 0,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  // FRIEND NETWORK ACTIONS
  const handleAcceptRequest = (reqId: string, userId: string) => {
    // 1. Remove from requests
    setRequests(prev => prev.filter(r => r.id !== reqId));

    // 2. Mark user as friend
    const acceptedUser = allUsers.find(u => u.id === userId);
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isFriend: true } : u));

    // 3. Create new chat if not existing
    if (acceptedUser && !chats.some(c => c.friendId === userId)) {
      const newChat: Chat = {
        id: 'chat_' + Date.now(),
        friendId: acceptedUser.id,
        friendName: acceptedUser.displayName,
        friendUsername: acceptedUser.username,
        friendAvatar: acceptedUser.avatar,
        lastMessage: 'You are now connected friends! Send a wave 👋',
        lastTimestamp: 'Just now',
        unread: 1,
        messages: [
          {
            id: 'm_init',
            senderId: acceptedUser.id,
            text: `Hey Alex! Thanks for accepting my friend request on Kamashuno ✨`,
            timestamp: 'Just now'
          }
        ]
      };
      setChats(prev => [newChat, ...prev]);
    }
  };

  const handleDeclineRequest = (reqId: string) => {
    setRequests(prev => prev.filter(r => r.id !== reqId));
  };

  const handleToggleCloseFriend = (userId: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isCloseFriend: !u.isCloseFriend } : u));
  };

  const handleSendFriendRequest = (userId: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, hasPendingRequest: true } : u));
  };

  const handleTogglePrivateAccount = () => {
    setCurrentUser(prev => ({ ...prev, isPrivate: !prev.isPrivate }));
  };

  const savedReels = reels.filter(r => r.isSaved);
  const myReels = reels.filter(r => r.userId === currentUser.id);
  const repostedReels = reels.filter(r => r.isReposted);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-24 selection:bg-rose-500 selection:text-white">
      {/* Top App Header */}
      <Header
        currentUser={currentUser}
        onOpenUpload={() => handleOpenUpload('reel')}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unreadMessagesCount={unreadMessagesCount}
        pendingRequestsCount={requests.length}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onNotificationClick={handleNotificationClick}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-2 sm:p-4">
        {/* REELS FEED TAB */}
        {activeTab === 'reels' && (
          <div className="space-y-4">
            <StoriesBar
              stories={stories}
              onOpenUploadStory={() => handleOpenUpload('story')}
              onStoryViewed={handleStoryViewed}
            />
            <ReelsFeed
              reels={reels}
              onLike={handleLike}
              onSave={handleSave}
              onRepost={handleRepost}
              onAddComment={handleAddComment}
              currentUserId={currentUser.id}
            />
          </div>
        )}

        {/* STORIES TAB DIRECTORY */}
        {activeTab === 'stories' && (
          <div className="space-y-4 py-2">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Daily Stories Ring</h2>
                <p className="text-xs text-slate-400">Stories automatically disappear after 24 hours.</p>
              </div>
              <button
                onClick={() => handleOpenUpload('story')}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                + Add Story
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stories.map(story => (
                <div
                  key={story.id}
                  onClick={() => {
                    setActiveTab('reels');
                  }}
                  className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group border border-slate-800 shadow-xl"
                >
                  <img src={story.items[0]?.mediaUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-end">
                    <div className="flex items-center space-x-2">
                      <img src={story.userAvatar} alt="" className="w-8 h-8 rounded-full border-2 border-rose-500" />
                      <div className="truncate">
                        <div className="font-bold text-xs text-white truncate">{story.username}</div>
                        <div className="text-[10px] text-slate-300">{story.items.length} clips</div>
                      </div>
                    </div>
                  </div>
                  {story.isCloseFriendsOnly && (
                    <span className="absolute top-2 right-2 bg-emerald-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      ★ CLOSE
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FRIENDS MESSAGING TAB */}
        {activeTab === 'messages' && (
          <MessagingView
            chats={chats}
            allUsers={allUsers}
            onSendMessage={handleSendMessage}
            onSendFriendRequest={handleSendFriendRequest}
          />
        )}

        {/* FRIENDS NETWORK & PRIVACY TAB */}
        {activeTab === 'friends' && (
          <FriendsManager
            friends={friends}
            requests={requests}
            exploreUsers={allUsers.filter(u => u.id !== currentUser.id)}
            onAcceptRequest={handleAcceptRequest}
            onDeclineRequest={handleDeclineRequest}
            onToggleCloseFriend={handleToggleCloseFriend}
            onSendRequest={handleSendFriendRequest}
          />
        )}

        {/* PROFILE & SAVINGS TAB */}
        {activeTab === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            savedReels={savedReels}
            myReels={myReels}
            repostedReels={repostedReels}
            onTogglePrivateAccount={handleTogglePrivateAccount}
            onSelectReel={(reel) => {
              setActiveTab('reels');
            }}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenUpload={() => handleOpenUpload('reel')}
        unreadMessages={unreadMessagesCount}
        pendingRequests={requests.length}
        savedCount={savedReels.length}
      />

      {/* Upload Modal */}
      {isUploadOpen && (
        <UploadModal
          onClose={() => setIsUploadOpen(false)}
          onUploadReel={handleUploadReel}
          onUploadStory={handleUploadStory}
          initialType={uploadModalType}
        />
      )}
    </div>
  );
}

