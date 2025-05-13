import { forwardRef, useRef } from 'react';


interface SignPreviewProps {
  text: string;
  fontSize: number;
  fontFamily: string;
}


interface SignPreviewMethods {
  exportAsSVG: () => void;
  exportAsPNG: () => void;
}


const SignPreview = forwardRef<SignPreviewMethods, SignPreviewProps>(
  ({ text, fontSize, fontFamily }, ref) => {
    const signWidth = 300;
    const signHeight = 100;
    const padding = 20;
    const centerX = signWidth / 2;
    const centerY = signHeight / 2;
    const svgRef = useRef<SVGSVGElement>(null);


    const exportAsSVG = () => {
      if (svgRef.current) {
        const svgData = new XMLSerializer().serializeToString(svgRef.current);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'engraved-sign.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    };


    const exportAsPNG = () => {
      if (svgRef.current) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = signWidth;
        canvas.height = signHeight;
        
        const img = new Image();
        img.onload = () => {
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'engraved-sign.png';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }
          }, 'image/png');
        };
        const svgData = new XMLSerializer().serializeToString(svgRef.current);
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      }
    };


    // Expose methods to ref
    (ref as any).current = {
      exportAsSVG,
      exportAsPNG
    };


    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <svg
          ref={svgRef}
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
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#333"
            className="transform translate-x-[-50%] translate-y-[-50%]"
          >
            {text}
          </text>
        </svg>
      </div>
    );
  }
);


SignPreview.displayName = 'SignPreview';


export default SignPreview;