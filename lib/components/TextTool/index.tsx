import { Fragment, useMemo } from 'react';
import { TextTool as PictodeText } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { TextToolProps } from './types';

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
  const active = useMemo(() => tool.name === activeTool?.name, [tool, activeTool]);

  return (
    <>
      <Fragment>
        {typeof children === 'function' ? children({ app, active, tool }) : children ?? <Icon type="Text"></Icon>}
      </Fragment>
    </>
  );
};
