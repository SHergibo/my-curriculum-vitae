import React from "react";
import { Controller } from "react-hook-form";
import Select, { createFilter } from "react-select";
import MenuLargeList from "./MenuLargeList";
import OptionFontAwesome from "./OptionFontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const customStyles = {
  container: (styles) => ({
    ...styles,
    width: "100%",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "hsla(0, 0%, 100%, 0.5);",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "hsla(0, 0%, 100%, 0.5);",
  }),
  input: (styles) => ({
    ...styles,
    color: "hsla(0, 0%, 100%, 0.5);",
  }),
  control: (styles) => ({
    ...styles,
    width: "100%",
    outline: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
    border: "none",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color: isSelected || isFocused ? "#ffffff" : "hsl(0, 0%, 35%)",
    backgroundColor:
      isSelected || isFocused ? "hsla(211, 80%, 10%, 0.849)" : "#fff",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "hsl(211, 80%, 10%)",
      svg: {
        color: "#ffffff",
      },
    },
    svg: {
      width: "20px",
      marginRight: "10px",
      color: isSelected || isFocused ? "#ffffff" : "hsl(211, 80%, 10%)",
    },
  }),
  menu: (styles) => ({
    ...styles,
    left: "-46px",
    width: "calc(100% - -47px)",
    marginTop: "3px",
    borderRadius: "0.625rem",
    overflow: "hidden",
    zIndex: "11",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    width: "1px !important",
    height: "38px !important",
    backgroundColor: "hsla(0, 0%, 100%, 0.5);",
  }),
  dropdownIndicator: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color:
      isSelected || isFocused
        ? "hsla(0, 0%, 100%, 0.5);"
        : "hsla(0, 0%, 100%, 0.5);",
    "&:hover": {
      color: "hsla(0, 0%, 100%, 0.2)",
    },
  }),
  clearIndicator: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color:
      isSelected || isFocused
        ? "hsla(0, 0%, 100%, 0.5);"
        : "hsla(0, 0%, 100%, 0.5);",
    "&:hover": {
      color: "hsla(0, 0%, 100%, 0.2)",
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    paddingLeft: "0px",
  }),
};

function SelectFontAwesome({
  control,
  name,
  label,
  required = true,
  isClearable = true,
  isSearchable = true,
  funcOnChange,
  options,
  errors,
  errorsMessage,
}) {
  return (
    <div className="input">
      <label htmlFor={name}>{label}</label>
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
              styles={customStyles}
              placeholder={label}
              isClearable={isClearable}
              isSearchable={isSearchable}
              filterOption={createFilter({ ignoreAccents: false })}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (funcOnChange) funcOnChange(e);
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
      {errorsMessage && (
        <span className="error-message-form">{errorsMessage}</span>
      )}
    </div>
  );
}

SelectFontAwesome.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  funcOnChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  errors: PropTypes.object,
  errorsMessage: PropTypes.string,
};

export default SelectFontAwesome;
