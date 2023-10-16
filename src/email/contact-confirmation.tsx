interface ContactConfirmationProps {
  email: string;
  message: string;
  name: string;
}

export default function ContactConfirmation({ email, message, name }: ContactConfirmationProps) {
  return (
    <div>
      <p>
        Hi <strong>{name}</strong>.
      </p>
      <p>Thank you for reaching out. I have received your message and will reply as soon as I can.</p>
      <p>Below you will find a copy.</p>
      <div>
        <p>
          <strong>Name</strong>
        </p>
        <p>{name}</p>
        <p>
          <strong>Email</strong>
        </p>
        <p>{email}</p>
        <p>
          <strong>Message</strong>
        </p>
        <p>{message}</p>
      </div>
      <p>This is an automated message.</p>
    </div>
  );
}
