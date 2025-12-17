'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    CreditCard,
    BarChart3,
    Settings,
    ShieldAlert,
    LogOut,
    User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    const routes = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: '/dashboard',
            active: pathname === '/dashboard',
        },
        {
            label: 'Usage & Metering',
            icon: BarChart3,
            href: '/dashboard/usage',
            active: pathname === '/dashboard/usage',
        },
        {
            label: 'Billing & Invoices',
            icon: CreditCard,
            href: '/dashboard/billing',
            active: pathname === '/dashboard/billing',
        },
        {
            label: 'Anomalies',
            icon: ShieldAlert,
            href: '/dashboard/anomalies',
            active: pathname === '/dashboard/anomalies',
        },
        {
            label: 'Settings',
            icon: Settings,
            href: '/dashboard/settings',
            active: pathname === '/dashboard/settings',
        },
    ];

    return (
        <div className={cn("pb-12 min-h-screen w-64 border-r border-white/10 glass bg-card/30 hidden md:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-2xl font-bold tracking-tight text-gradient">
                        SaaS Meter
                    </h2>
                    <div className="space-y-1 mt-8">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                size="sm"
                                variant={route.active ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start",
                                    route.active && "bg-white/10 text-white"
                                )}
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 px-3 w-full">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 mb-4">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        JD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium leading-none text-white truncate">John Doe</p>
                        <p className="text-xs text-muted-foreground truncate">acme-corp</p>
                    </div>
                </div>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
            </div>
        </div>
    );
}
