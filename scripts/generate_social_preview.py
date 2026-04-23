from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUTPUT = PUBLIC / "social-preview.png"
ICON = PUBLIC / "apple-touch-icon.png"

WIDTH = 1200
HEIGHT = 630


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def vertical_gradient(size: tuple[int, int], top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size, top)
    draw = ImageDraw.Draw(image)
    for y in range(height):
      t = y / max(height - 1, 1)
      color = tuple(int(top[i] * (1 - t) + bottom[i] * t) for i in range(3))
      draw.line([(0, y), (width, y)], fill=color)
    return image


def draw_glow(base: Image.Image, center: tuple[int, int], radius: int, color: tuple[int, int, int, int], blur: int) -> None:
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    x, y = center
    glow_draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)
    base.alpha_composite(glow.filter(ImageFilter.GaussianBlur(blur)))


def main() -> None:
    background = vertical_gradient((WIDTH, HEIGHT), (249, 245, 235), (239, 232, 214)).convert("RGBA")

    draw_glow(background, (180, 90), 190, (138, 216, 244, 70), 55)
    draw_glow(background, (1020, 580), 220, (20, 77, 112, 45), 75)

    panel = Image.new("RGBA", background.size, (0, 0, 0, 0))
    panel_draw = ImageDraw.Draw(panel)
    panel_draw.rounded_rectangle((70, 70, 1130, 560), radius=42, fill=(255, 253, 248, 240), outline=(209, 201, 184, 255), width=2)
    background.alpha_composite(panel)

    shadow = Image.new("RGBA", background.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((112, 162, 410, 460), radius=54, fill=(0, 0, 0, 80))
    background.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(24)))

    icon_plate = Image.new("RGBA", background.size, (0, 0, 0, 0))
    plate_draw = ImageDraw.Draw(icon_plate)
    plate_draw.rounded_rectangle((100, 150, 398, 448), radius=54, fill=(14, 48, 67, 255))
    background.alpha_composite(icon_plate)

    icon = Image.open(ICON).convert("RGBA")
    icon = icon.resize((190, 190), Image.LANCZOS)
    background.alpha_composite(icon, (154, 204))

    draw = ImageDraw.Draw(background)
    brand_font = load_font("/System/Library/Fonts/Supplemental/Futura.ttc", 78)
    title_font = load_font("/System/Library/Fonts/Supplemental/GillSans.ttc", 44)
    body_font = load_font("/System/Library/Fonts/Supplemental/GillSans.ttc", 28)
    url_font = load_font("/System/Library/Fonts/Supplemental/GillSans.ttc", 30)

    draw.text((470, 170), "AllStrum", font=brand_font, fill=(20, 33, 45))
    draw.text((472, 280), "Adaptive music devices for", font=title_font, fill=(31, 49, 62))
    draw.text((472, 335), "accessible guitar and ukulele play", font=title_font, fill=(31, 49, 62))
    draw.text(
        (472, 418),
        "Helping more people strum real songs with confidence.",
        font=body_font,
        fill=(77, 89, 99),
    )
    draw.text((472, 485), "allstrum.com", font=url_font, fill=(97, 76, 195))

    background.convert("RGB").save(OUTPUT, optimize=True)
    print(f"wrote {OUTPUT}")


if __name__ == "__main__":
    main()
