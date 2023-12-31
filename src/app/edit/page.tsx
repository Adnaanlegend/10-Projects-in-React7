"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

export default function EditPage({
  searchParams: { publicId },
}: {
  searchParams: {
    publicId: string;
  };
}) {
  const [transformation, setTransformation] = useState<
    | undefined
    | "generative-fill"
    | "blur"
    | "grayscale"
    | "pixelate"
    | "bg-remove"
  >();

  const [pendingPrompt, setPendingPrompt] = useState("");
  const [prompt, setPrompt] = useState("");

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between ">
          <h1 className="text-4xl font-bold">Edit {publicId}</h1>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setTransformation(undefined)}
          >
            Clear All
          </Button>
          <div className="flex flex-col gap-4 ">
            <Button
              variant="secondary"
              onClick={() => {
              setTransformation("generative-fill")
               setPrompt(pendingPrompt);
              }}
            >
              Apply Generative Fill
            </Button>
            <Label>Prompt..</Label>
            <Input value={pendingPrompt} onChange={(e) => setPendingPrompt(e.currentTarget.value)} />
          </div>

          <Button variant="secondary" onClick={() => setTransformation("blur")}>
            Apply Blur
          </Button>

          <Button
            variant="secondary"
            onClick={() => setTransformation("grayscale")}
          >
            Convert to GrayScale
          </Button>

          <Button
            variant="secondary"
            onClick={() => setTransformation("pixelate")}
          >
            Pixelate
          </Button>

          {/* <Button variant="secondary" onClick={() => setTransformation("bg-remove")}>
          Remove Background
          </Button> */}
        </div>
        <div className="grid grid-cols-2 gap-12">
          <CldImage src={publicId} width="500" height="300" alt="some image" />

          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              alt="Some Image"
              crop="pad"
              fillBackground= {{
                prompt,
              }}
            />
          )}

          {transformation === "blur" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              alt="Some Image"
              blur="800"
            />
          )}

          {transformation === "grayscale" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              alt="Some Image"
              grayscale
            />
          )}

          {transformation === "pixelate" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              alt="Some Image"
              pixelate
            />
          )}

          {transformation === "bg-remove" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              alt="Some Image"
              removeBackground
            />
          )}
        </div>
      </div>
    </section>
  );
}
