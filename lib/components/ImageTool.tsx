import { Fragment, useMemo } from 'react';
import { ImageConfig, ImageTool as PictodeImageTool } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export interface ImageToolProps extends ToolProps {
  config: ImageConfig;
}

export const ImageTool = (props: ImageToolProps) => {
  const { config, onActive, onInactive, onStartDrawing, onCompleteDrawing, children } = props;
  const { app, tool: activeTool } = usePictode(PictodeImageTool.name);

  const tool = useMemo(
    () =>
      new PictodeImageTool({
        config,
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      }),
    [config, onActive, onInactive, onStartDrawing, onCompleteDrawing]
  );
  const active = useMemo(() => tool.name === activeTool?.name, [tool, activeTool]);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, active, tool }) : children ?? <Icon type="ImageFiles"></Icon>}
    </Fragment>
  );
};
