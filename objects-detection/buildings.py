import cv2
import matplotlib.pyplot as plt

img = cv2.imread('./in.png', cv2.IMREAD_GRAYSCALE)
retval, threshold = cv2.threshold(img, 150, 255, cv2.THRESH_BINARY)

out = cv2.cvtColor(threshold, cv2.COLOR_GRAY2BGR)

threshold_blur = 255 - cv2.medianBlur(threshold, 5)

cv2.imwrite("./buildings.png", threshold)