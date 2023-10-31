import { FC, ReactNode } from 'react';
import { ToolHooks } from '@pictode/core';

export interface EraserToolProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, ToolHooks {
  children?:
    | ReactNode
    | FC<{
        active: boolean;
      }>;
}
