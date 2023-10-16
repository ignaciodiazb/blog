import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

interface ContactConfirmationProps {
  email: string;
  message: string;
  name: string;
}

export default function ContactConfirmation({ email, message, name }: ContactConfirmationProps) {
  return (
    <Html dir={"ltr"} lang={"en"}>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={box}>
            <Heading as={"h1"}>
              Hi <b>{name}</b>.
            </Heading>
            <Text style={paragraph}>
              Thank you for reaching out. I have received your message and will reply as soon as I can.
            </Text>
            <Text style={paragraph}>Below you will find a copy.</Text>
            <Text style={paragraph}>Best regards,</Text>
            <Text style={paragraph}>Ignacio Díaz</Text>
            <Hr style={hr} />
            {/* <Text style={paragraph}>Summary</Text> */}
            <Heading as={"h2"}>Summary</Heading>
            <Text style={paragraph}>
              <b>Name: </b>
              {name}
            </Text>
            <Text style={paragraph}>
              <b>Email: </b>
              {email}
            </Text>
            <Text style={paragraph}>
              <b>Message: </b>
              {message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const box = {
  padding: "0 48px",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  marginBottom: "64px",
  padding: "20px 0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};
