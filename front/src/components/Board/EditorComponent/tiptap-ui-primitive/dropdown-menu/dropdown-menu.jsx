import * as React from "react"
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react"
import "./dropdown-menu.scss"
import { Separator } from "../separator/Separator"

// --- Context Setup ---
const DropdownMenuContext = React.createContext(null)

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("DropdownMenu components must be wrapped in <DropdownMenu />")
  }
  return context
}

// --- Hook: useDropdownMenu ---
function useDropdownMenu({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  side = "bottom",
  align = "start",
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen)
  const [currentPlacement, setCurrentPlacement] = React.useState(`${side}-${align}`)
  const [activeIndex, setActiveIndex] = React.useState(null)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const elementsRef = React.useRef([])
  const labelsRef = React.useRef([])

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement: currentPlacement,
    middleware: [offset({ mainAxis: 4 }), flip(), shift({ padding: 4 })],
    whileElementsMounted: autoUpdate,
  })

  const { context } = floating

  const interactions = useInteractions([
    useClick(context, {
      event: "mousedown",
      toggle: true,
      ignoreMouse: false,
    }),
    useRole(context, { role: "menu" }),
    useDismiss(context, {
      outsidePress: true,
      outsidePressEvent: "mousedown",
    }),
    useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
    }),
    useTypeahead(context, {
      listRef: labelsRef,
      onMatch: open ? setActiveIndex : undefined,
      activeIndex,
    }),
  ])

  const updatePosition = React.useCallback((newSide, newAlign) => {
    setCurrentPlacement(`${newSide}-${newAlign}`)
  }, [])

  return {
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    elementsRef,
    labelsRef,
    updatePosition,
    ...interactions,
    ...floating,
  }
}

// --- Component: DropdownMenu ---
export function DropdownMenu({ children, ...options }) {
  const dropdown = useDropdownMenu(options)
  return (
    <DropdownMenuContext.Provider value={dropdown}>
      <FloatingList elementsRef={dropdown.elementsRef} labelsRef={dropdown.labelsRef}>
        {children}
      </FloatingList>
    </DropdownMenuContext.Provider>
  )
}

// --- Component: DropdownMenuTrigger ---
export const DropdownMenuTrigger = React.forwardRef(({ children, asChild = false, ...props }, propRef) => {
  const context = useDropdownMenuContext()
  const childrenRef = React.isValidElement(children)
    ? parseInt(React.version, 10) >= 19
      ? children.props?.ref
      : children.ref
    : undefined

  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      {
        ref,
        ...props,
        ...(typeof children.props === "object" ? children.props : {}),
        "aria-expanded": context.open,
        "aria-haspopup": "menu",
        "data-state": context.open ? "open" : "closed",
        ...context.getReferenceProps(),
      }
    )
  }

  return (
    <button
      ref={ref}
      aria-expanded={context.open}
      aria-haspopup="menu"
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

// --- Component: DropdownMenuContent ---
export const DropdownMenuContent = React.forwardRef(({
  style,
  className,
  orientation = "vertical",
  side = "bottom",
  align = "start",
  portal = true,
  portalProps = {},
  ...props
}, propRef) => {
  const context = useDropdownMenuContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  React.useEffect(() => {
    context.updatePosition(side, align)
  }, [context, side, align])

  if (!context.open) return null

  const content = (
    <FloatingFocusManager context={context.context} modal={false} initialFocus={0} returnFocus={true}>
      <div
        ref={ref}
        className={`tiptap-dropdown-menu ${className || ""}`}
        style={{
          position: context.strategy,
          top: context.y ?? 0,
          left: context.x ?? 0,
          outline: "none",
          ...style,
        }}
        aria-orientation={orientation}
        data-orientation={orientation}
        data-state={context.open ? "open" : "closed"}
        data-side={side}
        data-align={align}
        {...context.getFloatingProps(props)}
      >
        {props.children}
      </div>
    </FloatingFocusManager>
  )

  return portal ? <FloatingPortal {...portalProps}>{content}</FloatingPortal> : content
})
DropdownMenuContent.displayName = "DropdownMenuContent"

// --- Component: DropdownMenuItem ---
export const DropdownMenuItem = React.forwardRef(({ children, disabled, asChild = false, onSelect, className, ...props }, ref) => {
  const context = useDropdownMenuContext()
  const item = useListItem({ label: disabled ? null : children?.toString() })
  const isActive = context.activeIndex === item.index

  const handleSelect = React.useCallback((event) => {
    if (disabled) return
    onSelect?.()
    props.onClick?.(event)
    context.setOpen(false)
  }, [context, disabled, onSelect, props])

  const itemProps = {
    ref: useMergeRefs([item.ref, ref]),
    role: "menuitem",
    className,
    tabIndex: isActive ? 0 : -1,
    "data-highlighted": isActive,
    "aria-disabled": disabled,
    ...context.getItemProps({
      ...props,
      onClick: handleSelect,
    }),
  }

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props || {}

    return React.cloneElement(children, {
      ...itemProps,
      ...childProps,
      onClick: (event) => {
        handleSelect(event)
        childProps.onClick?.(event)
      },
    })
  }

  return <div {...itemProps}>{children}</div>
})
DropdownMenuItem.displayName = "DropdownMenuItem"

// --- Component: DropdownMenuGroup ---
export const DropdownMenuGroup = React.forwardRef(({ children, label, className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    role="group"
    aria-label={label}
    className={`tiptap-button-group ${className || ""}`}
  >
    {children}
  </div>
))
DropdownMenuGroup.displayName = "DropdownMenuGroup"

// --- Component: DropdownMenuSeparator ---
export const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={`tiptap-dropdown-menu-separator ${className || ""}`}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"
