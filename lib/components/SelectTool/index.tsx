import { SelectTool as Select } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { SelectToolProps } from './types';

export const SelectTool = (props: SelectToolProps) => {
  const { app, selectorPlugin } = usePictode('SelectTool');
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children, className, ...restProps } = props;

  const onClick = () => {
    app.setTool(
      new Select({
        hooks: {
          onActive(app, tool) {
            selectorPlugin.enable();
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
        {children ?? <Icon type="MoveOne"></Icon>}
      </div>
    </>
  );
};
