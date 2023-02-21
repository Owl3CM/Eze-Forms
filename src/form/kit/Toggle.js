import React from 'react'
import { Utils } from '../../utils'

const Toggle = ({
  className = '',
  storageKey,
  value: defaultValue = 'false',
  title,
  onChange,
  id,
  init
}) =>
  React.useMemo(() => {
    const toggleId = Utils.uuid()
    console.debug({ toggleId }, 'Toggle')
    let value = JSON.parse(localStorage.getItem(storageKey) || defaultValue)

    const clear = () => document.getElementById(toggleId).click()
    init && init({ clear, value, title, id })

    return (
      <div className={`kit-toggled-container ${className}`}>
        <p className='font-bold text-sm px-sm'>{title}</p>
        <p
          className={`kit-toggle-button ${value ? 'kit-toggle-active' : ''}`}
          id={toggleId}
          onClick={({ currentTarget }) => {
            value = !value
            onChange({ clear, value: value, title, id })
            if (storageKey) localStorage.setItem(storageKey, value)
            currentTarget.classList.toggle('kit-toggle-active')
          }}
        />
      </div>
    )
  }, [])
export default Toggle

// import React from "react";

// const Toggle = ({ className = "", storageKey, defaultValue, title, onChange }) => (
//     <KitToggle
//         prop={{
//             title,
//             className,
//             storageKey,
//             defaultValue,
//             onChange: (prop) => {
//                 onChange(prop.value);
//             },
//         }}
//     />
// );

// export default React.memo(Toggle);

// export const KitToggle = ({ prop }) => {
//     return (
//         <div className={`kit-toggled-container ${prop.className}`}>
//             <p className="font-bold text-sm px-sm">{prop.title}</p>
//             <p
//                 ref={(ref) => {
//                     if (prop.clear || !ref) return;
//                     prop.clear = () => {
//                         if (!prop.value) return;
//                         ref.click();
//                     };
//                 }}
//                 className={`kit-toggle-button ${prop.value ? "kit-toggle-active" : ""}`}
//                 onClick={({ currentTarget }) => {
//                     prop.value = !prop.value;
//                     prop.onChange(prop);
//                     if (prop.storageKey) localStorage.setItem(prop.storageKey, prop.value);
//                     currentTarget.classList.toggle("kit-toggle-active");
//                 }}
//             />
//         </div>
//     );
// };
