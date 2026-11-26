// KhojSetu Custom SVG Logo Component
export default function Logo({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="KhojSetu Logo"
    >
      {/* Outer circle background */}
      <circle cx="24" cy="24" r="23" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />

      {/* Bridge arcs (Setu) */}
      <path
        d="M8 28 Q16 16 24 20 Q32 16 40 28"
        stroke="#f59e0b"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 32 Q20 22 24 25 Q28 22 36 32"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Magnifying glass circle */}
      <circle cx="24" cy="21" r="6" stroke="#ffffff" strokeWidth="2" fill="none" />

      {/* Magnifying glass handle */}
      <line x1="28.5" y1="25.5" x2="33" y2="30" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

      {/* Location pin dot inside magnifier */}
      <circle cx="24" cy="21" r="2" fill="#f59e0b" />
    </svg>
  );
}
