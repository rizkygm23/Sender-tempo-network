import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();

    // Return immediate buy URL
    return NextResponse.json({
        reply: "Got it! Here is the link to pay for your Espresso.",
        ready_to_buy: true,
        buyUrl: "http://localhost:3000/api/buy/espresso?qty=1&name=Mike"
    });
}
