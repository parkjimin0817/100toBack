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
import { Button } from "./EditorComponent/tiptap-ui-primitive/button/button"
import { Spacer } from "./EditorComponent/tiptap-ui-primitive/spacer/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "./EditorComponent/tiptap-ui-primitive/toolbar/Toolbar"

// --- Tiptap Node ---
// import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
// import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "./EditorComponent/tiptap-node/list-node.scss"
// import "@/components/tiptap-node/image-node/image-node.scss"
import "./EditorComponent/tiptap-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "./EditorComponent/tiptap-ui/heading-dropdown-menu/Heading-dropdown-menu"
// import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "./EditorComponent/tiptap-ui/list-dropdown-menu/list-dropdown-menu"
import { BlockquoteButton } from "./EditorComponent/tiptap-ui/blockquote-button/blockquote-button"
// import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  // ColorHighlightPopoverButton,
} from "./EditorComponent/tiptap-ui/color-highlight-popover/color-highlight-popover"
// import {
//   LinkPopover,
//   LinkContent,
//   LinkButton,
// } from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "./EditorComponent/tiptap-ui/mark-button/MarkButton"
import { TextAlignButton } from "./EditorComponent/tiptap-ui/text-align-button/text-align-button"
import { UndoRedoButton } from "./EditorComponent/tiptap-ui/undo-redo-button/undo-redo-button"

// --- Icons ---
// import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "./EditorComponent/tiptap-icons/icon"
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
import "./EditorComponent/tiptap-templates/simple-editor.scss"
import "./EditorComponent/tiptap-templates/editor.scss"
import { useEffect } from "react"
import styled from "styled-components"

// import content from "@/components/tiptap-templates/simple/data/content.json"

const MainToolbarContent = ({ blockDelete }) => {
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
        <ListDropdownMenu types={["bulletList", "orderedList" /*, "taskList"*/]} />
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

      <ToolbarGroup>
        <DeleteButton type="button" onClick={() => blockDelete()}>삭제</DeleteButton>
      </ToolbarGroup>

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

export function SimpleEditor({ id, onChange, content, blockDelete }) {
  const [mobileView, setMobileView] = React.useState("main")
  const toolbarRef = React.useRef(null)

  const editor = useEditor({
    content : content || "",
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
    ],
  })

  useEffect(() => {
      if (editor && onChange) {
        const update = () => onChange(editor.getHTML());
        editor.on('update', update);
        return () => editor.off('update', update);
      }
    }, [editor]);
  
    if (!editor) return null;
  
    // const save = () => {
    //   console.log(editor.getHTML());
    // }

  return (
    <div id="editorBox" style={{ border: '1px solid #ccc', margin: '2rem auto' }}>
      <EditorContext.Provider value={{ editor }} id={id}>
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
              blockDelete={blockDelete}
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
        {/* <button onClick={save}>작성</button> */}
      </EditorContext.Provider>
    </div>
  )
}

export default SimpleEditor;

const DeleteButton = styled.button`
  height: 2rem;
  min-width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--tt-radius-lg, 0.75rem);
  &:hover {
    background-color: ${({ theme }) => (theme.colors.gray[200])};
  }
`