import { LineToolConfig, LineTool as PictodeLineTool } from '@pictode/tools';
import { Fragment, useMemo } from 'react';

import { SplineIcon } from 'lucide-react';
import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolChildren, ToolProps } from '../types';

export type LineTool = LineToolConfig;

export interface LineToolProps extends ToolProps {
  config?: LineTool;
}

const defaultChild: ToolChildren = ({ isActive, active }) => (
  <SplineIcon
    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
    onClick={active}
  ></SplineIcon>
);

export const LineTool = (props: LineToolProps) => {
  const {
    config = {
      stroke: '#000000',
      strokeWidth: 2,
      opacity: 1,
    },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
  } = props;
  const { app } = usePictode(PictodeLineTool.name);
  const tool = useMemo(
    () =>
      new PictodeLineTool({
        config,
        hooks: {
          onActive,
          onInactive,
          onStartDrawing,
          onCompleteDrawing,
        },
      }),
    [config, onActive, onInactive, onStartDrawing, onCompleteDrawing],
  );
  const { active, isActive } = useToolState<LineTool>(app, tool, config);

  return (
    <Fragment>
      {typeof children === 'function'
        ? children({ app, isActive, active })
        : (children ?? defaultChild({ isActive, active, app }))}
    </Fragment>
  );
};
