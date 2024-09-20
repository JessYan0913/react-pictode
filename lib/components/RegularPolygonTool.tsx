import { RegularPolygonTool as PictodeRegularPolygonTool, RegularPolygonToolConfig } from '@pictode/tools';
import { HexagonIcon } from 'lucide-react';
import { Fragment, useMemo } from 'react';
import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolChildren, ToolProps } from '../types';

export type RegularPolygonConfig = RegularPolygonToolConfig;

export interface RegularPolygonToolProps extends ToolProps {
  config?: RegularPolygonConfig;
}

const defaultChild: ToolChildren = ({ isActive, active }) => (
  <HexagonIcon
    className={`pe-p-1 pe-rounded ${isActive ? 'pe-bg-blue-400 pe-text-white' : 'hover:pe-bg-slate-200'}`}
    onClick={active}
  ></HexagonIcon>
);

export const RegularPolygonTool = (props: RegularPolygonToolProps) => {
  const {
    config = {
      stroke: '#000000',
      strokeWidth: 2,
      fill: '#00000000',
      cornerRadius: 0,
      opacity: 1,
      sides: 6,
    },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
  } = props;
  const { app } = usePictode(PictodeRegularPolygonTool.name);
  const tool = useMemo(
    () =>
      new PictodeRegularPolygonTool({
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
  const { active, isActive } = useToolState<RegularPolygonConfig>(app, tool, config);

  return (
    <Fragment>
      {typeof children === 'function'
        ? children({ app, isActive, active })
        : (children ?? defaultChild({ isActive, active, app }))}
    </Fragment>
  );
};
