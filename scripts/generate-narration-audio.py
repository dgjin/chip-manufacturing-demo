#!/usr/bin/env python3
"""
从工艺步骤数据中的 narration 文稿生成预录讲解 MP3。

默认使用专业新闻男声（zh-CN-YunyangNeural）。生成后可将 public/narration/*.mp3
替换为真人配音文件（保持同名即可，无需改代码）。

依赖: pip install edge-tts
用法: python3 scripts/generate-narration-audio.py
"""

from __future__ import annotations

import asyncio
import re
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
STEPS_DIR = ROOT / "src" / "data" / "steps"
OUT_DIR = ROOT / "public" / "narration"

VOICE = "zh-CN-YunyangNeural"
RATE = "-6%"  # 略慢，便于学习理解


def load_narrations() -> list[tuple[str, str]]:
    items: list[tuple[str, str]] = []
    for path in sorted(STEPS_DIR.glob("*.ts")):
        if path.name == "index.ts":
            continue
        text = path.read_text(encoding="utf-8")
        id_match = re.search(r'id:\s*"([^"]+)"', text)
        narration_match = re.search(r'narration:\s*"([^"]+)"', text)
        if not id_match or not narration_match:
            print(f"skip {path.name}: missing id or narration", file=sys.stderr)
            continue
        items.append((id_match.group(1), narration_match.group(1)))
    return items


async def synthesize(step_id: str, narration: str) -> None:
    out_path = OUT_DIR / f"{step_id}.mp3"
    communicate = edge_tts.Communicate(narration, VOICE, rate=RATE)
    await communicate.save(str(out_path))
    print(f"  ✓ {out_path.name} ({len(narration)} chars)")


async def main() -> None:
    narrations = load_narrations()
    if not narrations:
        print("No narrations found.", file=sys.stderr)
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Generating {len(narrations)} narration files → {OUT_DIR}")
    print(f"Voice: {VOICE}, rate: {RATE}\n")

    for step_id, narration in narrations:
        print(step_id)
        await synthesize(step_id, narration)

    print("\nDone. Replace MP3s in public/narration/ with human recordings to upgrade.")


if __name__ == "__main__":
    asyncio.run(main())
