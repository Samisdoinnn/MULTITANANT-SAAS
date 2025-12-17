'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Zap } from "lucide-react";

const anomalies = [
    {
        id: 1,
        type: 'API Spike',
        severity: 'high',
        description: 'Unusual API traffic detected',
        value: '15.2k requests/hour',
        timestamp: '2 hours ago',
        icon: Zap,
    },
    {
        id: 2,
        type: 'Usage Anomaly',
        severity: 'medium',
        description: 'Storage usage increased by 40%',
        value: '+98 GB',
        timestamp: '5 hours ago',
        icon: TrendingUp,
    },
    {
        id: 3,
        type: 'Billing Alert',
        severity: 'low',
        description: 'Approaching monthly limit',
        value: '85% used',
        timestamp: '1 day ago',
        icon: AlertTriangle,
    },
];

export default function AnomaliesPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gradient">Anomaly Detection</h2>
                    <p className="text-muted-foreground">Monitor unusual patterns and potential issues.</p>
                </div>
            </div>

            <div className="grid gap-4">
                {anomalies.map((anomaly) => {
                    const Icon = anomaly.icon;
                    const severityColors = {
                        high: 'destructive',
                        medium: 'warning',
                        low: 'secondary',
                    };

                    return (
                        <Card key={anomaly.id} className="glass-card">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${anomaly.severity === 'high' ? 'bg-red-500/20' :
                                                anomaly.severity === 'medium' ? 'bg-amber-500/20' :
                                                    'bg-slate-500/20'
                                            }`}>
                                            <Icon className={`h-5 w-5 ${anomaly.severity === 'high' ? 'text-red-400' :
                                                    anomaly.severity === 'medium' ? 'text-amber-400' :
                                                        'text-slate-400'
                                                }`} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{anomaly.type}</CardTitle>
                                            <CardDescription>{anomaly.description}</CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant={severityColors[anomaly.severity as keyof typeof severityColors]}>
                                        {anomaly.severity}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold">{anomaly.value}</p>
                                        <p className="text-sm text-muted-foreground">{anomaly.timestamp}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {anomalies.length === 0 && (
                <Card className="glass-card">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-semibold">No anomalies detected</h3>
                            <p className="text-muted-foreground">
                                Your usage patterns look normal. We'll alert you if anything unusual is detected.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
