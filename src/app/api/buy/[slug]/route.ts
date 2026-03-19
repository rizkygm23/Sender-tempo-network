import { Mppx, tempo } from 'mppx/server';
import { NextResponse } from 'next/server';

const mppx = Mppx.create({
    methods: [
        tempo({
            currency: '0x20c0000000000000000000000000000000000000', // USDC dummy
            recipient: '0x742d35Cc6634c0532925a3b844bC9e7595F8fE00',
        }),
    ],
});

export async function GET(request: Request, context: any) {
    const { searchParams } = new URL(request.url);
    const qty = parseInt(searchParams.get('qty') || '1');
    const pricePerItem = 6; // Example base price for coffee orders

    const paymentResponse = await mppx.charge({ amount: (qty * pricePerItem).toString() })(request);
    if (paymentResponse.status === 402) {
        return paymentResponse.challenge;
    }

    // Payment successful!
    return paymentResponse.withReceipt(
        NextResponse.json({
            pickupCode: `COFFEE-${Math.floor(Math.random() * 10000)}`,
            status: 'Paid successfully',
            message: 'Listen for your number at the counter.'
        })
    );
}
