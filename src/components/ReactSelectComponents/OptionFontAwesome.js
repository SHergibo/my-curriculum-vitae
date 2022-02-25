import React from "react";
import { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OptionFontAwesome(props) {
  const { Option } = components;
  const { innerProps, isFocused, ...otherProps } = props;
  const { onMouseMove, onMouseOver, ...otherInnerProps } = innerProps;
  const newProps = { innerProps: { ...otherInnerProps }, ...otherProps };
  return (
    <Option {...newProps}>
      <FontAwesomeIcon icon={[props.data.prefix, props.data.value]} />
      {props.data.label}
    </Option>
  );
}

export default OptionFontAwesome;
