import { util } from '@pictode/core';
import { ImageTool as Image } from '@pictode/tools';

import { usePictode } from '../hooks/usePictode';
import { Icon } from '../Icon';

import { ImageToolProps } from './types';

export const ImageTool = (props: ImageToolProps) => {
  const { app } = usePictode('LineTool');
  const {
    stroke = '#000000',
    strokeWidth = 2,
    opacity = 1,
    onActive,
    onInactive,
    onStartDrawing,
    onCompleteDrawing,
    children,
    className,
    ...restProps
  } = props;

  const onClick = async () => {
    const files = await util.selectFile(['.jpg', '.png', '.jpge', '.PNG', '.JPG', '.JPGE', '.svg'], false);
    const imgSrc = await util.readeFile<string>((reader: FileReader) => reader.readAsDataURL(files[0]));
    const imageTool = new Image({
      config: {
        stroke,
        strokeWidth,
        opacity,
      },
      hooks: {
        onActive,
        onInactive,
        onStartDrawing,
        onCompleteDrawing,
      },
    });
    imageTool.imageElement.src = imgSrc;
    app.setTool(imageTool);
  };

  return (
    <>
      <div className={className} onClick={onClick} {...restProps}>
        {children ?? <Icon type="ImageFiles"></Icon>}
      </div>
    </>
  );
};
