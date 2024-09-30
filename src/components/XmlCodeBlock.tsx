import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import formatXml from "xml-formatter";
hljs.registerLanguage("xml", xml);

export function XmlCodeBlock({ code }: { code: string }) {
  return (
    <div className="mt-4 text-xs font-mono text-gray-50 bg-gray-950 py-2 px-2 rounded-md max-w-full overflow-auto">
      <code>
        <pre
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(code, {
              language: "xml",
            }).value,
          }}
        />
      </code>
    </div>
  );
}
