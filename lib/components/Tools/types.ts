export type Tool = 'selectTool' | 'rectTool' | 'ellipseTool' | 'eraserTool' | 'lineTool' | 'textTool' | 'imageTool';

export interface ToolsProps {
  tools?: Tool[];
}
