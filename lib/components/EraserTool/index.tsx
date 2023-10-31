import { useCallback, useMemo } from 'react';
import { EraserTool as PictodeEraserTool } from '@pictode/tools';

import { useActive } from '../hooks/useActive';
import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { EraserToolProps } from './types';

export const EraserTool = (props: EraserToolProps) => {
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;
  const { app } = usePictode(PictodeEraserTool.name);
  const { active } = useActive(PictodeEraserTool.name);
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

  const onClick = useCallback(() => {
    app.setTool(tool);
  }, [tool, app]);

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {typeof children === 'function' ? children({ active, tool }) : children ?? <Icon type="Erase"></Icon>}
      </div>
    </>
  );
};
