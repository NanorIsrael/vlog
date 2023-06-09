export interface PostType {
  id: number;
  author: {
    username: string;
    avatar_url: string;
  };
  timestamp: string;
  text: string;
}

export interface ErrorType {
  username?: string;
  password?: string;
  email?: string;
  conPassword?: string;
}
