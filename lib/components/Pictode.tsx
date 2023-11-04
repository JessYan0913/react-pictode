import { createContext, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { App, EventArgs, Plugin, Tool } from '@pictode/core';

import { ChildrenComponent, PictodeContextType } from '../types';

export interface PictodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  plugins?: Plugin[];
  children?: ChildrenComponent<PictodeContextType>;
}

export const PictodeContext = createContext<PictodeContextType | null>(null);

export const Pictode = forwardRef((props: PictodeProps, ref: React.ForwardedRef<PictodeContextType>) => {
  const { plugins = [], className, children } = props;
  const app = useMemo(() => new App(), []);
  const [tool, setTool] = useState<Tool | null>(null);

  const contextValue = useMemo(() => ({ app, plugins, tool }), [app, plugins, tool]);

  const onToolChanged = useCallback(({ curTool }: EventArgs['tool:changed']) => {
    setTool(curTool);
  }, []);

  useEffect(() => {
    app.on('tool:changed', onToolChanged);
    return () => {
      app.off('tool:changed', onToolChanged);
    };
  }, [app, onToolChanged]);

  useEffect(() => {
    plugins?.forEach((plugin) => app.use(plugin));
  }, [plugins, app]);

  useImperativeHandle(ref, () => contextValue, [contextValue]);

  return (
    <PictodeContext.Provider value={contextValue}>
      <div className={`pe-w-full pe-h-full ${className}`}>
        {typeof children === 'function' ? children(contextValue) : children}
      </div>
    </PictodeContext.Provider>
  );
});
