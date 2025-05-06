
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Send, Image } from "lucide-react";
import AlgorandLogo from "@/components/AlgorandLogo";
import MessageItem, { Message } from "@/components/MessageItem";
import { generateResponse, welcomeMessage, sampleQuestions } from "@/data/sampleResponses";
import { Badge } from "@/components/ui/badge";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate API call with a slight delay
    setTimeout(() => {
      const botResponse = generateResponse(userMessage.content);
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
    // Focus on input after setting value
    document.getElementById("message-input")?.focus();
  };

  const handleImageRequest = () => {
    setInputValue("Visualize Algorand blockchain architecture");
    document.getElementById("message-input")?.focus();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto chat-container">
      <CardHeader className="border-b bg-muted/50 px-4 py-3">
        <div className="flex items-center">
          <AlgorandLogo className="h-6 w-6 text-primary mr-2" />
          <CardTitle className="text-lg">AlgoAI Assistant</CardTitle>
          <Badge variant="outline" className="ml-2 text-xs">Beta</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-grow overflow-y-auto max-h-[500px]">
        <div className="flex flex-col">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3 p-4 message-bot">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              </div>
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-2">
                  <div className="h-2 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-2 bg-primary/20 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <div className="px-4 py-2">
        <div className="flex gap-2 flex-wrap">
          {sampleQuestions.map((question, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => handleQuestionClick(question)}
            >
              {question}
            </Badge>
          ))}
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-secondary/80 flex items-center gap-1"
            onClick={handleImageRequest}
          >
            <Image className="h-3 w-3" /> Generate diagram
          </Badge>
        </div>
      </div>
      
      <CardFooter className="p-4 pt-2 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            id="message-input"
            placeholder="Ask about Algorand development or request a diagram..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
