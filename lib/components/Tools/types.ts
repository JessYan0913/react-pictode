import type { Tool } from '@pictode/core';

export interface ToolInfo {
  title: string;
  tool: () => Tool;
}

export type ToolType = 'selectTool' | 'rectTool' | 'ellipseTool' | 'eraserTool' | 'lineTool' | 'textTool' | 'imageTool';

export interface ToolsProps {
  tools?: ToolType[];
}
