"use client";

import { getBlogBySlug } from '@/services/blogServices';
import { Blog, BlogComment } from '@/types/blog';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { CommentForm } from '@/components/client/CommentForm';

import CommentCard from '@/components/client/CommentCard';

const BlogDetail = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const params = useParams();
  const slug = params?.id as string;
  const [comments, setComments] = useState<BlogComment[]>([]);
  console.log(blog)
  console.log(slug)
  useEffect(() => {
    async function fetchOneBlog() {
      const getOneBlog = await getBlogBySlug(slug);
      setBlog(getOneBlog || null);
      if (getOneBlog) {
        setComments(getOneBlog.comments || []);
      }
    }

    if (slug) {
      fetchOneBlog();
    }
  }, [slug]);

  const handleNewComment = () => {
    if (blog) {
      setComments(blog.comments || []);
    }
  };

  if (!blog) return <div className='p-8 text-center'>Loading...</div>;

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <Link className='flex items-center gap-4 text-xs font-semibold hover:bg-muted p-2.5 w-[20%] rounded' href="/blogs">
        <ArrowLeft size={15} />
        Back to blogs
      </Link>

      {blog.tags?.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-10">
          {blog.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <h1 className='text-4xl font-bold mt-5'>{blog.title}</h1>
      <div className='flex items-center gap-6 text-muted-foreground mt-3'>
        <p className='flex items-center gap-2'><User size={15} />{blog.author}</p>
        <p className='flex items-center gap-2'><Calendar size={15} />{new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="relative w-full h-[400px] mt-6 rounded-2xl overflow-hidden">
        <Image
          alt={blog.title}
          src={blog.coverImage}
          fill
          className="object-cover"
        />
      </div>
      <p className='mt-6 text-sm'>{blog.content}</p>


      {comments.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold border-t-1 pt-5">Comments ({blog.comments.length})</h2>
          <div className="space-y-6 mt-6">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}
      <CommentForm
        blogSlug={blog.slug}
        blogTitle={blog.title}
        onCommentPosted={handleNewComment}
      />
    </div>
  );
};

export default BlogDetail;
