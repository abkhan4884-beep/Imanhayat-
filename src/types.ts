export type PrivacySetting = 'public' | 'friends' | 'private' | 'close_friends';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  isPrivate: boolean;
  isFriend: boolean;
  isCloseFriend?: boolean;
  hasPendingRequest?: boolean;
  followersCount: number;
  followingCount: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Reel {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  videoUrl: string; // can be video or animated poster
  thumbnailUrl: string;
  caption: string;
  musicTrack: string;
  likes: number;
  commentsCount: number;
  repostsCount: number;
  savesCount: number;
  viewsCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isReposted: boolean;
  privacy: PrivacySetting;
  timestamp: string;
  comments: Comment[];
}

export interface StoryItem {
  id: string;
  mediaUrl: string;
  type: 'image' | 'video';
  caption?: string;
  timestamp: string;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  hasUnseen: boolean;
  isCloseFriendsOnly?: boolean;
  viewsCount: number;
  items: StoryItem[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  friendId: string;
  friendName: string;
  friendUsername: string;
  friendAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
  messages: Message[];
}

export interface FriendRequest {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'request' | 'view';
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export type TabType = 'reels' | 'stories' | 'messages' | 'friends' | 'profile';
