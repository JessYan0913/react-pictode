import { Fragment, useMemo } from 'react';
import { EllipseTool as PictodeEllipseTool } from '@pictode/tools';

import { usePictode } from '../../hooks/usePictode';
import { Icon } from '../Icon';

import { EllipseToolProps } from './types';

export const EllipseTool = (props: EllipseToolProps) => {
  const {
    config = { stroke: '#000000', strokeWidth: 2, fill: '#00000000', opacity: 1 },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
  } = props;

  const { app, tool: activeTool } = usePictode(PictodeEllipseTool.name);
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
  const active = useMemo(() => tool.name === activeTool?.name, [tool, activeTool]);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, active, tool }) : children ?? <Icon type="OvalOne"></Icon>}
    </Fragment>
  );
};
