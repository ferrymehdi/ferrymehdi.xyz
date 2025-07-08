import { NextResponse } from "next/server";

export async function POST(request: NextResponse) {
  try {
    const { email, name, message, subject } = await request.json();
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json(
        { ok: false, message: "Webhook URL not configured" },
        { status: 500 },
      );
    }

    if (!email || !name || !message || !subject) {
      return NextResponse.json(
        { ok: false, message: "All fields are required" },
        { status: 400 },
      );
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Invalid email format" },
        { status: 400 },
      );
    }
    if (message.length > 2000) {
      return NextResponse.json(
        { ok: false, message: "Message exceeds 2000 characters" },
        { status: 400 },
      );
    }
    if (name.length > 100) {
      return NextResponse.json(
        { ok: false, message: "Name exceeds 100 characters" },
        { status: 400 },
      );
    }
    if (subject.length > 100) {
      return NextResponse.json(
        { ok: false, message: "Subject exceeds 100 characters" },
        { status: 400 },
      );
    }
    // Create the embed object for Discord
    const embed = {
      title: "New Contact Form Submission",
      fields: [
        {
          name: "Name",
          value: name,
          inline: true,
        },
        {
          name: "Email",
          value: email,
          inline: true,
        },
        {
          name: "Subject",
          value: subject,
          inline: true,
        },
      ],
      description: message,
    };
    const body = JSON.stringify({
      embeds: [embed],
    });

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in contact form submission:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
