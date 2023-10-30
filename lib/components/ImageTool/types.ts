import { ToolHooks } from '@pictode/core';
import { ImageConfig } from '@pictode/tools';

export interface ImageToolProps extends React.HTMLAttributes<HTMLDivElement>, ToolHooks {
  config?: ImageConfig;
}
