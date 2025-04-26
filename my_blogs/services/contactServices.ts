import { contacts } from "@/data/contact";
import type { Contact, ContactResponse } from "@/types/contact";

export async function getContacts(name: string | null): Promise<Contact[]> {
  if (name) {
    return contacts.filter((c) =>
      c.name.toLowerCase().trim().includes(name.toLowerCase().trim())
    );
  }
  return contacts;
}

export async function getContactById(id: string): Promise<Contact | undefined> {
  return contacts.find((c) => c.id === id);
}

export async function postContact(contact: Contact): Promise<ContactResponse> {
  contacts.push(contact);
  return {
    message: "Contact created successfully",
    data: contact,
  };
}

export async function deleteContactById(id: string): Promise<ContactResponse> {
  const idx = contacts.findIndex((c) => c.id === id);
  if (idx === -1) {
    return {
      message: "Contact not found",
      data: null,
    };
  }

  contacts.splice(idx, 1);
  return {
    message: "Contact deleted successfully",
    data: contacts,
  };
}

export async function updateContactById(
  id: string,
  updatedContact: Partial<Contact>
): Promise<ContactResponse> {
  const idx = contacts.findIndex((c) => c.id === id);
  if (idx === -1) {
    return {
      message: "Contact not found",
      data: null,
    };
  }

  contacts[idx] = { ...contacts[idx], ...updatedContact };
  return {
    message: "Contact updated successfully",
    data: contacts[idx],
  };
}