import { useAppSelector } from "@/app/hooks";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { LuChefHat } from "react-icons/lu";

export default function Chat() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const items = useAppSelector((state) => state.items.items);

  useEffect(() => {
    if (isOpen) {
      const fetchRecipe = async () => {
        try {
          const body = { items };
          const response = await fetch("/api/huggingFace", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          if (response.ok) {
            const result = await response.json();
            const initialBotMessage: { role: "bot"; content: string } = {
              role: "bot",
              content:
                result.reply || `I suggest a recipe with: ${items.join(", ")}.`,
            };
            setMessages([initialBotMessage]);
          } else {
            console.error("Failed to get initial recipe.");
          }
        } catch (error) {
          console.error("Error fetching initial recipe:", error);
        }
      };

      fetchRecipe();
    }
  }, [isOpen, items]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    console.log(userMessage);

    try {
      setIsLoading(true);

      const body = { conversation: [...messages, userMessage], items: items };

      const response = await fetch("/api/huggingFace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        const botMessage = { role: "bot", content: result.reply };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error("Failed to get a response from the bot.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onPress={onOpen}
        className="fixed z-90 bottom-14 left-4 bg-pink-500 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center"
        isIconOnly={true}
      >
        <LuChefHat className="text-3xl" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p>Chat with the Chef</p>
              </ModalHeader>
              <ModalBody>
                <div className="chat-box h-64 overflow-y-auto border rounded p-2">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`text-${
                        msg.role === "user" ? "right" : "left"
                      } mb-2`}
                    >
                      <strong>
                        {msg.role === "user" ? "You" : "👨‍🍳 Chef"}:
                      </strong>{" "}
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                  />
                  <Button
                    className="mx-1"
                    onPress={sendMessage}
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? "Thinking..." : "Send"}
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
