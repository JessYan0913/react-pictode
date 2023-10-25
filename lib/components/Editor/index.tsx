import { useRef, useState } from 'react';

import { EllipseTool } from '../EllipseTool';
import { ImageTool } from '../ImageTool';
import { LineTool } from '../LineTool';
import { Pictode } from '../Pictode';
import type { PictodeContextType } from '../Pictode/types';
import { RectTool } from '../RectTool';
import { SelectTool } from '../SelectTool';
import { Stage } from '../Stage';
import { TextTool } from '../TextTool';

export function Editor() {
  const [activeTool, setActiveTool] = useState<string>('');
  const pictodeRef = useRef<PictodeContextType>(null);

  const toolClass = (tool: string): string =>
    `pe-rounded ${activeTool === tool ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`;

  const handleActiveTool = (tool: string) => () => {
    setActiveTool(tool);
    if (tool !== 'selectTool') {
      pictodeRef.current?.selectorPlugin.disable();
    } else {
      pictodeRef.current?.selectorPlugin.enable();
    }
  };

  return (
    <>
      <div className={'pe-w-full pe-h-full'}>
        <Pictode className={'pe-w-full pe-h-full pe-flex pe-flex-col pe-gap-2'} ref={pictodeRef}>
          <div className={'pe-flex pe-flex-row pe-flex-wrap pe-justify-around pe-bg-zinc-100 pe-p-2'}>
            <SelectTool className={toolClass('selectTool')} onActive={handleActiveTool('selectTool')}></SelectTool>
            <RectTool className={toolClass('rectTool')} onActive={handleActiveTool('rectTool')}></RectTool>
            <EllipseTool className={toolClass('ellipseTool')} onActive={handleActiveTool('ellipseTool')}></EllipseTool>
            <LineTool className={toolClass('lineTool')} onActive={handleActiveTool('lineTool')}></LineTool>
            <TextTool className={toolClass('textTool')} onActive={handleActiveTool('textTool')}></TextTool>
            <ImageTool className={toolClass('imageTool')} onActive={handleActiveTool('imageTool')}></ImageTool>
          </div>
          <Stage className={'pe-h-full'}></Stage>
        </Pictode>
      </div>
    </>
  );
}
