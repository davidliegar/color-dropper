import { inject, type App, type InjectionKey } from 'vue'
import { provideCanvasUseCases } from '@/core/canvas'

type UsesCases<T extends () => any> = InjectionKey<ReturnType<T>>

export const CANVAS_USE_CASES: UsesCases<typeof provideCanvasUseCases> = Symbol('CanvasUseCases')

export default function initInjects(app: App) {
  const canvasUSeCases = provideCanvasUseCases()

  app.provide(CANVAS_USE_CASES, canvasUSeCases)
}

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)

  if (!resolved) {
    throw new Error(`Could not resolve ${key.description ?? ''}`)
  }

  return resolved
}
