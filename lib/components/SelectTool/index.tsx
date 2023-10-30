import { useCallback } from 'react';
import { SelectTool as PictodeSelect } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { SelectToolProps } from './types';

export const SelectTool = (props: SelectToolProps) => {
  const { app } = usePictode('SelectTool');
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;

  const onClick = useCallback(() => {
    app.setTool(
      new PictodeSelect({
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
        {children ?? <Icon type="MoveOne"></Icon>}
      </div>
    </>
  );
};
