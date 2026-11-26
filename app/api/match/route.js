import connectDB from '@/lib/mongodb';
import Item from '@/models/Item';
import { getMemoryItemById, getMemoryItems } from '@/lib/memoryStore';
import { findTopMatches } from '@/lib/similarity';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/match — find AI similarity matches for a given item
export async function POST(request) {
  try {
    const body = await request.json();
    const { itemId } = body;

    if (!itemId) {
      return NextResponse.json({ success: false, error: 'itemId is required' }, { status: 400 });
    }

    let item = null;
    let candidates = [];

    // Attempt MongoDB first
    try {
      await connectDB();
      item = await Item.findById(itemId);
      if (item) {
        const oppositeType = item.type === 'LOST' ? 'FOUND' : 'LOST';
        candidates = await Item.find({ type: oppositeType });
      }
    } catch (dbError) {
      console.warn('MongoDB match lookup failed, falling back to in-memory store:', dbError.message);
    }

    // Fallback if not found or MongoDB unavailable
    if (!item) {
      item = getMemoryItemById(itemId);
    }
    if (candidates.length === 0 && item) {
      const oppositeType = item.type === 'LOST' ? 'FOUND' : 'LOST';
      candidates = getMemoryItems({ type: oppositeType });
    }

    if (!item) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    // Calculate similarity scores using explainable AI algorithm
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
