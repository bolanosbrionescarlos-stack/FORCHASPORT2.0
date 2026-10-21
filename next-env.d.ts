// Type definitions for Next.js environment
// https://nextjs.org/docs/basic/typescript#module-augmentation
declare module '*.css' {
  const content: CSSModule
  export default content
}

interface NextPage {
  title?: string
  components?: {
    Header?: React.ComponentType
    Footer?: React.ComponentType
  }
}

interface NextConfig {
  reactStrictMode?: boolean
  [key: string]: any
}

// Prevent TypeScript from erroring on Next.js constructs
declare const __NEXT_DATA__: any