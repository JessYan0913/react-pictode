import { Fragment, useMemo } from 'react';
import { RectTool as PictodeRectTool, RectToolConfig } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export type RectConfig = RectToolConfig;

export interface RectToolProps extends ToolProps {
  config?: RectConfig;
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
  const { app } = usePictode(PictodeRectTool.name);
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
  const { active, isActive } = useToolState<RectConfig>(app, tool, config);

  return (
    <Fragment>
      {typeof children === 'function'
        ? children({ app, isActive, active })
        : children ?? <Icon type="RectangleOne"></Icon>}
    </Fragment>
  );
};
