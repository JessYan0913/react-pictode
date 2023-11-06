import { Fragment, useCallback, useMemo } from 'react';
import { EraserTool as PictodeEraserTool } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export interface EraserToolProps extends ToolProps {}

export const EraserTool = (props: EraserToolProps) => {
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children } = props;
  const { app, tool: activeTool } = usePictode(PictodeEraserTool.name);
  const tool = useMemo(
    () =>
      new PictodeEraserTool({
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      }),
    [onActive, onInactive, onStartDrawing, onCompleteDrawing]
  );
  const isActive = useMemo(() => tool.name === activeTool?.name, [tool, activeTool]);
  const active = useCallback(() => {
    app.setTool(tool);
  }, [app, tool]);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, isActive, active }) : children ?? <Icon type="Erase"></Icon>}
    </Fragment>
  );
};
