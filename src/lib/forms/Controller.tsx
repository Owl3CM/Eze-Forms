import React from "react";
import { FormServiceType } from "../elements";

type Props = {
  Component: React.FC<any>;
  service?: FormServiceType;
  id: string;
};

const Controller = ({ Component, service, id }: Props) => {
  const [, render] = React.useState(0);

  const controller = React.useMemo(() => {
    const onChange = service?.set as any;
    let _controller = {
      id,
      value: service?.get(id) ?? "",
      error: null as any,
      setValue: (value: string) => {
        _controller.value = value;
        onChange({ id, value });
        render((prev) => prev + 1);
      },
      onError: (error: string) => {
        _controller.error = error;
        render((prev) => prev + 1);
      },
      onSuccess: () => {
        if (!_controller.error) return;
        _controller.error = null;
        render((prev) => prev + 1);
      },
      onChange: (value: string) => {
        _controller.value = value;
        onChange?.({ id, value });
      },
    };
    service?.subscribe?.(_controller);
    return _controller;
  }, []);

  return <Component value={controller.value} error={controller.error} onChange={controller.onChange} />;
};

export default Controller;
