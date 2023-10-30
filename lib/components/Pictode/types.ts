import { App, Plugin } from '@pictode/core';

export interface PictodeProps extends React.HTMLAttributes<HTMLDivElement> {
  plugins?: Plugin[];
}

export interface PictodeContextType {
  app: App;
  plugins: Plugin[];
}
