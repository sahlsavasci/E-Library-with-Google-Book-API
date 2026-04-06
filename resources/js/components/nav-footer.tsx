import { Link } from '@inertiajs/react';
import type { ComponentPropsWithoutRef } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup
            {...props}
            className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
        >
            <SidebarGroupContent className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/55 group-data-[collapsible=icon]:hidden">
                Resources
            </SidebarGroupContent>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            {toUrl(item.href).startsWith('http') ? (
                                <SidebarMenuButton
                                    asChild
                                    className="rounded-lg text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
                                >
                                    <a
                                        href={toUrl(item.href)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.icon && (
                                            <item.icon className="h-5 w-5" />
                                        )}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            ) : (
                                <SidebarMenuButton
                                    asChild
                                    className="rounded-lg text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && (
                                            <item.icon className="h-5 w-5" />
                                        )}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
