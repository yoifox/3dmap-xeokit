import { PhongMaterial, Texture } from "../../xeokit-sdk/dist/xeokit-sdk.min.es.js";

const _initObjectsRecursive = (viewer, metaObjects, properties) => {
    for (const id in metaObjects) {
        const metaObject = metaObjects[id];
        const original = viewer.scene.objects[id];
        if (original) {
            for (const [key, value] of Object.entries(properties)) {
                original[key] = value;
            }
            original.metaObject = metaObject;
            metaObject.original = original;
        }
        _initObjectsRecursive(metaObject.children);
    }
}

export const initObjects = (viewer, properties) => {
    _initObjectsRecursive(viewer, viewer.metaScene.metaObjects, properties);
}