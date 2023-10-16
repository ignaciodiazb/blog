"use server";

import { Resend } from "resend";
import { z } from "zod";

import Contact from "@/models/contact";
import ContactConfirmation from "@/email/contact-confirmation";
import dbConnect from "@/lib/dbConnect";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL;

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      bcc: DEFAULT_EMAIL,
      from: `Ignacio Díaz <${CONTACT_EMAIL}>`,
      react: ContactConfirmation({ email: data.email, message: data.message, name: data.name }),
      subject: "Contact confirmation",
      to: data.email,
    });

    return { message: "Message sent successfully", success: true };
  } catch (err) {
    return { message: "Failed to send message", success: false };
  }
}
