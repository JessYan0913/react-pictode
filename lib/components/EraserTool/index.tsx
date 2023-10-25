import { EraserTool as Eraser } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { EraserToolProps } from './types';

export const EraserTool = (props: EraserToolProps) => {
  const { app } = usePictode('EraserTool');
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;

  const onClick = () => {
    app.setTool(
      new Eraser({
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      })
    );
  };

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {children ?? <Icon type="Erase"></Icon>}
      </div>
    </>
  );
};
