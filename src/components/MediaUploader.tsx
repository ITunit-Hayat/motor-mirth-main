import { useCallback, useRef, useState } from "react";
import { GripVertical, ImagePlus, Loader2, Star, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const BUCKET = "car-images";
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;

/**
 * Resizes an image file down to MAX_DIMENSION on its longest side and stamps
 * a semi-transparent watermark in the bottom-right corner, entirely in the
 * browser (no server round-trip needed before upload).
 */
async function compressAndWatermark(file: File, watermarkText: string): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(bitmap, 0, 0, w, h);

  // Watermark
  const fontSize = Math.max(14, Math.round(w * 0.028));
  ctx.font = `600 ${fontSize}px sans-serif`;
  ctx.textBaseline = "bottom";
  ctx.textAlign = "right";
  const pad = Math.round(fontSize * 0.8);
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillText(watermarkText, w - pad + 1, h - pad + 1);
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  ctx.fillText(watermarkText, w - pad, h - pad);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Compression failed"))),
      "image/jpeg",
      JPEG_QUALITY,
    );
  });
}

async function uploadOne(file: File, watermarkText: string): Promise<string> {
  const blob = await compressAndWatermark(file, watermarkText);
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: "image/jpeg",
    cacheControl: "31536000",
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function MediaUploader({
  images,
  onChange,
  watermarkText = "VelocityMotors",
}: {
  images: string[];
  onChange: (images: string[]) => void;
  watermarkText?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
      if (list.length === 0) return;
      setUploading(true);
      const uploaded: string[] = [];
      for (const file of list) {
        try {
          uploaded.push(await uploadOne(file, watermarkText));
        } catch (err) {
          toast.error(
            `Couldn't upload ${file.name}: ${err instanceof Error ? err.message : "unknown error"}. ` +
              `Make sure the "${BUCKET}" storage bucket exists (see supabase/003_admin_dashboard_upgrade.sql).`,
          );
        }
      }
      if (uploaded.length) {
        onChange([...images, ...uploaded]);
        toast.success(`${uploaded.length} photo${uploaded.length > 1 ? "s" : ""} added`);
      }
      setUploading(false);
    },
    [images, onChange, watermarkText],
  );

  const removeAt = (i: number) => onChange(images.filter((_, idx) => idx !== i));
  const makeCover = (i: number) => {
    if (i === 0) return;
    const next = [...images];
    const [item] = next.splice(i, 1);
    next.unshift(item);
    onChange(next);
  };

  const onDragStart = (i: number) => {
    dragIndex.current = i;
  };
  const onDragOverThumb = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === i) return;
    const next = [...images];
    const [item] = next.splice(dragIndex.current, 1);
    next.splice(i, 0, item);
    dragIndex.current = i;
    onChange(next);
  };
  const onDragEnd = () => {
    dragIndex.current = null;
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) void handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${
          dragOver ? "border-accent bg-accent/5" : "border-input hover:border-accent/60"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-accent" /> Compressing & uploading…
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <UploadCloud className="h-6 w-6 text-accent" />
            <span>
              <span className="font-semibold text-foreground">Drag & drop photos</span> or click to
              browse
            </span>
            <span className="text-xs">
              Auto-compressed and watermarked · drag thumbnails to reorder · first photo is the
              cover
            </span>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div
              key={src + i}
              draggable
              onDragStart={() => onDragStart(i)}
              onDragOver={(e) => onDragOverThumb(e, i)}
              onDragEnd={onDragEnd}
              className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted cursor-grab active:cursor-grabbing"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                {i !== 0 && (
                  <button
                    type="button"
                    title="Make cover photo"
                    onClick={() => makeCover(i)}
                    className="p-1.5 rounded-md bg-white/90 text-black hover:bg-white"
                  >
                    <Star className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  title="Remove"
                  onClick={() => removeAt(i)}
                  className="p-1.5 rounded-md bg-white/90 text-destructive hover:bg-white"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent text-accent-foreground">
                  COVER
                </span>
              )}
              <span className="absolute bottom-1 right-1 text-white/80">
                <GripVertical className="h-3.5 w-3.5 drop-shadow" />
              </span>
            </div>
          ))}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-input hover:border-accent/60 flex items-center justify-center text-muted-foreground"
          >
            <ImagePlus className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
