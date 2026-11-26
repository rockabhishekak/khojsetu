import connectDB from '@/lib/mongodb';
import Item from '@/models/Item';
import { getMemoryItemById } from '@/lib/memoryStore';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/items/[id] — fetch single item by ID
export async function GET(request, { params }) {
  const { id } = await params;
  try {
    try {
      await connectDB();
      const item = await Item.findById(id);
      if (item) {
        return NextResponse.json({ success: true, data: item });
      }
    } catch (dbError) {
      console.warn('MongoDB lookup failed, checking in-memory store:', dbError.message);
    }

    const fallbackItem = getMemoryItemById(id);
    if (fallbackItem) {
      return NextResponse.json({ success: true, data: fallbackItem });
    }

    return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH /api/items/[id] — update item status
export async function PATCH(request, { params }) {
  const { id } = await params;
  try {
    const body = await request.json();
    try {
      await connectDB();
      const item = await Item.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (item) {
        return NextResponse.json({ success: true, data: item });
      }
    } catch (dbError) {
      console.warn('MongoDB patch failed:', dbError.message);
    }

    return NextResponse.json({ success: true, data: { _id: id, ...body } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
