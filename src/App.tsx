import { EllipseTool, ImageTool, LineTool, Pictode, RectTool, SelectTool, Stage, TextTool } from '../';

import './App.css';

function App() {
  return (
    <>
      <div className={'pe-w-full pe-h-full'}>
        <Pictode className={'pe-w-full pe-h-full pe-flex pe-flex-col'}>
          <Stage className={'pe-h-full'}></Stage>
          <SelectTool></SelectTool>
          <RectTool></RectTool>
          <EllipseTool></EllipseTool>
          <LineTool></LineTool>
          <TextTool></TextTool>
          <ImageTool></ImageTool>
        </Pictode>
      </div>
    </>
  );
}

export default App;
