import * as React from "react";

type DropdownItem = {
  label: string;
  value: string;
};

type DropdownOptions = Array<DropdownItem>;

interface IDropdownProps {
  className: string;
  options: DropdownOptions;
  handleSelect: React.ChangeEventHandler<HTMLSelectElement>;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
  const { className, options, handleSelect } = props;

  const renderOptions = () =>
    options.map((item, index) => (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    ));

  return (
    <select className={className} onChange={handleSelect}>
      <option>Select</option>
      {renderOptions()}
    </select>
  );
};

export type { IDropdownProps, DropdownOptions };

export default Dropdown;
