import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("MADE IT TO SIGNUP");
  if (req.method === "POST") {
    console.log("POST REQUEST MADE");
    const { username, email, password } = req.body;
    console.log(req.body);

    const hashify = process.env.HASH_API;
    const userServer = process.env.USER_SERVER_ENDPOINT;

    try {
      // need to generate user id
      // const userId = Date.now();

      // need to call on hash for the password
      const hashUrl = `${hashify}${password}`;
      const hashResponse = await fetch(hashUrl);
      const hashedPass = await hashResponse.json();
      console.log(hashedPass);

      console.log(userServer);

      // make the post request
      if (hashResponse.ok && userServer) {
        const newUser = {
          userName: username,
          email: email,
          passwordHash: hashedPass.Digest,
        };
        console.log("THE NEW USER: ", newUser);
        try {
          const response = await fetch(userServer, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });

          const data = await response.json();
          console.log("made a rq");

          if (response.ok) {
            res
              .status(200)
              .json({ message: "User created successfully!", data });
          } else {
            res
              .status(response.status)
              .json({ message: data.message || "Error creating user" });
          }
        } catch (error) {
          console.error("Error making POST request to user server:", error);
          res
            .status(500)
            .json({ error: "Error making request to user server" });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Idk man" });
    }
  } else {
    res.status(405).json({ error: "METHOD NOT ALLOWED" });
  }
}
