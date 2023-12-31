import { Fragment, useMemo } from 'react';
import { EllipseTool as PictodeEllipseTool, EllipseToolConfig } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export type EllipseConfig = EllipseToolConfig;

export interface EllipseToolProps extends ToolProps {
  config?: EllipseConfig;
}

export const EllipseTool = (props: EllipseToolProps) => {
  const {
    config = { stroke: '#000000', strokeWidth: 2, fill: '#00000000', opacity: 1 },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
  } = props;

  const { app } = usePictode(PictodeEllipseTool.name);
  const tool = useMemo(
    () =>
      new PictodeEllipseTool({
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
  const { active, isActive } = useToolState<EllipseConfig>(app, tool, config);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, isActive, active }) : children ?? <Icon type="OvalOne"></Icon>}
    </Fragment>
  );
};
