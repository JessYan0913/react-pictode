import type { FC, ReactNode } from 'react';
import type { App, Plugin, Tool, ToolHooks } from '@pictode/core';

export type ChildrenComponent<P> = ReactNode | FC<P>;

export interface PictodeContextType {
  app: App;
  tool: Tool | null;
  plugins: Plugin[];
}

export interface ToolProps extends ToolHooks {
  children?: ChildrenComponent<{
    app: App;
    isActive: boolean;
    active: () => void;
  }>;
}
