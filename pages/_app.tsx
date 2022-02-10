import '@/assets/css/main.css';

import '@/libs/realtime';

import * as React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import { Title } from '@/components/title';
import { MetaTag } from '@/components/meta-tag';
import { RootLayout } from '@/components/templates/root-layout';
import type { AppPropsWithLayout } from '@/types/app.type';

const progress = new ProgressBar({
    size: 2,
    color: '#f43f5e',
    className: 'bar-of-progress',
    delay: 100
});

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
    progress.start();
    progress.finish();
}

Router.events.on('routeChangeStart', () => progress.start());
Router.events.on('routeChangeComplete', () => progress.finish());
Router.events.on('routeChangeError', () => progress.finish());

const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
    const Layout = Component.layoutProps?.Layout || RootLayout;
    const layoutProps = Component.layoutProps?.Layout
        ? { layoutProps: Component.layoutProps }
        : {};
    const meta = Component.layoutProps?.meta || {};
    const description =
        meta.metaDescription || meta.description || 'Website for Chatting.';

    return (
        <>
            <Title suffix="Cetan Web App">{meta.metaTitle || meta.title}</Title>
            <Head>
                <MetaTag description={description} pathname={router.pathname} />
            </Head>
            <Layout {...layoutProps}>
                <Component {...pageProps} />
            </Layout>
        </>
    );
};

export default MyApp;
