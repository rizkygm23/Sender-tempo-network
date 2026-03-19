import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { paymentMethod, amount, currency } = body;

    if (!paymentMethod || !amount || !currency) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate a mock Shared Payment Token for preview purposes
    const spt = `spt_${Math.random().toString(36).substring(2, 15)}`;

    return NextResponse.json({
        spt,
        expiresAt: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
        metadata: {
            note: "Generated via mock SPT endpoint for testing."
        }
    });
}
