import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl border border-sidebar-border/70 bg-sidebar-primary text-sidebar-primary-foreground shadow-xs">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-2 grid flex-1 text-left">
                <span className="truncate text-sm leading-tight font-semibold text-sidebar-foreground">
                    E-Library
                </span>
                <span className="truncate text-xs text-sidebar-foreground/70">
                    Bookshelf Pribadi
                </span>
            </div>
        </>
    );
}
