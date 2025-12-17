import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, Users, Zap } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function StatsCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="glass-card bg-gradient-to-br from-indigo-500/10 to-purple-500/10 hover:shadow-indigo-500/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <CreditCard className="h-4 w-4 text-indigo-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(45231.89)}</div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p>
                </CardContent>
            </Card>
            <Card className="glass-card bg-gradient-to-br from-emerald-500/10 to-teal-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
                    <Users className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(2350)}</div>
                    <p className="text-xs text-muted-foreground">
                        +180 new subcriptions
                    </p>
                </CardContent>
            </Card>
            <Card className="glass-card bg-gradient-to-br from-orange-500/10 to-red-500/10 hover:shadow-orange-500/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                    <Activity className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatNumber(1223454)}</div>
                    <p className="text-xs text-muted-foreground">
                        +19% from last month
                    </p>
                </CardContent>
            </Card>
            <Card className="glass-card bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Latency</CardTitle>
                    <Zap className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">24ms</div>
                    <p className="text-xs text-muted-foreground">
                        -4ms from last week
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
