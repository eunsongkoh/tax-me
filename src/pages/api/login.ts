import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const hashify = process.env.HASH_API;
    const userServer = process.env.USER_LOGIN_ENDPOINT;

    if (!hashify || !userServer) {
      return res.status(500).json({ error: "Missing environment variables" });
    }

    try {
      const hashUrl = `${hashify}${password}`;
      const hashResponse = await fetch(hashUrl);

      if (!hashResponse.ok) {
        const errorData = await hashResponse.json();
        return res.status(hashResponse.status).json({
          error: errorData.message || "Failed to hash password",
        });
      }

      const hashedPass = await hashResponse.json();
      const userInfo = {
        userName: username,
        passwordHash: hashedPass.Digest,
      };

      const response = await fetch(userServer, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (response.ok) {
        return res
          .status(200)
          .json({ message: "User Successfully Logged In!", data });
      } else {
        return res
          .status(response.status)
          .json({ error: data.message || "Error Logging In" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "METHOD NOT ALLOWED" });
  }
}
