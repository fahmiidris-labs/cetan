import Echo from 'laravel-echo';

if (typeof window !== 'undefined') {
    window.Pusher = require('pusher-js');

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.NEXT_PUBLIC_MIX_PUSHER_APP_KEY,
        cluster: process.env.NEXT_PUBLIC_MIX_PUSHER_APP_CLUSTER,
        forceTLS: true
    });
}
