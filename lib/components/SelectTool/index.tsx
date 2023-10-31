import { useCallback, useMemo } from 'react';
import { SelectTool as PictodeSelectTool } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { SelectToolProps } from './types';

export const SelectTool = (props: SelectToolProps) => {
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;
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

  const onClick = useCallback(() => {
    app.setTool(tool);
  }, [tool, app]);

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {typeof children === 'function' ? children({ app, active, tool }) : children ?? <Icon type="MoveOne"></Icon>}
      </div>
    </>
  );
};
