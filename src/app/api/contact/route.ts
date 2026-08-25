import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, roleType, location, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Forward the message to Web3Forms / mail dispatcher directly to dev.hannan.ai@gmail.com
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b62a4d31-f112-40f4-8a42-7a763f0d2cbb", // Public Web3Forms key for portfolio contact delivery
          subject: `Portfolio Message from ${name} (${roleType || "Opportunity"})`,
          from_name: name,
          email: email,
          replyto: email,
          message: `
Name: ${name}
Email: ${email}
Opportunity Type: ${roleType || "N/A"}
Work Mode / Location: ${location || "N/A"}

Message / Description:
${message}

---
Sent via Abdul Hannan Portfolio (hannanportfolio)
          `.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.warn("Web3Forms API warning:", data);
      }
    } catch (apiError) {
      console.error("External email dispatcher error:", apiError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully! Abdul will get back to you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
