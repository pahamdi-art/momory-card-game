import os
from PIL import Image

dir = "Images/MINECRAFT"

img_list = os.listdir(dir)
for i in range(len(img_list)) :
    im = Image.open(dir+"/"+img_list[i])
    im.save(dir+"/img"+str(i)+ ".png")