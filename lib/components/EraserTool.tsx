import { EraserTool as PictodeEraserTool } from '@pictode/tools';
import { Fragment, useMemo } from 'react';

import { EraserIcon } from 'lucide-react';
import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolChildren, ToolProps } from '../types';

export interface EraserToolProps extends ToolProps {}

const defaultChild: ToolChildren = ({ isActive, active }) => (
  <EraserIcon
    className={`pe-p-1 pe-rounded ${isActive ? 'pe-bg-blue-400 pe-text-white' : 'hover:pe-bg-slate-200'}`}
    onClick={active}
  ></EraserIcon>
);

export const EraserTool = (props: EraserToolProps) => {
  const { onActive, onInactive, onStartDrawing, onCompleteDrawing, children } = props;
  const { app } = usePictode(PictodeEraserTool.name);
  const tool = useMemo(
    () =>
      new PictodeEraserTool({
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      }),
    [onActive, onInactive, onStartDrawing, onCompleteDrawing],
  );
  const { active, isActive } = useToolState(app, tool);

  return (
    <Fragment>
      {typeof children === 'function'
        ? children({ app, isActive, active })
        : (children ?? defaultChild({ isActive, active, app }))}
    </Fragment>
  );
};
