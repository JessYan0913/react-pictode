import { useCallback } from 'react';
import { EraserTool as PictodeEraser } from '@pictode/tools';

import { useActive } from '../hooks/useActive';
import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { EraserToolProps } from './types';

export const EraserTool = (props: EraserToolProps) => {
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;
  const { app } = usePictode(PictodeEraser.name);
  const { active } = useActive(PictodeEraser.name);

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
        {typeof children === 'function' ? children({ active }) : children ?? <Icon type="Erase"></Icon>}
      </div>
    </>
  );
};
