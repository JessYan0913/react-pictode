import type { App, Plugin, Tool, ToolHooks } from '@pictode/core';
import type { FC, ReactNode } from 'react';

export type ChildrenComponent<P> = ReactNode | FC<P>;

export interface PictodeContextType {
  app: App;
  tool: Tool | null;
  plugins: Plugin[];
}

export type ToolChildren<T extends Function = () => void> = ChildrenComponent<{
  app: App;
  isActive: boolean;
  active: T;
}>;

export interface ToolProps<T extends Function = () => void> extends ToolHooks {
  children?: ToolChildren<T>;
}
