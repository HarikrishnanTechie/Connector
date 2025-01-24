import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism"; // Light theme

const jsonStyle = {
  ...duotoneLight, // Base theme for light background
  'punctuation': { color: '#444444' }, // Punctuation like {, }, [, ]
  'attr-name': { color: '#d73a49', fontWeight: 'bold' }, // Highlight keys (red shade)
  'attr-value': { color: '#032f62' }, // Highlight values (dark blue)
  'string': { color: '#032f62' }, // Strings inside values
  'number': { color: '#005cc5' }, // Numbers
  'boolean': { color: '#d73a49' }, // Booleans
  'null': { color: '#6a737d' }, // Null values (gray)
};

const JsonSyntaxHighlighter = ({ data }) => {
  const jsonString = JSON.stringify(data, null, 2); // Prettify JSON

  return (
    <SyntaxHighlighter
      language="json"
      style={jsonStyle} // Use the custom style
      customStyle={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5", // Light gray background
        fontSize: "14px",
        overflowX: "auto", // Scroll for long lines
        border: "1px solid #ddd", // Border for separation
        whiteSpace: 'pre-wrap', wordWrap: 'break-word'
      }}
      wrapLongLines={true}
    >
      {jsonString}
    </SyntaxHighlighter>
  );
};

export default JsonSyntaxHighlighter;
