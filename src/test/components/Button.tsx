import React from "react";

const Button = (props: any) => {
  console.log({ props });
  return (
    <div onClick={props.onClick}>
      Button
      {props.children}
    </div>
  );
};

export default Button;
