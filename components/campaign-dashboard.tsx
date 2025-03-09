"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

type Campaign = {
    id: number;
    name: string;
    description: string;
    lastPlayed: string;
};

export function CampaignDashboard() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [newCampaign, setNewCampaign] = useState({
        name: "",
        description: "",
    });

    const addCampaign = () => {
        if (newCampaign.name) {
            setCampaigns([
                ...campaigns,
                {
                    ...newCampaign,
                    id: Date.now(),
                    lastPlayed: "Never",
                },
            ]);
            setNewCampaign({ name: "", description: "" });
        }
    };

    return (
        <div className="space-y-6">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Create New Campaign</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Campaign</DialogTitle>
                        <DialogDescription>
                            Enter the details of your new campaign here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newCampaign.name}
                                onChange={(e) =>
                                    setNewCampaign({
                                        ...newCampaign,
                                        name: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={newCampaign.description}
                                onChange={(e) =>
                                    setNewCampaign({
                                        ...newCampaign,
                                        description: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={addCampaign}>Create Campaign</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <Card key={campaign.id}>
                        <CardHeader>
                            <CardTitle>{campaign.name}</CardTitle>
                            <CardDescription>
                                Last played: {campaign.lastPlayed}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                {campaign.description}
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" asChild>
                                <Link href={`/campaign/${campaign.id}`}>
                                    Manage Campaign
                                </Link>
                            </Button>
                            <Button variant="secondary">Start Session</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
