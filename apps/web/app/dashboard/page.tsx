import { StatsCards } from "@/components/dashboard/stats-cards";
import { UsageChart } from "@/components/dashboard/usage-chart";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gradient">Dashboard</h2>
                    <p className="text-muted-foreground">Overview of your API usage and billing.</p>
                </div>
            </div>
            <StatsCards />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <UsageChart />
                <Card className="col-span-3 glass-card">
                    <CardHeader>
                        <CardTitle>Recent Invoices</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentInvoices />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
