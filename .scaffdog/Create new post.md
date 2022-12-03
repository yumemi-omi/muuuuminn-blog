---
name: "Create a new markdown file for post"
root: "./src/muuuuminn-blog/posts/"
output: "**/*"
ignore: []
questions:
  filename: "Please enter the markdown filename. Filename must be unique in this blog"
  title: "Please enter the title."
  description: "Please enter the description."
  image: "Please enter the image file path or url."
  category: "Please enter the category unique id."
  tags: "Please enter the tag unique id. You can tagging multiple like 1,2"
---

# {{ inputs.filename }}/index.md

```markdown
---
title: '{{ inputs.title }}'
description: '{{ inputs.description }}'
date: '{{ 'new Date().toISOString()' | eval }}'
coverImage: '{{ inputs.image }}'
ogImageUrl: '{{ inputs.image }}'
category: '{{ inputs.category }}'
tags: '{{ inputs.tags }}'
---
```
