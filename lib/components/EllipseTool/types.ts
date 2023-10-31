import { FC, ReactNode } from 'react';
import { ToolHooks } from '@pictode/core';
import { EllipseToolConfig } from '@pictode/tools';

export interface EllipseToolProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, ToolHooks {
  config?: EllipseToolConfig;
  children?:
    | ReactNode
    | FC<{
        active: boolean;
      }>;
}
