import React from 'react'
import { Spliter } from 'js-node-tools'
import {
  FormCleaner,
  ToggleButton,
  Options,
  PopupSelector,
  SearchInput,
  Selector,
  OptionsIcon
} from '../Lib'

const KitExample = () => {
  const _feilds = {}
  const service = {}

  const onChange = (prop) => {
    setTimeout(() => {
      //   service.setQueryParmas((prev) => ({ ...prev, [prop.id]: prop }))
    }, 100)
  }
  return (
    <>
      <div className='bg-prim rounded-lg p-lg'>
        {/* <FormCleaner service={service} /> */}
      </div>
      <Spliter
        vertical
        storageKey={'kit-test'}
        initialRatios={[0.2, 0.8]}
        className='p-sm rounded-xl bg-green'
      />
      <div className='row items-start bg-king rounded-lg gap-md p-md'>
        <div className='row-center gap-md'>
          <p
            className='button'
            onClick={() => {
              Object.values(service.queryParmas).map((feild) => {
                feild.value && feild.clear()
              })
            }}
          >
            {'clear'}
          </p>
          <Selector
            value={0}
            id={'animals'}
            title={'Animals'}
            storageKey={'animals'}
            className='bg-prim'
            onChange={onChange}
            options={Animals}
            icon={OptionsIcon}
            init={onChange}
            button={({
              title,
              children,
              id,
              onClick,
              className,
              active,
              options,
              Icon,
              style
            }) => {
              return (
                <div
                  title={title}
                  onClick={onClick}
                  id={id}
                  className={'selector-button ' + className}
                  style={style}
                >
                  {/* <p className="cut-words" style={{ width: 100 }}>
                                            {title}
                                        </p> */}
                  <Icon options={options} active={active} />
                  {children}
                </div>
              )
            }}
          />
          <Selector
            value={0}
            id={'currencyId'}
            title={'Currency'}
            storageKey={'currencyId'}
            onChange={onChange}
            options={Days}
            init={onChange}
          />
          <ToggleButton title='المحذوفة' onChange={onChange} />
          <PopupSelector
            value={0}
            id={'currencyId'}
            title={'Currency'}
            storageKey={'currencyId'}
            onChange={onChange}
            options={Curences}
            init={onChange}
          />
          <SearchInput
            id='search'
            title='بحث'
            storageKey='search'
            init={onChange}
            onChange={onChange}
          />
        </div>
        <Options
          style={{ minWidth: 100 }}
          id={'cars-2'}
          title={'Cars-2'}
          storageKey={'cars-2'}
          onChange={onChange}
          options={Curences}
          init={onChange}
        />
        <Options
          style={{ minWidth: 100 }}
          id={'cars'}
          title={'Cars'}
          storageKey={'cars'}
          onChange={onChange}
          options={Cars}
          init={onChange}
        />
      </div>
    </>
  )
}
export default KitExample

const MockData = (
  length = 20,
  words = ['عملة', 'دينار عراقي', 'دولار أمريكي', 'يورو']
) => {
  const data = []

  for (let index = 0; index < length; index++) {
    data.push({
      id: index,
      title: words[index % words.length]
    })
  }
  return data
}

const Days = MockData(7, [
  'السبت',
  'الأحد',
  'الاثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة'
])
const Animals = MockData(10, [
  'dog',
  'cat',
  'bird',
  'fish',
  'snake',
  'lion',
  'tiger',
  'bear',
  'wolf',
  'fox'
])
const Cars = MockData(10, [
  'BMW',
  'Mercedes',
  'Audi',
  'Toyota',
  'Honda',
  'Nissan',
  'Mazda',
  'Hyundai',
  'Kia',
  'Ford',
  'Chevrolet',
  'Dodge',
  'Jeep'
])

const Curences = [
  { id: 0, title: ' عملة', displayTitle: 'العملة' },
  { id: 1, title: 'دينار عراقي', className: 'bg-orange' },
  { id: 2, title: 'دولار أمريكي', className: 'bg-green' },
  { id: 3, title: 'يورو', className: 'bg-blue' }
]
