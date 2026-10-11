import { useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  ArrowUpIcon,
  MessageCircleDashedIcon,
  RotateCwIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

interface AIMessage {
  role: "user" | "ai";
  message: string;
}

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        message: "",
      },
    ]);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            userId: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("AI response failed");
      }

      if (!response.body) {
        throw new Error("Streaming not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let aiResponse = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        aiResponse += chunk;

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "ai",
            message: aiResponse,
          };

          return updated;
        });
      }
    } catch (error) {
      console.error("AI error:", error);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "ai",
          message: "Sorry, something went wrong.",
        };

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    if (loading) return;

    setMessages([]);
    setMessage("");
  };

  return (
    <MessageScrollerProvider autoScroll>
      <Card className="mx-auto flex h-full w-full min-w-0 flex-col gap-0 overflow-hidden">

        {/* Header */}
        <CardHeader className="flex shrink-0 flex-row items-center justify-between gap-2 border-b px-3 py-3 sm:px-4 sm:py-4">
          <CardTitle className="truncate text-base sm:text-lg">
            AI Assistant
          </CardTitle>

          <Button
            variant="outline"
            size="icon"
            onClick={resetChat}
            disabled={loading}
            aria-label="Reset conversation"
            className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
          >
            <RotateCwIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </CardHeader>

        {/* Messages */}
        <CardContent className="min-h-0 flex-1 overflow-hidden p-0">

          {messages.length === 0 ? (
            <Empty className="h-full px-4">

              <EmptyHeader>

                <EmptyMedia variant="icon">
                  <MessageCircleDashedIcon />
                </EmptyMedia>

                <EmptyTitle className="text-base sm:text-lg">
                  How can I help you?
                </EmptyTitle>

                <EmptyDescription className="max-w-sm text-xs sm:text-sm">
                  Ask anything about your Education Management system.
                </EmptyDescription>

              </EmptyHeader>

            </Empty>
          ) : (

            <MessageScroller>

              <MessageScrollerViewport>

                <MessageScrollerContent
                  aria-busy={loading}
                  className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4"
                >

                  {messages.map((msg, index) => (

                    <MessageScrollerItem
                      key={index}
                      messageId={`message-${index}`}
                      scrollAnchor={msg.role === "user"}
                    >

                      <div
                        className={`flex min-w-0 ${
                          msg.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`max-w-[90%] wrap-break rounded-2xl px-3 py-2 sm:max-w-[80%] sm:px-4 sm:py-2 ${
                            msg.role === "user"
                              ? "rounded-br-sm bg-primary text-primary-foreground"
                              : "rounded-bl-sm bg-muted"
                          }`}
                        >

                          {msg.role === "ai" ? (
                            <div className="prose prose-sm max-w-none wrap-break dark:prose-invert">
                              <ReactMarkdown>
                                {msg.message}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap wrap-break text-sm">
                              {msg.message}
                            </p>
                          )}

                        </div>

                      </div>

                    </MessageScrollerItem>

                  ))}

                  {loading &&
                    messages[messages.length - 1]?.message === "" && (
                      <MessageScrollerItem messageId="thinking">

                        <div className="flex justify-start">

                          <div className="rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-xs sm:px-4 sm:text-sm">
                            Thinking...
                          </div>

                        </div>

                      </MessageScrollerItem>
                    )}

                </MessageScrollerContent>

              </MessageScrollerViewport>

              <MessageScrollerButton />

            </MessageScroller>

          )}

        </CardContent>

        {/* Input */}
        <CardFooter className="shrink-0 border-t p-2 sm:p-3">

          <form
            className="w-full min-w-0"
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage();
            }}
          >

            <InputGroup className="min-w-0">

              <InputGroupTextarea
                value={message}
                disabled={loading}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask AI..."
                className="min-h-12 text-sm sm:min-h-14"
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    void sendMessage();
                  }

                }}
              />

              <InputGroupAddon align="block-end">

                <InputGroupButton
                  type="submit"
                  size="icon-sm"
                  variant="default"
                  disabled={
                    loading ||
                    !message.trim()
                  }
                  className="ml-auto h-9 w-9 rounded-full bg-blue-600 p-0 hover:bg-blue-700"
                >
                  <ArrowUpIcon className="h-5 w-5 text-white" />

                  <span className="sr-only">
                    Send
                  </span>

                </InputGroupButton>

              </InputGroupAddon>

            </InputGroup>

          </form>

        </CardFooter>

      </Card>
    </MessageScrollerProvider>
  );
};

export default AIChat;