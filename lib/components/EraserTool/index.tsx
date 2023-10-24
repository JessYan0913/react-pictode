import { EraserTool as Eraser } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { EraserToolProps } from './types';

export const EraserTool = (props: EraserToolProps) => {
  const { app, selectorPlugin } = usePictode('EraserTool');
  const { children, className } = props;

  const onClick = () => {
    app.setTool(
      new Eraser({
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
        {children ?? <button>Eraser</button>}
      </div>
    </>
  );
};
