export const isApproximatelyTheSameColor = (srcColor, dstColor, proximity = 25) => {
    return Math.abs(srcColor[0] - dstColor[0]) + Math.abs(srcColor[1] - dstColor[1]) + Math.abs(srcColor[2] - dstColor[2]) < proximity;
}