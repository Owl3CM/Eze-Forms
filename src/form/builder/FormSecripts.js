import { Utils } from '../../utils'

export default class FormSecripts {
  constructor() {
    this.form = document.querySelector('#form')
    this.form.addEventListener('submit', this.handleSubmit)
  }

  static extractValues = (queries, includeNone = false) => {
    let defaultQP = {}
    queries?.map((group) => {
      _extract(group, defaultQP, includeNone)
    })
    return defaultQP
  }
}

const _extractValues = (queries, defaultQP, includeNone) => {
  queries?.map((group) => {
    _extract(group, defaultQP, includeNone)
  })
  return defaultQP
}

const _extract = (group, defaultQP, includeNone) => {
  group?.children.map((query) => {
    if (query.storageKey) {
      let storageValue = localStorage.getItem(query.storageKey)
      if (storageValue) {
        if (query.type === 'boolean') storageValue = storageValue === 'true'
        query.value = storageValue
      }
    }
    if (query.type === 'selector') {
      query.className =
        query.options.find((o) => o.id == query.value)?.className ||
        query.className
    } else if (query.type === 'options') {
      let i = query.options.findIndex((o) => o.id == query.value)
      // if (i !== -1) query.options[i].className = "selected";
    } else if (query.children) {
      if (query.type === 'button')
        _extractValues(
          query.type === 'button' ? [query] : query,
          defaultQP,
          includeNone
        )
    }

    if (includeNone || Utils.hasValue(query.value))
      defaultQP[query.id] = { value: query.value, title: query.title || '_' } //, clear: query.showInClearBar && query.value !== false, type: query.type };
  })
}
