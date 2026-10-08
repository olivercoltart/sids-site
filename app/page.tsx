import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import InfoList from "@/components/InfoList";
import Instructions from "@/components/Instructions";
import MainPhoto from "@/components/MainPhoto";
import PhotoGrid from "@/components/PhotoGrid";
import UploadForm from "@/components/UploadForm";
import { getPhotos } from "@/lib/photos";
import { getVoterId } from "@/lib/voter";

export const dynamic = "force-dynamic";

export default async function Home() {
  const photos = await getPhotos(await getVoterId());

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <Header />
      <MainPhoto />
      <Instructions />
      <InfoList />
      <Countdown />
      <UploadForm />
      <PhotoGrid photos={photos} />
    </main>
  );
}
