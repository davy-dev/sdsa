"use client"

import { useEffect } from "react"

export default function HydrationFix() {
  useEffect(() => {

    const removeExtensionAttributes = () => {
      const body = document.body
      if (body) {
        const extensionAttributes = [
          'cz-shortcut-listen',
          'data-new-gr-c-s-check-loaded',
          'data-gr-ext-installed',
          'spellcheck'
        ]
        
        extensionAttributes.forEach(attr => {
          if (body.hasAttribute(attr)) {
            body.removeAttribute(attr)
          }
        })
      }
    }

    // Exécuter immédiatement et après un court délai
    removeExtensionAttributes()
    const timeoutId = setTimeout(removeExtensionAttributes, 100)
    
    return () => clearTimeout(timeoutId)
  }, [])

  return null
}
