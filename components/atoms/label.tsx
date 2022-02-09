import * as React from 'react';
import { classNames } from '@/utils/helpers';

type TLable = React.LabelHTMLAttributes<HTMLLabelElement> & {
    value: string;
};

export const Label = ({ htmlFor, value, className, children }: TLable) => {
    return (
        <label
            htmlFor={htmlFor}
            className={classNames(
                className,
                'block text-sm font-semibold text-gray-700'
            )}
        >
            {value ? value : { children }}
        </label>
    );
};
