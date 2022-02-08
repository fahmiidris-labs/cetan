import '@/assets/css/main.css';

import Head from 'next/head';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import { Title } from '@/components/title';
import { RootLayout } from '@/components/templates/root-layout';
import type { AppPropsWithLayout } from '@/types/app.type';
import { MetaTag } from '@/components/meta-tag';

const progress = new ProgressBar({
    size: 2,
    color: '#22d3ee',
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
            {/* <AuthProvider> */}
            <Layout {...layoutProps}>
                <Component {...pageProps} />
            </Layout>
            {/* </AuthProvider> */}
        </>
    );
};

export default MyApp;
