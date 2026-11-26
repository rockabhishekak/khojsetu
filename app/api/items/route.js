import connectDB from '@/lib/mongodb';
import Item from '@/models/Item';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/items — fetch all items with optional filters
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    const city = searchParams.get('city');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query = {};
    if (type && type !== 'ALL') query.type = type;
    if (category && category !== 'ALL') query.category = category;
    if (state && state !== 'ALL') query.state = state;
    if (city) query.city = new RegExp(city, 'i');
    if (status && status !== 'ALL') query.status = status;

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { city: new RegExp(search, 'i') },
        { state: new RegExp(search, 'i') },
      ];
    }

    const items = await Item.find(query).sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/items — create a new lost/found item
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const item = await Item.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
