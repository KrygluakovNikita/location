export interface IPost {
  postId?: string;
  userId: string;
  title: string;
  description: string;
  gameDate: Date;
  postDate?: Date;
  photo?: string;
  location?: string;
  comments?: string;
  likes?: string;
}

export interface IPostUpdate {
  postId: string;
  title?: string | null;
  description?: string | null;
  gameDate?: Date | null;
  location?: string | null;
}
