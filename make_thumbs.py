# Creates small thumbnail copies of every photo in images/gallery
# into images/gallery-thumbs. The gallery page shows the thumbnails
# (fast to load); clicking one opens the full-quality original.
#
# Run this again whenever you add new photos:  py -3 make_thumbs.py
# Already-made thumbnails are skipped, so re-running is quick.
import os

from PIL import Image, ImageOps

SRC = os.path.join("images", "gallery")
DST = os.path.join("images", "gallery-thumbs")
MAX_SIZE = 700  # longest side of a thumbnail, in pixels

os.makedirs(DST, exist_ok=True)

made = skipped = 0
for name in sorted(os.listdir(SRC)):
    if name.lower() == "desktop.ini":
        continue
    src_path = os.path.join(SRC, name)
    dst_path = os.path.join(DST, name)
    if os.path.exists(dst_path):
        skipped += 1
        continue
    with Image.open(src_path) as im:
        im = ImageOps.exif_transpose(im)  # keep phone photos right side up
        im.thumbnail((MAX_SIZE, MAX_SIZE))
        if name.lower().endswith((".jpg", ".jpeg")):
            im.convert("RGB").save(dst_path, "JPEG", quality=80)
        else:
            im.save(dst_path, optimize=True)
    made += 1

print(f"done: {made} thumbnails created, {skipped} already existed")
