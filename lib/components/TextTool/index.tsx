import { TextTool as Text } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { TextToolProps } from './types';

export const TextTool = (props: TextToolProps) => {
  const { app, selectorPlugin } = usePictode('RectTool');
  const {
    stroke = '#000000',
    strokeWidth = 2,
    fill = '#00000000',
    fontSize = 14,
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
      new Text({
        config: {
          stroke,
          strokeWidth,
          fill,
          fontSize,
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
        {children ?? <Icon type="Text"></Icon>}
      </div>
    </>
  );
};
