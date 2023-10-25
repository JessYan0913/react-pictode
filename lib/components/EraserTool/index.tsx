import { EraserTool as Eraser } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { EraserToolProps } from './types';

export const EraserTool = (props: EraserToolProps) => {
  const { app, selectorPlugin } = usePictode('EraserTool');
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;

  const onClick = () => {
    app.setTool(
      new Eraser({
        hooks: {
          onActive(app, tool) {
            selectorPlugin.disable();
            onActive?.(app, tool);
          },
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
        {children ?? <button>Eraser</button>}
      </div>
    </>
  );
};
