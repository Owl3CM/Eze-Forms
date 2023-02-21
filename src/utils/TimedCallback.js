export default class TimedCallback {
  static Calls = {}
  static alreadyPending = (id) => !!this.Calls[id]?.timeoutId
  static restart = ({ id, timeout }) => {
    this.Calls[id]?.onRepated()
    clearTimeout(this.Calls[id].timeoutId)
    this.Calls[id].timeoutId = setTimedCallBack({ id, timeout })
  }
  static remove = (id) => {
    if (this.alreadyPending(id)) {
      clearTimeout(this.Calls[id].timeoutId)
      delete this.Calls[id]
    }
  }
  static create = ({ id, timeout, callback, onRepated }) => {
    this.remove(id)
    this.Calls[id] = {
      callback,
      timeout,
      onRepated,
      timeoutId: setTimedCallBack({ id, timeout, callback })
    }
  }
}
const setTimedCallBack = ({ id, timeout, callBack }) => {
  if (callBack) TimedCallback.Calls[id].callBack = callBack
  return setTimeout(() => {
    TimedCallback.Calls[id].callback()
    delete TimedCallback.Calls[id]
  }, timeout)
}
