import { Fragment, useMemo } from 'react';
import { LineTool as PictodeLineTool } from '@pictode/tools';

import { usePictode } from '../../hooks/usePictode';
import { Icon } from '../Icon';

import { LineToolProps } from './types';

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
  const { app, tool: activeTool } = usePictode(PictodeLineTool.name);
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
  const active = useMemo(() => tool.name === activeTool?.name, [tool, activeTool]);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, active, tool }) : children ?? <Icon type="Clue"></Icon>}
    </Fragment>
  );
};
