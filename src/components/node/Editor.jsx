import "./codemirror.scss";
import "./Editor.scss";

import CodeMirror from "codemirror";
import "codemirror/mode/gfm/gfm";

import React, { useContext, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NodeContentContext } from "contexts";

import * as Icons from "components/Icons";

const rx_word = '" ';

function hoverWidgetOnOverlay(cm, overlayClass, widget) {
  cm.addWidget({ line: 0, ch: 0 }, widget, true);
  widget.style.position = "fixed";
  widget.style.zIndex = 100000;
  widget.style.top = widget.style.left = "-1000px"; // hide it
  widget.dataset.token = null;

  cm.getWrapperElement().addEventListener("mousemove", (e) => {
    let onToken = e.target.classList.contains("cm-" + overlayClass);

    if (onToken && e.target.innerText !== widget.dataset.token) {
      // entered token, show widget
      var rect = e.target.getBoundingClientRect();
      widget.style.left = rect.right + "px";
      widget.style.top = (rect.top + rect.bottom) / 2 + "px";

      widget.dataset.token = e.target.innerText;
      if (typeof widget.onShown === "function") widget.onShown();
    } else if (e.target === widget || widget.contains(e.target)) {
      // entered widget, call widget.onEntered
      if (
        widget.dataset.entered === "true" &&
        typeof widget.onEntered === "function"
      )
        widget.onEntered();
      widget.dataset.entered = "true";
    } else if (!onToken && widget.style.left !== "-1000px") {
      // we stepped outside
      widget.style.top = widget.style.left = "-1000px"; // hide it
      delete widget.dataset.token;
      widget.dataset.entered = "false";
      if (typeof widget.onHidden === "function") widget.onHidden();
    }

    return true;
  });
}

function isUrl(s) {
  if (!isUrl.rx_url) {
    // taken from https://gist.github.com/dperini/729294
    isUrl.rx_url = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    // valid prefixes
    isUrl.prefixes = ["http://", "https://", "ftp://", "www."];
    // taken from https://w3techs.com/technologies/overview/top_level_domain/all
    isUrl.domains = [
      "com",
      "ru",
      "net",
      "org",
      "de",
      "jp",
      "uk",
      "br",
      "pl",
      "in",
      "it",
      "fr",
      "au",
      "info",
      "nl",
      "ir",
      "cn",
      "es",
      "cz",
      "kr",
      "ua",
      "ca",
      "eu",
      "biz",
      "za",
      "gr",
      "co",
      "ro",
      "se",
      "tw",
      "mx",
      "vn",
      "tr",
      "ch",
      "hu",
      "at",
      "be",
      "dk",
      "tv",
      "me",
      "ar",
      "no",
      "us",
      "sk",
      "xyz",
      "fi",
      "id",
      "cl",
      "by",
      "nz",
      "il",
      "ie",
      "pt",
      "kz",
      "io",
      "my",
      "lt",
      "hk",
      "cc",
      "sg",
      "edu",
      "pk",
      "su",
      "bg",
      "th",
      "top",
      "lv",
      "hr",
      "pe",
      "club",
      "rs",
      "ae",
      "az",
      "si",
      "ph",
      "pro",
      "ng",
      "tk",
      "ee",
      "asia",
      "mobi",
    ];
  }

  if (!isUrl.rx_url.test(s)) return false;
  for (let i = 0; i < isUrl.prefixes.length; i++)
    if (s.startsWith(isUrl.prefixes[i])) return true;
  for (let i = 0; i < isUrl.domains.length; i++)
    if (
      s.endsWith("." + isUrl.domains[i]) ||
      s.includes("." + isUrl.domains[i] + "/") ||
      s.includes("." + isUrl.domains[i] + "?")
    )
      return true;
  return false;
}

const Editor = () => {
  const textareaRef = useRef(null);
  const linkPopupRef = useRef(null);
  const editorRef = useRef(null);

  useLayoutEffect(() => {
    const editor = CodeMirror.fromTextArea(textareaRef.current, {
      mode: "gfm",
      lineWrapping: true,
    });
    editorRef.current = editor;
    editor.addOverlay(
      {
        token: function (stream) {
          let ch = stream.peek();
          let word = "";

          if (rx_word.includes(ch) || ch === "\uE000" || ch === "\uE001") {
            stream.next();
            return null;
          }

          while ((ch = stream.peek()) && !rx_word.includes(ch)) {
            word += ch;
            stream.next();
          }

          if (isUrl(word)) return "url"; // CSS class: cm-url
        },
      }
      // { opaque: true } // opaque will remove any spelling overlay etc
    );
    hoverWidgetOnOverlay(editor, "url", linkPopupRef.current);
  }, []);

  const { nodeContentResource, node } = useContext(NodeContentContext);
  useLayoutEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.setValue(nodeContentResource.data || "");
      editor.focus();
      return () => {
        nodeContentResource.setState(editor.getValue());
      };
    }
  }, [nodeContentResource, node.id]);

  const navigate = useNavigate();

  return (
    <>
      <div
        ref={linkPopupRef}
        className="link-popup cursor-pointer flex items-center space-x-2 p-1 rounded text-sm bg-glow border border-solid border-accent"
        onClick={() => {
          const cleanToken = linkPopupRef.current.dataset.token.replace(
            /^\(|\)$/g,
            ""
          );
          try {
            const url = new URL(cleanToken);
            window.open(url, "_blank");
          } catch (exception) {
            navigate(`/n/${cleanToken}`);
          }
        }}
      >
        <Icons.OutboundLink size={0.75} />
        <span>open</span>
      </div>
      <textarea ref={textareaRef} />
    </>
  );
};

export default Editor;
