interface SignPreviewProps {
  text: string;
  fontSize: number;
  fontFamily: string;
}


const SignPreview: React.FC<SignPreviewProps> = ({ text, fontSize, fontFamily }) => {
  const signWidth = 300;
  const signHeight = 100;
  const padding = 20;


  // Calculate the center point of the rectangle
  const centerX = signWidth / 2;
  const centerY = signHeight / 2;


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <svg
        width={signWidth}
        height={signHeight}
        viewBox={`0 0 ${signWidth} ${signHeight}`}
        className="bg-white rounded-lg"
      >
        <rect
          x={padding}
          y={padding}
          width={signWidth - 2 * padding}
          height={signHeight - 2 * padding}
          rx={10}
          ry={10}
          fill="white"
          stroke="#333"
          strokeWidth="2"
        />
        <text
          x={centerX}
          y={centerY}
          fontFamily={fontFamily}
          fontSize={fontSize}
          textAnchor="middle" // Centers horizontally
          dominantBaseline="middle" // Centers vertically
          fill="#333"
          className="transform translate-x-[-50%] translate-y-[-50%]"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};


export default SignPreview;