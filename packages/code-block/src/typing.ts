export interface CodeBlockOptions {
  wrapper?: string
}

export interface CodeSourceType {
  code: string
  type: string
}

export interface VirtualMapType {
  code: string
  formatCode: string
  type?: string
  path: string
  root: string
  comp: any
}
