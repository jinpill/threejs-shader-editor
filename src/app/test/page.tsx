"use client";

import { useEffect, useState } from "react";
import Editor, { type useMonaco } from "@monaco-editor/react";

type Monaco = NonNullable<ReturnType<typeof useMonaco>>;

const TestPage = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log("value:", value);
  }, [value]);

  return (
    <div>
      <h1>Test Page</h1>

      <Editor
        {...{
          language: "glsl",
          value: value,
          onChange: (value) => {
            setValue(value || "");
          },
          loading: "Loading editor...",
          theme: "vs-dark", // vs-light, vs-dark, hc-black
          defaultValue: defaultValue,
          options: {
            minimap: {
              enabled: true,
            },
            tabSize: 2,
            padding: {
              top: 20,
              bottom: 20,
            },
          },
          onMount: (_, monaco: Monaco) => {
            monaco.languages.register({ id: "glsl" });
            monaco.languages.setMonarchTokensProvider("glsl", {
              keywords: [
                "attribute",
                "const",
                "uniform",
                "varying",
                "break",
                "continue",
                "do",
                "for",
                "while",
                "if",
                "else",
                "in",
                "out",
                "inout",
                "float",
                "int",
                "void",
                "bool",
                "true",
                "false",
              ],

              operators: [
                "=",
                ">",
                "<",
                "!",
                "~",
                "?",
                ":",
                "==",
                "<=",
                ">=",
                "!=",
                "&&",
                "||",
                "++",
                "--",
                "+",
                "-",
                "*",
                "/",
                "&",
                "|",
                "^",
                "%",
              ],

              tokenizer: {
                root: [
                  [/\b(void|vec[234]|mat[234])\b/, "keyword"],
                  [/[{}()\[\]]/, "delimiter"],
                  [/[a-zA-Z_]\w*/, "identifier"],
                  [/\d+/, "number"],
                  [/\/\/.*/, "comment"],

                  // 키워드
                  [
                    /[a-zA-Z_]\w*/,
                    {
                      cases: {
                        "@keywords": "keyword",
                        "@default": "identifier",
                      },
                    },
                  ],

                  // 숫자
                  [/\d+(\.\d+)?/, "number"],

                  // 연산자
                  [/[+\-*/=<>!&|^%]+/, "operator"],

                  // 문자열
                  [/".*?"/, "string"],

                  // 주석
                  [/\/\/.*$/, "comment"],
                  [/\/\*/, "comment", "@comment"],
                ],

                comment: [
                  [/[^\/*]+/, "comment"],
                  [/\*\//, "comment", "@pop"],
                  [/[\/*]/, "comment"],
                ],
              },
            });
            monaco.editor.defineTheme("glsl-theme", {
              base: "vs-dark",
              inherit: true,
              colors: {},
              rules: [
                { token: "keyword", foreground: "ce3737" },
                { token: "number", foreground: "B5CEA8" },
                { token: "string", foreground: "CE9178" },
                { token: "comment", foreground: "6A9955" },
                { token: "operator", foreground: "D4D4D4" },
              ],
            });
            monaco.editor.setTheme("glsl-theme");
            console.log("Monaco instance:", monaco);
          },
        }}
      />
    </div>
  );
};

export default TestPage;

const defaultValue = `precision mediump float;

out vec3 pixelNormal;

void main() {
  pixelNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
