import { Fragment, useMemo } from 'react';
import { EraserTool as PictodeEraserTool } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export interface EraserToolProps extends ToolProps {}

export const EraserTool = (props: EraserToolProps) => {
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children } = props;
  const { app } = usePictode(PictodeEraserTool.name);
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
  const { active, isActive } = useToolState(app, tool);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, isActive, active }) : children ?? <Icon type="Erase"></Icon>}
    </Fragment>
  );
};
