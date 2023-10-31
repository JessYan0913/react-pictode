import { useCallback, useEffect, useState } from 'react';
import { EllipseTool as PictodeEllipse } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { EllipseToolProps } from './types';

export const EllipseTool = (props: EllipseToolProps) => {
  const { app } = usePictode('EllipseTool');
  const {
    config = { stroke: '#000000', strokeWidth: 2, fill: '#00000000', opacity: 1 },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
    className,
    ...restProps
  } = props;

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(app.curTool?.name === PictodeEllipse.name);
  }, [app.curTool]);

  const onClick = useCallback(() => {
    app.setTool(
      new PictodeEllipse({
        config,
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      })
    );
  }, [config, onActive, onInactive, onStartDrawing, onCompleteDrawing, app]);

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {typeof children === 'function' ? children({ active }) : children ?? <Icon type="OvalOne"></Icon>}
      </div>
    </>
  );
};
