"use client";
import { Base64 } from "js-base64";
import JSONFormatter from "./utils/JSONFormatter";
import { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from 'qrcode.react';
import {
  FaQrcode,
  FaClipboard
} from "react-icons/fa";
import PageTitle from "./components/PageTitle";

export default function Page() {
  const outputRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");
  const [displayFormatterJSONOutput, toggleDisplayFormatterJSONOutput] =
    useState(false);
  const [count, setCount] = useState(0);
  const [hashString, setHash] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState('');

  const onHandleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    setCount(event.target.value.length);
    setHash(Base64.encode(event.target.value));
  };
  const onToggleDisplayFormatterJSONOutput = () => {
    toggleDisplayFormatterJSONOutput(!displayFormatterJSONOutput);
  };
  const onPasteContentFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setContent(clipboardText);
      setCount(clipboardText.length);
      setHash(Base64.encode(clipboardText));
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };
  const onHandleGenerateQRCode = async () => {
    setQrCodeValue(content);
  };
  // init the page
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const content = `${Base64.decode(hash.slice(1, hash.length))}`;
      setContent(content);
      setHash(hash);
    }
  }, []);
  //
  useEffect(() => {
    window.location.hash = hashString;
    if (displayFormatterJSONOutput && content.length !== 0) {
      try {
        const jsonObject = JSON.parse(content);
        if (jsonObject instanceof Object) {
          if (outputRef.current) {
            const formatter = new JSONFormatter(jsonObject);
            outputRef.current.appendChild(formatter.render());
          }
        }
      } catch {}
    }
  });
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <PageTitle name="Draft" />
      <hr className="container mb-4" />
      <div className="container flex flex-col p-4 relative">
        <div className="w-full flex flex-row items-start justify-between pb-2">
          <button
            type="button"
            className="text-xs bg-white hover:bg-gray-100 text-gray-400 py-1 px-2 border border-gray-400 rounded shadow"
            onClick={onPasteContentFromClipboard}
          >
            <FaClipboard/>
          </button>
        </div>
        <div className="w-full flex flex-col items-end">
          <textarea
            className="textarea w-full border border-gray-200 outline-none p-2"
            rows={12}
            onChange={onHandleChange}
            value={content}
          ></textarea>
        </div>
        <div className="w-full flex flex-row items-start justify-between py-2">
          <div>
            <button
              type="button"
              className="text-xs bg-white hover:bg-gray-100 text-gray-400 py-1 px-2 border border-gray-400 rounded shadow mr-2"
              onClick={onHandleGenerateQRCode}
            >
              <FaQrcode/>
            </button>
            <button
              type="button"
              className="text-xs bg-white hover:bg-gray-100 text-gray-400 py-1 px-2 border border-gray-400 rounded shadow mr-2"
              onClick={onToggleDisplayFormatterJSONOutput}
            >
              Prettify JSON
            </button>
          </div>
          <small>length: {count}</small>
        </div>
        {displayFormatterJSONOutput ? (
          <div>
            <label className="text-xs">output</label>
            <div className="w-full p-2 bg-gray-200" ref={outputRef}></div>
          </div>
        ) : (
          ""
        )}
        {qrCodeValue && (
        <div>
            <label className="text-xs">output</label>
            <QRCodeSVG value={qrCodeValue} />
        </div>
      )}
      </div>
    </div>
  );
}
