import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        menu: [
            { slug: 'espresso', name: 'Espresso', price: 3 },
            { slug: 'latte', name: 'Café Latte', price: 5 },
            { slug: 'caramel-macchiato', name: 'Caramel Macchiato', price: 6 },
            { slug: 'croissant', name: 'Butter Croissant', price: 4 }
        ],
        options: [
            { id: 'opt-to-go', name: 'To Go' },
            { id: 'opt-for-here', name: 'For Here' }
        ]
    });
}
