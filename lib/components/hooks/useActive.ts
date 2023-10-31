import { useCallback, useEffect, useState } from 'react';

import { usePictode } from './usePictode';

export const useActive = (tool: string): { active: boolean } => {
  const { app } = usePictode(tool);
  const [active, setActive] = useState(false);

  const onToolChanged = useCallback(() => {
    setActive(app.curTool?.name === tool.replace(/^\w/, (c) => c.toLowerCase()));
  }, [app, tool]);

  useEffect(() => {
    app.on('tool:changed', onToolChanged);
    return () => {
      app.off('tool:changed', onToolChanged);
    };
  }, [app, onToolChanged]);

  return { active };
};
