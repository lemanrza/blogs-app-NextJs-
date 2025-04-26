import { Contact } from "@/types/contact";

export const contacts: Contact[] = [
  {
    id: "contact-5",
    name: "David Brown",
    email: "david.brown@example.com",
    message: "Just wanted to say thank you for your article on mindfulness meditation. I've been practicing the techniques you suggested for two weeks now, and I'm already noticing a difference in my stress levels. Keep up the great work!",
    createdAt: "2023-09-28T11:10:00Z",
    isRead: false,
  },
  {
    id: "contact-4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    message: "I'm interested in contributing a guest post to your blog. I have expertise in digital marketing and could write an article about how bloggers can increase their audience through SEO strategies. Please let me know if you'd be interested in this collaboration.",
    createdAt: "2023-09-25T09:20:00Z",
    isRead: false,
  },
  {
    id: "contact-3",
    name: "Michael Smith",
    email: "michael.smith@example.com",
    message: "I noticed a broken link in your article about sustainable travel. The link to the eco-friendly accommodations website isn't working. Just wanted to let you know!",
    createdAt: "2023-09-22T16:45:00Z",
    isRead: true,
  },
  {
    id: "contact-2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    message: "Hello! I'm a student working on a research paper about modern blogging platforms. Would it be possible to interview you about your experience running this blog? I would really appreciate your insights.",
    createdAt: "2023-09-20T10:15:00Z",
    isRead: false,
  },
  {
    id: "contact-1",
    name: "John Doe",
    email: "john.doe@example.com",
    message: "I really enjoy reading your blog posts, especially the ones about technology. Would you consider writing more about artificial intelligence and its applications in everyday life?",
    createdAt: "2023-09-15T14:30:00Z",
    isRead: true,
  },
];