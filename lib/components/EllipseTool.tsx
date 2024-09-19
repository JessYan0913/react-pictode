import { EllipseToolConfig, EllipseTool as PictodeEllipseTool } from '@pictode/tools';
import { CircleIcon } from 'lucide-react';
import { Fragment, useMemo } from 'react';

import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolChildren, ToolProps } from '../types';

export type EllipseConfig = EllipseToolConfig;

export interface EllipseToolProps extends ToolProps {
  config?: EllipseConfig;
}

const defaultChild: ToolChildren = ({ isActive, active }) => (
  <CircleIcon
    className={`pe-rounded ${isActive ? 'pe-bg-blue-400' : 'hover:pe-bg-slate-200'}`}
    onClick={active}
  ></CircleIcon>
);

export const EllipseTool = (props: EllipseToolProps) => {
  const {
    config = { stroke: '#000000', strokeWidth: 2, fill: '#00000000', opacity: 1 },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
  } = props;

  const { app } = usePictode(PictodeEllipseTool.name);
  const tool = useMemo(
    () =>
      new PictodeEllipseTool({
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
  const { active, isActive } = useToolState<EllipseConfig>(app, tool, config);

  return (
    <Fragment>
      {typeof children === 'function'
        ? children({ app, isActive, active })
        : (children ?? defaultChild({ isActive, active, app }))}
    </Fragment>
  );
};
