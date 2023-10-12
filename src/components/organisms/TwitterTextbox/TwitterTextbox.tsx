import React, { useEffect, useState } from "react";
import TextInput from "../../atoms/TextInput";
import {
  EVENT_CODE_AT_SYMBOL,
  DUMMY_OPTIONS,
  BACKSPACE_KEY,
} from "./twitterTextbox.constants";
import Dropdown from "../../atoms/Dropdown";
import "./twitterTextbox.css";
import { validateSearchText } from "./twitterTextbox.helpers";

const TwitterTextbox = () => {
  const [text, setText] = useState("");
  const [options, setOptions] = useState([...DUMMY_OPTIONS]);
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const [replaceAtStartPosition, setReplaceStartPosition] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setOptions(
      DUMMY_OPTIONS.filter(
        (option) =>
          !searchText ||
          option?.label.toLowerCase().includes(searchText?.toLowerCase())
      )
    );
  }, [searchText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSelectedMentionTag = (selectedValue: string) => {
    setText((text) => {
      return (
        text.substring(0, replaceAtStartPosition) +
        selectedValue +
        text.substring(replaceAtStartPosition + searchText.length + 1)
      );
    });
    setSearchText("");
    setOpenDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === EVENT_CODE_AT_SYMBOL) {
      setOpenDropdown(true);
      const target = e.target as HTMLTextAreaElement;
      setReplaceStartPosition(target.selectionStart);
      setSearchText("");
    } else if (validateSearchText(e.keyCode) && isOpenDropdown) {
      setSearchText((t) => t + e.key);
    } else if (e.key === BACKSPACE_KEY && isOpenDropdown) {
      setSearchText((t) => t.slice(0, t.length - 1));
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
