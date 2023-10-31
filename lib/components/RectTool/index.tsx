import { useCallback, useMemo } from 'react';
import { RectTool as PictodeRectTool } from '@pictode/tools';

import { useActive } from '../hooks/useActive';
import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { RectToolProps } from './types';

export const RectTool = (props: RectToolProps) => {
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
  const { app } = usePictode(PictodeRectTool.name);
  const { active } = useActive(PictodeRectTool.name);

  const tool = useMemo(
    () =>
      new PictodeRectTool({
        config,
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      }),
    [config, onActive, onInactive, onStartDrawing, onCompleteDrawing]
  );

  const onClick = useCallback(() => {
    app.setTool(tool);
  }, [tool, app]);

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {typeof children === 'function' ? children({ active, tool }) : children ?? <Icon type="RectangleOne"></Icon>}
      </div>
    </>
  );
};
