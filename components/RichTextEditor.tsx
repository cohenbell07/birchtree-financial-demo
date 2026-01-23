"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  // Minimal toolbar configuration: bold, italic, links, lists
  // Custom link handler to ensure it works properly
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
      handlers: {
        link: function(this: any, value: boolean) {
          if (value) {
            const href = prompt('Enter the URL:')
            if (href) {
              const quill = this.quill
              const range = quill.getSelection(true)
              if (range) {
                if (range.length === 0) {
                  // No text selected, insert link text
                  quill.insertText(range.index, href, 'link', href, 'user')
                } else {
                  // Text selected, make it a link
                  quill.formatText(range.index, range.length, 'link', href, 'user')
                }
              }
            }
          } else {
            // Remove link
            this.quill.format('link', false)
          }
        }
      }
    },
  }), [])

  const formats = [
    "header",
    "bold",
    "italic",
    "list",
    "bullet",
    "link",
  ]

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Enter your newsletter content..."}
        style={{
          backgroundColor: "white",
          minHeight: "300px",
        }}
      />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 300px;
          font-size: 14px;
          font-family: inherit;
        }
        .rich-text-editor .ql-editor {
          min-height: 300px;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          border: 1px solid #e5e7eb;
          background-color: #f9fafb;
        }
        .rich-text-editor .ql-container {
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
      `}</style>
    </div>
  )
}

