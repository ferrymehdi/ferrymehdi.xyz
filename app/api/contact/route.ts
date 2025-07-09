import { NextRequest, NextResponse } from "next/server";

const ipSubmissions = new Map<
  string,
  { count: number; lastSubmission: number }
>();

setInterval(
  () => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const entries = Array.from(ipSubmissions.entries());
    for (const [ip, data] of entries) {
      if (now - data.lastSubmission > oneHour) {
        ipSubmissions.delete(ip);
      }
    }
  },
  60 * 60 * 2000,
);

export async function POST(request: NextRequest) {
  try {
    const { email, name, message, subject, recaptchaToken } =
      await request.json();
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json(
        { code: 10006, ok: false, message: "Webhook URL not configured" },
        { status: 500 },
      );
    }
    const clientIP = getClientIP(request);

    if (!clientIP) {
      return NextResponse.json(
        { code: 10005, ok: false, message: "Could not determine client IP" },
        { status: 400 },
      );
    }
    const ipData = ipSubmissions.get(clientIP) || {
      count: 0,
      lastSubmission: 0,
    };
    const now = Date.now();
    // Check if the IP is a proxy
    const isProxy = await checkIpIsProxy(clientIP);
    if (
      (ipData.count >= 2 && now - ipData.lastSubmission < 60 * 60 * 2000) ||
      isProxy
    ) {
      if (!recaptchaToken) {
        return NextResponse.json(
          {
            code: 10029,
            ok: false,
            message: "Too many requests. Please try again later.",
          },
          { status: 429 },
        );
      }
      const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isCaptchaValid) {
        return NextResponse.json(
          {
            code: 10003,
            ok: false,
            message: "Invalid reCAPTCHA. Please try again.",
          },
          { status: 400 },
        );
      }
    }
    ipSubmissions.set(clientIP, {
      count: ipData.count + 1,
      lastSubmission: now,
    });

    if (!email || !name || !message || !subject) {
      return NextResponse.json(
        { code: 10000, ok: false, message: "All fields are required" },
        { status: 400 },
      );
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return NextResponse.json(
        { code: 10001, ok: false, message: "Invalid email format" },
        { status: 400 },
      );
    }
    if (message.length > 2000) {
      return NextResponse.json(
        { code: 10002, ok: false, message: "Message exceeds 2000 characters" },
        { status: 400 },
      );
    }
    if (name.length > 100) {
      return NextResponse.json(
        { code: 10002, ok: false, message: "Name exceeds 100 characters" },
        { status: 400 },
      );
    }
    if (subject.length > 100) {
      return NextResponse.json(
        { code: 10002, ok: false, message: "Subject exceeds 100 characters" },
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
        {
          name: "IP Address",
          value: clientIP,
          inline: true,
        },
        {
          name: "Proxy Check",
          value: isProxy ? "Yes" : "No",
          inline: true,
        },
        {
          name: "Count",
          value: (ipData.count + 1).toString(),
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
      { code: 10004, ok: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

function getClientIP(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const clientIP = request.headers.get("x-client-ip");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return realIP || clientIP || null;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not configured");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}

async function checkIpIsProxy(ip: string): Promise<boolean> {
  const PROXYCHECK_API_KEY = process.env.PROXYCHECK_API_KEY;
  if (!PROXYCHECK_API_KEY) {
    console.error("PROXYCHECK_API_KEY not configured");
    return false;
  }
  try {
    const response = await fetch(
      `https://proxycheck.io/v2/${ip}?key=${PROXYCHECK_API_KEY}&vpn=1&risk=1&port=1&seen=1&days=7&tag=myproject&json=1`,
    );
    const data = await response.json();
    if (data.status === "ok") {
      if (data[ip] && data[ip].proxy === "yes") {
        console.log(`IP ${ip} is a proxy`);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking IP proxy status:", error);
    return false;
  }
}
