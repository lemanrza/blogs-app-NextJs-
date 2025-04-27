"use client";

import { useEffect, useState } from "react";
import { CommentCard } from "@/components/client/CommentCards";
import { getComments } from "@/services/commentServices";
import { Comment } from "@/types/comment";
export default function RecentComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchComments() {
      try {
        const allComments = await getComments(null);
        setComments(allComments);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 mt-10">Recent Comments</h2>
      <div className="space-y-6">
        {loading ? (
          <div>Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentCard
              key={index}
              name={comment.name}
              createdAt={new Date(comment.createdAt).toLocaleDateString()}
              content={comment.content}
              blogSlug={comment.blogSlug}
            />
          ))
        ) : (
          <div>No comments found.</div>
        )}
      </div>
    </div>
  );
}
