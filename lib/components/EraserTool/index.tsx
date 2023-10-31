import { useCallback, useEffect, useState } from 'react';
import { EraserTool as PictodeEraser } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { EraserToolProps } from './types';

export const EraserTool = (props: EraserToolProps) => {
  const { app } = usePictode('EraserTool');
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(app.curTool?.name === PictodeEraser.name);
  }, [app.curTool]);

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
