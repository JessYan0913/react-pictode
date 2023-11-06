import { Fragment, useCallback, useMemo } from 'react';
import { LineTool as PictodeLineTool, LineToolConfig } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export interface LineToolProps extends ToolProps {
  config?: LineToolConfig;
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
  const isActive = useMemo(() => tool.name === activeTool?.name, [tool, activeTool]);
  const active = useCallback(() => {
    app.setTool(tool);
  }, [app, tool]);

  return (
    <Fragment>
      {typeof children === 'function' ? children({ app, isActive, active }) : children ?? <Icon type="Clue"></Icon>}
    </Fragment>
  );
};
