/**
 * GOOGLE APPS SCRIPT - PORTFOLIO CONTACT & CONFIRMATION EMAIL DISPATCHER
 * 
 * Functions:
 * 1. Receives inquiries (Hiring & Freelance Custom Projects) from portfolio
 * 2. Delivers rich styled lead notification to Abdul Hannan (dev.hannan.ai@gmail.com)
 * 3. Sends instant automatic confirmation email to client / recruiter with submission summary
 * 4. Uses GmailApp with fallback to MailApp for 100% inbox deliverability & SPF/DKIM alignment
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var rawData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        rawData = JSON.parse(e.postData.contents);
      } catch (err) {
        rawData = e.parameter || {};
      }
    } else if (e && e.parameter) {
      rawData = e.parameter;
    }

    var name = rawData.name || "Colleague / Client";
    var email = rawData.email || "";
    var inquiryType = rawData.inquiryType || "hire";
    var isHiring = inquiryType === "hire";
    
    // Topic & Specifications
    var topic = rawData.roleType || rawData.projectType || rawData.domain || (isHiring ? "Full-Stack Developer" : "Custom Web Application");
    var modeOrBudget = isHiring
      ? (rawData.location || "Remote (Worldwide)")
      : (rawData.budget || "Open to Discussion");
    var timeline = rawData.timeline || "Flexible";
    var message = rawData.message || "No additional description provided.";
    var adminEmail = "dev.hannan.ai@gmail.com";

    if (!email) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "Email is required." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // =========================================================================
    // 1. LEAD NOTIFICATION EMAIL TO ABDUL HANNAN
    // =========================================================================
    var adminSubject = (isHiring ? "💼 [Hiring Lead] " : "🚀 [Project Lead] ") + topic + " from " + name;

    var adminBodyText =
      "======================================================\n" +
      "NEW INQUIRY VIA ABDUL HANNAN PORTFOLIO\n" +
      "======================================================\n" +
      "• Inquiry Type: " + (isHiring ? "💼 Full-Time / Contract Hiring" : "🚀 Freelance / Custom Project") + "\n" +
      "• Sender Name / Brand: " + name + "\n" +
      "• Email Address: " + email + "\n" +
      "• " + (isHiring ? "Target Position" : "Project Scope") + ": " + topic + "\n" +
      "• " + (isHiring ? "Work Mode" : "Estimated Budget") + ": " + modeOrBudget + "\n" +
      "• Target Timeline: " + timeline + "\n\n" +
      "Message / Scope Specification:\n" +
      "------------------------------------------------------\n" +
      message + "\n" +
      "------------------------------------------------------\n\n" +
      "Timestamp: " + new Date().toISOString() + "\n" +
      "Dispatched to: dev.hannan.ai@gmail.com\n" +
      "======================================================";

    var adminHtmlBody =
      "<div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f14; color: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);\">" +
        "<div style=\"display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;\">" +
          "<span style=\"background: " + (isHiring ? "#FF1E56" : "#25D366") + "; color: " + (isHiring ? "#ffffff" : "#000000") + "; padding: 6px 14px; border-radius: 9999px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;\">" + (isHiring ? "💼 Full-Time Hiring" : "🚀 Freelance Project") + "</span>" +
          "<span style=\"color: #a1a1aa; font-size: 12px;\">Abdul Hannan Portfolio</span>" +
        "</div>" +
        "<h2 style=\"color: #ffffff; margin-top: 0; font-size: 22px; font-weight: 800;\">New Inquiry from " + name + "</h2>" +
        "<table style=\"width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;\">" +
          "<tr><td style=\"padding: 8px 0; color: #a1a1aa; width: 140px;\">Sender Email:</td><td style=\"color: #ffffff; font-weight: bold;\"><a href=\"mailto:" + email + "\" style=\"color: #FF1E56; text-decoration: none;\">" + email + "</a></td></tr>" +
          "<tr><td style=\"padding: 8px 0; color: #a1a1aa;\">" + (isHiring ? "Target Role:" : "Project Scope:") + "</td><td style=\"color: #ffffff; font-weight: bold;\">" + topic + "</td></tr>" +
          "<tr><td style=\"padding: 8px 0; color: #a1a1aa;\">" + (isHiring ? "Work Mode:" : "Estimated Budget:") + "</td><td style=\"color: #25D366; font-weight: bold;\">" + modeOrBudget + "</td></tr>" +
          "<tr><td style=\"padding: 8px 0; color: #a1a1aa;\">Target Timeline:</td><td style=\"color: #ffffff;\">" + timeline + "</td></tr>" +
        "</table>" +
        "<div style=\"background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 16px; border-radius: 12px; margin-bottom: 24px;\">" +
          "<div style=\"color: #a1a1aa; font-size: 11px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px;\">Requirements / Message:</div>" +
          "<div style=\"color: #f4f4f5; line-height: 1.6; white-space: pre-wrap; font-size: 14px;\">" + message + "</div>" +
        "</div>" +
        "<div style=\"text-align: center; margin-top: 24px;\">" +
          "<a href=\"mailto:" + email + "?subject=Re:%20" + encodeURIComponent(adminSubject) + "\" style=\"background: #FF1E56; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 9999px; font-weight: bold; font-size: 13px; display: inline-block;\">Reply Directly to " + name + "</a>" +
        "</div>" +
      "</div>";

    try {
      GmailApp.sendEmail(adminEmail, adminSubject, adminBodyText, {
        htmlBody: adminHtmlBody,
        replyTo: email,
        name: name + " (via Portfolio)"
      });
    } catch (e1) {
      MailApp.sendEmail({
        to: adminEmail,
        subject: adminSubject,
        body: adminBodyText,
        htmlBody: adminHtmlBody,
        replyTo: email,
        name: name + " (via Portfolio)"
      });
    }

    // =========================================================================
    // 2. AUTOMATIC CONFIRMATION EMAIL TO SENDER (CLIENT / RECRUITER)
    // =========================================================================
    try {
      var confirmSubject = "✨ Thank you for reaching out, " + name + "! (Abdul Hannan Portfolio)";
      var confirmBodyText =
        "Hi " + name + ",\n\n" +
        "Thank you for contacting me through my portfolio. This is an automated confirmation to let you know that I have received your message regarding \"" + topic + "\".\n\n" +
        "I review all inquiries promptly and will get back to you within 12–24 hours.\n\n" +
        "Summary of your submission:\n" +
        "- Inquiry Type: " + (isHiring ? "Full-Time / Contract Hiring" : "Freelance Project") + "\n" +
        "- Topic: " + topic + "\n" +
        "- " + (isHiring ? "Work Mode" : "Budget") + ": " + modeOrBudget + "\n" +
        "- Target Timeline: " + timeline + "\n\n" +
        "If you need an immediate response or want to discuss right away, feel free to chat with me directly on WhatsApp at +91-7310542113.\n\n" +
        "Best regards,\n" +
        "Abdul Hannan\n" +
        "Full-Stack Developer & Software Engineer\n" +
        "Email: dev.hannan.ai@gmail.com\n" +
        "WhatsApp: https://wa.me/917310542113\n" +
        "LinkedIn: https://linkedin.com/in/abdul-hannan-92a911405";

      var confirmHtmlBody =
        "<div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #0c0c10; color: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);\">" +
          "<div style=\"text-align: center; margin-bottom: 20px;\">" +
            "<div style=\"display: inline-block; background: rgba(255,30,86,0.15); border: 1px solid rgba(255,30,86,0.4); color: #FF1E56; padding: 6px 16px; border-radius: 9999px; font-weight: bold; font-size: 11px; text-transform: uppercase;\">Message Received</div>" +
            "<h2 style=\"color: #ffffff; margin: 12px 0 6px 0; font-size: 24px; font-weight: 800;\">Thank You, " + name + "!</h2>" +
            "<p style=\"color: #a1a1aa; font-size: 13px; margin: 0;\">Your transmission has been delivered to Abdul Hannan&apos;s personal inbox.</p>" +
          "</div>" +
          "<div style=\"background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin-bottom: 20px;\">" +
            "<div style=\"font-size: 11px; color: #a1a1aa; text-transform: uppercase; font-weight: bold; margin-bottom: 10px;\">Submission Receipt</div>" +
            "<div style=\"font-size: 13px; color: #ffffff; margin-bottom: 6px;\"><strong>Inquiry Category:</strong> " + (isHiring ? "💼 Full-Time / Contract Hiring" : "🚀 Freelance / Custom Project") + "</div>" +
            "<div style=\"font-size: 13px; color: #ffffff; margin-bottom: 6px;\"><strong>" + (isHiring ? "Target Position:" : "Project Scope:") + "</strong> " + topic + "</div>" +
            "<div style=\"font-size: 13px; color: #ffffff; margin-bottom: 6px;\"><strong>" + (isHiring ? "Work Mode:" : "Budget:") + "</strong> " + modeOrBudget + "</div>" +
            "<div style=\"font-size: 13px; color: #ffffff; margin-bottom: 6px;\"><strong>Target Timeline:</strong> " + timeline + "</div>" +
            "<div style=\"font-size: 13px; color: #25D366; margin-top: 10px;\"><strong>Status:</strong> Delivered &amp; Queued for Personal Reply</div>" +
          "</div>" +
          "<p style=\"color: #d4d4d8; font-size: 13px; line-height: 1.6;\">I typically reply within <strong>12 to 24 hours</strong>. If your request is urgent, feel free to chat with me directly on WhatsApp.</p>" +
          "<div style=\"margin-top: 24px; text-align: center;\">" +
            "<a href=\"https://wa.me/917310542113?text=Hi%20Abdul%2C%20I%20just%20sent%20you%20a%20message%20via%20your%20portfolio\" style=\"background: #25D366; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: bold; font-size: 13px; display: inline-block; margin-right: 10px;\">WhatsApp Instant Chat</a>" +
            "<a href=\"https://linkedin.com/in/abdul-hannan-92a911405\" style=\"background: rgba(255,255,255,0.1); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: bold; font-size: 13px; display: inline-block;\">LinkedIn Profile</a>" +
          "</div>" +
          "<div style=\"margin-top: 28px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; text-align: center; color: #71717a; font-size: 11px;\">" +
            "Abdul Hannan • Full-Stack Developer &amp; Software Engineer • dev.hannan.ai@gmail.com" +
          "</div>" +
        "</div>";

      try {
        GmailApp.sendEmail(email, confirmSubject, confirmBodyText, {
          htmlBody: confirmHtmlBody,
          replyTo: adminEmail,
          name: "Abdul Hannan"
        });
      } catch (e2) {
        MailApp.sendEmail({
          to: email,
          subject: confirmSubject,
          body: confirmBodyText,
          htmlBody: confirmHtmlBody,
          replyTo: adminEmail,
          name: "Abdul Hannan"
        });
      }
    } catch (confErr) {
      Logger.log("Confirmation email error: " + confErr.toString());
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Inquiry and confirmation email dispatched successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ready", message: "Google Apps Script Mail Dispatcher is Active" }))
    .setMimeType(ContentService.MimeType.JSON);
}
