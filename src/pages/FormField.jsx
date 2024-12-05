import { useState } from "react";

// Supply with labelName, fieldName, and inputType
// fieldName is used for htmlFor, id, name
const FormField = ({labelName, fieldName, inputType, placeHolder}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="form-field">
      <div className="">
        <label className="text-sm font-extralight" htmlFor={fieldName}>
          {labelName}
        </label>
      </div>
      <div>
        <input
          className="border border-black/25 p-4 w-full"
          id={fieldName}
          name={fieldName}
          type={inputType}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeHolder ? placeHolder : ""}
        />
      </div>
    </div>
  );
};

export default FormField;
