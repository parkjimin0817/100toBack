import * as React from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"

// --- Custom Extensions ---
// import { Link } from "@/components/tiptap-extension/link-extension"
// import { Selection } from "@/components/tiptap-extension/selection-extension"
// import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension"

// --- UI Primitives ---
import { Button } from "../tiptap-ui-primitive/button/button"
import { Spacer } from "../tiptap-ui-primitive/spacer/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "../tiptap-ui-primitive/toolbar/Toolbar"

// --- Tiptap Node ---
// import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
// import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "../tiptap-node/list-node.scss"
// import "@/components/tiptap-node/image-node/image-node.scss"
import "../tiptap-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "../tiptap-ui/heading-dropdown-menu/Heading-dropdown-menu"
// import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "../tiptap-ui/list-dropdown-menu/list-dropdown-menu"
import { BlockquoteButton } from "../tiptap-ui/blockquote-button/blockquote-button"
// import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  // ColorHighlightPopoverButton,
} from "../tiptap-ui/color-highlight-popover/color-highlight-popover"
// import {
//   LinkPopover,
//   LinkContent,
//   LinkButton,
// } from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "../tiptap-ui/mark-button/MarkButton"
import { TextAlignButton } from "../tiptap-ui/text-align-button/text-align-button"
import { UndoRedoButton } from "../tiptap-ui/undo-redo-button/undo-redo-button"

// --- Icons ---
// import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "../tiptap-icons/icon"
// import { LinkIcon } from "@/components/tiptap-icons/link-icon"

// --- Hooks ---
// import { useMobile } from "@/hooks/use-mobile"
// import { useWindowSize } from "@/hooks/use-window-size"
// import { useCursorVisibility } from "@/hooks/use-cursor-visibility"

// --- Components ---
// import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"

// --- Lib ---
// import { handleImageUpload, MAX_FILE_SIZE } from "./tiptap-utils"

// --- Styles ---
import "./simple-editor.scss"
import "./editor.scss"

// import content from "@/components/tiptap-templates/simple/data/content.json"

const MainToolbarContent = () => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <BlockquoteButton />
        {/* <CodeBlockButton /> */}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        {/* <MarkButton type="code" /> */}
        <MarkButton type="underline" />
        <ColorHighlightPopover />
        {/* {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )} */}
        {/* {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />} */}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup> */}

      <Spacer />

      {/* {isMobile && <ToolbarSeparator />} */}

      {/* <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup> */}
    </>
  )
}

const MobileToolbarContent = ({ type, onBack }) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)

export function SimpleEditor() {
  // const isMobile = useMobile()
  // const isMobile = false;
  // const windowSize = useWindowSize()
  const [mobileView, setMobileView] = React.useState("main")
  const toolbarRef = React.useRef(null)

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      // Selection,
      // ImageUploadNode.configure({
      //   accept: "image/*",
      //   maxSize: MAX_FILE_SIZE,
      //   limit: 3,
      //   upload: handleImageUpload,
      //   onError: (error) => console.error("Upload failed:", error),
      // }),
      // TrailingNode,
      // Link.configure({ openOnClick: false }),
    ],
    // content: content,
  })

  // const bodyRect = useCursorVisibility({
  //   editor,
  //   overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  // })

  // React.useEffect(() => {
  //   if (!isMobile && mobileView !== "main") {
  //     setMobileView("main")
  //   }
  // }, [isMobile, mobileView])

  return (
    <div id="editorBox">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          // style={
          //   isMobile
          //     ? {
          //         bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
          //       }
          //     : {}
          // }
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              // isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <div className="content-wrapper">
          <EditorContent
            editor={editor}
            role="presentation"
            className="tiptap simple-editor-content"
          />
        </div>
      </EditorContext.Provider>
    </div>
  )
}

export default SimpleEditor;