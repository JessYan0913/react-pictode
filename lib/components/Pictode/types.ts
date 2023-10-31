import type { FC, ReactNode } from 'react';
import { App, Plugin, Tool } from '@pictode/core';

export interface PictodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  plugins?: Plugin[];
  children?:
    | ReactNode
    | FC<{
        app: App;
        tool: Tool | null;
        plugins: Plugin[];
      }>;
}

export interface PictodeContextType {
  app: App;
  tool: Tool | null;
  plugins: Plugin[];
}
