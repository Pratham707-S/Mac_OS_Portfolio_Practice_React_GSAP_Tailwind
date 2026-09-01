import emailjs from "@emailjs/browser";

// Default or environment configuration for EmailJS
// Set these in your .env file without spaces around '='
// VITE_EMAILJS_SERVICE_ID=service_xxxx
// VITE_EMAILJS_TEMPLATE_ID=template_xxxx
// VITE_EMAILJS_PUBLIC_KEY=your_public_key

const getEnv = (key, fallback = "") => {
  const val = import.meta.env[key];
  return typeof val === "string" ? val.trim() : fallback;
};

/**
 * Sends an email using EmailJS with graceful fallback
 * @param {Object} params
 * @param {string} params.from_name - Name of sender
 * @param {string} params.from_email - Email of sender
 * @param {string} params.subject - Email subject
 * @param {string} params.message - Main email message / notes
 * @param {string} params.to_email - Destination (defaults to Pratham)
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const sendPortfolioEmail = async ({
  from_name = "Portfolio Visitor",
  from_email = "",
  subject = "New Message from Portfolio",
  message = "",
  to_email = "Pratham.1226667@gmail.com",
}) => {
  const serviceId = getEnv("VITE_EMAILJS_SERVICE_ID", "service_portfolio");
  const templateId = getEnv("VITE_EMAILJS_TEMPLATE_ID", "template_portfolio");
  const publicKey = getEnv("VITE_EMAILJS_PUBLIC_KEY", "");

  // Check if EmailJS keys are provided
  if (!publicKey || publicKey === "your_public_key") {
    console.warn(
      "[EmailJS] Public Key is not configured in .env. Falling back to mailto client."
    );
    // Fallback directly to mailto
    const mailtoUrl = `mailto:${to_email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `From: ${from_name} (${from_email || "Not specified"})\n\nMessage:\n${message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    return {
      success: true,
      fallback: true,
      message: "Opening mail client (Add Public Key to .env for direct zero-click sending)",
    };
  }

  try {
    const templateParams = {
      from_name,
      from_email: from_email || "visitor@portfolio.dev",
      reply_to: from_email || "visitor@portfolio.dev",
      to_name: "Pratham Tiwari",
      to_email,
      subject,
      message,
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200 || response.text === "OK") {
      return {
        success: true,
        fallback: false,
        message: "Email delivered successfully to Pratham!",
      };
    }
    throw new Error(response.text || "Failed to send email");
  } catch (error) {
    console.error("[EmailJS Error]:", error);
    // If EmailJS fails, trigger fallback mailto
    const mailtoUrl = `mailto:${to_email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `From: ${from_name} (${from_email})\n\nMessage:\n${message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    return {
      success: false,
      fallback: true,
      message: "EmailJS error, opened mail client as fallback.",
      error: error.message,
    };
  }
};
