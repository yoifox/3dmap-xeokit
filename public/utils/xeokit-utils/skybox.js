import { Skybox, Texture } from "../../xeokit-sdk/dist/xeokit-sdk.min.es.js"

export const createSkybox = viewer => {
    new Skybox(viewer.scene, {
        src: "assets/skybox/1.png",
    })
}