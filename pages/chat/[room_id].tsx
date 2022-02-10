import * as React from 'react';
import { ChatLayout } from '@/components/templates/chat-layout';
import type { NextPageWithLayout } from '@/types/app.type';
import { useRouter } from 'next/router';
import api from '@/libs/axios';
import Cookies from 'js-cookie';
import { classNames } from '@/utils/helpers';
import { useWithWhoZustand } from '@/zustand/with-who';
import { FormChat } from '@/components/form-message/form';

type TMessage = {
    id: number;
    from: number;
    to: number;
    message: string;
    created_at: string;
};

type TPerson = {
    bio: string;
    created_at: string;
    email: string;
    email_verified_at: string | null;
    id: number;
    images: {}[];
    name: string;
    token: string | null;
};

type TData = {
    messages: TMessage[];
    self: TPerson | null;
    opponent: TPerson | null;
    room_id: string | number;
};

const ChattingPage: NextPageWithLayout = () => {
    const { setUser } = useWithWhoZustand();
    const { query, replace } = useRouter();
    const { room_id } = query;

    const [data, setData] = React.useState<TData>({
        messages: [],
        self: null,
        opponent: null,
        room_id: ''
    });

    React.useEffect(() => {
        if (room_id !== undefined) {
            const fetch = async () => {
                try {
                    const { data } = await api.get(`/room/${room_id}`, {
                        headers: {
                            Authorization: 'Bearer ' + Cookies.get('token')
                        }
                    });
                    setData(data.data);
                    setUser({ name: data.data.opponent.name });
                } catch (error) {
                    if (error instanceof Error) {
                        replace('/chat');
                    }
                }
            };
            fetch();
        }
    }, [room_id, replace, setUser]);

    const onHandleNewMessage = (newMessage: TMessage) => {
        setData(state => ({
            ...state,
            messages: [...state.messages, newMessage]
        }));
    };

    return (
        <div className="flex h-full flex-col justify-end space-y-2">
            {data.messages.map((message, i) => (
                <div
                    key={i}
                    className="flex w-full flex-col items-start px-4 pb-2"
                >
                    <div
                        className={classNames(
                            'flex w-full',
                            message.from !== data.self?.id
                                ? 'items-start justify-start'
                                : 'items-end justify-end'
                        )}
                    >
                        <div
                            className={classNames(
                                'rounded-lg px-4 py-2',
                                message.from !== data.self?.id
                                    ? 'bg-gray-100'
                                    : 'bg-rose-200'
                            )}
                        >
                            {message.message}
                        </div>
                    </div>
                </div>
            ))}
            <div className="border-t border-gray-100 py-3 px-4">
                <FormChat
                    room_id={data.room_id}
                    handleNewMessage={onHandleNewMessage}
                />
            </div>
        </div>
    );
};

ChattingPage.layoutProps = {
    meta: {
        title: 'Chat With '
    },
    Layout: ChatLayout
};

export default ChattingPage;
