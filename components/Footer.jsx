import Logo from './Logo';
import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={36} />
              <div>
                <p className="text-white font-bold text-lg leading-tight">KhojSetu</p>
                <p className="text-amber-400 text-xs">खोज सेतु — Pan-India Lost & Found</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A national citizen portal to report lost and found belongings. 
              AI-powered similarity search helps reunite people with their lost items across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/items', label: 'Browse All Items' },
                { href: '/items/report-lost', label: 'Report Lost Item' },
                { href: '/items/report-found', label: 'Report Found Item' },
                { href: '/api/seed', label: 'Load Sample Data (Dev)' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Project Team</h3>
            <div className="space-y-3">
              {[
                { name: 'Abhishek Kumar', regNo: '12405841', role: 'Team Lead & Backend' },
                { name: 'Chinmay Dixit', regNo: '12404704', role: 'Frontend & UI/UX' },
                { name: 'Sarthak Singh', regNo: '12406339', role: 'AI Engine & Integration' },
              ].map((member) => (
                <div key={member.regNo} className="flex flex-col">
                  <span className="text-white text-sm font-medium">{member.name}</span>
                  <span className="text-slate-500 text-xs">{member.regNo} — {member.role}</span>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-slate-500 text-xs">Course: INT252 (ReactJS) & INT257 (Next.js)</p>
                <p className="text-slate-500 text-xs">Lovely Professional University</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 KhojSetu. Academic Project — Lovely Professional University.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <MapPin size={12} />
            <span>Pan-India Platform — Serving all states & UTs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
