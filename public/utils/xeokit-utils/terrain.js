import { createTerrain } from "./terrain-util.js";
import { Mesh, VBOGeometry, PhongMaterial, Texture, LambertMaterial } from "../../xeokit-sdk/dist/xeokit-sdk.min.es.js";

export class Terrain {
    constructor(heightMap, dataMap, material, size) {
        const terrain = createTerrain(heightMap.width, size, heightMap, dataMap);
        new Mesh(viewer.scene, {
            geometry: new VBOGeometry(viewer.scene, {
                primitive: "triangles",
                positions: terrain.vertices,
                normals: terrain.normals,
                uv: terrain.uvs,
                indices: terrain.indices,
            }),
            material,
        });
    }
}