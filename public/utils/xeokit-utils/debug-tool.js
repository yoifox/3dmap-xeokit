export class DebugTool {
    constructor(viewer) {
        DebugTool.ACTIVATING_KEY = "KeyE";

        this.activated = false;
        this.lastEntity = null;
        this.lastColorize = null;

        document.addEventListener("keydown", e => {
            if (e.code == DebugTool.ACTIVATING_KEY && e.ctrlKey) {
                e.preventDefault();
                this.activated = !this.activated;
                document.getElementById("debug-tool-container").style.display = this.activated
                    ? "block"
                    : "none";
                e.stopPropagation();
            }
        }, true);

        document.addEventListener("mousedown", e => {
            if(this.lastEntity) {
                console.log(this.lastEntity);
                const safeEntity = {...this.lastEntity};
                delete safeEntity.scene;
                delete safeEntity.model;
                delete safeEntity.meshes;
                delete safeEntity.metaObject.metaModel;
                delete safeEntity.metaObject.original;
                safeEntity.metaObject.parent = safeEntity?.metaObject?.parent?.id || "scene";
                document.getElementById("debug-tool").display({ entity: safeEntity });
            }
        })

        viewer.cameraControl.on("hover", pickResult => {
            if (!this.activated) return;
            if (!this.lastEntity || pickResult.entity.id !== this.lastEntity.id) {
                if (this.lastEntity) {
                    this.lastEntity.colorize = this.lastColorize;
                }
                this.lastEntity = pickResult.entity;
                this.lastColorize = pickResult.entity.colorize.slice();
                pickResult.entity.colorize = [0.0, 1.0, 0.0];
            }
        });

        viewer.cameraControl.on("hoverOff", e => {
            if (this.lastEntity) {
                this.lastEntity.colorize = this.lastColorize;
            }
            this.lastEntity = null;
            this.lastColorize = null;
        });
    }
}