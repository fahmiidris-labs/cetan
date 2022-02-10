/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'ui-avatars.com', 'drive.google.com']
    }
    // async redirects() {
    //     return require('./redirects.json');
    // }
};

module.exports = nextConfig;
