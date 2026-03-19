import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const sessionId = body.session_id || `chat-${Math.random().toString(36).substring(7)}`;

    // Mock Barista Agent behavior
    const reply = "Excellent choice! A Caramel Macchiato is $6. May I have the name for your cup, your email for the receipt, and let me know if it's for here or to go?";

    return NextResponse.json({
        reply,
        session_id: sessionId,
        suggested_items: [
            { slug: 'caramel-macchiato', buyUrl: 'http://localhost:3000/api/buy/caramel-macchiato' }
        ],
        ready_to_buy: true,
        charity: false
    });
}
