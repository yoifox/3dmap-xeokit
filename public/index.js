import { initObjects } from "./utils/xeokit-utils/objects-util.js";
import { DebugTool } from "./utils/xeokit-utils/debug-tool.js";
import { Viewer, WebIFCLoaderPlugin, DirLight, KTX2TextureTranscoder, XKTLoaderPlugin, PhongMaterial, Texture } from "./xeokit-sdk/dist/xeokit-sdk.min.es.js";
import { Terrain } from "./utils/xeokit-utils/terrain.js";
import { createImage } from "./utils/js/readable-image.js";
import { createSkybox } from "./utils/xeokit-utils/skybox.js";

const viewer = new Viewer({
    canvasId: "xeokit-canvas",
    transparent: true,
});

viewer.cameraControl.navMode = "firstPerson";

window.viewer = viewer;

const ifcLoader = new WebIFCLoaderPlugin(viewer, {
    wasmPath: "./xeokit-sdk/dist/",
});

const model = ifcLoader.load({
    src: "./assets/1.ifc",
    excludeTypes: ["IfcSpace"],
    origin: [48, 4, 50],
});

new DirLight(viewer.scene, {
    dir: [0.8, -0.6, -0.8],
    color: [1.0, 1.0, 1.0],
    intensity: 0.5,
    space: "world",
});

model.on("loaded", () => {
    initObjects(viewer, {});
    console.log(viewer);
    new DebugTool(viewer);
    createSkybox(viewer);
    createImage("assets/images/5.png").then(data => {
        createImage("assets/images/5.jpg").then(data2 => {
            new Terrain(data, data2, new PhongMaterial(viewer.scene, {
                diffuse: [0.5, 0.5, 0.5],
                alpha: 1.0,
                ambient: [1, 1, 1],
                shininess: 300000,
                diffuseMap: new Texture(viewer.scene, {
                    src: "assets/images/5.png",
                }),
            }), 100);
        });
    });
});