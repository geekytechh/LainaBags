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

// Route segment config - New Next.js App Router format
export const maxDuration = 60; // Maximum duration in seconds
export const dynamic = 'force-dynamic'; // Disable static optimization
export const runtime = 'nodejs'; // Use Node.js runtime for larger payloads

export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        const formData = await request.formData()

        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const subsection = formData.get('subsection');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        const whatsappNumber = formData.get('whatsappNumber');
        const colorsJson = formData.get('colors');
        const colorVariantsJson = formData.get('colorVariants');
        const isBestseller = formData.get('isBestseller') === 'true';

        // Validate required fields
        if (!name || !description || !category || !price || !offerPrice) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 })
        }

        const files = formData.getAll('images');

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: 'no files uploaded' }, { status: 400 })
        }

        // Upload main product images
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

        const image = result.map(result => result.secure_url)

        // Handle color variants
        let colorVariants = [];
        if (colorVariantsJson) {
            const variantsData = JSON.parse(colorVariantsJson);

            // Upload images for each color variant
            colorVariants = await Promise.all(
                variantsData.map(async (variant) => {
                    const variantFiles = formData.getAll(`variant_${variant.color}`);

                    if (variantFiles && variantFiles.length > 0) {
                        const variantResults = await Promise.all(
                            variantFiles.map(async (file) => {
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
                        );

                        const variantImages = variantResults.map(r => r.secure_url);

                        return {
                            color: variant.color,
                            images: variantImages
                        };
                    }
                    return null;
                })
            );

            // Filter out null values
            colorVariants = colorVariants.filter(v => v !== null);
        }

        await connectDB()
        const newProduct = await Product.create({
            userId,
            name,
            description,
            category,
            subsection: subsection || "",
            price: Number(price),
            offerPrice: Number(offerPrice),
            whatsappNumber,
            image,
            colors: colorsJson ? JSON.parse(colorsJson) : [],
            colorVariants: colorVariants,
            isBestseller: isBestseller,
            date: Date.now()
        })

        return NextResponse.json({ success: true, message: 'Upload successful', newProduct })

    } catch (error) {
        console.error('Error in product creation:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}
