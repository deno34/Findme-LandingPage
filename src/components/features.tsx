import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Briefcase, UserCog, CloudSun, Share2, Users } from "lucide-react";

const featuresList = [
  {
    icon: <MessageCircle className="w-8 h-8 text-primary" />,
    title: "Intelligent Communication",
    description: "Seamlessly manage all your conversations and correspondence, from sending messages to initiating calls and emails.",
    roles: ["sendMessages", "initiateCall", "sendEmail", "scheduleMessage", "organizeMessages"]
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "Effortless Productivity",
    description: "Stay organized and on top of your tasks. Your AI can schedule tasks, manage your calendar, and even draft documents for you.",
    roles: ["scheduleTask", "scheduleMessage", "manageCalendar", "create_document"]
  },
  {
    icon: <UserCog className="w-8 h-8 text-primary" />,
    title: "Total Personal Management",
    description: "Your AI manages your digital life, from emails and contacts to app settings, acting as your true personal assistant.",
    roles: ["manageContacts", "manageEmails", "manageMessages", "changeAppTheme", "deleteContacts"]
  },
  {
    icon: <CloudSun className="w-8 h-8 text-primary" />,
    title: "Real-time Awareness",
    description: "Get contextual advice based on real-time data like your location and the current weather, keeping you informed and prepared.",
    roles: ["getWeatherInfo", "getCurrentLocation", "adviseOnLocation", "fetchGDELTNews"]
  },
  {
    icon: <Share2 className="w-8 h-8 text-primary" />,
    title: "AI Collaboration",
    description: "Leverage a network of AI agents to solve complex problems, delegating tasks and integrating with other applications.",
    roles: ["delegateToAI", "crossAppIntegration", "fetchWikipediaInfo"]
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Social Intelligence",
    description: "Intelligently manage your connections. Securely retrieve user information and manage your message history.",
    roles: ["retrieveUserBySharingCode", "retrieveMessages", "deleteMessages"]
  }
];

export function Features() {
  return (
    <section id="features">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-headline">A New Era of Personal AI</h2>
        <p className="text-foreground/80 mt-2 max-w-3xl mx-auto">
          Findme isn't just a messenger; it's your personal assistant, revolutionizing communication and managing your digital life.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresList.map((feature, index) => (
          <Card key={index} className="bg-card/50 border-border/50 text-center flex flex-col transition-all duration-300 hover:border-primary hover:scale-105">
            <CardHeader className="items-center flex-grow">
              <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                {feature.icon}
              </div>
              <CardTitle className="font-headline">{feature.title}</CardTitle>
              <p className="text-muted-foreground text-sm mt-2 min-h-[40px]">{feature.description}</p>
            </CardHeader>
            <CardContent className="flex-shrink-0">
              <div className="flex flex-wrap gap-2 justify-center">
                {feature.roles.map((role) => (
                  <Badge key={role} variant="secondary" className="bg-primary/20 text-primary-foreground font-mono text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
