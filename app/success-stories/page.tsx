import fs from "fs";
import path from "path";
import { SuccessStoriesClient } from "@/components/success-stories/SuccessStoriesClient";
import { TitanPage, titanPageMetadata } from "@/components/pages/TitanPage";

const modalHtml = fs.readFileSync(
  path.join(process.cwd(), "content", "pages", "success-stories-modal.html"),
  "utf8",
);

export const metadata = titanPageMetadata("success-stories");

export default function SuccessStoriesPage() {
  return (
    <TitanPage slug="success-stories">
      <SuccessStoriesClient modalHtml={modalHtml} />
    </TitanPage>
  );
}
