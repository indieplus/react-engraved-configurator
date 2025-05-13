import { useState, useRef } from 'react';
import SignPreview from './SignPreview';


interface FontOption {
  value: string;
  name: string;
}


const fontOptions: FontOption[] = [
  { value: 'serif', name: 'Serif' },
  { value: 'sans-serif', name: 'Sans-serif' },
  { value: 'cursive', name: 'Cursive' }
];


const Configurator = () => {
  const [text, setText] = useState('Vadym Sokol');
  const [fontFamily, setFontFamily] = useState('serif');
  const [fontSize, setFontSize] = useState(24);
  const signPreviewRef = useRef<any>(null);


  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };


  const exportAsSVG = () => {
    if (signPreviewRef.current) {
      signPreviewRef.current.exportAsSVG();
    }
  };


  const exportAsPNG = () => {
    if (signPreviewRef.current) {
      signPreviewRef.current.exportAsPNG();
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>


        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Font
          </label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {fontOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>


        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Font Size
          </label>
          <input
            type="range"
            min="12"
            max="48"
            value={fontSize}
            onChange={handleFontSizeChange}
            className="w-full"
          />
          <div className="mt-1 text-sm text-gray-500">
            {fontSize} px
          </div>
        </div>


        <div className="flex justify-center">
          <SignPreview 
            ref={signPreviewRef}
            text={text}
            fontFamily={fontFamily}
            fontSize={fontSize}
          />
        </div>


        <div className="flex justify-center space-x-4">
          <button
            onClick={exportAsSVG}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Export SVG
          </button>
          <button
            onClick={exportAsPNG}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Export PNG
          </button>
        </div>
      </div>
    </div>
  );
};


export default Configurator;