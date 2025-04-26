export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface ContactResponse {
  message: string;
  data: Contact | Contact[] | null;
}
