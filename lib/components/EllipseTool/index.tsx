import { EllipseTool as Ellipse } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { EllipseToolProps } from './types';

export const EllipseTool = (props: EllipseToolProps) => {
  const { app } = usePictode('EllipseTool');
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
          onActive,
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
        {children ?? <Icon type="OvalOne"></Icon>}
      </div>
    </>
  );
};
