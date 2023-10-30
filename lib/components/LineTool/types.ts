import { ToolHooks } from '@pictode/core';
import { LineToolConfig } from '@pictode/tools';

export interface LineToolProps extends React.HTMLAttributes<HTMLDivElement>, ToolHooks {
  config?: LineToolConfig;
}
