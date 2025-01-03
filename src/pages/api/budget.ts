import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "PUT") {
    const { userId, budget } = req.body;

    const server = process.env.USER_BUDGET_ENDPOINT;

    if (!server) {
      return res.status(500).json({ error: "Missing environment variables" });
    }

    try {
      const response = await fetch(server, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      if (response.ok) {
        return res
          .status(200)
          .json({ message: "Updated Budget Successfully", data });
      } else {
        return res
          .status(response.status)
          .json({ error: data.message || "Error Updating Budget" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "METHOD NOT ALLOWED" });
  }
}
