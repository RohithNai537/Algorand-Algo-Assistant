
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CodeBlock from "@/components/CodeBlock";
import AlgorandLogo from "@/components/AlgorandLogo";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  codeBlocks?: { code: string; language: string }[];
  images?: string[]; // Added support for images
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  // Function to process message content and extract code blocks
  const renderContent = () => {
    if (!message.codeBlocks || message.codeBlocks.length === 0) {
      return <p>{message.content}</p>;
    }

    // Split the content by code block placeholders
    const parts = message.content.split("{{CODE_BLOCK}}");

    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part && <p className="mb-2">{part}</p>}
            {message.codeBlocks && index < message.codeBlocks.length && (
              <CodeBlock 
                code={message.codeBlocks[index].code} 
                language={message.codeBlocks[index].language} 
              />
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4",
        message.sender === "user" ? "message-user" : "message-bot"
      )}
    >
      <Avatar className="h-8 w-8">
        {message.sender === "bot" ? (
          <>
            <AvatarFallback>AI</AvatarFallback>
            <AvatarImage src="/placeholder.svg" alt="AI" />
            <AlgorandLogo className="absolute top-0 right-0 h-3 w-3 text-primary" />
          </>
        ) : (
          <AvatarFallback>You</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {message.sender === "user" ? "You" : "AlgoBot"}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div className="mt-1">
          {renderContent()}
          
          {/* Display images if any */}
          {message.images && message.images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.images.map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden border border-border">
                  <img 
                    src={image} 
                    alt={`Generated visualization ${index + 1}`} 
                    className="max-w-full h-auto max-h-64 object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
