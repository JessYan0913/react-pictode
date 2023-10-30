import { ToolHooks } from '@pictode/core';
import { RectToolConfig } from '@pictode/tools';

export interface RectToolProps extends React.HTMLAttributes<HTMLDivElement>, ToolHooks {
  config?: RectToolConfig;
}
