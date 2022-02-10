import create from 'zustand';

type TUser = {
    name: string;
    token?: string;
};

type TAuthZustand = {
    user: TUser | null;
    setUser: (user: TUser) => void;
};

export const useAuthZustand = create<TAuthZustand>(set => ({
    user: null,
    setUser: user =>
        set(state => ({
            user
        }))
}));
