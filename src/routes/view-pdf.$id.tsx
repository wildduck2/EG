import { createFileRoute, useParams } from "@tanstack/react-router";
import { supabase } from "@/supabase";
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

export const Route = createFileRoute("/view-pdf/$id")({
  component: () => (
    <div className="relative">
      <img
        src="/background.jpeg"
        className="fixed z-1 w-screen h-screen top-0"
      />
      <div className="relative z-10">
        <PDFPreview />
        <section id="goal" className="mx-auto p-6 rounded-lg mt-[-5rem]">
          <h2 className="text-4xl font-bold text-[#fff] text-center">
            #البضاعة_في_البضاعة #بدون_منافس #بدون_وسيط
          </h2>
        </section>
      </div>
    </div>
  ),
});

export const PDFPreview = () => {
  const { id } = useParams({ strict: false });
  const [imgs, setImgs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const flipBookRef = useRef(null); // Ref for the flipbook

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const { data: pdf_imgs, error } = await supabase
          .from("pdf_imgs")
          .select("file_url")
          .eq("pdf_id", id);

        if (error) throw new Error(error.message);

        setImgs(pdf_imgs?.map((img) => img.file_url) || []);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleWheel = (event: React.WheelEvent) => {
    if (!flipBookRef.current) return;

    const delta = event.deltaY;

    // Scroll down: flip to next page
    if (delta > 0) {
      flipBookRef.current.pageFlip().flipNext();
    }
    // Scroll up: flip to previous page
    else if (delta < 0) {
      flipBookRef.current.pageFlip().flipPrev();
    }

    event.preventDefault(); // Prevent default scroll behavior
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (imgs.length === 0) {
    return (
      <div className="text-center mt-20">No pages available to display.</div>
    );
  }

  return (
    <div
      className="my-28 flex justify-center"
      onWheel={handleWheel} // Attach the wheel event listener
    >
      <HTMLFlipBook
        ref={flipBookRef} // Attach the ref to the flipbook
        width={500}
        height={700}
        autoSize
        showPageCorners
        swipeDistance={50}
        drawShadow
        size="stretch"
        minWidth={300}
        maxWidth={600}
        minHeight={400}
        maxHeight={800}
        maxShadowOpacity={0.2}
        showCover
        mobileScrollSupport
        className="flipbook"
        style={{
          margin: "0 auto",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ccc",
        }}
        onFlip={() => playPageFlipSound()}
      >
        {imgs.reverse().map((img, index) => (
          <div
            key={index}
            className="flipbook-page select-none border border-border bg-white flex items-center justify-center"
            style={{ padding: "10px" }}
          >
            <img
              src={img}
              alt={`Page ${index + 1}`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

const playPageFlipSound = () => {
  const pageFlipSound = new Audio(
    "https://cdn.pixabay.com/audio/2022/03/24/audio_d8786ad8be.mp3",
  );

  pageFlipSound
    .play()
    .then(() => (pageFlipSound.volume = 1))
    .catch((error) => {
      console.warn("Sound playback was blocked by the browser:", error);
      // Optionally, add a fallback or notification here
    });
};
