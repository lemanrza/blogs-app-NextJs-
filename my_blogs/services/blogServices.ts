import { blogs } from "@/data/blogs";
import type { Blog, BlogResponse } from "@/types/blog";

export async function getBlogs(name: string | null): Promise<Blog[]> {
  if (name) {
    return blogs.filter((b) =>
      b.title.toLowerCase().trim().includes(name.toLowerCase().trim())
    );
  }
  return blogs;
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  return blogs.find((b) => b.slug === slug);
}

export async function postBlog(blog: Blog): Promise<BlogResponse> {
  blogs.push(blog);
  return {
    message: "Blog created successfully",
    data: blog,
  };
}

export async function deleteBlogBySlug(id: string): Promise<BlogResponse> {
  const idx = blogs.findIndex((b) => b.id === id);
  if (idx === -1) {
    return {
      message: "Blog not found",
      data: null,
    };
  }

  blogs.splice(idx, 1);
  return {
    message: "Blog deleted successfully",
    data: blogs,
  };
}

export async function updateBlogBySlug(
  id: string,
  updatedBlog: Partial<Blog>
): Promise<BlogResponse> {
  const idx = blogs.findIndex((b) => b.id === id);
  if (idx === -1) {
    return {
      message: "Blog not found",
      data: null,
    };
  }

  blogs[idx] = { ...blogs[idx], ...updatedBlog };
  return {
    message: "Blog updated successfully",
    data: blogs[idx],
  };
}

