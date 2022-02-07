import { ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type TMeta = {
    title?: string;
    metaTitle?: string;
    description?: string;
    metaDescription?: string;
};

export type TLayout = {
    children: ReactNode;
};

type TLayoutProps = {
    Layout?: ({ children }: TLayout) => JSX.Element;
    meta?: TMeta;
};

export type NextPageWithLayout = NextPage & {
    layoutProps?: TLayoutProps;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
