import { Fragment, useMemo } from 'react';
import { SelectTool as PictodeSelectTool } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export interface SelectToolProps extends ToolProps {}

export const SelectTool = (props: SelectToolProps) => {
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children } = props;
  const { app } = usePictode(PictodeSelectTool.name);
  const tool = useMemo(
    () =>
      new PictodeSelectTool({
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
      {typeof children === 'function' ? children({ app, isActive, active }) : children ?? <Icon type="MoveOne"></Icon>}
    </Fragment>
  );
};
