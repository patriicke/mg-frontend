import NumberFormat from './number-format'

export const MINUS = '-'

export type InputType = number | string

export interface Options {
  prefix: string
  suffix: string
  separator: string
  decimal: string
  precision: number
  minimumFractionDigits: number
  prefill: boolean
  reverseFill: boolean
  min?: number
  max?: number
  nullValue: string
}

export interface Config {
  options: Options
  oldValue: InputType
  masked: InputType
  unmaskedValue: InputType
}

export class CustomInputEvent<T = any> extends CustomEvent<T> {
  target!: CustomInputElement
}
export interface CustomInputElement extends HTMLInputElement {
  options: Options
  masked?: InputType
  unmaskedValue?: InputType
  oldValue?: InputType
  cleanup: () => void
}

/**
 * Creates a fuction to clone the objcet
 */
export function cloneDeep(data: object) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * Creates a CustomEvent with detail = { facade: true }
 * used as a way to identify our own event
 */
export function InputEvent(event: string) {
  return new CustomEvent(event, {
    bubbles: true,
    cancelable: true,
    detail: { facade: true }
  })
}

/**
 * ensure that the element we're attaching to is an input element
 * if not try to find an input element in this elements childrens
 */
export function getInputElement(el: HTMLElement | HTMLInputElement): CustomInputElement {
  const inputElement = el instanceof HTMLInputElement ? el : el.querySelector<HTMLInputElement>('input')

  /* istanbul ignore next */
  if (!inputElement) {
    throw new Error('facade directive requires an input element')
  }

  return inputElement as CustomInputElement
}
