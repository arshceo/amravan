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

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const products = getProducts();
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const body = await request.json();
    let products = getProducts();
    
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    products[index] = { 
      ...products[index], 
      ...body,
      id, // ensure ID doesn't change
      rating: Number(body.rating) || products[index].rating,
      reviews: Number(body.reviews) || products[index].reviews,
      price: Number(body.price) || products[index].price,
      originalPrice: Number(body.originalPrice) || products[index].originalPrice,
    };
    
    saveProducts(products);
    
    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    let products = getProducts();
    
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    
    if (products.length === initialLength) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    saveProducts(products);
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
