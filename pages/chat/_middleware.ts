import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
    const { token } = req.cookies;

    if (!token) return NextResponse.redirect('/login');
};
