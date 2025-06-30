import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Briefcase, UserCog, Library, Contact, Mailbox } from "lucide-react";

const featuresList = [
  {
    icon: <MessageCircle className="w-8 h-8 text-primary" />,
    title: "Communication",
    roles: ["sendMessages", "initiateCall", "sendEmail"]
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "Productivity",
    roles: ["create_document", "createMessagingChannel"]
  },
  {
    icon: <UserCog className="w-8 h-8 text-primary" />,
    title: "Personal",
    roles: ["changeAppTheme", "toggleLocation", "getCurrentLocation"]
  },
  {
    icon: <Library className="w-8 h-8 text-primary" />,
    title: "Information",
    roles: ["fetchGDELTNews", "fetchWikipediaInfo", "getWeatherInfo"]
  },
  {
    icon: <Contact className="w-8 h-8 text-primary" />,
    title: "Contacts",
    roles: ["deleteContacts", "retrieveUserBySharingCode"]
  },
  {
    icon: <Mailbox className="w-8 h-8 text-primary" />,
    title: "Messages",
    roles: ["retrieveMessages", "deleteMessages"]
  }
];

export function Features() {
  return (
    <section id="features">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-headline">Powerful AI Capabilities</h2>
        <p className="text-muted-foreground mt-2">Explore the core functions of Findme's intelligent assistant.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresList.map((feature, index) => (
          <Card key={index} className="bg-card/50 border-border/50 text-center flex flex-col transition-all duration-300 hover:border-primary hover:scale-105">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                {feature.icon}
              </div>
              <CardTitle className="font-headline">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
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
