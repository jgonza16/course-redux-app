export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  fav: boolean;
}

export interface PostDTO extends Omit<Post, 'fav'> {}

export interface NewPost extends Omit<Post, 'fav' | 'id'> {}
