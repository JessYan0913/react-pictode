import { Fragment, useCallback, useMemo } from 'react';
import { EllipseTool as PictodeEllipseTool, EllipseToolConfig } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export interface EllipseToolProps extends ToolProps {
  config?: EllipseToolConfig;
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
  const isActive = useMemo(() => tool.name === activeTool?.name, [tool, activeTool]);
  const active = useCallback(() => {
    app.setTool(tool);
  }, [app, tool]);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, isActive, active }) : children ?? <Icon type="OvalOne"></Icon>}
    </Fragment>
  );
};
