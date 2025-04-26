import { handleError } from "@/lib/error-handler";
import { getComments, postComment } from "@/services/commentServices";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  try {
    const blogId = request.nextUrl.searchParams.get("blogId");

    const comments = await getComments(blogId);

    return NextResponse.json(
      {
        message: "Comments retrieved successfully",
        data: comments,
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
    const { blogId, name, content } = body;  

    if (!blogId || blogId.trim() === "") {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Author name is required" },  
        { status: 400 }
      );
    }

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    const newComment = {
      id: uuidv4(),
      name,  
      content,
      createdAt: new Date().toISOString(),
      blogTitle: "", 
      blogSlug: "",  
    }
    const result = await postComment(newComment);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}