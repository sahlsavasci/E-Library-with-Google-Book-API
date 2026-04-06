import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-6 py-10 md:px-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_32%),radial-gradient(circle_at_bottom,rgba(234,179,8,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_30%),radial-gradient(circle_at_bottom,rgba(250,204,21,0.05),transparent_24%)]" />

            <div className="relative w-full max-w-md">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-5 text-center">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-3 font-medium"
                        >
                            <div className="flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-background/90 shadow-sm backdrop-blur">
                                <AppLogoIcon className="size-8 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700 dark:text-amber-300">
                                    E-Library
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Digital Reading Space
                                </p>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2.5">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {title}
                            </h1>
                            <p className="text-sm leading-6 text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-card/95 p-6 shadow-sm backdrop-blur md:p-7">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
