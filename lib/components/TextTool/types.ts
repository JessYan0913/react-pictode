import { TextToolConfig } from '@pictode/tools';

import { ToolProps } from '../types';

export interface TextToolProps extends ToolProps {
  config?: TextToolConfig;
}
