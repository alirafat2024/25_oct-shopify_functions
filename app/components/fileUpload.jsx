import { useState, useCallback } from "react";

export default function ImageUploadWithPreview() {
  const [previews, setPreviews] = useState([]);

  const handleChange = useCallback((event) => {
    const target = event.currentTarget;
    const files = target.files;
    if (!files || files.length === 0) return;

    const nextPreviews = [];

    Array.from(files).forEach((file) => {
      const objectUrl = URL.createObjectURL(file);
      nextPreviews.push({ url: objectUrl, name: file.name });
    });

    setPreviews(nextPreviews);
  }, []);

  return (
    <>
      <s-drop-zone
         
        accept="image/*"
        multiple
        onChange={handleChange}
      />

      <s-stack direction="inline" gap="small" padding="base">
        {previews.map((preview) => (
          <s-stack
            key={preview.url}
            direction="block"
            gap="small-100"
            alignItems="center"
          >
            <s-image
              src={preview.url}
              alt={preview.name}
              inlineSize="auto"
              aspectRatio="1 / 1"
              objectFit="cover"
            />
            <s-text>{preview.name}</s-text>
          </s-stack>
        ))}
      </s-stack>
    </>
  );
}
