import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck, UserCog, Wrench } from "lucide-react";

export function AccountManagement() {
  const accountFeatures = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Proactive Scam Protection",
      description: "Our AI vigilantly monitors your account, blocking suspicious activity and phishing attempts before they can reach you."
    },
    {
      icon: <UserCog className="w-8 h-8 text-primary" />,
      title: "Effortless Profile Management",
      description: "Simply ask your AI assistant to retrieve or update your profile details. It handles the changes instantly and securely."
    },
    {
      icon: <Wrench className="w-8 h-8 text-primary" />,
      title: "Automated Issue Resolution",
      description: "Facing an account issue? Your AI can diagnose and fix common problems automatically, getting you back on track without the hassle."
    }
  ];

  return (
    <section id="account-management">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-headline">Your Digital Guardian</h2>
        <p className="text-foreground/80 mt-2 max-w-3xl mx-auto">
          Brainsay doesn't just manage your tasks—it secures your digital identity with intelligent, round-the-clock protection.
        </p>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {accountFeatures.map((feature, index) => (
          <Card key={index} className="bg-card/50 border-border/50 text-center flex flex-col transition-all duration-300 hover:border-primary hover:scale-105">
            <CardHeader className="items-center flex-grow p-6">
              <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                {feature.icon}
              </div>
              <CardTitle className="font-headline">{feature.title}</CardTitle>
              <p className="text-muted-foreground text-sm mt-2 flex-grow">{feature.description}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
