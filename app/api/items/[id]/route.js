import connectDB from '@/lib/mongodb';
import Item from '@/models/Item';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/items/[id] — fetch single item by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const item = await Item.findById(params.id);
    if (!item) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH /api/items/[id] — update item status
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const item = await Item.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!item) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
