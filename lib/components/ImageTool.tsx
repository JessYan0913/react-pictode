import { ImageToolConfig, ImageTool as PictodeImageTool } from '@pictode/tools';
import { Fragment, useCallback, useMemo } from 'react';

import { readeFile, selectFile } from '@pictode/utils';
import { ImageIcon } from 'lucide-react';
import { usePictode } from '../hooks/usePictode';
import { ToolChildren, ToolProps } from '../types';

export type ImageConfig = ImageToolConfig;

export interface ImageToolProps extends ToolProps {
  config?: ImageConfig;
}

const defaultChild: ToolChildren = ({ isActive, active }) => (
  <ImageIcon
    className={`pe-p-1 pe-rounded ${isActive ? 'pe-bg-blue-400 pe-text-white' : 'hover:pe-bg-slate-200'}`}
    onClick={async (e) => {
      e.preventDefault();
      const files = await selectFile(['.jpg', '.png', '.jepg', '.gif', '.svg'], false);
      const imgSrc = await readeFile<string>((reader) => reader.readAsDataURL(files[0]));
      const image = new Image();
      image.src = imgSrc;
      active(image);
    }}
  ></ImageIcon>
);

export const ImageTool = (props: ImageToolProps) => {
  const { config, onActive, onInactive, onStartDrawing, onCompleteDrawing, children } = props;
  const { app } = usePictode(PictodeImageTool.name);

  const tool = useMemo(
    () =>
      new PictodeImageTool({
        config: {
          image: new Image(),
        },
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      }),
    [config, onActive, onInactive, onStartDrawing, onCompleteDrawing],
  );
  const isActive = useMemo(() => tool.name === app.curTool?.name, [tool, app.curTool]);
  const active = useCallback(
    (image: HTMLImageElement) => {
      app.setTool(
        new PictodeImageTool({
          config: {
            ...config,
            image,
          },
          hooks: {
            onActive,
            onInactive,
            onStartDrawing,
            onCompleteDrawing,
          },
        }),
      );
    },
    [config, onActive, onInactive, onStartDrawing, onCompleteDrawing],
  );

  return (
    <Fragment>
      {typeof children === 'function'
        ? children({ app, isActive, active })
        : (children ?? defaultChild({ isActive, active, app }))}
    </Fragment>
  );
};
