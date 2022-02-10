import * as React from 'react';
import { ChatLayout } from '@/components/templates/chat-layout';
import type { NextPageWithLayout } from '@/types/app.type';

const ChatPage: NextPageWithLayout = () => {
    return <div></div>;
};

ChatPage.layoutProps = {
    meta: {
        title: 'Chat'
    },
    Layout: ChatLayout
};

export default ChatPage;
