import { TitanPage, titanPageMetadata } from "@/components/pages/TitanPage";
import { VideoPortfolioClient } from "@/components/video/VideoPortfolioClient";

export const metadata = titanPageMetadata("video-portfolio");

export default function VideoPortfolioPage() {
  return (
    <TitanPage slug="video-portfolio">
      <VideoPortfolioClient />
    </TitanPage>
  );
}
