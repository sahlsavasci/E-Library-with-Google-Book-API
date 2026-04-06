import { Link } from '@inertiajs/react';
import { BookCopy, BookOpenText, LayoutGrid, SquarePen } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Buku',
        href: '/books',
        icon: BookCopy,
    },
    {
        title: 'Tambah Buku',
        href: '/books/create',
        icon: SquarePen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Halaman Utama',
        href: '/',
        icon: BookOpenText,
    },
    {
        title: 'Google Books API',
        href: 'https://developers.google.com/books/docs/v1/using',
        icon: BookCopy,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="gap-3 px-3 pt-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="rounded-xl border border-sidebar-border/60 bg-sidebar-accent/20 px-2.5 shadow-xs transition-colors hover:bg-sidebar-accent/40"
                            asChild
                        >
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarSeparator className="mx-0" />
            </SidebarHeader>

            <SidebarContent className="px-1 py-1">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="px-3 pb-3">
                <SidebarSeparator className="mx-0" />
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
