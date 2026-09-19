import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      inquiryType = "hire", // "hire" | "freelance"
      name,
      email,
      roleType,
      projectType,
      budget,
      location,
      timeline,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message / details are required." },
        { status: 400 }
      );
    }

    const isHiring = inquiryType === "hire";
    const selectedTopic = isHiring
      ? roleType || "Full-Stack Developer"
      : projectType || "Custom Web Application";
    const selectedDetail = isHiring
      ? location || "Remote"
      : budget || "To Discuss";

    const subjectPrefix = isHiring
      ? `💼 [Hiring Lead] ${selectedTopic} from ${name}`
      : `🚀 [Freelance Lead] ${selectedTopic} from ${name}`;

    const formattedSummary = `
======================================================
NEW PORTFOLIO INQUIRY FOR ABDUL HANNAN
======================================================
• Inquiry Category: ${isHiring ? "💼 Full-Time / Contract Hiring" : "🚀 Freelance / Custom Project"}
• Client / Company Name: ${name}
• Email Address: ${email}
${isHiring ? `• Target Role: ${selectedTopic}` : `• Project Type: ${selectedTopic}`}
${isHiring ? `• Work Mode: ${selectedDetail}` : `• Budget Range: ${selectedDetail}`}
• Timeline / Start Date: ${timeline || "Flexible"}

Details / Message:
------------------------------------------------------
${message}
------------------------------------------------------

Sent to: dev.hannan.ai@gmail.com
Timestamp: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST
======================================================
    `.trim();

    let emailDispatched = false;

    // 0. Primary Delivery & Auto-Confirmation: Google Apps Script Webhook
    const googleScriptUrl =
      process.env.GOOGLE_SCRIPT_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      "https://script.google.com/macros/s/AKfycbzWlbCMuHoeTbW3LU6mTpU2Lid7nd6qs8vbTX2NsC4DqoXH8EnMfNVMPM8dJpcWmuns/exec";

    if (googleScriptUrl) {
      try {
        const gasRes = await fetch(googleScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            inquiryType,
            roleType: selectedTopic,
            projectType: selectedTopic,
            domain: selectedTopic,
            location: selectedDetail,
            budget: selectedDetail,
            timeline: timeline || "Flexible",
            message,
          }),
        });

        if (gasRes.ok) {
          emailDispatched = true;
        }
      } catch (gasErr) {
        console.warn("Google Apps Script dispatch attempt warning:", gasErr);
      }
    }

    // 1. Direct Gmail SMTP via Nodemailer (if environment variables are provided)
    const emailUser =
      process.env.EMAIL_USER || process.env.GMAIL_USER || "dev.hannan.ai@gmail.com";
    const emailPass =
      process.env.EMAIL_PASS || process.env.GMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

    if (emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        // Send notification to Abdul
        await transporter.sendMail({
          from: `"${name} via Portfolio" <${emailUser}>`,
          to: "dev.hannan.ai@gmail.com",
          replyTo: email,
          subject: subjectPrefix,
          text: formattedSummary,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #16191C; color: #E6E9EA; padding: 28px; border-radius: 16px; border: 1px solid #2E343A;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                <span style="background: #4FC9A0; color: #0B120F; padding: 6px 14px; border-radius: 9999px; font-weight: bold; font-size: 12px; text-transform: uppercase;">
                  ${isHiring ? "💼 Full-Time Hiring" : "🚀 Freelance Project"}
                </span>
                <span style="color: #939CA3; font-size: 12px;">Abdul Hannan Portfolio</span>
              </div>
              <h2 style="color: #E6E9EA; margin-top: 0; font-size: 22px;">New Lead from ${name}</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
                <tr><td style="padding: 8px 0; color: #939CA3; width: 140px;">Sender Email:</td><td style="color: #E6E9EA; font-weight: bold;"><a href="mailto:${email}" style="color: #4FC9A0;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #939CA3;">${isHiring ? "Target Role:" : "Project Type:"}</td><td style="color: #E6E9EA; font-weight: bold;">${selectedTopic}</td></tr>
                <tr><td style="padding: 8px 0; color: #939CA3;">${isHiring ? "Work Mode:" : "Budget Range:"}</td><td style="color: #4FC9A0;">${selectedDetail}</td></tr>
                <tr><td style="padding: 8px 0; color: #939CA3;">Timeline:</td><td style="color: #E6E9EA;">${timeline || "Flexible"}</td></tr>
              </table>
              <div style="background: #1F2327; border: 1px solid #2E343A; padding: 16px; border-radius: 12px; margin-bottom: 20px;">
                <div style="color: #939CA3; font-size: 11px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px;">Message / Requirements:</div>
                <div style="color: #E6E9EA; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${message}</div>
              </div>
              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subjectPrefix)}" style="background: #4FC9A0; color: #0B120F; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: bold; font-size: 13px; display: inline-block;">Reply Directly to ${name}</a>
              </div>
            </div>
          `,
        });

        // Send confirmation email to client
        try {
          await transporter.sendMail({
            from: `"Abdul Hannan" <${emailUser}>`,
            to: email,
            replyTo: "dev.hannan.ai@gmail.com",
            subject: `✨ Message Received: Thank You for contacting Abdul Hannan`,
            text: `Hi ${name},\n\nThank you for reaching out! I have received your message regarding "${selectedTopic}" and will review it promptly.\n\nI typically reply within 12-24 hours. If urgent, feel free to reach out via WhatsApp at +91-7310542113.\n\nBest regards,\nAbdul Hannan`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; background: #0c0c10; color: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="text-align: center; margin-bottom: 20px;">
                  <div style="display: inline-block; background: rgba(79,201,160,0.15); border: 1px solid rgba(79,201,160,0.4); color: #4FC9A0; padding: 6px 16px; border-radius: 9999px; font-weight: bold; font-size: 11px; text-transform: uppercase;">Message Received</div>
                  <h2 style="color: #ffffff; margin: 12px 0 6px 0; font-size: 22px; font-weight: 800;">Thank You, ${name}!</h2>
                  <p style="color: #a1a1aa; font-size: 13px; margin: 0;">Your transmission has been delivered to Abdul Hannan's personal inbox.</p>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                  <div style="font-size: 11px; color: #a1a1aa; text-transform: uppercase; font-weight: bold; margin-bottom: 10px;">Submission Receipt</div>
                  <div style="font-size: 13px; color: #ffffff; margin-bottom: 6px;"><strong>Inquiry Topic:</strong> ${selectedTopic}</div>
                  <div style="font-size: 13px; color: #ffffff; margin-bottom: 6px;"><strong>Timeline:</strong> ${timeline || "Flexible"}</div>
                  <div style="font-size: 13px; color: #25D366;"><strong>Status:</strong> Delivered &amp; Queued for Personal Reply</div>
                </div>
                <p style="color: #d4d4d8; font-size: 13px; line-height: 1.6;">I typically reply within <strong>12 to 24 hours</strong>. If your request is urgent, feel free to chat with me directly on WhatsApp.</p>
                <div style="margin-top: 24px; text-align: center;">
                  <a href="https://wa.me/917310542113?text=Hi%20Abdul%2C%20I%20just%20sent%20you%20a%20message%20via%20your%20portfolio" style="background: #25D366; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: bold; font-size: 13px; display: inline-block;">WhatsApp Instant Chat</a>
                </div>
              </div>
            `,
          });
        } catch (confErr) {
          console.warn("Client confirmation email sending error:", confErr);
        }

        emailDispatched = true;
      } catch (smtpErr) {
        console.error("Nodemailer SMTP dispatch error:", smtpErr);
      }
    }

    // 2. Dispatch via FormSubmit AJAX API
    try {
      const formSubmitRes = await fetch(
        "https://formsubmit.co/ajax/dev.hannan.ai@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: subjectPrefix,
            _replyto: email,
            inquiryType: isHiring ? "Full-Time Hiring" : "Freelance Project",
            topic: selectedTopic,
            detail: selectedDetail,
            timeline: timeline || "Flexible",
            message: message,
            fullSummary: formattedSummary,
            _template: "table",
            _captcha: "false",
          }),
        }
      );

      if (formSubmitRes.ok) {
        emailDispatched = true;
      }
    } catch (fsErr) {
      console.warn("FormSubmit delivery warning:", fsErr);
    }

    // 3. Fallback Dispatch via Web3Forms
    try {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b62a4d31-f112-40f4-8a42-7a763f0d2cbb",
          subject: subjectPrefix,
          from_name: name,
          email: email,
          replyto: email,
          message: formattedSummary,
        }),
      });

      if (web3Res.ok) {
        emailDispatched = true;
      }
    } catch (w3Err) {
      console.warn("Web3Forms delivery warning:", w3Err);
    }

    return NextResponse.json(
      {
        success: true,
        emailDispatched,
        recipient: "dev.hannan.ai@gmail.com",
        senderName: name,
        senderEmail: email,
        inquiryType,
        selectedTopic,
        message: "Your inquiry has been successfully dispatched to Abdul Hannan's email!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch request." },
      { status: 500 }
    );
  }
}
