import { useRef, useState } from 'react';

import type { PictodeContextType } from '../lib/main';
import { EllipseTool, ImageTool, LineTool, Pictode, RectTool, SelectTool, Stage, TextTool } from '../lib/main';

import './App.css';

function App() {
  const [activeTool, setActiveTool] = useState<string>('');
  const pictodeRef = useRef<PictodeContextType>(null);

  const handleActiveTool = (tool: string) => () => {
    setActiveTool(tool);
  };

  return (
    <>
      <div className={'pe-w-full pe-h-full'}>
        <Pictode className={'pe-w-full pe-h-full pe-flex pe-flex-col'} ref={pictodeRef}>
          <div className={'pe-flex pe-flex-row'}>
            <SelectTool
              className={`pe-rounded ${activeTool === 'selectTool' ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
              onActive={handleActiveTool('selectTool')}
            ></SelectTool>
            <RectTool
              className={`pe-rounded ${activeTool === 'rectTool' ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
              onActive={handleActiveTool('rectTool')}
            ></RectTool>
            <EllipseTool
              className={`pe-rounded ${activeTool === 'ellipseTool' ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
              onActive={handleActiveTool('ellipseTool')}
            ></EllipseTool>
            <LineTool
              className={`pe-rounded ${activeTool === 'lineTool' ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
              onActive={handleActiveTool('lineTool')}
            ></LineTool>
            <TextTool
              className={`pe-rounded ${activeTool === 'textTool' ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
              onActive={handleActiveTool('textTool')}
            ></TextTool>
            <ImageTool
              className={`pe-rounded ${activeTool === 'imageTool' ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
              onActive={handleActiveTool('imageTool')}
            ></ImageTool>
          </div>
          <Stage className={'pe-h-full'}></Stage>
        </Pictode>
      </div>
    </>
  );
}

export default App;
