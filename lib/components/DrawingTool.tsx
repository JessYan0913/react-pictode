import { DrawingToolConfig, DrawingTool as PictodeDrawingTool } from '@pictode/tools';
import { PencilIcon } from 'lucide-react';
import { Fragment, useMemo } from 'react';
import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolChildren, ToolProps } from '../types';

export type DrawingConfig = DrawingToolConfig;

export interface DrawingToolProps extends ToolProps {
  config?: DrawingConfig;
}

const defaultChild: ToolChildren = ({ isActive, active }) => (
  <PencilIcon
    className={`pe-p-1 pe-rounded ${isActive ? 'pe-bg-blue-400 pe-text-white' : 'hover:pe-bg-slate-200'}`}
    onClick={active}
  ></PencilIcon>
);

export const DrawingTool = (props: DrawingToolProps) => {
  const {
    config = {
      stroke: '#000000',
      strokeWidth: 2,
    },
    onActive,
    onInactive,
    onCompleteDrawing,
    onStartDrawing,
    children,
  } = props;
  const { app } = usePictode(PictodeDrawingTool.name);
  const tool = useMemo(
    () =>
      new PictodeDrawingTool({
        config,
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      }),
    [],
  );
  const { active, isActive } = useToolState(app, tool, config);
  return (
    <Fragment>
      {typeof children === 'function'
        ? children({ app, isActive, active })
        : (children ?? defaultChild({ isActive, active, app }))}
    </Fragment>
  );
};
