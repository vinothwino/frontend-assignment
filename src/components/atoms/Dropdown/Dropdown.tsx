import * as React from "react";
import "./dropdown.css";

type DropdownItem = {
  label: string;
  value: string;
};

type DropdownOptions = Array<DropdownItem>;

interface IDropdownProps {
  className: string;
  options: DropdownOptions;
  handleSelect: (selectedItem: string) => void;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
  const { className, options, handleSelect } = props;

  const renderOptions = () =>
    options.map((item: DropdownItem, index) => (
      <div
        key={index}
        className="dropdown-item"
        onClick={() => handleSelect(item.value)}
      >
        {item.label}
      </div>
    ));

  const renderEmptyMessage = () => (
    <div className="dropdown-item">No results</div>
  );

  return (
    <div className={`dropdown ${className}`}>
      {options.length ? renderOptions() : renderEmptyMessage()}
    </div>
  );
};

export type { IDropdownProps, DropdownOptions };

export default Dropdown;
