
export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  isFollowing?: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  hasLiked: boolean;
  comments: Comment[];
  timestamp: string;
}

// Mock Users
export const users: User[] = [
  {
    id: "1",
    username: "johndoe",
    fullName: "John Doe",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Travel enthusiast | Food lover | Photographer",
    followersCount: 1234,
    followingCount: 567,
    postsCount: 42,
    isFollowing: true,
  },
  {
    id: "2",
    username: "janedoe",
    fullName: "Jane Doe",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Artist | Designer | Coffee addict",
    followersCount: 2345,
    followingCount: 432,
    postsCount: 35,
    isFollowing: false,
  },
  {
    id: "3",
    username: "mikesmith",
    fullName: "Mike Smith",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Tech enthusiast | Gamer | Dog lover",
    followersCount: 987,
    followingCount: 345,
    postsCount: 21,
    isFollowing: true,
  }
];

// Mock Posts
export const posts: Post[] = [
  {
    id: "1",
    userId: "1",
    username: "johndoe",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    caption: "Beautiful sunset at the beach today! #sunset #beach #vacation",
    likes: 123,
    hasLiked: false,
    comments: [
      {
        id: "c1",
        userId: "2",
        username: "janedoe",
        text: "Amazing view! 😍",
        timestamp: "2023-04-26T14:30:00Z",
      },
      {
        id: "c2",
        userId: "3",
        username: "mikesmith",
        text: "Where is this?",
        timestamp: "2023-04-26T15:45:00Z",
      }
    ],
    timestamp: "2023-04-26T12:00:00Z",
  },
  {
    id: "2",
    userId: "2",
    username: "janedoe",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    caption: "My latest art project! #art #design #creative",
    likes: 456,
    hasLiked: true,
    comments: [
      {
        id: "c3",
        userId: "1",
        username: "johndoe",
        text: "This is incredible!",
        timestamp: "2023-04-25T17:20:00Z",
      }
    ],
    timestamp: "2023-04-25T16:30:00Z",
  },
  {
    id: "3",
    userId: "3",
    username: "mikesmith",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    caption: "Meet my new puppy! #dog #puppy #cute",
    likes: 789,
    hasLiked: false,
    comments: [
      {
        id: "c4",
        userId: "2",
        username: "janedoe",
        text: "So adorable! What breed is it?",
        timestamp: "2023-04-24T13:15:00Z",
      },
      {
        id: "c5",
        userId: "1",
        username: "johndoe",
        text: "Cuteness overload!",
        timestamp: "2023-04-24T14:10:00Z",
      }
    ],
    timestamp: "2023-04-24T12:45:00Z",
  }
];

// Mock Stories
export const stories = users.map(user => ({
  id: user.id,
  username: user.username,
  avatar: user.avatar,
  hasUnseenStories: Math.random() > 0.5,
}));
