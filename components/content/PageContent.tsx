import type { ReactNode } from "react";

type JsonLdProps = {
  data: string | string[];
};

export function JsonLd({ data }: JsonLdProps) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block) => (
        <script
          key={block.slice(0, 48)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: block }}
        />
      ))}
    </>
  );
}

type HtmlContentProps = {
  html: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
};

export function HtmlContent({
  html,
  as: Tag = "div",
  className,
}: HtmlContentProps) {
  const Component = Tag as React.ElementType;
  const useContents = Tag === "div" && !className;
  return (
    <Component
      className={className}
      style={useContents ? { display: "contents" } : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

type TitanSectionsProps = {
  sections: string[];
};

export function TitanSections({ sections }: TitanSectionsProps) {
  return (
    <>
      {sections.map((section) => {
        const idMatch = section.match(/\bid="([^"]+)"/);
        const key = idMatch?.[1] ?? section.slice(0, 40);
        return <HtmlContent key={key} html={section} />;
      })}
    </>
  );
}

type CapabilitySectionsProps = {
  html: string;
  formSlot?: ReactNode;
};

export function CapabilitySections({ html, formSlot }: CapabilitySectionsProps) {
  const parts = html.split("<!--LP_FORM-->");
  if (parts.length === 1) {
    return <HtmlContent html={html} />;
  }
  return (
    <>
      <HtmlContent html={parts[0]} />
      {formSlot}
      {parts[1] ? <HtmlContent html={parts[1]} /> : null}
    </>
  );
}
