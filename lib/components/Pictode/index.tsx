import { createContext, useState } from 'react';
import { App } from '@pictode/core';
import { SelectorPlugin } from '@pictode/plugin-selector';

import { StageProps } from './types';

export const PictodeContext = createContext<{ app: App } | null>(null);

export function Pictode(props: StageProps) {
  const { className, children } = props;
  const [app] = useState<App>(new App());
  app.use(new SelectorPlugin());

  return (
    <PictodeContext.Provider value={{ app }}>
      <div className={`pe-w-full pe-h-full ${className}`}>{children}</div>
    </PictodeContext.Provider>
  );
}
