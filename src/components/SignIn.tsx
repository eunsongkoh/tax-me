"use client";
import { Form, Input, Button } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useState } from "react";

export default function SignIn() {
  const [action, setAction] = useState(null);

  const newAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("THE DATA", data);

    if (data.username && data.email && data.password) {
      const username = data.username as string;
      const email = data.email as string;
      const password = data.password as string;

      const newUser = {
        username,
        email,
        password,
      };

      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("SUCCESS");
          console.log(result);
        } else {
          const error = await response.json();
          console.log(error.errorMessage || "Signup Failed");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };
  return (
    <Accordion>
      <AccordionItem key="1" aria-label="Log In" title="Log In">
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          validationBehavior="native"
        >
          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="text"
          />

          <Input
            isRequired
            errorMessage="Please enter a Password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your Password"
            type="password"
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Enter
            </Button>
          </div>
          {action && (
            <div className="text-small text-default-500">
              Action: <code>{action}</code>
            </div>
          )}
        </Form>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Sign Up" title="Sign Up">
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={newAccount}
        >
          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="text"
          />

          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="text"
          />

          <Input
            isRequired
            errorMessage="Please enter a Password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your Password"
            type="password"
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Enter
            </Button>
          </div>
          {action && (
            <div className="text-small text-default-500">
              Action: <code>{action}</code>
            </div>
          )}
        </Form>
      </AccordionItem>
    </Accordion>
  );
}
