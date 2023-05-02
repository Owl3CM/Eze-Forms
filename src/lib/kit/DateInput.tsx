const DateInput = (prop) => {
  console.debug('Date RD')
  const onSelect = ({ target }) => {
    let value = target.value
    if (prop.showInClearBar) {
      prop.clear = () => {
        target.value = ''
      }
    }
    prop.onChange(value)
  }
  return (
    <div key={prop.queryKey} className='owl-label-container min-w-max'>
      <input
        type='date'
        className='owl-date'
        defaultValue={prop.value}
        onChange={onSelect}
      />
      <p className='owl-label'>{prop.title} </p>
    </div>
  )
}
export default DateInput
