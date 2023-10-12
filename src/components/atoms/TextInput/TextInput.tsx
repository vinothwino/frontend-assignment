import React from "react";
import "./textInput.css";

type Props = {
  text: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
};

const TextInput = (props: Props) => {
  const { text, onChange, onKeyDown } = props;

  //TODO: Need to improve the textInput component with div element content Editable feature

  return (
    <>
      <textarea
        className="custom-input"
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {/* <div
        className="custom-input"
        contentEditable
        onInput={handleInputChange}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div> */}
    </>
  );
};

export default TextInput;
