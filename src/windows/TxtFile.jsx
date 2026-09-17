import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import useWindowStore from '#store/window';

const TxtFile = () => {
  const { windows } = useWindowStore();
  const fileData = windows.txtfile?.data;

  const fileName = fileData?.name || 'Document.txt';
  const subtitle = fileData?.subtitle || '';
  const image = fileData?.image || null;
  const description = fileData?.description || [
    'No content available in this text document.',
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-white font-sans select-none">
      {/* macOS Window Header */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2.5 bg-[#2d2d30] border-b border-[#3a3a3c]"
      >
        <WindowControls target="txtfile" />
        <span className="text-xs font-semibold text-gray-300 tracking-wide truncate max-w-[240px]">
          {fileName}
        </span>
        <div className="w-12" />
      </div>

      {/* Document Content */}
      <div className="p-6 bg-[#1c1c1e] text-gray-200 text-xs leading-relaxed space-y-4 max-h-[70vh] overflow-y-auto">
        {subtitle && (
          <h3 className="text-sm font-bold text-sky-400 border-b border-white/10 pb-2">
            {subtitle}
          </h3>
        )}

        {image && (
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-md max-h-48 bg-black">
            <img
              src={image}
              alt="Document Attachment"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-2.5 font-sans">
          {Array.isArray(description) ? (
            description.map((para, idx) => (
              <p key={idx} className="text-gray-300">
                {para}
              </p>
            ))
          ) : (
            <p className="text-gray-300">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const TxtFileWindow = WindowWrapper(TxtFile, 'txtfile');
export default TxtFileWindow;
