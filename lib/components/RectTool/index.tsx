import { useCallback, useEffect, useState } from 'react';
import { RectTool as PictodeRect } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { RectToolProps } from './types';

export const RectTool = (props: RectToolProps) => {
  const { app } = usePictode('RectTool');
  const {
    config = {
      stroke: '#000000',
      strokeWidth: 2,
      fill: '#00000000',
      cornerRadius: 0,
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

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(app.curTool?.name === PictodeRect.name);
  }, [app.curTool]);

  const onClick = useCallback(() => {
    app.setTool(
      new PictodeRect({
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
        {typeof children === 'function' ? children({ active }) : children ?? <Icon type="RectangleOne"></Icon>}
      </div>
    </>
  );
};
