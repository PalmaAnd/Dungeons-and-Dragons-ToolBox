"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
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

type Campaign = {
    id: number;
    name: string;
    description: string;
};

export default function CampaignManager() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [newCampaign, setNewCampaign] = useState({
        name: "",
        description: "",
    });

    const addCampaign = () => {
        if (newCampaign.name) {
            setCampaigns([...campaigns, { ...newCampaign, id: Date.now() }]);
            setNewCampaign({ name: "", description: "" });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Campaign Manager</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mb-6">Create New Campaign</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Campaign</DialogTitle>
                        <DialogDescription>
                            Enter the details of your new campaign here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input
                            placeholder="Campaign Name"
                            value={newCampaign.name}
                            onChange={(e) =>
                                setNewCampaign({
                                    ...newCampaign,
                                    name: e.target.value,
                                })
                            }
                        />
                        <Textarea
                            placeholder="Campaign Description"
                            value={newCampaign.description}
                            onChange={(e) =>
                                setNewCampaign({
                                    ...newCampaign,
                                    description: e.target.value,
                                })
                            }
                        />
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
                        </CardHeader>
                        <CardContent>
                            <p>{campaign.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline">Manage Campaign</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
