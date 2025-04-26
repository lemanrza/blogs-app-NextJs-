import { getContacts, postContact } from "@/services/contactServices";
import { handleError } from "@/lib/error-handler";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  try {
    const name = request.nextUrl.searchParams.get("name");
    const contacts = await getContacts(name);

    return NextResponse.json(
      {
        message: "Contacts retrieved successfully",
        data: contacts,
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
    const { name, email, message } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || email.trim() === "") {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 }
      );
    }

    const result = await postContact({
      id: uuidv4(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      isRead: false,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
