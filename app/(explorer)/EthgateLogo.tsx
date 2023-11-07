export default function EthgateLogo() {
  return (
    <svg viewBox="0 0 200 200" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="myClip">
          <rect x="0" y="0" width="80" height="80" transform="rotate(0, 100, 100)" />
          <rect x="120" y="120" width="80" height="80" transform="rotate(0, 100, 100)" />
          <rect x="120" y="120" width="80" height="80" transform="rotate(90, 100, 100)" />
          <rect x="0" y="0" width="80" height="80" transform="rotate(90, 100, 100)" />
        </clipPath>
      </defs>
      <g transform="rotate(45, 100, 100)">
        <rect
          x="50"
          y="50"
          width="100"
          height="100"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
          clipPath="url(#myClip)"
        />
        <g transform="rotate(45, 100, 100)">
          <rect
            x="60"
            y="60"
            width="80"
            height="80"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
          />
          <g transform="rotate(45, 100, 100)">
            <rect
              x="80"
              y="80"
              width="40"
              height="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
