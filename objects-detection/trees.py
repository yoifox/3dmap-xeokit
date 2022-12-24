import cv2

im = cv2.imread('./in.png', cv2.IMREAD_GRAYSCALE)
blur = cv2.GaussianBlur(im, (19, 19), 0)
_, thr = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
thr = 255 - thr

cv2.imwrite("./trees.png", thr)
