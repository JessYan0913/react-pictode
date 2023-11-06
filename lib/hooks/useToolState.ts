import { useCallback, useEffect, useMemo } from 'react';
import { App, Konva, Tool } from '@pictode/core';

export const useToolState = <C extends Konva.ShapeConfig>(app: App, tool: Tool, config?: C) => {
  const isActive = useMemo(() => tool.name === app.curTool?.name, [tool, app.curTool]);
  const active = useCallback(() => {
    app.setTool(tool);
  }, [app, tool]);

  useEffect(() => {
    if (app.curTool && isActive) {
      app.curTool.config = config;
    }
  }, [isActive, app, config]);
  return {
    active,
    isActive,
  };
};
