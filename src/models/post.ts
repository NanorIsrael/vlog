export interface PostType {
  id: number;
  author: {
    username: string;
    avatar_url: string;
  };
  timestamp: string;
  text: string;
}

export type ErrorType = {
  [key: string]: string;
};

export interface AuthFormType {
  username: string;
  email?: string;
  password: string;
  confirm_pass?: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface MeType {
  about_me: string | null
  avatar_url: string
  username: string
}

export interface PostResult {
  data: PostType[] | null | undefined
}