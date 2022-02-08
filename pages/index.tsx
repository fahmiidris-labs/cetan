import type { NextPageWithLayout } from '@/types/app.type';

const Home: NextPageWithLayout = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <h1>Hello Next.js</h1>
        </div>
    );
};

Home.layoutProps = {
    meta: {
        title: 'Sign In'
    }
};

export default Home;
