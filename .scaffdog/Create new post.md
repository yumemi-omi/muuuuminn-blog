---
name: "post"
root: "./src/contents/post/"
output: "**/*"
ignore: []
questions:
  filename: "Please enter file name."
  title: "Please enter title."
---

# {{ inputs.filename }}/index.md

```markdown
---
title: '{{ inputs.title }}'
date: '{{ 'new Date().toISOString()' | eval }}'
coverImage: '/post/{{ inputs.filename }}'
ogImageUrl: "/post/{{ inputs.filename }}"
---
```
