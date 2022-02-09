import * as React from 'react';

type TCheckbox = React.InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    changeHandle: React.ChangeEventHandler;
};

export const Checkbox = ({ name, value, changeHandle }: TCheckbox) => {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="cursor-pointer rounded border-gray-300 text-rose-500 duration-100 ease-in-out focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            onChange={e => changeHandle(e)}
        />
    );
};
