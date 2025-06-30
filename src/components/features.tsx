import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, ShieldCheck, Languages } from "lucide-react";

const featuresList = [
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Real-Time Location Groups",
    description: "Create groups and see your friends on a live map. Perfect for meetups and ensuring everyone is safe."
  },
  {
    icon: <Languages className="w-8 h-8 text-primary" />,
    title: "Live Voice Translation",
    description: "Break language barriers with instant voice and text translations, powered by cutting-edge AI."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Absolute Privacy",
    description: "Your conversations are yours. With end-to-end encryption, we ensure your data is never compromised."
  }
];

export function Features() {
  return (
    <section id="features">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-headline">Discover a New Way to Connect</h2>
        <p className="text-muted-foreground mt-2">Core features designed for a seamless, secure, and smart experience.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {featuresList.map((feature, index) => (
          <Card key={index} className="bg-card/50 border-border/50 text-center flex flex-col items-center p-6 transition-all duration-300 hover:border-primary hover:scale-105">
            <CardHeader>
              <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                {feature.icon}
              </div>
              <CardTitle className="font-headline">{feature.title}</CardTitle>
            </CardHeader>
            <CardDescription>{feature.description}</CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
}
