#!/usr/bin/env python3
import os
import re
from datetime import datetime

base_dir = "/home/lizhe/Videos/zhihu/分类"

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        if not filename.endswith(".md"):
            continue

        filepath = os.path.join(root, filename)

        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        if content.startswith("---"):
            continue

        category = os.path.basename(root)

        title_with_ext = os.path.splitext(filename)[0]
        title = title_with_ext.replace("question", "?")
        title = title.replace("comma", "，")
        title = title.replace("dunhao", "、")
        title = title.replace("colon", "：")
        title = title.replace("dot", "。")
        title = title.replace("exclaim", "！")
        title = title.replace("leftparen", "（")
        title = title.replace("rightparen", "）")
        title = title.replace("leftquote", "「")
        title = title.replace("rightquote", "」")
        title = title.replace("bookstart", "《")
        title = title.replace("bookend", "》")
        title = title.replace("less", "<")
        title = title.replace("greater", ">")
        title = title.replace("percent", "%")
        title = title.replace("_", " ")

        mtime = os.path.getmtime(filepath)
        date_str = datetime.fromtimestamp(mtime).strftime("%Y-%m-%d %H:%M:%S")

        front_matter = f"""---
title: {title}
date: {date_str}
categories: {category}
---

"""

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(front_matter + content)

        print(f"添加 Front Matter: {filename}")

print("完成")
