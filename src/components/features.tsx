import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Briefcase, Users, MapPin } from "lucide-react";

const featuresList = [
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "Effortless Productivity",
    description: "Automate your life. Your AI assistant can schedule tasks, meetings, and messages, manage your calendar, and even draft documents for you.",
    roles: ["scheduleTask", "scheduleMessage", "manageCalendar", "create_document"]
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Total Personal Management",
    description: "Let your AI manage your digital life. It can handle your emails, organize contacts, and customize app settings to fit your needs.",
    roles: ["manageEmails", "manageMessages", "manageContacts", "changeAppTheme"]
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Real-world Awareness",
    description: "Get contextual advice based on real-time information like your location and the current weather, keeping you informed and prepared.",
    roles: ["getWeatherInfo", "getCurrentLocation", "adviseOnLocation", "fetchGDELTNews"]
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: "Advanced AI Collaboration",
    description: "Leverage a network of AI agents to solve complex problems by delegating tasks and integrating with other intelligent applications.",
    roles: ["delegateToAI", "crossAppIntegration", "fetchWikipediaInfo", "solveComplexProblems"]
  },
];

export function Features() {
  return (
    <section id="features">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-headline">Powered by Findme Brain</h2>
        <p className="text-foreground mt-2 max-w-3xl mx-auto">
          Findme is more than a messenger; it's a revolutionary personal assistant designed to manage your digital life and change the way you interact with AI.
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
