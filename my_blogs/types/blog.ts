export interface BlogComment {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  createdAt: string;
  comments: BlogComment[];
  featured: boolean;
  views: number;
}

export interface BlogResponse {
  message: string;
  data: Blog | Blog[] | null;
}
