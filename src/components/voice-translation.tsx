"use client";
import { useState, useRef } from 'react';
import { realTimeVoiceTranslation } from '@/ai/flows/real-time-voice-translation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Loader2, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function VoiceTranslation() {
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('Spanish');
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) {
            toast({
                title: "Text is empty",
                description: "Please enter some text to translate.",
                variant: "destructive"
            });
            return;
        }
        setIsLoading(true);
        setAudioSrc(null);
        try {
            const result = await realTimeVoiceTranslation({ text, targetLanguage: language });
            setAudioSrc(result.media);
            audioRef.current?.load();
            audioRef.current?.play();
        } catch (error) {
            console.error("Error translating voice:", error);
            toast({
                title: "An error occurred",
                description: "Failed to perform voice translation. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const languages = ["Spanish", "French", "German", "Japanese", "Mandarin", "Russian"];

    return (
        <Card className="bg-card/50 border-border/50">
            <CardHeader>
                <div className="flex items-center gap-3">
                     <div className="p-2 bg-primary/10 rounded-full">
                        <Languages className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Real-Time Voice Translation</CardTitle>
                </div>
                <CardDescription>Speak freely in any language. Translate your text and hear it spoken out loud instantly.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        placeholder="Enter text to translate..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={3}
                        disabled={isLoading}
                    />
                    <Select onValueChange={setLanguage} defaultValue={language} disabled={isLoading}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map(lang => (
                                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Volume2 className="mr-2 h-4 w-4" />
                        )}
                        Translate & Play
                    </Button>
                </form>
                {audioSrc && (
                    <div className="mt-4">
                        <audio ref={audioRef} controls src={audioSrc} className="w-full">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
