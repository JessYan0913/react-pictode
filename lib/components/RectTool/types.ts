import { RectToolConfig } from '@pictode/tools';

import { ToolProps } from '../hooks/withFunctionChildren';

export interface RectToolProps extends ToolProps {
  config?: RectToolConfig;
}
