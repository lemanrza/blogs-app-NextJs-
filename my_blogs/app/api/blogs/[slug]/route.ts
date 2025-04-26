import { getBlogBySlug, updateBlogBySlug, deleteBlogBySlug } from "@/services/blogServices";
import { handleError } from "@/lib/error-handler";
import { type NextRequest, NextResponse } from "next/server";
import { Blog } from "@/types/blog";

// GET - Retrieve a blog by slug
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog retrieved successfully", data: blog },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

// DELETE - Remove a blog by slug
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await deleteBlogBySlug(slug);

    if (!result.data) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// PATCH - Partially update a blog by slug
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const body = await request.json();

    const updateData: Partial<Blog> = {};

    // Validate title
    if ("title" in body) {
      if (typeof body.title !== "string" || body.title.trim() === "") {
        return NextResponse.json(
          { message: "Title cannot be empty" },
          { status: 400 }
        );
      }
      updateData.title = body.title.trim();
    }

    // Validate content
    if ("content" in body) {
      if (typeof body.content !== "string" || body.content.trim() === "") {
        return NextResponse.json(
          { message: "Content cannot be empty" },
          { status: 400 }
        );
      }
      updateData.content = body.content.trim();
    }

    // Validate description
    if ("description" in body) {
      if (typeof body.description !== "string") {
        return NextResponse.json(
          { message: "Description must be a string" },
          { status: 400 }
        );
      }
      updateData.description = body.description.trim();
    }

    // Validate tags
    if ("tags" in body) {
      if (!Array.isArray(body.tags)) {
        return NextResponse.json(
          { message: "Tags must be an array" },
          { status: 400 }
        );
      }
      updateData.tags = body.tags;
    }

    // Validate featured
    if ("featured" in body) {
      updateData.featured = Boolean(body.featured);
    }

    // Validate coverImage
    if ("coverImage" in body) {
      if (typeof body.coverImage !== "string") {
        return NextResponse.json(
          { message: "Cover image must be a string" },
          { status: 400 }
        );
      }
      updateData.coverImage = body.coverImage;
    }

    // Validate author
    if ("author" in body) {
      if (typeof body.author !== "string" || body.author.trim() === "") {
        return NextResponse.json(
          { message: "Author cannot be empty" },
          { status: 400 }
        );
      }
      updateData.author = body.author.trim();
    }

    // Check if there are valid fields
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    const { slug } = await params;
    const result = await updateBlogBySlug(slug, updateData);

    if (!result.data) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// PUT - Fully replace a blog by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const body = await request.json();
    const { title, description, content, coverImage, author, tags, featured } = body;

    // For PUT, all fields are required
    if (!title || typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { message: "Title is required and cannot be empty" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { message: "Content is required and cannot be empty" },
        { status: 400 }
      );
    }

    if (!author || typeof author !== "string" || author.trim() === "") {
      return NextResponse.json(
        { message: "Author is required and cannot be empty" },
        { status: 400 }
      );
    }

    if (!Array.isArray(tags)) {
      return NextResponse.json(
        { message: "Tags must be an array" },
        { status: 400 }
      );
    }

    const { slug } = await params;
    const existingBlog = await getBlogBySlug(slug);

    if (!existingBlog) {
      return NextResponse.json(
        { message: "Blog not found", data: null },
        { status: 404 }
      );
    }

    // Build the updated blog object
    const updatedBlog: Omit<Blog, "id" | "slug" | "createdAt" | "comments" | "views"> = {
      title: title.trim(),
      description: description || "",
      content: content.trim(),
      coverImage: coverImage || "",
      author: author.trim(),
      tags,
      featured: Boolean(featured),
    };

    const result = await updateBlogBySlug(slug, updatedBlog);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}