import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.body;

    const server = process.env.USER_PURCHASES_ENDPOINT;

    if (!server) {
      return res.status(500).json({ error: "Missing environment variables" });
    }

    try {
      const purchaseServer = `${server}/${userId}/purchases`;
      const response = await fetch(purchaseServer, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json({ message: "Received Purchases", data });
      } else {
        return res
          .status(response.status)
          .json({ error: data.message || "Error Retrieving Purchases" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "METHOD NOT ALLOWED" });
  }
}
