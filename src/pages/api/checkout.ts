import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const purchaseServer = process.env.PURCHASE_ENDPOINT;
    if (!purchaseServer) {
      return res.status(500).json({ error: "Missing environment variables" });
    }

    try {
      const response = await fetch(purchaseServer, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      if (response.ok) {
        return res
          .status(200)
          .json({ message: "Added Purchase Successfully", data });
      } else {
        return res
          .status(response.status)
          .json({ error: data.message || "Error Adding Purchase" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "METHOD NOT ALLOWED" });
  }
}
