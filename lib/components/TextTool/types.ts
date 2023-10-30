import { ToolHooks } from '@pictode/core';
import { TextToolConfig } from '@pictode/tools';

export interface TextToolProps extends React.HTMLAttributes<HTMLDivElement>, ToolHooks {
  config?: TextToolConfig;
}
