import { LineTool as Line } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { LineToolProps } from './types';

export const LineTool = (props: LineToolProps) => {
  const { app, selectorPlugin } = usePictode('LineTool');
  const { stroke = '#000000', strokeWidth = 2, opacity = 1, children, className } = props;

  const onClick = () => {
    app.setTool(
      new Line({
        config: {
          stroke,
          strokeWidth,
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
        {children ?? <button>Line</button>}
      </div>
    </>
  );
};
