import { LineTool as Line } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { LineToolProps } from './types';

export const LineTool = (props: LineToolProps) => {
  const { app, selectorPlugin } = usePictode('LineTool');
  const {
    stroke = '#000000',
    strokeWidth = 2,
    opacity = 1,
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
    className,
    ...restProps
  } = props;

  const onClick = () => {
    app.setTool(
      new Line({
        config: {
          stroke,
          strokeWidth,
          opacity,
        },
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
        {children ?? <button>Line</button>}
      </div>
    </>
  );
};
