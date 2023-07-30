import React from "react";
import { IFormService } from "./FormService";
import { IFormChange } from "./Types";

export interface InputFormProps {
  service: IFormService;
  id: string;
  onChange?: (props: IFormChange) => void;
  children?: any;
  valdiateOn?: "onChange" | "onBlur" | "onFocus";
}

const InputForm = ({
  id,
  service,
  valdiateOn = "onChange",
  onChange = service.set,
  children = <input className="bg-king round-m" placeholder={id} />,
}: InputFormProps) => {
  const conatinerRef = React.useRef(null);
  React.useEffect(() => {
    const conatiner = conatinerRef.current;
    if (!conatiner) return;
    const onError = (error: string) => {
      conatiner.setAttribute("data-input-error", error);
    };
    const onSuccess = () => {
      conatiner.removeAttribute("data-input-error");
    };
    const input = conatiner.querySelector("input");
    const setValue = (value: any) => {
      input.value = value;
    };
    setValue(service.get(id));
    service.subscribe({ id, onError, onSuccess, setValue });
  }, []);

  return (
    <div
      ref={conatinerRef}
      className="col bg-red"
      onChange={valdiateOn === "onChange" ? ({ target: { value } }: any) => onChange({ id, value }) : null}
      onBlur={valdiateOn === "onBlur" ? ({ target: { value } }: any) => onChange({ id, value }) : null}
      onFocus={valdiateOn === "onFocus" ? ({ target: { value } }: any) => onChange({ id, value }) : null}>
      {children}
    </div>
  );
};

// export default InputForm;
// !
// import { IFormChange, IFormService } from "./FormService";

// type Props = {
//     service: IFormService;
//     id: string;
//     onChange?: (props: IFormChange) => void;
//     children: any;
// };

// const InputForm = ({ service, onChange = service.set, id, children }: Props) => {
//     return (
//         <div
//             className="col"
//             ref={(ref) => {
//                 if (!ref) return;
//                 const onError = (error: string) => {
//                     ref.setAttribute("data-input-error", error);
//                 };
//                 const onSuccess = () => {
//                     ref.removeAttribute("data-input-error");
//                 };
//                 const input = ref.querySelector("input");
//                 const setValue = (value) => {
//                     input.value = value;
//                 };
//                 service.subscribe({
//                     id,
//                     onError,
//                     onSuccess,
//                     setValue,
//                 });
//                 setValue(service.get(id));
//             }}
//             onChange={({ target: { value } }: any) => {
//                 onChange({ id, value });
//             }}>
//             {children ? children : <input className="bg-king round-m" placeholder={id} />}
//         </div>
//     );
// };

// export default InputForm;

// import { IFormChange } from "./FormService";

// type Props = {
//     service: any;
//     id: string;
//     onChange?: (props: IFormChange) => void;
//     children: any;
// };

// const InputForm = ({ service, onChange = service.set, id, children }: Props) => {
//     return (
//         <div
//             className="col"
//             ref={(ref) => {
//                 if (!ref) return;
//                 service[`on${id}Error`] = (error: string) => {
//                     ref.setAttribute("data-input-error", error);
//                 };
//                 service[`on${id}Success`] = () => {
//                     ref.removeAttribute("data-input-error");
//                 };
//                 const input = ref.querySelector("input");
//                 service[`set${id}`] = (value) => {
//                     input.value = value;
//                 };
//                 input.value = service.get(id);
//             }}
//             onChange={({ target: { value } }: any) => {
//                 onChange({ id, value });
//             }}>
//             {children ? children : <input className="bg-king round-m" placeholder={id} />}
//         </div>
//     );
// };

// export default InputForm;
