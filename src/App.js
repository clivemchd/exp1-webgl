import React, {useEffect} from 'react';
import * as BABYLON from 'babylonjs';
import './App.css';

const App = () => {

  /**
   * gets the rendered canvas
   */
  const getCanvas = () => {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
    var scene = createScene({ canvas, engine });
    engine.runRenderLoop(()=>{
      scene.render();
    });
    window.addEventListener('resize', () => {
      engine.resize();
    });
  }

  /**
   * creates a canvas scene
   * @param {object} param0 - the object that contains canvas and engine params
   */
  const createScene = ({canvas, engine}) => {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3(10, 10, 10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
    new BABYLON.PointLight('Light1', new BABYLON.Vector3(0, 8, -10), scene);
    var sphere = new BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
    var sphere2 = new BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
    // BABYLON.Mesh.CreateGround('ground1', 6, 6, 1, scene, true);
    BABYLON.MeshBuilder.CreateTiledGround('ground1', { xmin: -1, xmax:1, zmin: -1,zmax:1, subdivisions: {
      w: 1, h: 1
    }}, scene, false);
    sphere.position.y = 1;
    sphere2.position.y=-1;
    return scene;
  }

  useEffect(()=>{
    getCanvas();
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <canvas id="renderCanvas"/>
      </header>
    </div>
  );
}

export default App;
