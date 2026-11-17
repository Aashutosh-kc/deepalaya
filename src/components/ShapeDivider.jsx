import './ShapeDivider.css'

export default function ShapeDivider() {
  return (
    <div className="divider" aria-hidden="true">
      <div className="divider-side" />

      <svg className="divider-pendant" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0 H400 V22 H350 L328 36 L308 22 Q200 150 92 22 L72 36 L50 22 H0 Z"
          fill="var(--nav-bg)"
        />

        {/* dotted line, same shape as the outline, 11 units higher */}
        <path
          d="M0 11 H50 L72 25 L92 11 Q200 139 308 11 L328 25 L350 11 H400"
          fill="none"
          stroke="var(--pack-pink)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0 9"
        />

        {/* saffron outline */}
        <path
          d="M0 22 H50 L72 36 L92 22 Q200 150 308 22 L328 36 L350 22 H400"
          fill="none"
          stroke="var(--saffron)"
          strokeWidth="4"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="divider-side" />
    </div>
  )
}