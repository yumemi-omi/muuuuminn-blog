---
name: "Create a new component"
root: "./src/"
output: "**/components/"
ignore: []
questions:
  componentName: "Please enter component name."
---

# Variables

- PascalComponentName: `{{ inputs.componentName | pascal }}`

# {{ PascalComponentName }}/index.tsx

```typescript
export * from "./{{ PascalComponentName }}";
```

# {{ PascalComponentName }}/{{ PascalComponentName }}.tsx

```typescript
import { Box, BoxProps } from "@/libs/chakra";
import { FC, memo } from 'react'

export type {{ PascalComponentName }}Props = BoxProps

const _{{ PascalComponentName }}: FC<{{ PascalComponentName }}Props> = (props) => {
  const { children } = props
  return (
    <Box>
      {children}
    </Box>
  )
}

export const {{ PascalComponentName }} = memo(_{{ PascalComponentName }})
```
