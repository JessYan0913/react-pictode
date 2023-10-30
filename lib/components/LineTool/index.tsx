import { useCallback } from 'react';
import { LineTool as PictodeLine } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { LineToolProps } from './types';

export const LineTool = (props: LineToolProps) => {
  const { app } = usePictode('LineTool');
  const {
    config = {
      stroke: '#000000',
      strokeWidth: 2,
      opacity: 1,
    },
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
      new PictodeLine({
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
        {children ?? <Icon type="Clue"></Icon>}
      </div>
    </>
  );
};
