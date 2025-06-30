"use client";
import { useState } from 'react';
import { smarterConversations } from '@/ai/flows/smarter-conversations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SmarterConversations() {
    const [context, setContext] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!context.trim()) {
            toast({
                title: "Context is empty",
                description: "Please provide some context for the conversation.",
                variant: "destructive"
            });
            return;
        }
        setIsLoading(true);
        setSuggestions([]);
        try {
            const result = await smarterConversations({ context });
            setSuggestions(result.suggestions);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            toast({
                title: "An error occurred",
                description: "Failed to fetch conversation suggestions. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card id="demos" className="bg-card/50 border-border/50">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                        <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">AI Conversation Starter</CardTitle>
                </div>
                <CardDescription>Never run out of things to say. Get AI-powered suggestions based on your conversation.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        placeholder="E.g., 'We were just talking about our favorite travel destinations...'"
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        rows={3}
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Get Suggestions
                    </Button>
                </form>
                {suggestions.length > 0 && (
                    <div className="mt-6">
                        <h4 className="font-semibold mb-3">Here are some ideas:</h4>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((suggestion, index) => (
                                <Badge key={index} variant="secondary" className="text-sm p-2 bg-primary/20 text-primary-foreground">
                                    {suggestion}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
