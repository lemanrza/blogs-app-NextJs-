import { comments } from "@/data/comment";
import type { Comment, CommentResponse } from "@/types/comment";

export async function getComments(name: string | null): Promise<Comment[]> {
  if (name) {
    return comments.filter((c) =>
      c.name.toLowerCase().trim().includes(name.toLowerCase().trim())
    );
  }
  return comments;
}

export async function getCommentById(id: string): Promise<Comment | undefined> {
  return comments.find((c) => c.id === id);
}

export async function postComment(comment: Comment): Promise<CommentResponse> {
  comments.push(comment);
  return {
    message: "Comment created successfully",
    data: comment,
  };
}

export async function deleteCommentById(id: string): Promise<CommentResponse> {
  const idx = comments.findIndex((c) => c.id === id);
  if (idx === -1) {
    return {
      message: "Comment not found",
      data: null,
    };
  }

  comments.splice(idx, 1);
  return {
    message: "Comment deleted successfully",
    data: comments,
  };
}

export async function updateCommentById(
  id: string,
  updatedComment: Partial<Comment>
): Promise<CommentResponse> {
  const idx = comments.findIndex((c) => c.id === id);
  if (idx === -1) {
    return {
      message: "Comment not found",
      data: null,
    };
  }

  comments[idx] = { ...comments[idx], ...updatedComment };
  return {
    message: "Comment updated successfully",
    data: comments[idx],
  };
}
