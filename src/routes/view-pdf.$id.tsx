import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/view-pdf/$id")({
  component: () => <ViewPdf />,
});

export const ViewPdf = () => {
  return <div>asdfasdf</div>;
};
