import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { App } from '@pictode/core';
import { HistoryPlugin } from '@pictode/plugin-history';
import { SelectorPlugin } from '@pictode/plugin-selector';

import { EllipseTool } from '../EllipseTool';
import { Icon } from '../Icon';
import { ImageTool } from '../ImageTool';
import { LineTool } from '../LineTool';
import { Pictode } from '../Pictode';
import type { PictodeContextType } from '../Pictode/types';
import { RectTool } from '../RectTool';
import { SelectTool } from '../SelectTool';
import { Stage } from '../Stage';
import { TextTool } from '../TextTool';

import { EditorProps } from './types';

export const Editor = forwardRef((props: EditorProps, ref: React.ForwardedRef<React.RefObject<PictodeContextType>>) => {
  const { className } = props;
  const [activeTool, setActiveTool] = useState<string>('');
  const [app, setApp] = useState<App>();
  const pictodeRef = useRef<PictodeContextType>(null);
  const selectorPlugin = new SelectorPlugin();
  const historyPlugin = new HistoryPlugin();

  useImperativeHandle(ref, () => pictodeRef);

  useEffect(() => {
    if (pictodeRef.current) {
      setApp(pictodeRef.current.app);
    }
  }, [pictodeRef]);

  const toolClass = (tool: string): string =>
    `pe-rounded ${activeTool === tool ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`;

  const onActiveTool = (tool: string) => () => {
    setActiveTool(tool);
    if (tool !== 'selectTool') {
      app?.disablePlugin(selectorPlugin.name);
    } else {
      app?.enablePlugin(selectorPlugin.name);
    }
  };

  const onZoomOut = () => {
    if (!app) {
      return;
    }
    app.scaleTo(app.scale() - app.config.mousewheel.factor);
  };

  const onZoomIn = () => {
    if (!app) {
      return;
    }
    app.scaleTo(app.scale() + app.config.mousewheel.factor);
  };

  const onUndo = () => {
    if (!app) {
      return;
    }
    app.undo();
  };

  return (
    <>
      <div className={`${className} pe-w-full pe-h-full`}>
        <Pictode
          className={'pe-w-full pe-h-full pe-flex pe-flex-col pe-gap-2'}
          ref={pictodeRef}
          plugins={[selectorPlugin, historyPlugin]}
        >
          <div className={'pe-w-full pe-flex pe-flex-row pe-flex-wrap pe-justify-around pe-bg-zinc-100 pe-p-2'}>
            <Icon className={'pe-rounded hover:pe-bg-slate-200'} type="ZoomOut" onClick={onZoomOut}></Icon>
            <Icon className={'pe-rounded hover:pe-bg-slate-200'} type="ZoomIn" onClick={onZoomIn}></Icon>
            <SelectTool className={toolClass('selectTool')} onActive={onActiveTool('selectTool')}></SelectTool>
            <RectTool className={toolClass('rectTool')} onActive={onActiveTool('rectTool')}></RectTool>
            <EllipseTool className={toolClass('ellipseTool')} onActive={onActiveTool('ellipseTool')}></EllipseTool>
            <LineTool className={toolClass('lineTool')} onActive={onActiveTool('lineTool')}></LineTool>
            <TextTool className={toolClass('textTool')} onActive={onActiveTool('textTool')}></TextTool>
            <ImageTool className={toolClass('imageTool')} onActive={onActiveTool('imageTool')}></ImageTool>
            <Icon className={'pe-rounded hover:pe-bg-slate-200'} type="Return" onClick={onUndo}></Icon>
          </div>
          <Stage className={'pe-h-full'}></Stage>
        </Pictode>
      </div>
    </>
  );
});
