import ItemForm from '@/components/ItemForm';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Report Lost Item — KhojSetu',
  description: 'Report a lost item on KhojSetu. AI will automatically find potential matching found items.',
};

export default function ReportLostPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Link */}
      <Link href="/items" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-6 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Browse
      </Link>

      {/* Page Header */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6 flex items-start gap-4">
        <div className="bg-red-100 rounded-xl p-3">
          <AlertCircle size={28} className="text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Report a Lost Item</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Fill in as much detail as possible. The more you describe your item, the more accurately 
            our AI similarity engine can find matching found reports. After submission, you will 
            instantly see all potential matches with a confidence score.
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-amber-800 text-sm mb-2">💡 Tips for a better match:</h3>
        <ul className="text-amber-700 text-xs space-y-1">
          <li>• Mention brand name, model, color, and any unique marks or stickers</li>
          <li>• If it has contents (wallet, bag), mention what was inside</li>
          <li>• Be specific about the location — platform number, gate, landmark</li>
          <li>• Enter the exact date — even a 1-day difference affects AI score</li>
        </ul>
      </div>

      <ItemForm type="LOST" />
    </div>
  );
}
