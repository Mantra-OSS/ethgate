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
          <rect x="0" y="0" width="70" height="70" transform="rotate(0, 100, 100)" />
          <rect x="130" y="130" width="80" height="80" transform="rotate(0, 100, 100)" />
          <rect x="130" y="130" width="80" height="80" transform="rotate(90, 100, 100)" />
          <rect x="0" y="0" width="70" height="70" transform="rotate(90, 100, 100)" />
        </clipPath>
      </defs>
      <g transform="rotate(45, 100, 100)">
        <rect
          x="31"
          y="31"
          width="138"
          height="138"
          fill="transparent"
          stroke={color ? color : 'currentColor'}
          strokeWidth="4"
          clipPath="url(#clip)"
        />
        <g transform="rotate(45, 100, 100)">
          <rect
            x="45"
            y="45"
            width="110"
            height="110"
            fill="transparent"
            stroke={color ? color : 'currentColor'}
            strokeWidth="4"
          />
          <g transform="rotate(45, 100, 100)">
            <rect
              x="70"
              y="70"
              width="60"
              height="60"
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
