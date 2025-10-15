declare module "@gsap/react" {
  import type { MutableRefObject } from "react"

  export interface UseGSAPOptions {
    scope?: MutableRefObject<Element | null> | Element | null
    dependencies?: unknown[]
    revertOnUpdate?: boolean
  }

  export function useGSAP(
    callback: () => void,
    options?: UseGSAPOptions
  ): void

  export const GSAPProvider: React.ComponentType<{ children?: React.ReactNode }>
}


