export default function EthgateLogo({
  width,
  height,
  color = 'currentColor',
  isLoading = false,
}: {
  width: number;
  height: number;
  color?: string;
  isLoading?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={`${isLoading ? 'loading' : ''}`}
    >
      <defs>
        <clipPath id="clip">
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
          stroke={color ? color : 'currentColor'}
          strokeWidth="4"
          clipPath="url(#clip)"
        />
        <g transform="rotate(45, 100, 100)">
          <rect
            x="60"
            y="60"
            width="80"
            height="80"
            fill="transparent"
            stroke={color ? color : 'currentColor'}
            strokeWidth="4"
          />
          <g transform="rotate(45, 100, 100)">
            <rect
              x="80"
              y="80"
              width="40"
              height="40"
              fill="transparent"
              stroke={color ? color : 'currentColor'}
              strokeWidth="4"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
