// src/components/SignPreview.tsx
import { useState } from 'react';

interface SignPreviewProps {
  text: string;
  fontSize: number;
  fontFamily: string;
}

const SignPreview: React.FC<SignPreviewProps> = ({ text, fontSize, fontFamily }) => {
  const signWidth = 300;
  const signHeight = 100;
  const padding = 20;

  // Calculate text position to center it
  const getBBox = (text: string, fontSize: number, fontFamily: string) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', '0');
    textElement.setAttribute('y', '0');
    textElement.setAttribute('font-size', fontSize.toString());
    textElement.setAttribute('font-family', fontFamily);
    textElement.textContent = text;
    svg.appendChild(textElement);
    document.body.appendChild(svg);
    const bbox = textElement.getBBox();
    document.body.removeChild(svg);
    return bbox;
  };

  const bbox = getBBox(text, fontSize, fontFamily);
  const textX = (signWidth - bbox.width) / 2;
  const textY = (signHeight + bbox.height) / 2;

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
          x={textX + padding}
          y={textY}
          fontFamily={fontFamily}
          fontSize={fontSize}
          textAnchor="middle"
          fill="#333"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default SignPreview;