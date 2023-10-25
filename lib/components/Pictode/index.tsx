import { createContext, forwardRef, useImperativeHandle, useState } from 'react';
import { App } from '@pictode/core';
import { HistoryPlugin } from '@pictode/plugin-history';
import { SelectorPlugin } from '@pictode/plugin-selector';

import { PictodeContextType, StageProps } from './types';

export const PictodeContext = createContext<PictodeContextType | null>(null);

export const Pictode = forwardRef((props: StageProps, ref: React.ForwardedRef<PictodeContextType>) => {
  const { className, children } = props;
  const [app] = useState<App>(new App());
  const [selectorPlugin] = useState<SelectorPlugin>(new SelectorPlugin());
  const [historyPlugin] = useState<HistoryPlugin>(new HistoryPlugin());
  app.use(selectorPlugin);
  app.use(historyPlugin);

  useImperativeHandle(
    ref,
    () => ({
      app,
      selectorPlugin,
    }),
    [app, selectorPlugin]
  );

  return (
    <PictodeContext.Provider value={{ app, selectorPlugin }}>
      <div className={`pe-w-full pe-h-full ${className}`}>{children}</div>
    </PictodeContext.Provider>
  );
});
