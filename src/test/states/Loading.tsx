import React from "react";

const Loading = ({ title = "" }) => {
  return <div className="loading-container" />;
  return (
    <div className="fixed inset-0 z-50 col-center justify-center">
      <div className="bg-cyan p-6x round-l">
        <h1>loading </h1>
        <span className="text-white">{title}</span>
      </div>
    </div>
  );
};

export default Loading;
