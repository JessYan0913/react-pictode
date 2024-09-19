import { SelectTool as PictodeSelectTool } from '@pictode/tools';
import { Fragment, useMemo } from 'react';

import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolProps } from '../types';

import { MousePointer2Icon } from 'lucide-react';

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
    [onActive, onInactive, onStartDrawing, onCompleteDrawing],
  );
  const { active, isActive } = useToolState(app, tool);

  return (
    <Fragment>
      {typeof children === 'function'
        ? children({ app, isActive, active })
        : (children ?? <MousePointer2Icon></MousePointer2Icon>)}
    </Fragment>
  );
};
