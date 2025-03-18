"use client";
import { useLogUser } from "@/utils/login";
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  Form,
  Input,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const { loginUser, logoutUser } = useLogUser();
  const router = useRouter();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("secondary");

  const showAlert = (message: string, color: string = "secondary") => {
    setAlertMessage(message);
    setAlertColor(color);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 5000); // Automatically hide after 5 seconds
  };

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
          loginUser(
            result.data.userId,
            result.data.purchases,
            username,
            result.data.budget
          );

          router.push("/receipt");
        } else {
          const error = await response.json();
          if (response.status == 420) {
            // same username
            showAlert("This username is already taken", "secondary");
          } else if (response.status == 421) {
            // same email
            showAlert("This email is already in use", "secondary");
          } else {
            console.error(error.errorMessage || "Signup Failed");
          }
          console.error(error.errorMessage || "Signup Failed");
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

          // enable the user login state
          loginUser(result.data.userId, result.data.purchases, username, result.data.budget);

          router.push("/receipt");
        } else {
          const error = await response.json();
          console.error(error.errorMessage || "Signup Failed");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <>
      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-6 rounded shadow-lg max-w-sm text-center">
            <Alert
              color={alertColor}
              title={alertMessage}
              onClose={() => setAlertVisible(false)}
            />
          </div>
        </div>
      )}
      <Button
        className="bg-gradient-to-tr from-gray-800 to-pink-500 text-white shadow-lg"
        radius="full"
        type="submit"
        onPress={guestMode}
      >
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
              <Button
                className="bg-gradient-to-tr from-gray-800 to-pink-500 text-white shadow-lg"
                type="submit"
              >
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
              <Button
                className="bg-gradient-to-tr from-gray-800 to-pink-500 text-white shadow-lg"
                type="submit"
              >
                Create
              </Button>
            </div>
          </Form>
        </AccordionItem>
      </Accordion>
    </>
  );
}
