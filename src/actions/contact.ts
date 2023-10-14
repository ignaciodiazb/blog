"use server";

import { z } from "zod";

import Contact from "@/models/contact";
import dbConnect from "@/lib/dbConnect";

export async function createContact(prevState: any, formData: FormData) {
  await dbConnect();

  const schema = z.object({
    email: z.string().email().max(60),
    message: z.string().max(500),
    name: z.string().max(60),
  });

  const data = schema.parse({
    email: formData.get("email"),
    message: formData.get("message"),
    name: formData.get("name"),
  });

  try {
    const contact = new Contact(Object.assign(data, { _createdDate: new Date() }));
    await contact.save();
    return { message: "Message sent successfully", success: true };
  } catch (err) {
    return { message: "Failed to send message", success: false };
  }
}
