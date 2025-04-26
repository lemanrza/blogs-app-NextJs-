"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getComments, deleteCommentById } from "@/services/commentServices";
import { Comment } from "@/types/comment";
import { Eye, Trash2, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(true)

  useEffect(() => {
    async function fetchComments() {
      const allcomments = await getComments(null);
      setAllComments(allcomments);
      setComments(allcomments);
    }

    fetchComments();
  }, []);
  async function deleteComment(id: string) {
     await deleteCommentById(id)
     const updatedComments = comments.filter(comment => comment.id !== id);
     setAllComments(updatedComments)
    setComments(updatedComments)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);

    const filtered = allComments.filter(comment =>
      comment.name.toLowerCase().includes(value.toLowerCase()) ||
      comment.content.toLowerCase().includes(value.toLowerCase())
    );

    setComments(filtered);
  }
  function handleFilterByName() {
    const sortedComments = [...allComments].sort((a, b) => {
      if (isAscending) {
        // sort by A-Z
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      } else {
        // Sort by Z-A
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      }
      return 0;
    });

    setComments(sortedComments);
    setIsAscending(!isAscending);
  }
  function handleFilterByDate() {
    const sortedComments = [...allComments].sort((a, b) => {
      if (isAscending) {
        if (a.createdAt.toLowerCase() < b.createdAt.toLowerCase()) return -1;
        if (a.createdAt.toLowerCase() > b.createdAt.toLowerCase()) return 1;
      } else {
        if (a.createdAt.toLowerCase() < b.createdAt.toLowerCase()) return 1;
        if (a.createdAt.toLowerCase() > b.createdAt.toLowerCase()) return -1;
      }
      return 0;
    });

    setComments(sortedComments);
    setIsAscending(!isAscending);
  }


  return (
    <div className="flex-1  p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Comments</h1>
      <div className="max-w-xs mb-4">
        <Input value={search} onChange={handleSearch} placeholder="Filter comments..." />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center gap-3 ml-4 cursor-pointer" onClick={handleFilterByName}>Name <ArrowUpDown size={15} /></TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Blog</TableHead>
              <TableHead className="flex items-center gap-3 justify-center cursor-pointer" onClick={handleFilterByDate}>Date <ArrowUpDown size={15} /></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment, index) => (
              <TableRow key={index}>
                <TableCell className="min-w-[180px] break-words">{comment.name}</TableCell>
                <TableCell className="max-w-[450px] break-words whitespace-pre-wrap">{comment.content}</TableCell>
                <TableCell className="max-w-[300px] break-words whitespace-pre-wrap">{comment.blogTitle}</TableCell>
                <TableCell className=" min-w-[150px] text-center">{new Date(comment.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => {
                    deleteComment(comment.id)
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  );
}


