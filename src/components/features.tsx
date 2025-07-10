"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { BrainCircuit, Briefcase, Users, MapPin, Bot, Phone, Video, MessageCircle } from "lucide-react";

const featuresList = [
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "Effortless Productivity",
    description: "Automate your life. Your AI assistant can schedule tasks, meetings, and messages, manage your calendar, and even draft documents for you.",
    roles: [
      { id: "scheduleTask", name: "scheduleTask", description: "Ask your AI to schedule a task for a specific time and date, ensuring you never miss a deadline." },
      { id: "scheduleMessage", name: "scheduleMessage", description: "Draft a message now and have your AI send it at the perfect moment in the future." },
      { id: "manageCalendar", name: "manageCalendar", description: "Your AI can add, remove, or update events on your calendar seamlessly through voice or text commands." },
      { id: "create_document", name: "create_document", description: "Need to write something up? Just tell your AI the topic and key points, and it will generate a draft for you." }
    ]
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Total Personal Management",
    description: "Let your AI manage your digital life. It can handle your emails, organize contacts, and customize app settings to fit your needs.",
    roles: [
      { id: "manageEmails", name: "manageEmails", description: "Let your AI sort, prioritize, and even respond to your emails based on your preferences." },
      { id: "manageMessages", name: "manageMessages", description: "Your AI can organize your conversations, archive old chats, and highlight important messages." },
      { id: "manageContacts", name: "manageContacts", description: "Simply ask your AI to add, find, or update contact information without lifting a finger." },
      { id: "changeAppTheme", name: "changeAppTheme", description: "Instantly change the look and feel of your app by telling your AI which theme you'd like to apply." }
    ]
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Real-world Awareness",
    description: "Get contextual advice based on real-time information like your location and the current weather, keeping you informed and prepared.",
    roles: [
      { id: "getWeatherInfo", name: "getWeatherInfo", description: "Get up-to-the-minute weather forecasts for your current location or any other place you ask about." },
      { id: "getCurrentLocation", name: "getCurrentLocation", description: "Your AI can pinpoint your current location to provide relevant, context-aware assistance." },
      { id: "adviseOnLocation", name: "adviseOnLocation", description: "Receive smart suggestions based on where you are, from restaurant recommendations to traffic alerts." },
      { id: "fetchGDELTNews", name: "fetchGDELTNews", description: "Stay informed with the latest news relevant to your location or topics of interest, powered by the GDELT Project." }
    ]
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-primary" />,
    title: "Seamless Communication",
    description: "Connect with anyone, anywhere. Enjoy crystal-clear calls and intelligent messaging that understands you.",
    roles: [
        { id: "aiReply", name: "aiReply", description: "Let the AI analyze incoming messages and suggest context-aware replies, which you can send with a single tap." },
        { id: "aiSendMessage", name: "aiSendMessage", description: "Simply tell your AI who to message and what you want to say, and it will compose and send the message for you." },
        { id: "audioCall", name: "audioCall", description: "Start a high-quality audio call with any of your contacts directly from the app." },
        { id: "videoCall", name: "videoCall", description: "Upgrade your conversation to a face-to-face video call with a simple command." }
    ]
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: "Advanced AI Collaboration",
    description: "Leverage a network of AI agents to solve complex problems by delegating tasks and integrating with other intelligent applications.",
    roles: [
      { id: "delegateToAI", name: "delegateToAI", description: "Assign complex tasks to specialized AI agents that can work together to achieve your goals." },
      { id: "crossAppIntegration", name: "crossAppIntegration", description: "Connect Brainsay with other apps and services, allowing for seamless workflows and data sharing." },
      { id: "fetchWikipediaInfo", name: "fetchWikipediaInfo", description: "Quickly get summaries and information from Wikipedia on any topic by simply asking." },
      { id: "solveComplexProblems", name: "solveComplexProblems", description: "Tackle multi-step problems by having your AI break them down and delegate parts to different agents." }
    ]
  },
];

type Role = {
  id: string;
  name: string;
  description: string;
};

export function Features() {
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  
  return (
    <Dialog>
      <section id="features">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline">Powered by Nerida Brain</h2>
          <p className="text-foreground mt-2 max-w-3xl mx-auto">
            Brainsay is more than a messenger; it's a revolutionary personal assistant designed to manage your digital life and change the way you interact with AI.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuresList.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border/50 text-center flex flex-col transition-all duration-300 hover:border-primary hover:scale-105">
              <CardHeader className="items-center flex-grow">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
                <p className="text-muted-foreground text-sm mt-2 min-h-[60px]">{feature.description}</p>
              </CardHeader>
              <CardContent className="flex-shrink-0">
                <div className="flex flex-wrap gap-2 justify-center">
                  {feature.roles.map((role) => (
                    <DialogTrigger key={role.id} asChild onClick={() => setSelectedRole(role)}>
                      <Badge variant="secondary" className="cursor-pointer bg-primary/20 text-primary-foreground font-mono text-xs">
                        {role.name}
                      </Badge>
                    </DialogTrigger>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <DialogContent className="sm:max-w-[425px]">
        {selectedRole && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary"/>
                <span className="font-mono">{selectedRole.name}</span>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="py-4">
              {selectedRole.description}
            </DialogDescription>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
