"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getContacts } from "@/services/contactServices";
import { Contact } from "@/types/contact";
import { Check, Mail, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(true)

  useEffect(() => {
    async function fetchComments() {
      const allContacts = await getContacts(null);
      setAllContacts(allContacts);
      setContacts(allContacts);
    }

    fetchComments();
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);

    const filtered = allContacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase()) ||
      contact.message.toLowerCase().includes(value.toLowerCase())
    );

    setContacts(filtered);
  }
  function handleFilterByName() {
    const sortedContacts = [...allContacts].sort((a, b) => {
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

    setContacts(sortedContacts);
    setIsAscending(!isAscending);
  }
  function handleFilterByDate() {
    const sortedContacts = [...allContacts].sort((a, b) => {
      if (isAscending) {
        if (a.createdAt.toLowerCase() < b.createdAt.toLowerCase()) return -1;
        if (a.createdAt.toLowerCase() > b.createdAt.toLowerCase()) return 1;
      } else {
        if (a.createdAt.toLowerCase() < b.createdAt.toLowerCase()) return 1;
        if (a.createdAt.toLowerCase() > b.createdAt.toLowerCase()) return -1;
      }
      return 0;
    });

    setContacts(sortedContacts);
    setIsAscending(!isAscending);
  }
  function readMessage(id: number | string) {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id == id ? { ...contact, isRead: true } : contact
      )
    );
  }


  return (
    <div className="flex-1  p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Contacts</h1>
      <div className="max-w-xs mb-4">
        <Input value={search} onChange={handleSearch} placeholder="Filter messages..." />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center gap-3 ml-4 cursor-pointer" onClick={handleFilterByName}>Name <ArrowUpDown size={15} /></TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="flex items-center gap-3 justify-center cursor-pointer" onClick={handleFilterByDate}>Date <ArrowUpDown size={15} /></TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact, index) => (
              <TableRow key={index}>
                <TableCell className="min-w-[180px] break-words">{contact.name}</TableCell>
                <TableCell className="max-w-[450px] break-words whitespace-pre-wrap">{contact.email}</TableCell>
                <TableCell className="max-w-[300px] break-words whitespace-pre-wrap">{contact.message}</TableCell>
                <TableCell className=" min-w-[150px] text-center">{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-[300px] break-words whitespace-pre-wrap">
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-semibold
    ${contact.isRead ? "border border-gray-300 text-black dark:text-white" : "bg-black dark:bg-white dark:text-black text-white"}`}
                  >
                    {contact.isRead ? "Read" : "Unread"}
                  </span>
                </TableCell>

                <TableCell className="text-right space-x-2">
                  {!contact.isRead && (
                    <Button variant="ghost" size="icon" onClick={() => readMessage(contact.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}

                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
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


