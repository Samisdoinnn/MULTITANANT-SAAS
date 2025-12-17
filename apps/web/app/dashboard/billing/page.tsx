import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const invoices = [
    {
        invoice: "INV001",
        period: "October 2023",
        amount: 350.00,
        status: "Paid",
        date: "2023-11-01",
    },
    {
        invoice: "INV002",
        period: "September 2023",
        amount: 320.50,
        status: "Paid",
        date: "2023-10-01",
    },
    {
        invoice: "INV003",
        period: "August 2023",
        amount: 450.00,
        status: "Unpaid",
        date: "2023-09-01",
    },
    {
        invoice: "INV004",
        period: "July 2023",
        amount: 299.00,
        status: "Paid",
        date: "2023-08-01",
    },
    {
        invoice: "INV005",
        period: "June 2023",
        amount: 299.00,
        status: "Paid",
        date: "2023-07-01",
    },
]

export default function BillingPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gradient">Billing & Invoices</h2>
                    <p className="text-muted-foreground">Manage your billing history and download invoices.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Pro Tier</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            $299/mo + Usage
                        </p>
                        <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[65%]" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">65% of monthly limit used</p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Invoice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$342.12</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Next billing date: Dec 1, 2023
                        </p>
                        <Button size="sm" variant="outline" className="mt-4 w-full">View Details</Button>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">•••• 4242</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Visa ending in 4242
                        </p>
                        <Button size="sm" variant="outline" className="mt-4 w-full">Update Method</Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                    <CardDescription>A list of your recent invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        {invoice.invoice}
                                    </TableCell>
                                    <TableCell>{invoice.period}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={invoice.status === "Paid" ? "success" : "warning"}>
                                            {invoice.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
