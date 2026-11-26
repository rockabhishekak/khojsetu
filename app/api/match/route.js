import connectDB from '@/lib/mongodb';
import Item from '@/models/Item';
import { findTopMatches } from '@/lib/similarity';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/match — find AI similarity matches for a given item
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { itemId } = body;

    if (!itemId) {
      return NextResponse.json({ success: false, error: 'itemId is required' }, { status: 400 });
    }

    // Fetch the target item
    const item = await Item.findById(itemId);
    if (!item) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    // Fetch all opposite-type items (LOST items match with FOUND items and vice-versa)
    const oppositeType = item.type === 'LOST' ? 'FOUND' : 'LOST';
    const candidates = await Item.find({ type: oppositeType, status: 'OPEN' });

    // Calculate similarity scores using our algorithm
    const matches = findTopMatches(item, candidates, 6);

    return NextResponse.json({
      success: true,
      data: {
        item,
        matches,
        totalCandidates: candidates.length,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
