// Stop words to remove from text comparison
const STOP_WORDS = new Set([
  'the','a','an','is','in','on','at','to','for','of','and','or','but','with',
  'this','that','it','was','were','are','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','shall','can',
  'near','from','by','about','into','through','during','before','after','above',
  'below','between','out','off','over','under','again','further','then','once',
  'i','my','me','we','our','you','your','he','his','she','her','they','their',
  'found','lost','item','object','thing'
]);

// Tokenize text into meaningful keywords
function tokenize(text) {
  if (!text) return new Set();
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}

// Jaccard similarity between two sets
function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 0;
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

// Category score: exact match = 1
function categoryScore(a, b) {
  return a.category === b.category ? 1 : 0;
}

// Location score: same state+city = 1, same state = 0.5, different = 0.1
function locationScore(a, b) {
  const sameState = a.state?.toLowerCase() === b.state?.toLowerCase();
  const sameCity = a.city?.toLowerCase() === b.city?.toLowerCase();
  if (sameState && sameCity) return 1;
  if (sameState) return 0.5;
  return 0.1;
}

// Temporal score: closer dates = higher score
function temporalScore(a, b) {
  const dateA = new Date(a.incidentDate);
  const dateB = new Date(b.incidentDate);
  const diffMs = Math.abs(dateA - dateB);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays <= 3) return 1;
  if (diffDays <= 7) return 0.75;
  if (diffDays <= 15) return 0.5;
  if (diffDays <= 30) return 0.25;
  return 0.05;
}

// Text similarity based on title + description + color
function textScore(a, b) {
  const textA = `${a.title} ${a.description} ${a.primaryColor || ''}`;
  const textB = `${b.title} ${b.description} ${b.primaryColor || ''}`;
  const tokensA = tokenize(textA);
  const tokensB = tokenize(textB);
  return jaccardSimilarity(tokensA, tokensB);
}

// Main similarity function — returns score 0-100 and breakdown
export function calculateSimilarity(itemA, itemB) {
  const cat = categoryScore(itemA, itemB);
  const loc = locationScore(itemA, itemB);
  const time = temporalScore(itemA, itemB);
  const text = textScore(itemA, itemB);

  // Weighted formula: Category(25%) + Location(25%) + Time(20%) + Text(30%)
  const total = cat * 0.25 + loc * 0.25 + time * 0.20 + text * 0.30;
  const score = Math.round(total * 100);

  // Human-readable explanation (no AI needed!)
  let reason = '';
  const parts = [];
  if (cat === 1) parts.push(`same category (${itemA.category})`);
  if (loc >= 0.5) parts.push(`${loc === 1 ? 'same city' : 'same state'} (${itemA.city}, ${itemA.state})`);
  if (time >= 0.5) parts.push('dates are close (within 15 days)');
  if (text >= 0.2) parts.push('similar description keywords match');

  if (parts.length > 0) {
    reason = `Potential match because: ${parts.join(', ')}.`;
  } else {
    reason = 'Low similarity — different category, location, or time period.';
  }

  return {
    score,
    breakdown: {
      category: Math.round(cat * 25),
      location: Math.round(loc * 25),
      temporal: Math.round(time * 20),
      text: Math.round(text * 30),
    },
    reason,
  };
}

// Find top N matches for a given item from a list of candidates
export function findTopMatches(item, candidates, topN = 5) {
  const results = candidates
    .filter((c) => String(c._id) !== String(item._id) && c.type !== item.type)
    .map((candidate) => ({
      item: candidate,
      ...calculateSimilarity(item, candidate),
    }))
    .filter((r) => r.score >= 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return results;
}
