import { LegacyArticlePage } from "@/components/biopedia/pages/articles/LegacyArticlePage";

export default function RevitProbeArticle() {
  return (
    <LegacyArticlePage
      title="Revit and 3D Building Information Models"
      subject="Digital design"
      summary="Autodesk Revit is a building-information-modeling application that represents architectural and engineering projects as coordinated data-rich models."
      sections={[
        {
          heading: "Model-based coordination",
          body: "A Revit model links geometry with properties such as materials, dimensions, and schedules. Teams use shared models to coordinate disciplines, inspect design changes, and produce project documentation.",
        },
      ]}
    />
  );
}
