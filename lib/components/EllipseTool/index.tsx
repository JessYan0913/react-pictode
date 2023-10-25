import { EllipseTool as Ellipse } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { EllipseToolProps } from './types';

export const EllipseTool = (props: EllipseToolProps) => {
  const { app, selectorPlugin } = usePictode('EllipseTool');
  const {
    stroke = '#000000',
    strokeWidth = 2,
    fill = '#00000000',
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
      new Ellipse({
        config: {
          stroke,
          strokeWidth,
          fill,
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
        {children ?? <button>Ellipse</button>}
      </div>
    </>
  );
};
