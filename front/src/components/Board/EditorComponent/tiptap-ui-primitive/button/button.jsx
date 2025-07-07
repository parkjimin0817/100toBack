import * as React from "react";

import "./button-colors.scss";
import "./button-group.scss";
import "./button.scss";

export const Button = React.forwardRef(function Button(
  {
    className = "",
    children,
    "aria-label": ariaLabel,
    ...props
  },
  ref
) {
  return (
    <button
      className={`tiptap-button ${className}`.trim()}
      ref={ref}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
