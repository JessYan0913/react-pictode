import { Fragment, useMemo } from 'react';
import { SelectTool as PictodeSelectTool } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export interface SelectToolProps extends ToolProps {}
export const SelectTool = (props: SelectToolProps) => {
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children } = props;
  const { app, tool: activeTool } = usePictode(PictodeSelectTool.name);
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
  const active = useMemo(() => tool.name === activeTool?.name, [tool, activeTool]);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, active, tool }) : children ?? <Icon type="MoveOne"></Icon>}
    </Fragment>
  );
};
