import * as React from "react"
import { isNodeSelection } from "@tiptap/react"

// --- Hooks ---
import { useMenuNavigation } from "../../hooks/use-menu-navigation"
import { useTiptapEditor } from "../../hooks/use-tiptap-editor"

// --- Icons ---
import { BanIcon, HighlighterIcon } from "../../tiptap-icons/icon"
// import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"

// --- Lib ---
import { isMarkInSchema } from "../../lib/tiptap-utils"

// --- UI Primitives ---
import { Button } from "../../tiptap-ui-primitive/button/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../tiptap-ui-primitive/popover/popover"
import { Separator } from "../../tiptap-ui-primitive/separator/Separator"

// --- Tiptap UI ---
import {
  ColorHighlightButton,
  canToggleHighlight,
} from "../color-highlight-button/color-highlight-button"

// --- Styles ---
import "./color-highlight-popover.scss"

export const DEFAULT_HIGHLIGHT_COLORS = [
  {
    label: "Green",
    value: "var(--tt-color-highlight-green)",
    border: "var(--tt-color-highlight-green-contrast)",
  },
  {
    label: "Blue",
    value: "var(--tt-color-highlight-blue)",
    border: "var(--tt-color-highlight-blue-contrast)",
  },
  {
    label: "Red",
    value: "var(--tt-color-highlight-red)",
    border: "var(--tt-color-highlight-red-contrast)",
  },
  {
    label: "Purple",
    value: "var(--tt-color-highlight-purple)",
    border: "var(--tt-color-highlight-purple-contrast)",
  },
  {
    label: "Yellow",
    value: "var(--tt-color-highlight-yellow)",
    border: "var(--tt-color-highlight-yellow-contrast)",
  },
]

// 👉 하이라이트 버튼
export const ColorHighlightPopoverButton = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <Button
      type="button"
      className={className}
      data-style="ghost"
      data-appearance="default"
      role="button"
      tabIndex={-1}
      aria-label="Highlight text"
      tooltip="Highlight"
      ref={ref}
      {...props}
    >
      {children || <HighlighterIcon className="tiptap-button-icon" />}
    </Button>
  )
)
ColorHighlightPopoverButton.displayName = "ColorHighlightPopoverButton"

// 👉 하이라이트 컬러 선택 UI
export function ColorHighlightPopoverContent({ editor: providedEditor, colors = DEFAULT_HIGHLIGHT_COLORS, onClose }) {
  const editor = useTiptapEditor(providedEditor)
  const containerRef = React.useRef(null)

  const removeHighlight = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus().unsetMark("highlight").run()
    onClose?.()
  }, [editor, onClose])

  const menuItems = React.useMemo(() => [...colors, { label: "Remove highlight", value: "none" }], [colors])

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (item.value === "none") removeHighlight()
      onClose?.()
    },
    onClose,
    autoSelectFirstItem: false,
  })

  return (
    <div
      ref={containerRef}
      className="tiptap-color-highlight-content"
      tabIndex={0}
    >
      <div className="tiptap-button-group" data-orientation="horizontal">
        {colors.map((color, index) => (
          <ColorHighlightButton
            key={color.value}
            editor={editor}
            color={color.value}
            aria-label={`${color.label} highlight color`}
            tabIndex={index === selectedIndex ? 0 : -1}
            data-highlighted={selectedIndex === index}
            onClick={onClose}
          />
        ))}
      </div>

      <Separator />

      <div className="tiptap-button-group">
        <Button
          onClick={removeHighlight}
          aria-label="Remove highlight"
          tabIndex={selectedIndex === colors.length ? 0 : -1}
          type="button"
          role="menuitem"
          data-style="ghost"
          data-highlighted={selectedIndex === colors.length}
        >
          <BanIcon className="tiptap-button-icon" />
        </Button>
      </div>
    </div>
  )
}

// 👉 팝오버 전체 컴포넌트
export function ColorHighlightPopover({ editor: providedEditor, colors = DEFAULT_HIGHLIGHT_COLORS, hideWhenUnavailable = false, ...props }) {
  const editor = useTiptapEditor(providedEditor)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)

  const markAvailable = isMarkInSchema("highlight", editor)

  React.useEffect(() => {
    if (!editor) return

    const updateIsDisabled = () => {
      let disabled = false
      if (!markAvailable || !editor) disabled = true

      const isInBadContext =
        editor.isActive("code") ||
        editor.isActive("codeBlock") ||
        editor.isActive("imageUpload")

      if (isInBadContext) disabled = true

      setIsDisabled(disabled)
    }

    editor.on("selectionUpdate", updateIsDisabled)
    editor.on("update", updateIsDisabled)

    return () => {
      editor.off("selectionUpdate", updateIsDisabled)
      editor.off("update", updateIsDisabled)
    }
  }, [editor, markAvailable])

  const isActive = editor?.isActive("highlight") ?? false

  const shouldShow = React.useMemo(() => {
    if (!hideWhenUnavailable || !editor) return true
    return !(isNodeSelection(editor.state.selection) || !canToggleHighlight(editor))
  }, [hideWhenUnavailable, editor])

  if (!shouldShow || !editor || !editor.isEditable) return null

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ColorHighlightPopoverButton
          disabled={isDisabled}
          data-active-state={isActive ? "on" : "off"}
          data-disabled={isDisabled}
          aria-pressed={isActive}
          {...props}
        />
      </PopoverTrigger>

      <PopoverContent aria-label="Highlight colors">
        <ColorHighlightPopoverContent
          editor={editor}
          colors={colors}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default ColorHighlightPopover
