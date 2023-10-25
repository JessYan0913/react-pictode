import { createContext, forwardRef, useImperativeHandle, useState } from 'react';
import { App } from '@pictode/core';
import { SelectorPlugin } from '@pictode/plugin-selector';

import { PictodeContextType, StageProps } from './types';

export const PictodeContext = createContext<PictodeContextType | null>(null);

export const Pictode = forwardRef(function (props: StageProps, ref: React.ForwardedRef<PictodeContextType>) {
  const { className, children } = props;
  const [app] = useState<App>(new App());
  const selectorPlugin = new SelectorPlugin();
  app.use(selectorPlugin);

  useImperativeHandle(ref, () => ({
    app,
    selectorPlugin,
  }));

  return (
    <PictodeContext.Provider value={{ app, selectorPlugin }}>
      <div className={`pe-w-full pe-h-full ${className}`}>{children}</div>
    </PictodeContext.Provider>
  );
});
