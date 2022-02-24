import React from "react";
import { Controller } from "react-hook-form";
import Select, { createFilter } from "react-select";
import MenuLargeList from "./MenuLargeList";
import OptionFontAwesome from "./OptionFontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SelectFontAwesome({
  control,
  name,
  required = true,
  isClearable = true,
  isSearchable = true,
  funcOnChange,
  options,
  errors,
}) {
  return (
    <div className="input">
      <label htmlFor={name}>Icône Font Awesome</label>
      <div className="input-block">
        <span>
          <FontAwesomeIcon icon={["fab", "font-awesome"]} />
        </span>
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <Select
              isClearable={isClearable}
              isSearchable={isSearchable}
              // menuIsOpen={true}
              filterOption={createFilter({ ignoreAccents: false })}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                funcOnChange(e);
              }}
              options={options}
              components={{
                MenuList: MenuLargeList,
                Option: OptionFontAwesome,
              }}
            />
          )}
        />
      </div>
      {errors.fontAwesomeIcon && (
        <span className="error-message-form">Ce champ est requis</span>
      )}
    </div>
  );
}

export default SelectFontAwesome;
