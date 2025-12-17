import connectDB from '@/config/db';
import authSeller from '@/lib/authSeller';
import Product from '@/models/Product';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    try {
        const { userId } = getAuth(request);
        const { id } = params;

        // Check if user is a seller
        const isSeller = await authSeller(userId);
        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 403 });
        }

        await connectDB();

        // Find the product
        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        // Delete the product
        await Product.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}