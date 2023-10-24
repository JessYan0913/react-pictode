import { EllipseTool as Ellipse } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { EllipseToolProps } from './types';

export const EllipseTool = (props: EllipseToolProps) => {
  const { app, selectorPlugin } = usePictode('EllipseTool');
  const { stroke = '#000000', strokeWidth = 2, fill = '#00000000', opacity = 1, children, className } = props;

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
        {children ?? <button>Ellipse</button>}
      </div>
    </>
  );
};
