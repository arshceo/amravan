import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

function getProducts() {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(jsonData);
}

function saveProducts(products) {
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
}

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const products = getProducts();
    
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...body,
      rating: Number(body.rating) || 0,
      reviews: Number(body.reviews) || 0,
      price: Number(body.price) || 0,
      originalPrice: Number(body.originalPrice) || 0,
    };
    
    products.push(newProduct);
    saveProducts(products);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
