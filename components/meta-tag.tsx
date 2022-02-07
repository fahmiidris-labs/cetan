import socialCardLarge from '@/assets/images/social-card-large.png';

type TMeta = {
    description: string;
    pathname: string;
};

export const MetaTag = ({ description, pathname }: TMeta) => {
    return (
        <>
            <meta
                key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta key="twitter:site" name="twitter:site" content="@akusiap" />
            <meta
                key="twitter:description"
                name="twitter:description"
                content={description}
            />
            <meta
                key="twitter:image"
                name="twitter:image"
                content={`https://akusiap.com${socialCardLarge}`}
            />
            <meta
                key="twitter:creator"
                name="twitter:creator"
                content="@FahmiIdrisA"
            />
            <meta
                key="og:url"
                property="og:url"
                content={`https://akusiap.com${pathname}`}
            />
            <meta key="og:type" property="og:type" content="article" />
            <meta
                key="og:description"
                property="og:description"
                content={description}
            />
            <meta
                key="og:image"
                property="og:image"
                content={`https://akusiap.com${socialCardLarge}`}
            />
        </>
    );
};
