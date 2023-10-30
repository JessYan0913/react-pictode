import { useCallback } from 'react';
import { util } from '@pictode/core';
import { ImageTool as PictodeImage } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { ImageToolProps } from './types';

export const ImageTool = (props: ImageToolProps) => {
  const { app } = usePictode('LineTool');
  const {
    config = {
      stroke: '#ffffff00',
      strokeWidth: 2,
      opacity: 1,
    },
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
    className,
    ...restProps
  } = props;

  const onClick = useCallback(async () => {
    const imageElement = new Image();
    const files = await util.selectFile(['.jpg', '.png', '.jpge', '.PNG', '.JPG', '.JPGE', '.svg'], false);
    imageElement.src = await util.readeFile<string>((reader: FileReader) => reader.readAsDataURL(files[0]));
    const imageTool = new PictodeImage({
      config: {
        ...config,
        image: imageElement,
      },
      hooks: {
        onActive,
        onInactive,
        onStartDrawing,
        onCompleteDrawing,
      },
    });
    app.setTool(imageTool);
  }, [config, onActive, onInactive, onStartDrawing, onCompleteDrawing, app]);

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {children ?? <Icon type="ImageFiles"></Icon>}
      </div>
    </>
  );
};
