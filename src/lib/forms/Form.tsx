import React from "react";

type Props = {
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
    submitButton?: React.ReactNode;
};

const Form = ({ children, onSubmit, submitButton = defaultSubmit, className = "col gap-l" }: Props) => {
    return (
        <form className={className} onSubmit={onSubmit}>
            {children}
            {submitButton}
        </form>
    );
};

export default Form;

const defaultSubmit = <input className="default-btn floating-red" type="submit" value="حفظ" />;
