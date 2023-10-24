import { App } from '@pictode/core';
import { SelectorPlugin } from '@pictode/plugin-selector';

export interface StageProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface PictodeContextType {
  app: App;
  selectorPlugin: SelectorPlugin;
}
