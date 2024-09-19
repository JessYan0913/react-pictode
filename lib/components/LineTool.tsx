import { Fragment, useMemo } from 'react';
import { LineTool as PictodeLineTool, LineToolConfig } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export type LineTool = LineToolConfig;

export interface LineToolProps extends ToolProps {
  config?: LineTool;
}

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
    [config, onActive, onInactive, onStartDrawing, onCompleteDrawing]
  );
  const { active, isActive } = useToolState<LineTool>(app, tool, config);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, isActive, active }) : (children ?? <Icon type="Clue"></Icon>)}
    </Fragment>
  );
};
