import create from 'zustand';

type TUser = {
    name: string;
};

type TWithWho = {
    user: TUser | null;
    setUser: (user: TUser) => void;
};

export const useWithWhoZustand = create<TWithWho>(set => ({
    user: null,
    setUser: user =>
        set(state => ({
            user
        }))
}));
