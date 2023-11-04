import { Fragment, useMemo } from 'react';
import { RectTool as PictodeRectTool, RectToolConfig } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export interface RectToolProps extends ToolProps {
  config?: RectToolConfig;
}
export const RectTool = (props: RectToolProps) => {
  const {
    config = {
      stroke: '#000000',
      strokeWidth: 2,
      fill: '#00000000',
      cornerRadius: 0,
      opacity: 1,
    },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
  } = props;
  const { app, tool: activeTool } = usePictode(PictodeRectTool.name);
  const tool = useMemo(
    () =>
      new PictodeRectTool({
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
      {typeof children === 'function' ? children({ app, active, tool }) : children ?? <Icon type="RectangleOne"></Icon>}
    </Fragment>
  );
};
