import { useCallback } from 'react';
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
        {children ?? <Icon type="OvalOne"></Icon>}
      </div>
    </>
  );
};
