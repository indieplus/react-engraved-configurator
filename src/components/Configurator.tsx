// src/components/Configurator.tsx
import { useState } from 'react';
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

const Configurator: React.FC = () => {
  const [text, setText] = useState('Vadym Sokol');
  const [fontFamily, setFontFamily] = useState('serif');
  const [fontSize, setFontSize] = useState(24);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Engraved Sign Configurator</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {fontOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Font Size</label>
            <input
              type="range"
              min="12"
              max="48"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="mt-1 w-full"
            />
            <div className="mt-1 text-sm text-gray-500">
              {fontSize} px
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <SignPreview text={text} fontSize={fontSize} fontFamily={fontFamily} />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              // Export functionality to be implemented
              console.log('Export SVG');
            }}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Export SVG
          </button>
          <button
            onClick={() => {
              // Export functionality to be implemented
              console.log('Export PNG');
            }}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Export PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configurator;