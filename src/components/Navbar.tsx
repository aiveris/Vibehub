"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Wrench, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Promptai", href: "/prompts", icon: Sparkles },
    { name: "Įrankiai", href: "/tools", icon: Wrench },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
            <div className="glass flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-2xl">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold gradient-text">VibeHub</span>
                </Link>

                <div className="flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-muted"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    ))}
                    <div className="w-[1px] h-4 bg-border mx-2" />
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted hover:text-white transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </nav>
    );
}
