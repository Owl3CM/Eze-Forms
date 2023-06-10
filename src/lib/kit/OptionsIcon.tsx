import React from "react";

const OptionsIcon = ({ options, active }: any) => {
  console.log({ options, active });
  return (
    <svg style={{ opacity: options.length > 1 ? 1 : 0.4, height: 18 }} className={`${active ? "fill-cyan" : "fill-crow"}`} viewBox="0 0 32 32">
      <path d="M19.75 16c0 2.071-1.679 3.75-3.75 3.75s-3.75-1.679-3.75-3.75c0-2.071 1.679-3.75 3.75-3.75s3.75 1.679 3.75 3.75zM19.75 27c0 2.071-1.679 3.75-3.75 3.75s-3.75-1.679-3.75-3.75c0-2.071 1.679-3.75 3.75-3.75s3.75 1.679 3.75 3.75zM19.75 5c0 2.071-1.679 3.75-3.75 3.75s-3.75-1.679-3.75-3.75c0-2.071 1.679-3.75 3.75-3.75s3.75 1.679 3.75 3.75z"></path>
    </svg>
  );
};

export default OptionsIcon;
