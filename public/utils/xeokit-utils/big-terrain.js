export const createTerrain = viewer => {
    new Mesh(viewer.scene, {
        geometry: new ReadableGeometry(viewer.scene, buildPlaneGeometry({
            xSize: 1000,
            ySize: 1000,
            zSize: 1000,
        })),
        material: new PhongMaterial(viewer.scene, {
            ambient: [0.9, 0.3, 0.9],
            shininess: 30,
            diffuseMap: new Texture(viewer.scene, {
                src: "../assets/textures/diffuse/uvGrid2.jpg"
            }),
        })
    });
}