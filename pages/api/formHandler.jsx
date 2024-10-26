export default async function handler(req, res) {
  if (req.method === "POST") {
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const { message, email, name } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const content = `
Name: ${name}
Email: ${email}

${message}`;

    try {
      const apiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json({ success: true, data: data });
      } else {
        return res
          .status(500)
          .json({ error: "Failed to send message", response: data });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Failed to connect to Telegram API",
        details: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
