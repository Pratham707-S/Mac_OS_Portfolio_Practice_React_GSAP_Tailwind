import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import useWindowStore from '#store/window';
import { Share2, ExternalLink } from 'lucide-react';

const ImgFile = () => {
  const { windows } = useWindowStore();
  const fileData = windows.imgfile?.data;

  const fileName = fileData?.name || 'Screenshot.png';
  const imageUrl = fileData?.imageUrl || '/images/image.png';

  return (
    <div className="w-full flex flex-col bg-[#1e1e1e] text-white rounded-xl shadow-2xl overflow-hidden font-sans select-none border border-[#3a3a3c]">
      {/* macOS Window Header Matching Preview.app */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#3a3a3c]"
      >
        <WindowControls target="imgfile" />

        <span className="text-xs font-semibold text-gray-300 tracking-wide truncate max-w-[200px]">
          {fileName}
        </span>

        <div className="flex items-center gap-2 text-gray-400">
          <button
            type="button"
            onClick={() => window.open(imageUrl, '_blank')}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-medium transition-colors"
          >
            <span>Open Original</span>
            <ExternalLink size={10} />
          </button>
        </div>
      </div>

      {/* Image Preview Body */}
      <div className="p-3 bg-[#18181b] flex items-center justify-center max-h-[75vh] overflow-hidden">
        <img
          src={imageUrl}
          alt={fileName}
          className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-md border border-white/10"
        />
      </div>
    </div>
  );
};

const ImgFileWindow = WindowWrapper(ImgFile, 'imgfile');
export default ImgFileWindow;
