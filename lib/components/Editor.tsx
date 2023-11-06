import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { HistoryPlugin } from '@pictode/plugin-history';
import { SelectorPlugin } from '@pictode/plugin-selector';

import type { PictodeContextType } from '../types';

import { EllipseTool } from './EllipseTool';
import { Icon } from './Icon';
import { ImageTool } from './ImageTool';
import { LineTool } from './LineTool';
import { Pictode } from './Pictode';
import { RectTool } from './RectTool';
import { SelectTool } from './SelectTool';
import { Stage } from './Stage';
import { TextTool } from './TextTool';

export interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Editor = forwardRef((props: EditorProps, ref: React.ForwardedRef<React.RefObject<PictodeContextType>>) => {
  const { className } = props;
  const pictodeRef = useRef<PictodeContextType>(null);
  const selectorPlugin = new SelectorPlugin({
    enabled: false,
  });
  const historyPlugin = new HistoryPlugin();
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const [rectConfig, setRectConfig] = useState({
    stroke: '#000000',
  });

  useImperativeHandle(ref, () => pictodeRef);

  return (
    <div className={`${className} pe-w-full pe-h-full`}>
      <Pictode
        className={'pe-w-full pe-h-full pe-flex pe-flex-col pe-gap-2'}
        ref={pictodeRef}
        plugins={[selectorPlugin, historyPlugin]}
      >
        {({ app }) => (
          <>
            <div className={'pe-w-full pe-flex pe-flex-row pe-flex-wrap pe-justify-around pe-bg-zinc-100 pe-p-2'}>
              <Icon
                className={'pe-rounded hover:pe-bg-slate-200'}
                type="ZoomOut"
                onClick={() => app.scaleTo(app.scale() - app.config.mousewheel.factor)}
              ></Icon>
              <Icon
                className={'pe-rounded hover:pe-bg-slate-200'}
                type="ZoomIn"
                onClick={() => app.scaleTo(app.scale() + app.config.mousewheel.factor)}
              ></Icon>
              <SelectTool
                onActive={() => {
                  app.enablePlugin(selectorPlugin.name);
                }}
                onInactive={() => {
                  app.disablePlugin(selectorPlugin.name);
                }}
              >
                {({ isActive, active }) => (
                  <Icon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="MoveOne"
                    onClick={active}
                  ></Icon>
                )}
              </SelectTool>
              <RectTool config={rectConfig}>
                {({ isActive, active }) => (
                  <>
                    <div ref={setReferenceElement} onClick={active}>
                      <Icon
                        className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                        type="RectangleOne"
                      ></Icon>
                    </div>
                    {isActive && (
                      <div
                        ref={setPopperElement}
                        style={styles.popper}
                        className={'pe-bg-slate-300 pe-z-50'}
                        {...attributes.popper}
                      >
                        <div>
                          <button onClick={() => setRectConfig({ stroke: '#00ffff' })}>青色</button>
                          <button onClick={() => setRectConfig({ stroke: '#ff0000' })}>红色</button>
                          <button onClick={() => setRectConfig({ stroke: '#0000ff' })}>蓝色</button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </RectTool>
              <EllipseTool>
                {({ isActive, active }) => (
                  <Icon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="OvalOne"
                    onClick={active}
                  ></Icon>
                )}
              </EllipseTool>
              <LineTool>
                {({ isActive, active }) => (
                  <Icon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="Clue"
                    onClick={active}
                  ></Icon>
                )}
              </LineTool>
              <TextTool>
                {({ isActive, active }) => (
                  <Icon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="Text"
                    onClick={active}
                  ></Icon>
                )}
              </TextTool>
              <ImageTool config={{ image: new Image() }}>
                {({ isActive }) => (
                  <Icon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    type="ImageFiles"
                  ></Icon>
                )}
              </ImageTool>
              <Icon className={'pe-rounded hover:pe-bg-slate-200'} type="Return" onClick={() => app.undo()}></Icon>
            </div>
            <Stage className={'pe-w-full pe-h-full'}></Stage>
          </>
        )}
      </Pictode>
    </div>
  );
});
