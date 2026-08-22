import { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Star,
  Sparkles,
  Shield,
  Check,
  Plus,
  ArrowUp,
  ArrowDown,
  X,
  Layers,
  ZoomIn
} from "lucide-react";
import { toast } from "sonner";

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
  carTitle?: string;
};

export function MediaManagerModal({ images, onChange, carTitle }: Props) {
  const [urlInput, setUrlInput] = useState("");
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [watermarkText, setWatermarkText] = useState("VELOCITY MOTORS");
  const [watermarkPos, setWatermarkPos] = useState<"bottom-right" | "bottom-left" | "center" | "top-right">("bottom-right");
  const [watermarkOpacity, setWatermarkOpacity] = useState(75);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImageUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith("http") && !trimmed.startsWith("data:")) {
      toast.error("يرجى إدخال رابط صورة صحيح يبدأ بـ https://");
      return;
    }
    onChange([...images, trimmed]);
    setUrlInput("");
    toast.success("تمت إضافة الصورة بنجاح");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImgs: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImgs.push(String(event.target.result));
        }
        processed++;
        if (processed === files.length) {
          onChange([...images, ...newImgs]);
          toast.success(`تم رفع ${newImgs.length} صور وتحسينها بنجاح`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    if (images.length <= 1) {
      toast.error("يجب الإبقاء على صورة واحدة على الأقل للمركبة");
      return;
    }
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
    toast.info("تم حذف الصورة");
  };

  const setCoverImage = (index: number) => {
    if (index === 0) return;
    const item = images[index];
    const rest = images.filter((_, i) => i !== index);
    onChange([item, ...rest]);
    toast.success("تم تعيين هذه الصورة كصورة رئيسية للبطاقة والمعرض");
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    onChange(copy);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Upload & Quick link */}
      <div className="bg-muted/40 border border-border/80 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-accent" />
              وحدة إدارة الوسائط المتعددة (Media Manager)
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              رفع عدة صور دفعة واحدة، ترتيب العرض، وتحديد الصورة الرئيسية مع تحسين الجودة وإضافة العلامة المائية.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-accent text-accent-foreground font-bold text-xs sm:text-sm hover:opacity-90 shadow-sm transition"
            >
              <Upload className="h-4 w-4" /> رفع صور من جهازك
            </button>
          </div>
        </div>

        {/* URL Input Bar */}
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageUrl())}
            placeholder="أو الصق رابط صورة مباشر (https://images.unsplash.com/...)"
            className="flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs sm:text-sm"
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="h-10 px-4 rounded-xl border border-input bg-card hover:bg-secondary text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 shrink-0"
          >
            <Plus className="h-4 w-4" /> إضافة رابط
          </button>
        </div>
      </div>

      {/* Watermark & Quality Optimizer Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            <div>
              <div className="font-semibold text-sm">العلامة المائية والتحسين التلقائي (Watermark Engine)</div>
              <div className="text-xs text-muted-foreground">حماية حقوق صور المعرض وضغط الأحجام تلقائياً لتسريع التصفح</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={watermarkEnabled}
                onChange={(e) => setWatermarkEnabled(e.target.checked)}
                className="rounded border-input text-accent focus:ring-accent"
              />
              تفعيل العلامة المائية
            </label>
          </div>
        </div>

        {watermarkEnabled && (
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-medium text-muted-foreground block mb-1">نص العلامة المائية / الشعار</label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                className="w-full h-8 px-2.5 rounded-lg bg-background border border-input text-xs"
              />
            </div>
            <div>
              <label className="font-medium text-muted-foreground block mb-1">الموضع</label>
              <select
                value={watermarkPos}
                onChange={(e) => setWatermarkPos(e.target.value as any)}
                className="w-full h-8 px-2 rounded-lg bg-background border border-input text-xs"
              >
                <option value="bottom-right">أسفل اليمين (Bottom Right)</option>
                <option value="bottom-left">أسفل اليسار (Bottom Left)</option>
                <option value="center">الوسط (Center)</option>
                <option value="top-right">أعلى اليمين (Top Right)</option>
              </select>
            </div>
            <div>
              <label className="font-medium text-muted-foreground block mb-1">الشفافية: {watermarkOpacity}%</label>
              <input
                type="range"
                min="20"
                max="100"
                value={watermarkOpacity}
                onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Images Grid / Reorder List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
            <Layers className="h-4 w-4" /> قائمة الصور المعتمدة ({images.length} صور)
          </div>
          <span className="text-[11px] text-muted-foreground">
            الصورة رقم 1 هي الصورة الرئيسية التلقائية التي تظهر في بطاقة السيارة.
          </span>
        </div>

        {images.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-border rounded-2xl text-center text-muted-foreground text-sm">
            لا توجد صور مضافة حتى الآن. قم برفع الصور أو إضافة الروابط أعلاه.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, idx) => {
              const isCover = idx === 0;
              return (
                <div
                  key={`${img}-${idx}`}
                  className={`group relative rounded-2xl overflow-hidden border transition-all duration-200 bg-card ${
                    isCover
                      ? "ring-2 ring-accent border-accent/80 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="aspect-[16/10] relative bg-muted overflow-hidden">
                    <img
                      src={img}
                      alt={`Car photo ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />

                    {/* Watermark Overlay Simulator */}
                    {watermarkEnabled && (
                      <div
                        className={`absolute pointer-events-none px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase ${
                          watermarkPos === "bottom-right"
                            ? "bottom-2 right-2"
                            : watermarkPos === "bottom-left"
                            ? "bottom-2 left-2"
                            : watermarkPos === "center"
                            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                            : "top-2 right-2"
                        }`}
                        style={{ opacity: watermarkOpacity / 100 }}
                      >
                        🛡️ {watermarkText}
                      </div>
                    )}

                    {/* Position and Cover Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="h-6 px-2 rounded-full bg-black/75 backdrop-blur text-white text-[10px] font-bold flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      {isCover && (
                        <span className="h-6 px-2.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center gap-1 shadow-sm">
                          <Star className="h-3 w-3 fill-current" /> الصورة الرئيسية
                        </span>
                      )}
                    </div>

                    {/* Zoom preview button */}
                    <button
                      type="button"
                      onClick={() => setPreviewImg(img)}
                      className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
                      title="معاينة بالحجم الكامل"
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Card footer controls */}
                  <div className="p-2.5 bg-card/90 flex items-center justify-between border-t border-border/80 gap-1 text-xs">
                    {!isCover ? (
                      <button
                        type="button"
                        onClick={() => setCoverImage(idx)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground text-[11px] font-semibold transition"
                      >
                        <Star className="h-3 w-3" /> جعلها الرئيسية
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-accent px-1 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> معتمدة كغلاف
                      </span>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveImage(idx, "up")}
                        className="p-1 rounded hover:bg-muted disabled:opacity-30"
                        title="تقديم الترتيب"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === images.length - 1}
                        onClick={() => moveImage(idx, "down")}
                        className="p-1 rounded hover:bg-muted disabled:opacity-30"
                        title="تأخير الترتيب"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="p-1 rounded hover:bg-destructive/10 text-destructive"
                        title="حذف الصورة"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fullscreen Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={previewImg} alt="Preview" className="max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl" />
            <button
              onClick={() => setPreviewImg(null)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
