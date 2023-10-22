import { createContext, useEffect, useRef, useState } from 'react';
import { App } from '@pictode/core';
import { SelectorPlugin } from '@pictode/plugin-selector';

import { StageProps } from './types';

export const PictodeContext = createContext<{ app: App } | null>(null);

export function Pictode(props: StageProps) {
  const { className, ...restProps } = props;
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [app] = useState<App>(new App());
  app.use(new SelectorPlugin());
  useEffect(() => {
    if (stageRef.current) {
      app.mount(stageRef.current);
    }
  }, [app]);
  return (
    <PictodeContext.Provider value={{ app }}>
      <div className={`${className} pe-w-full pe-h-full `} {...restProps} ref={stageRef}></div>
    </PictodeContext.Provider>
  );
}
