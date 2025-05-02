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


// import type { Blog, BlogResponse } from "@/types/blog";
// import { prisma } from "@/lib/prisma";
// import { Prisma } from "@prisma/client";

// // GET: all blogs or filtered by title
// export async function getBlogs(title?: string | null): Promise<Blog[]> {
//   if (title) {
//     return prisma.blog.findMany({
//       where: {
//         title: {
//           contains: title,
//           mode: "insensitive",
//         },
//       },
//       include: {
//         comments: true,
//       },
//     });
//   }
//   return prisma.blog.findMany({
//     include: {
//       comments: true,
//     },
//   });
// }

// // GET: blog by ID
// export async function getBlogById(id: number): Promise<Blog | null> {
//   return prisma.blog.findUnique({
//     where: { id },
//     include: {
//       comments: true,
//     },
//   });
// }

// // POST: create blog
// export async function postBlog(
//   blog: Prisma.XOR<Prisma.BlogCreateInput, Prisma.BlogUncheckedCreateInput>
// ): Promise<BlogResponse> {
//   const res = await prisma.blog.create({ data: blog });
//   return {
//     message: "Blog created successfully",
//     data: res,
//   };
// }

// // DELETE: blog by ID
// export async function deleteBlogById(id: number): Promise<BlogResponse> {
//   const res = await prisma.blog.delete({
//     where: { id },
//   });
//   return {
//     message: "Blog deleted successfully",
//     data: res,
//   };
// }

// // PUT: update blog
// export async function updateBlogById(
//   id: number,
//   updatedBlog: Prisma.BlogUpdateInput
// ): Promise<BlogResponse> {
//   const res = await prisma.blog.update({
//     where: { id },
//     data: updatedBlog,
//   });
//   return {
//     message: "Blog updated successfully",
//     data: res,
//   };
// }
