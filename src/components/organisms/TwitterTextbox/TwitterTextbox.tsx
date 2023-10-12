import React, { useEffect, useState } from "react";
import TextInput from "../../atoms/TextInput";
import {
  EVENT_CODE_AT_SYMBOL,
  DUMMY_OPTIONS,
  NUMBER_CHARACTER_UNDERSCORE_REGEX,
} from "./twitterTextbox.constants";
import Dropdown from "../../atoms/Dropdown";
import "./twitterTextbox.css";

const TwitterTextbox = () => {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(DUMMY_OPTIONS);
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const [replaceAtStartPosition, setReplaceStartPosition] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText.length > 0) {
      setOptions(
        DUMMY_OPTIONS.filter(
          (option) =>
            !searchText ||
            option?.label.toLowerCase().includes(searchText?.toLowerCase())
        )
      );
    }
  }, [searchText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSelectedMentionTag = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setText((text) => {
      return (
        text.substring(0, replaceAtStartPosition) +
        " " +
        e.target.value +
        text.substring(replaceAtStartPosition + searchText.length + 2)
      );
    });
    setSearchText("");
    setOpenDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === EVENT_CODE_AT_SYMBOL) {
      setOpenDropdown(true);
      setReplaceStartPosition(text.length - 1);
      setSearchText("");
    }
    if (NUMBER_CHARACTER_UNDERSCORE_REGEX.test(e.key) && isOpenDropdown) {
      setSearchText((t) => t + e.key);
    }
  };

  return (
    <div className="twitter-input-wrapper">
      <TextInput
        text={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {!!isOpenDropdown && (
        <Dropdown
          className="twitter-input-dropdown"
          options={options}
          handleSelect={handleSelectedMentionTag}
        />
      )}
    </div>
  );
};

export default TwitterTextbox;
