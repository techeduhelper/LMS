// CodeMessage.js
import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"; // for autocompletion

const CodeMessage = ({ content }) => {
  const isCode = content.startsWith("```");

  return isCode ? (
    <AceEditor
      mode='javascript'
      theme='monokai'
      name='code-editor'
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={content}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        readOnly: true,
      }}
      editorProps={{ $blockScrolling: Infinity }}
    />
  ) : (
    <div>{content}</div>
  );
};

export default CodeMessage;
