import { Fragment, useMemo } from 'react';
import { EraserTool as PictodeEraserTool } from '@pictode/tools';

import { usePictode } from '../../hooks/usePictode';
import { Icon } from '../Icon';

import { EraserToolProps } from './types';

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
  const active = useMemo(() => tool.name === activeTool?.name, [tool, activeTool]);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, active, tool }) : children ?? <Icon type="Erase"></Icon>}
    </Fragment>
  );
};
