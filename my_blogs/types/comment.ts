export interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  blogTitle: string;
  blogSlug: string;
}

export interface CommentResponse {
  message: string;
  data: Comment | Comment[] | null;
}
