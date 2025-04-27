"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Comment } from "@/types/comment";
import Link from "next/link";

  type CommentCardProps = Pick<Comment, "name" | "createdAt" | "content" | "blogSlug">;

export function CommentCard({ name, createdAt, content, blogSlug }: CommentCardProps) {
    return (
        <Card className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4 ">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-muted text-xl font-bold">
                    {name.charAt(0)}
                </div>
                <div className="flex flex-col w-[750px]">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <div className="font-semibold text-lg">{name}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{createdAt}</span>
                            </div>
                        </div>
                        <Button variant="link" className="text-primary">
                            <Link target="_blank" href={`/blogs/${blogSlug}`}>View Blog</Link>
                        </Button>
                    </div>
                    <p className="mt-2 text-muted-foreground">{content}</p>
                </div>
            </div>
        </Card>
    );
}
