import * as React from 'react';
import { classNames } from '@/utils/helpers';

type TInput = React.InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    changeHandle: React.ChangeEventHandler;
};

export const Input = ({
    type = 'text',
    inputMode = 'text',
    name,
    value,
    className,
    autoComplete,
    placeholder,
    required,
    isFocused = false,
    changeHandle
}: TInput) => {
    const input = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                inputMode={inputMode}
                name={name}
                value={value}
                className={classNames(
                    'rounded-lg border border-gray-300 text-sm duration-200 ease-in-out focus:border-gray-300 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2',
                    className
                )}
                placeholder={placeholder}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={e => changeHandle(e)}
                style={{ outline: 'none' }}
            />
        </div>
    );
};
