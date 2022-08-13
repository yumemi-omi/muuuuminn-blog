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
excerpt: ''
coverImage: '/post/{{ inputs.filename }}'
ogImage:
  url: "/post/{{ inputs.filename }}"
---
```
