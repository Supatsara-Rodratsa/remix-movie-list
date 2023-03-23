import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const generatedFile = resolve('./app/generated/graphql.ts')

let generated = readFileSync(generatedFile, 'utf-8')

generated = generated.replace(
  `import { GraphQLClient } from 'graphql-request'`,
  `import type { GraphQLClient } from 'graphql-request'`
)
generated = generated.replace(
  `import * as Dom from 'graphql-request/dist/types.dom'`,
  `import type * as Dom from 'graphql-request/src/types.dom'`
)

writeFileSync(generatedFile, generated, 'utf-8')
