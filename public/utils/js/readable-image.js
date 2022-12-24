export const createImage = src => {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');

        img.src = src;
        img.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
            const imageData = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
            imageData.src = src;
            resolve(imageData);
        });
        img.addEventListener('error', e => {
            reject(e);
        });
    });
}

function getPixel(imgData, index) {
    var i = index * 4, d = imgData.data
    return [d[i], d[i + 1], d[i + 2], d[i + 3]]
}

export function getPixelXY(imgData, x, y) {
    return getPixel(imgData, x * imgData.height + y);
}