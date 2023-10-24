"use server";
import { EmailTemplate } from "../../components/emails/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SendEmail({ email, message, name }) {
  console.log(email, message);
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["honorablewaiga@gmail.com"],
      subject: "Support",
      react: EmailTemplate({ message, name }),
    });

    return { data };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong ", status: 500 };
  }
}
