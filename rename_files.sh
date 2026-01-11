#!/bin/bash

find /home/lizhe/Videos/zhihu/分类 -name "*.md" -type f | while read file; do
    dir=$(dirname "$file")
    filename=$(basename "$file")

    newfilename=$(echo "$filename" | perl -pe \
        's/%/percent/g; ' \
        's/\%/percent/g; ' \
        's/\?/question/g; ' \
        's/\</less/g; ' \
        's/\>/greater/g; ' \
        's/《/bookstart/g; ' \
        's/》/bookend/g; ' \
        's/？/question/g; ' \
        's/，/comma/g; ' \
        's/、/dunhao/g; ' \
        's/：/colon/g; ' \
        's/。/dot/g; ' \
        's/！/exclaim/g; ' \
        's/（/leftparen/g; ' \
        's/）/rightparen/g; ' \
        's/「/leftquote/g; ' \
        's/」/rightquote/g; ' \
        's/ /_/g')

    if [ "$filename" != "$newfilename" ]; then
        if [ ! -f "$dir/$newfilename" ]; then
            mv "$file" "$dir/$newfilename"
            echo "重命名: $filename -> $newfilename"
        else
            echo "跳过（文件已存在）: $newfilename"
        fi
    fi
done

echo "重命名完成"
