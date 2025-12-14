import connectDB from '@/config/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { id } = params;

        await connectDB();

        // Find the product by ID
        const product = await Product.findById(id);
        
        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, product });

    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}