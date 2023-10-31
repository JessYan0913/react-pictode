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

  const onActiveTool = (tool: string) => () => {
    if (tool === 'selectTool') {
      app?.enablePlugin(selectorPlugin.name);
    } else {
      app?.disablePlugin(selectorPlugin.name);
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
            <SelectTool onActive={onActiveTool('selectTool')}>
              {({ app, active, tool }) => (
                <>
                  <Icon
                    className={`pe-rounded ${active ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="MoveOne"
                    onClick={() => app.setTool(tool)}
                  ></Icon>
                </>
              )}
            </SelectTool>
            <RectTool onActive={onActiveTool('rectTool')}>
              {({ app, active, tool }) => (
                <>
                  <Icon
                    className={`pe-rounded ${active ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="RectangleOne"
                    onClick={() => app.setTool(tool)}
                  ></Icon>
                </>
              )}
            </RectTool>
            <EllipseTool onActive={onActiveTool('ellipseTool')}>
              {({ app, active, tool }) => (
                <>
                  <Icon
                    className={`pe-rounded ${active ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="OvalOne"
                    onClick={() => app.setTool(tool)}
                  ></Icon>
                </>
              )}
            </EllipseTool>
            <LineTool onActive={onActiveTool('lineTool')}>
              {({ app, active, tool }) => (
                <>
                  <Icon
                    className={`pe-rounded ${active ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="Clue"
                    onClick={() => app.setTool(tool)}
                  ></Icon>
                </>
              )}
            </LineTool>
            <TextTool onActive={onActiveTool('textTool')}>
              {({ app, active, tool }) => (
                <>
                  <Icon
                    className={`pe-rounded ${active ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="Text"
                    onClick={() => app.setTool(tool)}
                  ></Icon>
                </>
              )}
            </TextTool>
            <ImageTool config={{ image: new Image() }} onActive={onActiveTool('imageTool')}>
              {({ active }) => (
                <>
                  <Icon
                    className={`pe-rounded ${active ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="ImageFiles"
                  ></Icon>
                </>
              )}
            </ImageTool>
            <Icon className={'pe-rounded hover:pe-bg-slate-200'} type="Return" onClick={onUndo}></Icon>
          </div>
          <Stage className={'pe-w-full pe-h-full'}></Stage>
        </Pictode>
      </div>
    </>
  );
});
