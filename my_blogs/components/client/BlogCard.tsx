"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types/blog";
import { CalendarIcon, MessageSquareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = Pick<Blog, "title" | "createdAt" | "content" | "tags" | "comments" | "slug" | "coverImage">;

export function BlogCard({ createdAt, title, content, coverImage, tags, comments, slug }: BlogCardProps) {
    return (
        <Card className="rounded-2xl overflow-hidden shadow-md">
            <div className="relative w-full h-60">
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 700px"
                    priority
                />
            </div>
            <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="space-y-2">
                    <Link href={`/blogs/${slug}`} className="text-2xl font-bold leading-tight line-clamp-2 hover:underline transition">
                        {title}
                    </Link>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                        {content}
                    </p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquareIcon className="w-4 h-4" />
                        <span>{comments.length} comments</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}


// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Blog } from "@/types/blog";
// import { CalendarIcon, MessageSquareIcon } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link"; // Don't forget to import Link for routing

// type BlogCardProps = Pick<Blog, "title" | "createdAt" | "content" | "tags" | "comments" | "slug" | "coverImage">;

// export function BlogCard({
//     createdAt,
//     title,
//     content,
//     coverImage,
//     tags,
//     comments,
//     slug
// }: BlogCardProps) {
//     // Format the createdAt to a readable format (you can adjust this based on your needs)
//     const formattedDate = new Date(createdAt).toLocaleDateString();

//     return (
//         <Card className="rounded-2xl overflow-hidden shadow-md">
//             <div className="relative w-full h-60">
//                 <Image
//                     src={coverImage || '/default-image.jpg'} // Fallback image if coverImage is null or undefined
//                     alt={title}
//                     fill
//                     className="object-cover object-center"
//                     sizes="(max-width: 768px) 100vw, 700px"
//                     priority
//                 />
//             </div>
//             <CardContent className="p-6 space-y-4">
//                 <div className="flex flex-wrap gap-2">
//                     {tags.map((tag, index) => (
//                         <Badge key={index} variant="outline" className="text-sm">
//                             {tag}
//                         </Badge>
//                     ))}
//                 </div>
//                 <div className="space-y-2">
//                     <Link href={`/blogs/${slug}`} className="text-2xl font-bold leading-tight line-clamp-2 hover:underline transition">
//                         {title}
//                     </Link>
//                     <p className="text-muted-foreground text-sm line-clamp-2">
//                         {content}
//                     </p>
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                         <CalendarIcon className="w-4 h-4" />
//                         <span>{formattedDate}</span> {/* Display the formatted date */}
//                     </div>
//                     <div className="flex items-center gap-1">
//                         <MessageSquareIcon className="w-4 h-4" />
//                         <span>{comments.length} comments</span> {/* Display the number of comments */}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }
