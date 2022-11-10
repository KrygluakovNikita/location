export interface IPost {
  postId?: string;
  userId: string;
  title: string;
  description: string;
  postDate?: Date;
  gameDate: Date;
  photo?: string;
  location?: string;
  comments?: string;
  likes?: string;
}
