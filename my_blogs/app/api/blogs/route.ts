import { handleError } from "@/lib/error-handler";
import { getBlogs, postBlog } from "@/services/blogServices";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

function createSlug(title: string) {
  return title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export async function GET(request: NextRequest) {
  try {
    const name = request.nextUrl.searchParams.get("name");
    const blogs = await getBlogs(name);

    return NextResponse.json(
      {
        message: "Blogs retrieved successfully",
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, content, coverImage, author, tags, featured } = body;

    // Validation
    if (!title || title.trim() === "") {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    if (!author || author.trim() === "") {
      return NextResponse.json(
        { message: "Author is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(tags)) {
      return NextResponse.json(
        { message: "Tags must be an array" },
        { status: 400 }
      );
    }

    const newBlog = {
      id: uuidv4(),
      slug: createSlug(title),
      title,
      description: description || "",
      content,
      coverImage: coverImage || "",
      author,
      tags,
      createdAt: new Date().toISOString(),
      comments: [],
      featured: Boolean(featured),
      views: 0,
    };

    const result = await postBlog(newBlog);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}