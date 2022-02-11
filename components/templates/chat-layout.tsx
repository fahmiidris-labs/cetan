import * as React from 'react';
import Image from 'next/image';
import { Link } from '../atoms/link';
import type { TLayout } from '@/types/app.type';
import type { TRoom } from '@/types/auth.type';
import { Navbar } from '../organisms/navbar';
import api from '@/libs/axios';
import Cookies from 'js-cookie';
import { classNames } from '@/utils/helpers';
import { useRouter } from 'next/router';

export const ChatLayout = ({ children }: TLayout) => {
    // console.log('Chat Layout');

    const { query } = useRouter();
    const { room_id } = query;
    const [id, setId] = React.useState<string | number>(0);
    const [room, setRoom] = React.useState<TRoom[]>([] as TRoom[]);

    React.useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await api.get<TRoom[]>('/room', {
                    headers: {
                        Authorization: 'Bearer ' + Cookies.get('token')
                    }
                });
                setRoom(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.info(error.message);
                }
            }
        };
        fetch();
    }, []);

    React.useEffect(() => {
        if (id) {
            const fetch = async () => {
                try {
                    const { data } = await api.get<TRoom[]>('/room', {
                        headers: {
                            Authorization: 'Bearer ' + Cookies.get('token')
                        }
                    });
                    // console.log(data);
                    setRoom(data);
                } catch (error) {
                    if (error instanceof Error) {
                        console.info(error.message);
                    }
                }
            };
            fetch();
        }
    }, [id]);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.Echo.channel('Cetan-app').listen(
                '.message-notification',
                (e: any) => {
                    if (e && e != undefined) {
                        console.log('socket received', e);
                        if (room.length > 0) {
                            if (
                                e.to === room[0].self.id ||
                                e.room === Number(room_id)
                            ) {
                                setId(e.id);
                            }
                        }
                    }
                }
            );
        }
    }, [room, room_id]);

    return (
        <div className="container relative max-h-screen">
            <div className="relative grid grid-cols-3 border-x border-gray-100">
                <Navbar room={room} />
                <aside className="relative flex flex-col">
                    <div className="scroll h-screen overflow-y-auto pt-16">
                        <div className="grid grid-cols-1 divide-y-[0.5px] divide-gray-100">
                            {room.map((item, index) => {
                                return (
                                    <Link
                                        href={`/chat/${item.room_id}`}
                                        key={index}
                                        className={classNames(
                                            'flex items-center space-x-3 px-4 py-3 transition-colors duration-100 ease-in-out hover:bg-gray-100',
                                            Number(room_id) == item.room_id &&
                                                'bg-gray-100'
                                        )}
                                    >
                                        <div className="relative aspect-square h-12 flex-none overflow-hidden rounded-full">
                                            <Image
                                                src={
                                                    item.opponent.images
                                                        .length > 0
                                                        ? item.opponent
                                                              .images[0]
                                                              .image_url
                                                        : `https://ui-avatars.com/api/?name=${item.opponent.name}&background=random&color=FFFFFF`
                                                }
                                                alt="profile pict"
                                                layout="fill"
                                                className="object-cover object-center"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <div className="flex items-center justify-between">
                                                <h2 className="truncate text-base">
                                                    {item.opponent.name.replace(
                                                        /(\w)(\w*)/g,
                                                        function (g0, g1, g2) {
                                                            return (
                                                                g1.toUpperCase() +
                                                                g2.toLowerCase()
                                                            );
                                                        }
                                                    )}
                                                </h2>
                                                <div className="text-[10px] text-gray-400">
                                                    {item.messages.length > 0 &&
                                                        item.messages[
                                                            item.messages
                                                                .length - 1
                                                        ].created_at}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="truncate text-xs text-gray-400">
                                                    {item.messages.length > 0 &&
                                                        item.messages[
                                                            item.messages
                                                                .length - 1
                                                        ].message}
                                                </p>
                                                <div className="text-[10px] text-gray-400">
                                                    {
                                                        item.messages.filter(
                                                            data =>
                                                                data.to ===
                                                                    item.self
                                                                        .id &&
                                                                data.seen ===
                                                                    false
                                                        ).length
                                                    }{' '}
                                                    unread
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </aside>
                <main className="col-span-2 flex h-screen flex-col overflow-auto border-l border-gray-100">
                    <div className="h-full pt-16">{children}</div>
                </main>
            </div>
        </div>
    );
};
