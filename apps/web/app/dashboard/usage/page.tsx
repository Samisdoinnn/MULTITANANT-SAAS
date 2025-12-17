'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function UsagePage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gradient">Usage & Metering</h2>
                    <p className="text-muted-foreground">Track your API consumption and resource usage.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-card bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
                        <Activity className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatNumber(1223454)}</div>
                        <p className="text-xs text-muted-foreground">
                            This billing cycle
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                        <BarChart3 className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">245 GB</div>
                        <p className="text-xs text-muted-foreground">
                            of 500 GB limit
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bandwidth</CardTitle>
                        <TrendingUp className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.2 TB</div>
                        <p className="text-xs text-muted-foreground">
                            This month
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card bg-gradient-to-br from-orange-500/10 to-red-500/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Peak Usage</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15.2k/hr</div>
                        <p className="text-xs text-muted-foreground">
                            Yesterday at 3 PM
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Usage Breakdown by Service</CardTitle>
                    <CardDescription>Detailed breakdown of your resource consumption</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: 'API Requests', usage: 1223454, limit: 2000000, color: 'bg-blue-500' },
                            { name: 'Database Queries', usage: 856234, limit: 1500000, color: 'bg-emerald-500' },
                            { name: 'Storage (GB)', usage: 245, limit: 500, color: 'bg-purple-500' },
                            { name: 'Bandwidth (GB)', usage: 1200, limit: 2000, color: 'bg-orange-500' },
                        ].map((service) => {
                            const percentage = (service.usage / service.limit) * 100;
                            return (
                                <div key={service.name} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{service.name}</span>
                                        <span className="text-muted-foreground">
                                            {formatNumber(service.usage)} / {formatNumber(service.limit)}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${service.color} transition-all duration-500`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
