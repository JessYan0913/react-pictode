import { Fragment, useCallback, useMemo } from 'react';
import { TextTool as PictodeText, TextToolConfig } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { ToolProps } from '../types';

import { Icon } from './Icon';

export interface TextToolProps extends ToolProps {
  config?: TextToolConfig;
}

export const TextTool = (props: TextToolProps) => {
  const {
    config = {
      stroke: '#000000',
      strokeWidth: 2,
      fill: '#00000000',
      fontSize: 14,
      opacity: 1,
    },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
  } = props;
  const { app, tool: activeTool } = usePictode(PictodeText.name);
  const tool = useMemo(
    () =>
      new PictodeText({
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
      {typeof children === 'function' ? children({ app, isActive, active }) : children ?? <Icon type="Text"></Icon>}
    </Fragment>
  );
};
