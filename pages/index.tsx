import * as React from 'react';
import type { NextPageWithLayout } from '@/types/app.type';

const HomePage: NextPageWithLayout = () => {
    return <div>Home Page</div>;
};

HomePage.layoutProps = {
    meta: {
        title: 'Home'
    }
};

export default HomePage;
