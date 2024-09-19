import type { App, Plugin, Tool, ToolHooks } from '@pictode/core';
import type { FC, ReactNode } from 'react';

export type ChildrenComponent<P> = ReactNode | FC<P>;

export interface PictodeContextType {
  app: App;
  tool: Tool | null;
  plugins: Plugin[];
}

export type ToolChildren = ChildrenComponent<{
  app: App;
  isActive: boolean;
  active: (...args: any) => void;
}>;

export interface ToolProps extends ToolHooks {
  children?: ToolChildren;
}
