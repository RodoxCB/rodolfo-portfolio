type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="RXCB logo"
      style={{ display: "block" }}
    >
      <rect
        x="8"
        y="8"
        width="64"
        height="64"
        rx="15"
        stroke="currentColor"
        strokeWidth="2.4"
      />

      <path
        d="M28 26 L52 54"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.22"
      />

      <text
        x="40"
        y="33"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="2"
      >
        RX
      </text>

      <text
        x="40"
        y="54"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="2"
      >
        CB
      </text>
    </svg>
  );
}
