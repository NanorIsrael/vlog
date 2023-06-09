type InputType = {
  name: string;
  label?: boolean;
  type?: string;
  errors: any;
  fieldRef?: any;
};
export default function InputField({
  name,
  label,
  type,
  errors,
  fieldRef,
}: InputType) {
  return (
    <div>
      {label && (
        <label htmlFor={name}>
          {name}
          <input
            id={name}
            type={type || "text"}
            placeholder={name}
            ref={fieldRef}
          />
        </label>
      )}
      {<p>{errors[name]}</p>}
    </div>
  );
}
