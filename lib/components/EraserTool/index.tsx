import { useCallback } from 'react';
import { EraserTool as PictodeEraser } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { EraserToolProps } from './types';

export const EraserTool = (props: EraserToolProps) => {
  const { app } = usePictode('EraserTool');
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;

  const onClick = useCallback(() => {
    app.setTool(
      new PictodeEraser({
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      })
    );
  }, [onActive, onInactive, onStartDrawing, onCompleteDrawing, app]);

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {children ?? <Icon type="Erase"></Icon>}
      </div>
    </>
  );
};
