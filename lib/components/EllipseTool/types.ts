import { ToolHooks } from '@pictode/core';
import { EllipseToolConfig } from '@pictode/tools';

export interface EllipseToolProps extends React.HTMLAttributes<HTMLDivElement>, ToolHooks {
  config?: EllipseToolConfig;
}
