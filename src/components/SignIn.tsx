"use client";
import { useLogUser } from "@/utils/login";
import { Form, Input, Button } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const [action, setAction] = useState(null);
  const { loginUser, logoutUser } = useLogUser();
  const router = useRouter();

  const guestMode = () => {
    router.push("/receipt");
  };

  const newAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

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

          // enable the user login state
          loginUser(result.data.userId);

          router.push("/receipt");
        } else {
          const error = await response.json();
          console.log(error.errorMessage || "Signup Failed");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (data.username && data.password) {
      const username = data.username as string;
      const password = data.password as string;

      const userRequest = {
        username,
        password,
      };

      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRequest),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);

          // enable the user login state
          loginUser(result.data.userId);

          router.push("/receipt");
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
    <>
      <Button color="primary" type="submit" onPress={guestMode}>
        Guest Mode
      </Button>
      <Accordion>
        <AccordionItem key="1" aria-label="Log In" title="Log In">
          <Form
            className="w-full max-w-xs flex flex-col gap-4"
            validationBehavior="native"
            onSubmit={login}
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
                Login
              </Button>
            </div>
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
                Create
              </Button>
            </div>
          </Form>
        </AccordionItem>
      </Accordion>
    </>
  );
}
