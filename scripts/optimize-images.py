"""
One-off asset pipeline for the hero portrait pair.

The source PNGs (1024px / 1254px squares, ~1.4 MB / ~2 MB) are displayed in a
4:5 pill at ~300px wide, so we crop both to the same 4:5 framing and emit WebP
at 1x / 1.5x / 2x widths. Run from the project root:

    python scripts/optimize-images.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
OUT = ROOT / "public" / "assets" / "images"
WIDTHS = (320, 480, 640)
ASPECT = (4, 5)


def crop_to_aspect(im: Image.Image, top_bias: float) -> Image.Image:
    """Center-crop horizontally; vertically favour the top (where the face is)."""
    w, h = im.size
    target_h = round(w * ASPECT[1] / ASPECT[0])
    if target_h <= h:
        top = round((h - target_h) * top_bias)
        return im.crop((0, top, w, top + target_h))
    target_w = round(h * ASPECT[0] / ASPECT[1])
    left = (w - target_w) // 2
    return im.crop((left, 0, left + target_w, h))


def emit(name: str, top_bias: float) -> None:
    im = Image.open(SRC / f"{name}.png").convert("RGB")
    im = crop_to_aspect(im, top_bias)
    for width in WIDTHS:
        height = round(width * ASPECT[1] / ASPECT[0])
        out = im.resize((width, height), Image.LANCZOS)
        path = OUT / f"{name}-{width}.webp"
        out.save(path, "WEBP", quality=82, method=6)
        print(f"{path.relative_to(ROOT)}  {out.size}  {path.stat().st_size // 1024} KB")


if __name__ == "__main__":
    emit("kavin", top_bias=0.0)
    emit("kavin-cartoon", top_bias=0.0)
