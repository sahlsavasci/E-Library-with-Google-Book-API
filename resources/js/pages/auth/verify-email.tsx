// Components
import { Form, Head } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Verifikasi email" />

            {status === 'verification-link-sent' && (
                <Alert className="mb-4 border-green-200/80 bg-green-50/80 text-green-900 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-100">
                    <Info className="size-4" />
                    <AlertDescription>
                        Link verifikasi baru sudah dikirim ke alamat email yang kamu gunakan saat
                        pendaftaran.
                    </AlertDescription>
                </Alert>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            Kirim ulang verifikasi email
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm"
                        >
                            Keluar
                        </TextLink>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Verifikasi email',
    description:
        'Verifikasi email diperlukan agar akunmu siap digunakan sepenuhnya di dalam aplikasi E-Library.',
};
