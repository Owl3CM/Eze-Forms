import React from "react";

type Props = {
  id: string;
  service: {
    subscribe: (props: { id: string; onError: (error: string) => void; onSuccess?: () => void; setValue: (value: string) => void }) => void;
    get: (id: string) => string;
    silentSet: ({ id, value }: { id: string; value: string }) => void;
  } | null;
  onChange?: (props: { id: string; value: string }) => void;
  value?: string;
};

const TestForm = ({
  //
  id,
  service,
  onChange = service?.silentSet,
  value: defaultValue = service?.get(id),
}: Props) => {
  const [value, setValue] = React.useState(defaultValue);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    service?.subscribe({ id, onError: setErrorMsg as any, onSuccess: () => setErrorMsg(null), setValue });
  }, []);

  return (
    <div data-form-error={errorMsg} data-position="bottom" className="input bg-king round-m row-center">
      <input
        className="bg-transparent flex-grow-1"
        value={value}
        onChange={({ target: { value } }) => {
          onChange?.({ id: id, value });
          setValue(value);
        }}
      />
      {/* <p>error:{errorMsg}</p> */}
    </div>
  );
};

export default TestForm;
