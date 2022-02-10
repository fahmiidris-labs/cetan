import NextDocument, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
    DocumentInitialProps
} from 'next/document';
import { Favicon } from '@/components/favicon';

export default class Document extends NextDocument {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps: DocumentInitialProps =
            await NextDocument.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html
                lang="en"
                className={`[--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]`}
            >
                <Head>
                    <Favicon />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="font-sans text-gray-700 antialiased">
                    <Main />
                    <NextScript />
                    <script></script>
                </body>
            </Html>
        );
    }
}
