"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getBlogs } from "@/services/blogServices";
import { Blog } from "@/types/blog";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";



export default function Blogs() {
  const [blogs, setBlogs]=useState<Blog[]>([])
  const [search, setSearch]=useState("")
  

  useEffect(() => {
    async function fetchBlogs() {
      const allBlogs = await getBlogs(null);
      setBlogs(allBlogs);
    }

    fetchBlogs();
  }, []);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
    const filteredBlogs = await getBlogs(value || null);
    setBlogs(filteredBlogs);
  }
  return (
    <div className="flex-1  p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>

      <div className="flex items-center justify-between ">
      <div className="max-w-xs mb-4">
        <Input value={search} onChange={handleSearch} placeholder="Filter blogs..." />
      </div>
      <Button className="bg-black text-white hover:bg-black/80">
          + Add Blog
        </Button>
      </div>

      <div className="rounded-lg min-w-full  border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[250px]">Title</TableHead>
              <TableHead className="min-w-[250px]">Tags</TableHead>
              <TableHead className="min-w-[200px] text-center">Date</TableHead>
              <TableHead className="min-w-[150px] text-center">Comments</TableHead>
              <TableHead className="min-w-[150px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog, index) => (
              <TableRow key={index}>
                <TableCell>{blog.title}</TableCell>
                <TableCell >
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-center">{blog.comments.length}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
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


