import { isApproximatelyTheSameColor } from "../images/color-util.js";
import { getPixelXY } from "../js/readable-image.js";
import { Vector3 } from "../math/Vector3.js";

const calcNormal = (x, z, heightMap, dataMap, vertexCount) => {
    if (x == 0 || z == 0 || x == vertexCount - 1 || z == vertexCount - 1) return new Vector3(0, 1, 0);
    const hl = calcHeight(x - 1, z, heightMap, dataMap, vertexCount);
    const hr = calcHeight(x + 1, z, heightMap, dataMap, vertexCount);
    const hd = calcHeight(x, z - 1, heightMap, dataMap, vertexCount);
    const hu = calcHeight(x, z + 1, heightMap, dataMap, vertexCount);
    return new Vector3(hl - hr, 2, hd - hu).normalize();
}

const calcHeight = (x, z, heightMap, dataMap, vertexCount) => {
    if (x >= vertexCount || z >= vertexCount) return 0;
    const height = getPixelXY(heightMap, x, z);
    // if (isApproximatelyTheSameColor(height, [40, 50, 40], 50)) { //tree
    //     height[0] = (255 - height[0]) * 0.8;
    //     height[1] = (255 - height[1]) * 0.8;
    //     height[2] = (255 - height[2]) * 0.8;
    // }
    // if (isApproximatelyTheSameColor(height, [125, 80, 65])) { //roof
    //     height[0] = (255 - height[0]) * 1.2;
    //     height[1] = (255 - height[1]) * 1.2;
    //     height[2] = (255 - height[2]) * 1.2;
    // }
    // if (isApproximatelyTheSameColor(height, [50, 80, 100])) {
    //     height[0] = (255 - height[0]) * 0.8;
    //     height[1] = (255 - height[1]) * 0.8;
    //     height[2] = (255 - height[2]) * 0.8;
    // }
    const data = getPixelXY(dataMap, x, z);
    const avg = (height[0] + height[1] + height[2]) / 255;
    if(isApproximatelyTheSameColor(data, [100, 100, 100], 50)) { //building
        return avg / 8 + 2.5;
    } else if(isApproximatelyTheSameColor(data, [0, 124, 0], 50)) { //tree
        return 1 - avg / 8 + 1;
    } else if(isApproximatelyTheSameColor(data, [3, 255, 0], 50)) { //grass
        return 1 - avg / 8 + 0.5;
    } else if(isApproximatelyTheSameColor(data, [0, 0, 0], 50)) { //road
        return avg / 8 - 0.5;
    } else if(isApproximatelyTheSameColor(data, [155, 77, 3], 50)) { //soil
        return avg / 4;
    } else {
        return avg / 3;
    }
}

/**
 * 
 * @param {Number} vertexCount 
 * @param {Number} size 
 * @param {ImageData} heightMap 
 * @returns Terrain
 */
export const createTerrain = (vertexCount, size, heightMap, dataMap) => {
    const vertices = [];
    const indices = [];
    const normals = [];
    const uvs = [];

    let counter = 0;
    for (let i = 0; i < vertexCount; i++) {
        for (let j = 0; j < vertexCount; j++) {
            vertices[counter * 3] = j / (vertexCount - 1.0) * size;
            vertices[counter * 3 + 1] = calcHeight(i, j, heightMap, dataMap, vertexCount);
            vertices[counter * 3 + 2] = i / (vertexCount - 1.0) * size;

            const normal = calcNormal(i, j, heightMap, dataMap, vertexCount);
            normals[counter * 3] = normal.x;
            normals[counter * 3 + 1] = normal.y;
            normals[counter * 3 + 2] = normal.z;

            uvs[counter * 2] = j / (vertexCount - 1.0);
            uvs[counter * 2 + 1] = i / (vertexCount - 1.0);

            counter++;
        }
    }
    counter = 0;
    for (let z = 0; z < vertexCount - 1.0; z++) {
        for (let x = 0; x < vertexCount - 1.0; x++) {
            let topLeft = (z * vertexCount) + x;
            let topRight = topLeft + 1;
            let bottomLeft = ((z + 1) * vertexCount) + x;
            let bottomRight = bottomLeft + 1;
            indices[counter++] = topLeft;
            indices[counter++] = bottomLeft;
            indices[counter++] = topRight;
            indices[counter++] = topRight;
            indices[counter++] = bottomLeft;
            indices[counter++] = bottomRight;
        }
    }
    return {
        vertices,
        indices,
        normals,
        uvs,
    }
}