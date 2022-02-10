import * as React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoMarkGithub } from 'react-icons/go';
import { useRouter } from 'next/router';
import type { TLayout } from '@/types/app.type';

type TContinueWith = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    processing?: boolean;
};

export const AuthLayout = ({ children }: TLayout) => {
    console.log('Auth Layout');
    const { pathname } = useRouter();

    const isShow: boolean = pathname === '/login' || pathname === '/register';

    return (
        <main>
            <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-6">{children}</div>
                {isShow && (
                    <div className="w-full max-w-md pt-5">
                        <h4 className="mb-4 text-center text-sm font-semibold">
                            Or continue with
                        </h4>
                        <div className="flex w-full flex-col justify-center space-y-3">
                            {/*  */}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};
