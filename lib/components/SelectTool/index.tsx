import { useCallback, useMemo } from 'react';
import { SelectTool as PictodeSelectTool } from '@pictode/tools';

import { useActive } from '../hooks/useActive';
import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { SelectToolProps } from './types';

export const SelectTool = (props: SelectToolProps) => {
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;
  const { app } = usePictode(PictodeSelectTool.name);
  const { active } = useActive(PictodeSelectTool.name);

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

  const onClick = useCallback(() => {
    app.setTool(tool);
  }, [tool, app]);

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {typeof children === 'function' ? children({ active, tool }) : children ?? <Icon type="MoveOne"></Icon>}
      </div>
    </>
  );
};
