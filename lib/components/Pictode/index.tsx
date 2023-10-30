import { createContext, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { App } from '@pictode/core';

import { PictodeContextType, PictodeProps } from './types';

export const PictodeContext = createContext<PictodeContextType | null>(null);

export const Pictode = forwardRef((props: PictodeProps, ref: React.ForwardedRef<PictodeContextType>) => {
  const { plugins = [], className, children } = props;
  const [app] = useState<App>(new App());

  const contextValue = useMemo(() => ({ app, plugins }), [app, plugins]);

  useEffect(() => {
    plugins?.forEach((plugin) => app.use(plugin));
  }, [plugins, app]);

  useImperativeHandle(
    ref,
    () => ({
      app,
      plugins,
    }),
    [app, plugins]
  );

  return (
    <PictodeContext.Provider value={contextValue}>
      <div className={`pe-w-full pe-h-full ${className}`}>{children}</div>
    </PictodeContext.Provider>
  );
});
