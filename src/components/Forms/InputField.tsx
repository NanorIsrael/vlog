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
    <div className="p-1 flex flex-col mb-5">
      {label ? (
        <label htmlFor={name} className="flex flex-col justify-stary items-start">
          {name}
          <input
            id={name}
            type={type || "text"}
            placeholder={name}
            ref={fieldRef}
            className="block w-80"
          />
        </label>
      ) : 
      (
        <input
            id={name}
            type={type || "text"}
            placeholder={name}
            ref={fieldRef}
            className={""}
          />
      )
      }
      {<p className="text-red-600 text-sm bold">{errors[name]}</p>}
    </div>
  );
}
