import * as React from 'react';
import { useAuthZustand } from '@/zustand/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { HiChevronDown, HiDotsHorizontal, HiSearch } from 'react-icons/hi';
import { Dropdown } from '../molecules/dropdown';
import { useWithWhoZustand } from '@/zustand/with-who';
import { Link } from '../atoms/link';
import { TRoom } from '@/types/auth.type';

export const Navbar = ({ room }: { room: TRoom[] }) => {
    const router = useRouter();
    const { user, setUser } = useAuthZustand();
    const withWho = useWithWhoZustand();
    const [unRead, setUnRead] = React.useState<number>(0);

    React.useEffect(() => {
        const token = Cookies.get('token');
        const name = localStorage.getItem('name');
        if (!!token && !!name) {
            setUser({
                name,
                token
            });
        }
    }, [setUser]);

    React.useEffect(() => {
        let counter: number = 0;
        room.map((item, i) => {
            const result = item.messages.filter(
                data => data.to === item.self.id && data.seen === false
            ).length;
            if (result > 0) {
                counter += result;
            }
        });
        setUnRead(counter);
    }, [room]);

    console.info(unRead);

    const handleLogout = async () => {
        Cookies.remove('token');
        localStorage.removeItem('name');
        router.push('/login');
    };

    return (
        <nav className="absolute inset-x-0 top-0 z-30 col-span-3 border-b border-gray-100 bg-white">
            <div className="flex h-16 w-full items-center">
                <div className="grid w-full grid-cols-3">
                    <div className="flex items-center justify-between pl-4 pr-3">
                        <div>
                            <h1 className="text-base font-semibold text-gray-600">
                                Cetan Message
                            </h1>
                            <p className="text-xs text-gray-400">
                                {unRead} unread message
                            </p>
                        </div>
                        <div className="">
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <button className="flex items-center text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                                        <div>
                                            {user?.name
                                                .split(' ')[0]
                                                .replace(
                                                    /(\w)(\w*)/g,
                                                    function (g0, g1, g2) {
                                                        return (
                                                            g1.toUpperCase() +
                                                            g2.toLowerCase()
                                                        );
                                                    }
                                                )}
                                        </div>
                                        <div className="ml-1">
                                            <HiChevronDown className="h-4 w-4 fill-current" />
                                        </div>
                                    </button>
                                }
                            >
                                {/* Authentication */}
                                <Dropdown.Button>My Profile</Dropdown.Button>
                                <Dropdown.Button onClick={() => handleLogout()}>
                                    Logout
                                </Dropdown.Button>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-between pr-4">
                        <Link href={'/'} className="pl-6 text-sm font-semibold">
                            {withWho.user?.name.replace(
                                /(\w)(\w*)/g,
                                function (g0, g1, g2) {
                                    return g1.toUpperCase() + g2.toLowerCase();
                                }
                            )}
                        </Link>
                        <div className="flex items-center space-x-1">
                            <button
                                type="button"
                                className="rounded-full p-2 duration-200 ease-in-out hover:bg-gray-100"
                            >
                                <HiSearch className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="rounded-full p-2 duration-200 ease-in-out hover:bg-gray-100"
                            >
                                <HiDotsHorizontal className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
