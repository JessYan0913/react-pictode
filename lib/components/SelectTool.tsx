import { SelectTool as PictodeSelectTool } from '@pictode/tools';
import { Fragment, useMemo } from 'react';

import { usePictode } from '../hooks/usePictode';
import { useToolState } from '../hooks/useToolState';
import { ToolChildren, ToolProps } from '../types';

import { MousePointer2Icon } from 'lucide-react';

const compose =
  (...funcs: Function[]) =>
  (...args: any) =>
    funcs.reduce((val, func) => func(val), args);

export interface SelectToolProps extends ToolProps {}

const defaultChild: ToolChildren = ({ isActive, active }) => (
  <MousePointer2Icon
    className={`pe-p-1 pe-rounded ${isActive ? 'pe-bg-blue-400 pe-text-white' : 'hover:pe-bg-slate-200'}`}
    onClick={active}
  ></MousePointer2Icon>
);

export const SelectTool = (props: SelectToolProps) => {
  const { onActive = () => {}, onInactive = () => {}, onStartDrawing, onCompleteDrawing, children } = props;
  const { app } = usePictode(PictodeSelectTool.name);
  const tool = useMemo(
    () =>
      new PictodeSelectTool({
        hooks: {
          onActive: compose(onActive, () => app.enablePlugin('selectorPlugin')),
          onInactive: compose(onInactive, () => app.disablePlugin('selectorPlugin')),
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
