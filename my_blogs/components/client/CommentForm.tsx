"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postComment } from '@/services/commentServices';
import { Comment } from "@/types/comment";

interface CommentFormProps {
  blogSlug: string;
  blogTitle: string;
  onCommentPosted?: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  blogSlug,
  blogTitle,
  onCommentPosted,
}) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setSubmitting(true);

    try {
      const newComment: Comment = {
        id: Date.now().toString(),
        name: name.trim(),
        content: text.trim(),
        createdAt: new Date().toISOString(),
        blogSlug,
        blogTitle,
      };

      await postComment(newComment);

      setName('');
      setText('');
      if (onCommentPosted) onCommentPosted(); 
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-10">
      <h2 className="text-xl font-semibold">Add a Comment</h2>
      <div>

      <span className='text-xs font-semibold'>Name</span>
      <Input
      className='mb-4'
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>

      </div>

      <span  className='text-xs font-semibold'>Comment</span>
      <Textarea
        placeholder="Your Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      </div>
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Post Comment'}
      </Button>
    </form>
  );
};