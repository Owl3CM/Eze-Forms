export default class CustomEvents {
  static setToInput = (inputId, value) => {
    const queryInput = document.getElementById(inputId)
    if (!queryInput) return
    Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set.call(queryInput, value)
    queryInput.dispatchEvent(new Event('change', { bubbles: true }))
    return true
  }
}
