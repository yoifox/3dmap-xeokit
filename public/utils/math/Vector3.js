export class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.add = other => {
            this.x += other.x;
            this.y += other.y;
            this.z += other.z;
            return this;
        }

        this.sub = other => {
            this.x -= other.x;
            this.y -= other.y;
            this.z -= other.z;
            return this;
        }

        this.mul = other => {
            this.x *= other.x;
            this.y *= other.y;
            this.z *= other.z;
            return this;
        }

        this.length = () => {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        this.normalize = () => {
            const length = this.length();
            this.x /= length;
            this.y /= length;
            this.z /= length;
            return this;
        }
    }
}