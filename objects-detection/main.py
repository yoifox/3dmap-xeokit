import cv2
import numpy as np

img = cv2.imread('./in.png', cv2.IMREAD_GRAYSCALE)
blur = cv2.GaussianBlur(img, (19, 19), 0)
_, trees = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
trees = 255 - trees

_, buildings = cv2.threshold(img, 150, 255, cv2.THRESH_BINARY)
# buildings = cv2.cvtColor(buildings, cv2.COLOR_RGB2GRAY)
# threshold_blur = 255 - cv2.medianBlur(buildings, 5)

out = cv2.addWeighted(trees, 0.5, buildings, 0.5, 0)

cv2.imwrite("./out.png", out)
