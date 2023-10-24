import { TextTool as Text } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { TextToolProps } from './types';

export const TextTool = (props: TextToolProps) => {
  const { app, selectorPlugin } = usePictode('RectTool');
  const {
    stroke = '#000000',
    strokeWidth = 2,
    fill = '#00000000',
    fontSize = 14,
    opacity = 1,
    children,
    className,
  } = props;

  const onClick = () => {
    app.setTool(
      new Text({
        config: {
          stroke,
          strokeWidth,
          fill,
          fontSize,
          opacity,
        },
        hooks: {
          onActive() {
            selectorPlugin.disable();
          },
          onInactive() {
            selectorPlugin.enable();
          },
        },
      })
    );
  };

  return (
    <>
      <div className={className} onClick={onClick}>
        {children ?? <button>Text</button>}
      </div>
    </>
  );
};
