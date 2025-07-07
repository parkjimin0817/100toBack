import * as React from "react"
import { useTiptapEditor } from "../../hooks/use-tiptap-editor"

// --- Icons ---
import { Redo2Icon, Undo2Icon } from "../../tiptap-icons/icon"

// --- UI Primitives ---
import { Button } from "../../tiptap-ui-primitive/button/button"

export const historyIcons = {
  undo: Undo2Icon,
  redo: Redo2Icon,
}

export const historyShortcutKeys = {
  undo: "Ctrl-z",
  redo: "Ctrl-Shift-z",
}

export const historyActionLabels = {
  undo: "Undo",
  redo: "Redo",
}

export function canExecuteHistoryAction(editor, action) {
  if (!editor) return false
  return action === "undo" ? editor.can().undo() : editor.can().redo()
}

export function executeHistoryAction(editor, action) {
  if (!editor) return false
  const chain = editor.chain().focus()
  return action === "undo" ? chain.undo().run() : chain.redo().run()
}

export function isHistoryActionDisabled(editor, action, userDisabled = false) {
  if (userDisabled) return true
  return !canExecuteHistoryAction(editor, action)
}

export function useHistoryAction(editor, action, disabled = false) {
  const canExecute = React.useMemo(
    () => canExecuteHistoryAction(editor, action),
    [editor, action]
  )

  const isDisabled = isHistoryActionDisabled(editor, action, disabled)

  const handleAction = React.useCallback(() => {
    if (!editor || isDisabled) return
    executeHistoryAction(editor, action)
  }, [editor, action, isDisabled])

  const Icon = historyIcons[action]
  const actionLabel = historyActionLabels[action]
  const shortcutKey = historyShortcutKeys[action]

  return {
    canExecute,
    isDisabled,
    handleAction,
    Icon,
    actionLabel,
    shortcutKey,
  }
}

export const UndoRedoButton = React.forwardRef(
  (
    {
      editor: providedEditor,
      action,
      text,
      className = "",
      disabled,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const editor = useTiptapEditor(providedEditor)

    const { isDisabled, handleAction, Icon, actionLabel, shortcutKey } =
      useHistoryAction(editor, action, disabled)

    const handleClick = React.useCallback(
      (e) => {
        onClick?.(e)
        if (!e.defaultPrevented && !disabled) {
          handleAction()
        }
      },
      [onClick, disabled, handleAction]
    )

    if (!editor || !editor.isEditable) {
      return null
    }

    return (
      <Button
        ref={ref}
        type="button"
        className={className.trim()}
        disabled={isDisabled}
        data-style="ghost"
        data-disabled={isDisabled}
        role="button"
        tabIndex={-1}
        aria-label={actionLabel}
        tooltip={actionLabel}
        shortcutKeys={shortcutKey}
        onClick={handleClick}
        {...buttonProps}
      >
        {children || (
          <>
            <Icon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    )
  }
)

UndoRedoButton.displayName = "UndoRedoButton"

export default UndoRedoButton
