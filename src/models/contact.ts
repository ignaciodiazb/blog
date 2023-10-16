import mongoose from "mongoose";

export interface Contact extends mongoose.Document {
  _createdDate: Date;
  email: string;
  message: string;
  name: string;
}

const ContactSchema = new mongoose.Schema<Contact>({
  _createdDate: {
    required: [true, "Please provide creation date for contact"],
    type: Date,
  },
  email: {
    maxlength: [60, "Email cannot be more than 60 characters"],
    required: [true, "Please provide email for contact"],
    type: String,
  },
  message: {
    maxlength: [500, "Message cannot be more than 500 characters"],
    required: [true, "Please provide message for contact"],
    type: String,
  },
  name: {
    maxlength: [60, "Name cannot be more than 60 characters"],
    required: [true, "Please provide name for contact"],
    type: String,
  },
});

export default mongoose.models.Contact || mongoose.model<Contact>("Contact", ContactSchema);
