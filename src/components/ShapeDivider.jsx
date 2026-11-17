
export default function ShapeDivider() {
    return (
        <svg
            className="shape-divider"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="
                    M0 0
                    H1440
                    V28
                    H900
                    L850 44
                    L820 28
                    Q720 130 620 28
                    L590 44
                    L540 28
                    H0
                    Z
                "
                fill="var(--nav-bg)"
            />
            <path
              d="
                M0 28
                H540
                L590 44
                L620 28
                Q720 130 820 28
                L850 44
                L900 28
                H1440
              "
              fill="none"
              stroke="var(--saffron)"
              strokeWidth="4"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}
