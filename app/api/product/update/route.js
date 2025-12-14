import { v2 as cloudinary } from "cloudinary";
import { getAuth } from '@clerk/nextjs/server'
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function PUT(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        const formData = await request.formData()

        const productId = formData.get('productId');
        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        const whatsappNumber = formData.get('whatsappNumber');
        const existingImagesJson = formData.get('existingImages');
        const colorsJson = formData.get('colors');

        // Validate required fields
        if (!productId || !name || !description || !category || !price || !offerPrice) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 })
        }

        await connectDB()
        
        // Find the product to update
        const product = await Product.findById(productId);
        
        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 })
        }

        // Check if this is the product owner
        if (product.userId !== userId) {
            return NextResponse.json({ success: false, message: 'Not authorized to update this product' }, { status: 403 })
        }

        let image = [];
        
        // Check if we have new images to upload
        const files = formData.getAll('images');
        
        if (files && files.length > 0) {
            // Upload new images
            const result = await Promise.all(
                files.map(async (file) => {
                    const arrayBuffer = await file.arrayBuffer()
                    const buffer = Buffer.from(arrayBuffer)

                    return new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            { resource_type: 'auto' },
                            (error, result) => {
                                if (error) {
                                    reject(error)
                                } else {
                                    resolve(result)
                                }
                            }
                        )
                        stream.end(buffer)
                    })
                })
            )

            image = result.map(result => result.secure_url)
        } else if (existingImagesJson) {
            // Use existing images
            image = JSON.parse(existingImagesJson);
        } else {
            // Keep the current images
            image = product.image;
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                description,
                category,
                price: Number(price),
                offerPrice: Number(offerPrice),
                whatsappNumber,
                image,
                colors: colorsJson ? JSON.parse(colorsJson) : product.colors || [],
                // Don't update the date to keep the original creation date
            },
            { new: true } // Return the updated document
        );

        return NextResponse.json({ 
            success: true, 
            message: 'Product updated successfully', 
            product: updatedProduct 
        })

    } catch (error) {
        console.error('Error in product update:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}