import { HiArrowCircleLeft } from 'react-icons/hi';

import { Link } from '@/components/atoms/link';
import { LogoType } from '@/components/atoms/logo';

import type { NextPageWithLayout } from '@/types/app.type';

const Custom404: NextPageWithLayout = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-lg space-y-4 p-4 md:p-10">
                <Link href="/">
                    <LogoType className="mx-auto h-12 w-auto" />
                </Link>
                <h2 className="mt-4 text-center text-2xl font-extrabold text-gray-800">
                    404 Page Not Found!
                </h2>
                <p className="my-2 text-center text-sm text-gray-600">
                    Opps! Sorry, The page you are visiting does not exist.
                </p>
                <div className="relative mt-4">
                    <Link
                        href="/"
                        className="group inline-flex w-full items-center justify-center rounded-lg bg-gray-700 py-3 text-sm font-semibold text-white duration-200 ease-in-out hover:bg-gray-800 hover:ring-2 hover:ring-cyan-400 hover:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <HiArrowCircleLeft className="h-5 w-5" />
                        </span>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

Custom404.layoutProps = {
    meta: {
        title: '404 Page Not Found!'
    }
};

export default Custom404;
