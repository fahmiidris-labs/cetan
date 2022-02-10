import api from '@/libs/axios';
import Cookies from 'js-cookie';
import * as React from 'react';
import { MdOutlineAttachFile, MdOutlineSend } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Input } from '../atoms/input';

type TNewMessage = {
    room_id: number | string;
    message: string;
};

type TMessage = {
    id: number;
    from: number;
    to: number;
    message: string;
    created_at: string;
};

export const FormChat = ({
    room_id,
    handleNewMessage
}: {
    room_id: string | number;
    handleNewMessage: (newMessage: TMessage) => void;
}) => {
    const [newMessage, setNewMessage] = React.useState<TNewMessage>({
        room_id: '',
        message: ''
    });

    const [loading, setLoading] = React.useState<boolean>(false);

    const onChangeHandle = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewMessage(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    React.useEffect(() => {
        if (room_id) {
            setNewMessage(state => ({
                ...state,
                room_id: room_id
            }));
        }
    }, [room_id]);

    const onHandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/message', newMessage, {
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('token')
                }
            });
            handleNewMessage(data.data);
            setNewMessage(state => ({
                ...state,
                message: ''
            }));
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                console.info(error.message);
                setLoading(false);
            }
        }
    };

    return (
        <form className="flex items-center space-x-3" onSubmit={onHandleSubmit}>
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-transparent p-2 duration-200 ease-in-out hover:bg-gray-100"
            >
                <MdOutlineAttachFile className="h-5 w-5 rotate-45" />
            </button>
            <div className="w-full">
                <Input
                    changeHandle={onChangeHandle}
                    value={newMessage.message}
                    name="message"
                    id="message"
                    placeholder="Type a message"
                    className="block w-full"
                />
            </div>
            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg border border-transparent p-2 duration-200 ease-in-out hover:bg-rose-200"
                disabled={loading}
            >
                {loading ? (
                    <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
                ) : (
                    <MdOutlineSend className="h-5 w-5" />
                )}
            </button>
        </form>
    );
};
