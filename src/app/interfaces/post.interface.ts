export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  fav: boolean;
}

export type PostDTO = Omit<Post, 'fav'>;

export type NewPost = Omit<Post, 'fav' | 'id'>;
