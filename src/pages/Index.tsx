
import React from "react";
import ChatInterface from "@/components/ChatInterface";
import AlgorandLogo from "@/components/AlgorandLogo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <header className="py-4 px-6 border-b">
        <div className="container max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlgorandLogo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">AlgoAI</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            AI Assistant for Algorand Developers
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Algorand Developer Assistant</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get real-time guidance for smart contracts, debugging help, and ecosystem updates for Algorand blockchain development.
          </p>
        </div>
        
        <ChatInterface />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>This is a demo of the AlgoAI Assistant. Currently simulating responses locally.</p>
        </div>
      </main>

      <footer className="py-4 px-6 border-t mt-8">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>AlgoAI Assistant - AI Chatbot for Algorand Developers</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
