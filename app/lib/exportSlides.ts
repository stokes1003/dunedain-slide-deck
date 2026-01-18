import PptxGenJS from "pptxgenjs";
import { SlideDeck } from "./types";

export async function exportToPowerPoint(slides: SlideDeck): Promise<void> {
  const pptx = new PptxGenJS();

  pptx.author = "Dunedain Systems";
  pptx.title = slides.deckTitle;

  slides.slides.forEach((slide) => {
    const pptxSlide = pptx.addSlide();

    pptxSlide.addText(slide.title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: "000000",
    });

    let yPos = 1.5;
    slide.content.forEach((item) => {
      if (item.type === "paragraph") {
        pptxSlide.addText(item.text, {
          x: 0.5,
          y: yPos,
          w: 9,
          h: 1,
          fontSize: 14,
          color: "333333",
        });
        yPos += 1.2;
      } else if (item.type === "bullet") {
        pptxSlide.addText(item.text, {
          x: 0.5,
          y: yPos,
          w: 9,
          h: 0.5,
          fontSize: 14,
          color: "333333",
          bullet: true,
        });
        yPos += 0.6;
      }
    });
  });

  const fileName = slides.deckTitle.replace(/[^a-z0-9]/gi, "_") + ".pptx";
  await pptx.writeFile({ fileName });
}
