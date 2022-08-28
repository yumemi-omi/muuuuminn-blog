---
name: "new component"
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
import { Box, BoxProps } from '@chakra-ui/react'
import { FC } from 'react'

interface {{ PascalComponentName }}Props extends BoxProps {}

export const {{ PascalComponentName }}: FC<{{ PascalComponentName }}Props> = (props) => {
  const { children } = props
  return (
    <Box>
      {children}
    </Box>
  )
}
```
