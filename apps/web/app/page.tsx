import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <main className="z-10 text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-6xl font-extrabold tracking-tight text-gradient">
          SaaS Billing Platform
        </h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive multi-tenant usage metering and billing solution for modern enterprises.
          Real-time visibility, accurate invoices, and powerful analytics.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="glass bg-white/10 hover:bg-white/20 text-lg h-14 px-8">
              Get Started
            </Button>
          </Link>
          <Link href="https://github.com/shameerkhan/saas-billing" target="_blank">
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-black/20 border-white/10 hover:bg-black/40">
              View Code
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
