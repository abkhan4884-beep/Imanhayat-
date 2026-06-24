import { User, Reel, Story, Chat, FriendRequest, NotificationItem } from './types';

export const CURRENT_USER: User = {
  id: 'user_me',
  username: 'kamashuno_creator',
  displayName: 'Alex Kamashuno ⚡️',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Living life in vertical 1080p 🎬 | Daily reels & stories | Only accepting friend requests from cool creators ✨',
  isPrivate: false,
  isFriend: true,
  followersCount: 1420,
  followingCount: 284,
};

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    username: 'elena_vibes',
    displayName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bio: 'Digital nomad & coffee addict ☕️ Sunset lover 🌅',
    isPrivate: false,
    isFriend: true,
    isCloseFriend: true,
    followersCount: 8930,
    followingCount: 412,
  },
  {
    id: 'u2',
    username: 'kenji_beats',
    displayName: 'Kenji Sato 🎧',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Lo-fi producer from Tokyo. Beats available on all platforms.',
    isPrivate: false,
    isFriend: true,
    isCloseFriend: false,
    followersCount: 45200,
    followingCount: 120,
  },
  {
    id: 'u3',
    username: 'sofia_dance',
    displayName: 'Sofia Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Choreography & street dance 🔥 NYC based',
    isPrivate: true,
    isFriend: false,
    hasPendingRequest: false,
    followersCount: 1240,
    followingCount: 800,
  },
  {
    id: 'u4',
    username: 'marco_cooks',
    displayName: 'Chef Marco 🍝',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: '60-second Italian recipes. Private account for foodies only!',
    isPrivate: true,
    isFriend: false,
    hasPendingRequest: true,
    followersCount: 3410,
    followingCount: 190,
  },
  {
    id: 'u5',
    username: 'maya_skate',
    displayName: 'Maya Lin 🛹',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    bio: 'Skateboarding & urban exploration 🏙️',
    isPrivate: false,
    isFriend: true,
    isCloseFriend: true,
    followersCount: 6120,
    followingCount: 530,
  }
];

export const INITIAL_REELS: Reel[] = [
  {
    id: 'reel_1',
    userId: 'u1',
    username: 'elena_vibes',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
    caption: 'Lost in the neon lights of downtown Tokyo ✨ Cyberpunk aesthetics hitting different tonight! #tokyo #nightlife #vibes',
    musicTrack: 'Kenji Sato - Midnight Cyber Lo-Fi 🎵',
    likes: 1243,
    commentsCount: 48,
    repostsCount: 15,
    savesCount: 312,
    viewsCount: 14200,
    isLiked: false,
    isSaved: true,
    isReposted: false,
    privacy: 'public',
    timestamp: '2 hours ago',
    comments: [
      {
        id: 'c1',
        userId: 'u2',
        username: 'kenji_beats',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Glad you used my track for this! Fits the visual 100% 🔥',
        timestamp: '1h ago',
        likes: 14
      },
      {
        id: 'c2',
        userId: 'user_me',
        username: 'kamashuno_creator',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Insane color grading Elena!! What camera did you shoot this on?',
        timestamp: '45m ago',
        likes: 5
      }
    ]
  },
  {
    id: 'reel_2',
    userId: 'u5',
    username: 'maya_skate',
    userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-skater-skating-on-the-street-43015-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop&q=80',
    caption: 'Finally landed that clean kickflip down the 4-stair! 🛹🔥 Practiced for 3 days straight. #skate #thrash #street',
    musicTrack: 'Punk Rockers - Ollie Drop (Remix)',
    likes: 3890,
    commentsCount: 122,
    repostsCount: 84,
    savesCount: 540,
    viewsCount: 28400,
    isLiked: true,
    isSaved: false,
    isReposted: true,
    privacy: 'friends',
    timestamp: '5 hours ago',
    comments: [
      {
        id: 'c3',
        userId: 'u1',
        username: 'elena_vibes',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        text: 'SO STOKED FOR YOU MAYA!! Let’s skate tomorrow!',
        timestamp: '4h ago',
        likes: 22
      }
    ]
  },
  {
    id: 'reel_3',
    userId: 'u2',
    username: 'kenji_beats',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-vertical-green-screen-43527-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
    caption: 'Secret preview of my upcoming synthwave album 🎹 Close friends exclusive drop! Drop a comment if you want the WAV file.',
    musicTrack: 'Kenji Sato - Unreleased Demo #4',
    likes: 842,
    commentsCount: 95,
    repostsCount: 12,
    savesCount: 189,
    viewsCount: 8930,
    isLiked: true,
    isSaved: true,
    isReposted: false,
    privacy: 'close_friends',
    timestamp: '1 day ago',
    comments: []
  }
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 's_me',
    userId: 'user_me',
    username: 'Your Story',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    hasUnseen: false,
    viewsCount: 342,
    items: [
      {
        id: 'si_0',
        mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        type: 'image',
        caption: 'Working on new Kamashuno features today ⚡️',
        timestamp: '3h ago'
      }
    ]
  },
  {
    id: 's1',
    userId: 'u1',
    username: 'elena_vibes',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    hasUnseen: true,
    viewsCount: 1240,
    items: [
      {
        id: 'si_1',
        mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80',
        type: 'image',
        caption: 'Morning latte art practice ☕️🤍',
        timestamp: '10m ago'
      },
      {
        id: 'si_2',
        mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
        type: 'image',
        caption: 'View from the workspace today is 10/10 🏔️',
        timestamp: '5m ago'
      }
    ]
  },
  {
    id: 's2',
    userId: 'u5',
    username: 'maya_skate',
    userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    hasUnseen: true,
    isCloseFriendsOnly: true,
    viewsCount: 520,
    items: [
      {
        id: 'si_3',
        mediaUrl: 'https://images.unsplash.com/photo-1564767609342-620cb19b2357?w=600&auto=format&fit=crop&q=80',
        type: 'image',
        caption: '🟢 Close Friends: New deck arrived! Setting it up tonight 🛹',
        timestamp: '1h ago'
      }
    ]
  },
  {
    id: 's3',
    userId: 'u2',
    username: 'kenji_beats',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    hasUnseen: true,
    viewsCount: 4320,
    items: [
      {
        id: 'si_4',
        mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
        type: 'image',
        caption: 'Studio session deep in the analog gear 🎛️',
        timestamp: '6h ago'
      }
    ]
  }
];

export const INITIAL_CHATS: Chat[] = [
  {
    id: 'chat_1',
    friendId: 'u1',
    friendName: 'Elena Rostova',
    friendUsername: 'elena_vibes',
    friendAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Hey! Are you going to repost that reel we filmed?',
    lastTimestamp: '12m ago',
    unread: 1,
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Hey Alex!! Loved your latest story.', timestamp: '2h ago' },
      { id: 'm2', senderId: 'user_me', text: 'Thanks Elena! Working on editing the Tokyo clips now.', timestamp: '1h ago' },
      { id: 'm3', senderId: 'u1', text: 'Hey! Are you going to repost that reel we filmed?', timestamp: '12m ago' }
    ]
  },
  {
    id: 'chat_2',
    friendId: 'u5',
    friendName: 'Maya Lin 🛹',
    friendUsername: 'maya_skate',
    friendAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Yo let me know when you drop the new video!',
    lastTimestamp: '3h ago',
    unread: 0,
    messages: [
      { id: 'm4', senderId: 'u5', text: 'Yo let me know when you drop the new video!', timestamp: '3h ago' }
    ]
  },
  {
    id: 'chat_3',
    friendId: 'u2',
    friendName: 'Kenji Sato 🎧',
    friendUsername: 'kenji_beats',
    friendAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Sent over the beat stem files!',
    lastTimestamp: '1d ago',
    unread: 0,
    messages: [
      { id: 'm5', senderId: 'u2', text: 'Sent over the beat stem files!', timestamp: '1d ago' },
      { id: 'm6', senderId: 'user_me', text: 'Got them! Sounding crisp.', timestamp: '1d ago' }
    ]
  }
];

export const INITIAL_FRIEND_REQUESTS: FriendRequest[] = [
  {
    id: 'req_1',
    userId: 'u3',
    username: 'sofia_dance',
    displayName: 'Sofia Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    timestamp: '2h ago'
  },
  {
    id: 'req_2',
    userId: 'u4',
    username: 'marco_cooks',
    displayName: 'Chef Marco 🍝',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    timestamp: '1d ago'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'like',
    username: 'elena_vibes',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    text: 'liked your Tokyo reel ✨',
    timestamp: '10m ago',
    read: false
  },
  {
    id: 'notif_2',
    type: 'comment',
    username: 'kenji_beats',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    text: 'commented: "Glad you used my track!" 🔥',
    timestamp: '1h ago',
    read: false
  },
  {
    id: 'notif_3',
    type: 'request',
    username: 'sofia_dance',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    text: 'sent you a friend request 👋',
    timestamp: '2h ago',
    read: false
  },
  {
    id: 'notif_4',
    type: 'view',
    username: 'maya_skate',
    userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    text: 'and 341 others viewed your daily story 👀',
    timestamp: '3h ago',
    read: true
  }
];

