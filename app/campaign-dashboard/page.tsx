import React from "react";
import { CampaignDashboard } from "@/components/campaign-dashboard";

const CampaignDashboardPage: React.FC = () => {
    return (
        <div className="min-h-screen p-4">
            <header className="shadow-md p-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Campaign Dashboard
                </h1>
            </header>
            <main>
                <CampaignDashboard />
            </main>
        </div>
    );
};

export default CampaignDashboardPage;
