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
    children,
    className,
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
          onActive() {
            selectorPlugin.disable();
          },
        },
      })
    );
  };

  return (
    <>
      <div className={className} onClick={onClick}>
        {children ?? <button>Rect</button>}
      </div>
    </>
  );
};
