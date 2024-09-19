import { HistoryPlugin } from '@pictode/plugin-history';
import { SelectorPlugin } from '@pictode/plugin-selector';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import type { PictodeContextType } from '../types';

import {
  CircleIcon,
  ImageIcon,
  MousePointer2Icon,
  SplineIcon,
  SquareIcon,
  TypeIcon,
  UndoIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { EllipseTool } from './EllipseTool';
import { ImageConfig, ImageTool } from './ImageTool';
import { LineTool } from './LineTool';
import { Pictode } from './Pictode';
import { RectConfig, RectTool } from './RectTool';
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

  const [rectConfig, setRectConfig] = useState<RectConfig>({
    stroke: '#000000',
    strokeWidth: 2,
  });

  const [imageConfig] = useState<ImageConfig>({
    stroke: '#00000000',
    image: new Image(),
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
              <ZoomOutIcon
                className={'pe-rounded hover:pe-bg-slate-200'}
                onClick={() => app.scaleTo(app.scale() - app.config.mousewheel.factor)}
              ></ZoomOutIcon>
              <ZoomInIcon
                className={'pe-rounded hover:pe-bg-slate-200'}
                onClick={() => app.scaleTo(app.scale() + app.config.mousewheel.factor)}
              ></ZoomInIcon>
              <SelectTool
                onActive={() => {
                  app.enablePlugin(selectorPlugin.name);
                }}
                onInactive={() => {
                  app.disablePlugin(selectorPlugin.name);
                }}
              >
                {({ isActive, active }) => (
                  <MousePointer2Icon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    onClick={active}
                  ></MousePointer2Icon>
                )}
              </SelectTool>
              <RectTool config={rectConfig}>
                {({ isActive, active }) => (
                  <>
                    <div ref={setReferenceElement} onClick={active}>
                      <SquareIcon
                        className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                      ></SquareIcon>
                    </div>
                    {isActive && (
                      <div
                        ref={setPopperElement}
                        style={styles.popper}
                        className={'pe-bg-slate-300 pe-p-2 pe-z-50'}
                        {...attributes.popper}
                      >
                        <ColorPicker
                          className={'pe-w-6 pe-h-6'}
                          color={rectConfig.stroke as string}
                          onChange={(color) => setRectConfig({ ...rectConfig, stroke: color })}
                        ></ColorPicker>
                      </div>
                    )}
                  </>
                )}
              </RectTool>
              <EllipseTool>
                {({ isActive, active }) => (
                  <CircleIcon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    onClick={active}
                  ></CircleIcon>
                )}
              </EllipseTool>
              <LineTool>
                {({ isActive, active }) => (
                  <SplineIcon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    onClick={active}
                  ></SplineIcon>
                )}
              </LineTool>
              <TextTool>
                {({ isActive, active }) => (
                  <TypeIcon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                    onClick={active}
                  ></TypeIcon>
                )}
              </TextTool>
              <ImageTool config={imageConfig}>
                {({ isActive }) => (
                  <ImageIcon
                    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
                  ></ImageIcon>
                )}
              </ImageTool>
              <UndoIcon
                className={'pe-rounded hover:pe-bg-slate-200'}
                type="Return"
                onClick={() => app.undo()}
              ></UndoIcon>
            </div>
            <Stage className={'pe-w-full pe-h-full'}></Stage>
          </>
        )}
      </Pictode>
    </div>
  );
});

export default Editor;
