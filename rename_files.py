#!/usr/bin/env python3
import os
import re

base_dir = "/home/lizhe/Videos/zhihu/分类"

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        if not filename.endswith(".md"):
            continue

        newname = filename
        newname = newname.replace("%", "percent")
        newname = newname.replace("?", "question")
        newname = newname.replace("<", "less")
        newname = newname.replace(">", "greater")
        newname = newname.replace("《", "bookstart")
        newname = newname.replace("》", "bookend")
        newname = newname.replace("？", "question")
        newname = newname.replace("，", "comma")
        newname = newname.replace("、", "dunhao")
        newname = newname.replace("：", "colon")
        newname = newname.replace("。", "dot")
        newname = newname.replace("！", "exclaim")
        newname = newname.replace("（", "leftparen")
        newname = newname.replace("）", "rightparen")
        newname = newname.replace("「", "leftquote")
        newname = newname.replace("」", "rightquote")
        newname = newname.replace(" ", "_")

        if filename != newname:
            oldpath = os.path.join(root, filename)
            newpath = os.path.join(root, newname)

            if not os.path.exists(newpath):
                try:
                    os.rename(oldpath, newpath)
                    print(f"重命名: {filename} -> {newname}")
                except Exception as e:
                    print(f"重命名失败: {filename} -> {e}")
            else:
                print(f"跳过（文件已存在）: {newname}")

print("重命名完成")
