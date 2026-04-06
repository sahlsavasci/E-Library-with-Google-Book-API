import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    onClear?: () => void;
}

export default function SearchBar({
    value,
    placeholder = 'Cari buku...',
    onChange,
    onClear,
}: SearchBarProps) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Search className="size-4" />
                <span>Cari Buku</span>
            </div>

            <div className="flex flex-1 items-center gap-2">
                <Input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                />

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        onChange('');
                        onClear?.();
                    }}
                    disabled={!value}
                >
                    <X className="size-4" />
                    Reset
                </Button>
            </div>
        </div>
    );
}
