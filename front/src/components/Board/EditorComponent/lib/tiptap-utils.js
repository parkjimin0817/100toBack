export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const isMarkInSchema = (markName, editor) => {
  if (!editor?.schema) return false
  return editor.schema.spec.marks.get(markName) !== undefined
}

export const isNodeInSchema = (nodeName, editor) => {
  if (!editor?.schema) return false
  return editor.schema.spec.nodes.get(nodeName) !== undefined
}

export function getActiveMarkAttrs(editor, markName) {
  if (!editor) return null
  const { state } = editor
  const marks = state.storedMarks || state.selection.$from.marks()
  const mark = marks.find((mark) => mark.type.name === markName)
  return mark?.attrs ?? null
}

export function isEmptyNode(node) {
  return !!node && node.content.size === 0
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function findNodePosition({ editor, node, nodePos }) {
  if (!editor || !editor.state?.doc) return null

  const hasValidNode = node !== undefined && node !== null
  const hasValidPos = nodePos !== undefined && nodePos !== null

  if (!hasValidNode && !hasValidPos) {
    return null
  }

  if (hasValidPos) {
    try {
      const nodeAtPos = editor.state.doc.nodeAt(nodePos)
      if (nodeAtPos) {
        return { pos: nodePos, node: nodeAtPos }
      }
    } catch (error) {
      console.error("Error checking node at position:", error)
      return null
    }
  }

  let foundPos = -1
  let foundNode = null

  editor.state.doc.descendants((currentNode, pos) => {
    if (currentNode === node) {
      foundPos = pos
      foundNode = currentNode
      return false
    }
    return true
  })

  return foundPos !== -1 && foundNode !== null
    ? { pos: foundPos, node: foundNode }
    : null
}

export const handleImageUpload = async (file, onProgress, abortSignal) => {
  if (!file) {
    throw new Error("No file provided")
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`
    )
  }

  for (let progress = 0; progress <= 100; progress += 10) {
    if (abortSignal?.aborted) {
      throw new Error("Upload cancelled")
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    onProgress?.({ progress })
  }

  return "/images/placeholder-image.png"
  // 실제 업로드시 사용:
  // return convertFileToBase64(file, abortSignal);
}

export const convertFileToBase64 = (file, abortSignal) => {
  if (!file) {
    return Promise.reject(new Error("No file provided"))
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    const abortHandler = () => {
      reader.abort()
      reject(new Error("Upload cancelled"))
    }

    if (abortSignal) {
      abortSignal.addEventListener("abort", abortHandler)
    }

    reader.onloadend = () => {
      if (abortSignal) {
        abortSignal.removeEventListener("abort", abortHandler)
      }

      if (typeof reader.result === "string") {
        resolve(reader.result)
      } else {
        reject(new Error("Failed to convert File to base64"))
      }
    }

    reader.onerror = (error) =>
      reject(new Error(`File reading error: ${error}`))
    reader.readAsDataURL(file)
  })
}

const ATTR_WHITESPACE = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g

export function isAllowedUri(uri, protocols) {
  const allowedProtocols = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp",
  ]

  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol =
        typeof protocol === "string" ? protocol : protocol.scheme
      if (nextProtocol) {
        allowedProtocols.push(nextProtocol)
      }
    })
  }

  return (
    !uri ||
    uri.replace(ATTR_WHITESPACE, "").match(
      new RegExp(
        `^(?:(?:${allowedProtocols.join("|")}):|[^a-z]|[a-z0-9+.\-]+(?:[^a-z+.\-:]|$))`,
        "i"
      )
    )
  )
}

export function sanitizeUrl(inputUrl, baseUrl, protocols) {
  try {
    const url = new URL(inputUrl, baseUrl)
    if (isAllowedUri(url.href, protocols)) {
      return url.href
    }
  } catch {
    // Invalid URL
  }
  return "#"
}
