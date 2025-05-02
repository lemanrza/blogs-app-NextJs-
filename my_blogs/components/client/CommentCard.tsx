import React from 'react';

import { User, Calendar } from 'lucide-react';
import { BlogComment } from '@/types/blog';

interface CommentCardProps {
    comment: BlogComment; 
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <div className="bg-white p-6 rounded-lg border mt-4">
            <div className="flex items-center gap-4">
                <div className='bg-muted rounded-full w-10 h-10 flex items-center justify-center p-2'>
                    <p>{comment.name.charAt(0)}</p>
                </div>
                <div>
                <p className="font-semibold">{comment.name}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground ">
                <Calendar size={10} />
                <p className='text-xs'>{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
                </div>
            </div>


            <p className="mt-1 text-sm text-muted-foreground">{comment.content}</p>
        </div>
    );
};

export default CommentCard;
