import { SelectTool as Select } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';

import { SelectToolProps } from './types';

export const SelectTool = (props: SelectToolProps) => {
  const { app, selectorPlugin } = usePictode('SelectTool');
  const { children, className } = props;

  const onClick = () => {
    app.setTool(
      new Select({
        hooks: {
          onActive() {
            selectorPlugin.enable();
          },
          onInactive() {
            selectorPlugin.disable();
          },
        },
      })
    );
  };

  return (
    <>
      <div className={className} onClick={onClick}>
        {children ?? <button>Select</button>}
      </div>
    </>
  );
};
