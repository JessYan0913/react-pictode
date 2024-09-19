import { Fragment, useMemo } from 'react';
import { ImageTool as PictodeImageTool, ImageToolConfig as ImageToolConfig } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export type ImageConfig = ImageToolConfig;

export interface ImageToolProps extends ToolProps {
  config: ImageConfig;
}

export const ImageTool = (props: ImageToolProps) => {
  const { config, onActive, onInactive, onStartDrawing, onCompleteDrawing, children } = props;
  const { app } = usePictode(PictodeImageTool.name);

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
  const { active, isActive } = useToolState<ImageConfig>(app, tool, config);

  return (
    <Fragment>
      {typeof children === 'function'
        ? children({ app, isActive, active })
        : (children ?? <Icon type="ImageFiles"></Icon>)}
    </Fragment>
  );
};
