import ItemForm from '@/components/ItemForm';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Report Found Item — KhojSetu',
  description: 'Report a found item on KhojSetu. Help reunite it with its owner using AI matching.',
};

export default function ReportFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Link */}
      <Link href="/items" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-6 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Browse
      </Link>

      {/* Page Header */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6 flex items-start gap-4">
        <div className="bg-emerald-100 rounded-xl p-3">
          <CheckCircle2 size={28} className="text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Report a Found Item</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Thank you for being a responsible citizen! Describe the item you found in detail. 
            Our AI will immediately check if someone has reported it as lost. After submission, 
            you will see potential matches with a similarity confidence score.
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-amber-800 text-sm mb-2">💡 Tips for helping the owner:</h3>
        <ul className="text-amber-700 text-xs space-y-1">
          <li>• Start the title with Found: so it is easy to identify</li>
          <li>• Describe everything you can see — do not open private items like wallets unnecessarily</li>
          <li>• Mention where exactly you found it and when</li>
          <li>• If you have handed it to police or a helpdesk, mention that in the location field</li>
        </ul>
      </div>

      <ItemForm type="FOUND" />
    </div>
  );
}
