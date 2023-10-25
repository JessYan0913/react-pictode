import { RectTool as Rect } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { RectToolProps } from './types';

export const RectTool = (props: RectToolProps) => {
  const { app, selectorPlugin } = usePictode('RectTool');
  const {
    stroke = '#000000',
    strokeWidth = 2,
    fill = '#00000000',
    cornerRadius = 0,
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
      new Rect({
        config: {
          stroke,
          strokeWidth,
          fill,
          cornerRadius,
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
        {children ?? <button>Rect</button>}
      </div>
    </>
  );
};
