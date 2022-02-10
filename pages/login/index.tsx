import * as React from 'react';
import { HiLogin } from 'react-icons/hi';
import { Link } from '@/components/atoms/link';
import { LogoType } from '@/components/atoms/logo';
import { AuthLayout } from '@/components/templates/auth-layout';
import { Label } from '@/components/atoms/label';
import { Input } from '@/components/atoms/input';
import { Checkbox } from '@/components/atoms/checkbox';
import type { NextPageWithLayout } from '@/types/app.type';
import type {
    TLoginInitialState,
    TLoginResponseSuccess
} from '@/types/auth.type';
import api from '@/libs/axios';
import { useAuthZustand } from '@/zustand/auth';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const LoginPage: NextPageWithLayout = () => {
    const { setUser } = useAuthZustand();
    const router = useRouter();

    const initialState: TLoginInitialState = {
        email: '',
        password: '',
        remember_me: false
    };

    const [loading, setLoading] = React.useState<boolean>(false);
    const [credentials, setCredentials] =
        React.useState<TLoginInitialState>(initialState);

    const onChangeHandle = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCredentials(state => ({
            ...state,
            [event.target.name]:
                event.target.type === 'checkbox'
                    ? event.target.checked
                        ? true
                        : false
                    : event.target.value
        }));
    };

    const onSubmitHandle = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post<{ data: TLoginResponseSuccess }>(
                '/login',
                credentials
            );
            localStorage.setItem('name', data.data.name);
            Cookies.set('token', data.data.token);
            setUser({ name: data.data.name, token: data.data.token });
            router.push('/chat');
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <Link href="/login">
                    <LogoType className="mx-auto h-10 w-auto" color="black" />
                </Link>
                <h2 className="font-gilroy mt-3 text-center text-2xl font-semibold capitalize text-gray-900">
                    Sign in into your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link
                        href="/register"
                        className="font-medium text-rose-500 hover:text-rose-400"
                    >
                        You don&apos;t have an account yet?
                    </Link>
                </p>
            </div>
            <form className="mt-6 space-y-6" onSubmit={onSubmitHandle}>
                <div className="space-y-3">
                    <div>
                        <Label htmlFor="email" value="Email address" />
                        <Input
                            type="text"
                            inputMode="email"
                            name="email"
                            id="email"
                            className="mt-1 block w-full"
                            placeholder="example@gmail.com"
                            changeHandle={onChangeHandle}
                            value={credentials.email}
                            isFocused={true}
                        />
                        <p className="pt-1 text-xs">
                            Make sure the email you use is an active email.
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="password" value="Password" />
                        <Input
                            type="password"
                            inputMode="text"
                            name="password"
                            id="password"
                            className="mt-1 block w-full"
                            changeHandle={onChangeHandle}
                            value={credentials.password}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember_me"
                                changeHandle={onChangeHandle}
                                checked={credentials.remember_me}
                            />
                            <span className="font-pop ml-3 cursor-pointer select-none text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>
                    <div className="text-sm">
                        <Link
                            href="/forgot-password"
                            className="font-medium text-rose-500 hover:text-rose-400"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-lg border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-white duration-200 ease-in-out hover:bg-rose-600 hover:ring-2 hover:ring-rose-500 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-75"
                        disabled={loading}
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <HiLogin
                                className="h-5 w-5 text-rose-400 group-hover:text-rose-300"
                                aria-hidden="true"
                            />
                        </span>
                        {!loading ? 'Sign in' : 'Loading ...'}
                    </button>
                </div>
            </form>
        </>
    );
};

LoginPage.layoutProps = {
    meta: {
        title: 'Sign In'
    },
    Layout: AuthLayout
};

export default LoginPage;
