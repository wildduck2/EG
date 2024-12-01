import { useLocation, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { article_data } from "../blog.constants";

export const BlogItem = () => {
  const pathname = useLocation();
  const id = useParams({ strict: false });
  const { t } = useTranslation();
  const item = article_data.find((item) => item.id === id.id);

  return (
    <main className="flex flex-col [&>div:not(:first-child)]:pt-3 [&>div:not(:first-child)]:pb-12 container min-h-screen lg:mt-[13rem]">
      <div className="flex flex-col gap-4 w-full mt-4 mb-20">
        <img
          src={item?.article_second_picture}
          className="w-full h-[300px] object-cover rounded-lg"
        />
        <div className="relative z-[2] my-4">
          <h2 className={`font-semibold text-[28px] gap-2`}>{item?.name}</h2>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {item?.article_content.map((data, i) => {
            if (data.type === "paragraph") {
              return (
                <p key={i} className="text-lg">
                  {data.content}
                </p>
              );
            }
            if (data.type === "picture") {
              return (
                <img className="h-[500px] mx-auto" src={data.content} key={i} />
              );
            }
            if (data.type === "video") {
              return (
                <video
                  className="h-[500px] mx-auto"
                  src={data.content}
                  key={i}
                  controls
                />
              );
            }
          })}
        </div>
      </div>
    </main>
  );
};

export const item_content = [
  {
    type: "paragraph",
    content:
      "Welcome to {article.name}, your ultimate destination for in-depth insights and thought-provoking ideas. In this article, we explore the nuances of {topic} and uncover key takeaways that are sure to inspire and inform. Whether you're looking to deepen your understanding or discover something new, {article.name} has you covered. Stay with us as we delve into captivating perspectives and expert analysis tailored just for you.",
  },
  {
    type: "paragraph",
    content:
      "Welcome to {article.name}, your ultimate destination for in-depth insights and thought-provoking ideas. In this article, we explore the nuances of {topic} and uncover key takeaways that are sure to inspire and inform. Whether you're looking to deepen your understanding or discover something new, {article.name} has you covered. Stay with us as we delve into captivating perspectives and expert analysis tailored just for you.",
  },
  {
    type: "picture",
    content:
      "https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/produc_imgs/article2.jpeg",
  },
  {
    type: "paragraph",
    content:
      "Welcome to {article.name}, your ultimate destination for in-depth insights and thought-provoking ideas. In this article, we explore the nuances of {topic} and uncover key takeaways that are sure to inspire and inform. Whether you're looking to deepen your understanding or discover something new, {article.name} has you covered. Stay with us as we delve into captivating perspectives and expert analysis tailored just for you.",
  },
  {
    type: "paragraph",
    content:
      "Welcome to {article.name}, your ultimate destination for in-depth insights and thought-provoking ideas. In this article, we explore the nuances of {topic} and uncover key takeaways that are sure to inspire and inform. Whether you're looking to deepen your understanding or discover something new, {article.name} has you covered. Stay with us as we delve into captivating perspectives and expert analysis tailored just for you.",
  },
  {
    type: "video",
    content:
      "https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/produc_imgs/video.mp4?t=2024-12-01T17%3A09%3A03.702Z",
  },
  {
    type: "paragraph",
    content:
      "Welcome to {article.name}, your ultimate destination for in-depth insights and thought-provoking ideas. In this article, we explore the nuances of {topic} and uncover key takeaways that are sure to inspire and inform. Whether you're looking to deepen your understanding or discover something new, {article.name} has you covered. Stay with us as we delve into captivating perspectives and expert analysis tailored just for you.",
  },
  {
    type: "paragraph",
    content:
      "Welcome to {article.name}, your ultimate destination for in-depth insights and thought-provoking ideas. In this article, we explore the nuances of {topic} and uncover key takeaways that are sure to inspire and inform. Whether you're looking to deepen your understanding or discover something new, {article.name} has you covered. Stay with us as we delve into captivating perspectives and expert analysis tailored just for you.",
  },
];
