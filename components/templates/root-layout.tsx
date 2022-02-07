import { TLayout } from '@/types/app.type';

export const RootLayout = ({ children }: TLayout) => {
    console.log('Root Layout');

    return (
        <main className="flex min-h-screen w-full flex-col">{children}</main>
    );
};
