import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Shield,
  Layers,
  Users,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Sparkles,
  Save,
  Lock,
  Phone,
  Mail,
  Building,
  Key,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Palette,
  Fuel,
  Car
} from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/AdminLayout";
import { useDynamicAttributes, type CarMakeInfo } from "@/lib/dynamicAttributes";
import {
  getActiveRole,
  setActiveRole,
  ROLE_INFO,
  TEAM_MEMBERS,
  type AdminRole,
} from "@/lib/adminAuth";
import { useSiteSettings, updateSettings } from "@/lib/settings";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "إدارة الثوابت والصلاحيات — لوحة الإدارة" },
      { name: "description", content: "تخصيص الماركات، الموديلات، الصلاحيات، وإعدادات المعرض." },
    ],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"attributes" | "security" | "general">("attributes");
  const [attrs, setAttrs] = useDynamicAttributes();
  const site = useSiteSettings();
  const activeRole = getActiveRole();

  // Sub-tabs for dynamic attributes
  const [attrSubTab, setAttrSubTab] = useState<"makes" | "categories" | "transmissions" | "fuels" | "drivetrains" | "colors">("makes");

  // New item inputs
  const [newMakeName, setNewMakeName] = useState("");
  const [newMakeCountry, setNewMakeCountry] = useState("");
  const [selectedMakeForModel, setSelectedMakeForModel] = useState(attrs.makes[0]?.id || "");
  const [newModelName, setNewModelName] = useState("");

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTransmissionName, setNewTransmissionName] = useState("");
  const [newFuelName, setNewFuelName] = useState("");
  const [newDrivetrainName, setNewDrivetrainName] = useState("");
  const [newColorName, setNewColorName] = useState("");

  // General site settings state
  const [generalForm, setGeneralForm] = useState({
    siteName: site.siteName,
    dealershipPhone: site.dealershipPhone,
    dealershipEmail: site.dealershipEmail,
    whatsappNumber: site.whatsappNumber,
    address: site.address,
    currencySymbol: site.currencySymbol,
    adminPasscode: site.adminPasscode,
  });

  // Make operations
  const handleAddMake = () => {
    const trimmed = newMakeName.trim();
    if (!trimmed) {
      toast.error("يرجى إدخال اسم الماركة");
      return;
    }
    if (attrs.makes.some((m) => m.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("هذه الماركة موجودة بالفعل");
      return;
    }

    const newMake: CarMakeInfo = {
      id: `make-${Date.now()}`,
      name: trimmed,
      country: newMakeCountry.trim() || "International",
      models: [],
    };

    setAttrs({
      ...attrs,
      makes: [...attrs.makes, newMake],
    });
    setNewMakeName("");
    setNewMakeCountry("");
    toast.success(`تمت إضافة ماركة (${trimmed}) بنجاح`);
  };

  const handleDeleteMake = (id: string) => {
    if (attrs.makes.length <= 1) {
      toast.error("يجب الإبقاء على ماركة واحدة على الأقل");
      return;
    }
    setAttrs({
      ...attrs,
      makes: attrs.makes.filter((m) => m.id !== id),
    });
    toast.info("تم حذف الماركة");
  };

  const handleAddModelToMake = () => {
    const trimmed = newModelName.trim();
    if (!trimmed) {
      toast.error("يرجى إدخال اسم الموديل");
      return;
    }
    const make = attrs.makes.find((m) => m.id === selectedMakeForModel);
    if (!make) return;

    if (make.models.includes(trimmed)) {
      toast.error("هذا الموديل مضاف بالفعل للماركة المحددة");
      return;
    }

    const updatedMakes = attrs.makes.map((m) => {
      if (m.id === selectedMakeForModel) {
        return { ...m, models: [...m.models, trimmed] };
      }
      return m;
    });

    setAttrs({ ...attrs, makes: updatedMakes });
    setNewModelName("");
    toast.success(`تمت إضافة الموديل (${trimmed}) إلى ${make.name}`);
  };

  const handleDeleteModel = (makeId: string, modelName: string) => {
    const updatedMakes = attrs.makes.map((m) => {
      if (m.id === makeId) {
        return { ...m, models: m.models.filter((x) => x !== modelName) };
      }
      return m;
    });
    setAttrs({ ...attrs, makes: updatedMakes });
    toast.info(`تم حذف الموديل (${modelName})`);
  };

  // Simple string list item handlers
  const handleAddStringItem = (
    key: "categories" | "transmissions" | "fuelTypes" | "drivetrains" | "colors",
    val: string,
    resetFn: () => void
  ) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    if (attrs[key].includes(trimmed)) {
      toast.error("العنصر موجود مسبقاً");
      return;
    }
    setAttrs({ ...attrs, [key]: [...attrs[key], trimmed] });
    resetFn();
    toast.success(`تمت الإضافة بنجاح`);
  };

  const handleDeleteStringItem = (
    key: "categories" | "transmissions" | "fuelTypes" | "drivetrains" | "colors",
    val: string
  ) => {
    if (attrs[key].length <= 1) {
      toast.error("يجب الإبقاء على عنصر واحد على الأقل");
      return;
    }
    setAttrs({ ...attrs, [key]: attrs[key].filter((x) => x !== val) });
    toast.info("تم الحذف");
  };

  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(generalForm);
    toast.success("تم حفظ إعدادات المعرض وبيانات التواصل بنجاح");
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold">الإعدادات، الثوابت، والصلاحيات</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary font-bold border border-border">
              التحكم الديناميكي الشامل
            </span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            إدارة الماركات، الموديلات، الفئات، الصلاحيات، وإعدادات صالة العرض دون الحاجة لتعديل الكود البرمجي.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm("هل أنت متأكد من استعادة كافة الثوابت الافتراضية؟")) {
                localStorage.removeItem("vm_dynamic_attributes");
                window.location.reload();
              }
            }}
            className="h-10 px-3.5 rounded-xl border border-input bg-card hover:bg-secondary text-xs font-semibold inline-flex items-center gap-1.5 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" /> استعادة الافتراضيات
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="mt-6 border-b border-border flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("attributes")}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === "attributes"
              ? "border-accent text-accent"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="h-4 w-4" /> 1. إدارة الثوابت والقوائم المنسدلة (Dynamic Attributes)
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === "security"
              ? "border-accent text-accent"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShieldCheck className="h-4 w-4" /> 2. الأمان وإدارة الصلاحيات (Roles & RBAC)
        </button>

        <button
          onClick={() => setActiveTab("general")}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === "general"
              ? "border-accent text-accent"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building className="h-4 w-4" /> 3. إعدادات المعرض وبيانات التواصل
        </button>
      </div>

      {/* TAB 1: DYNAMIC ATTRIBUTES MANAGEMENT */}
      {activeTab === "attributes" && (
        <div className="mt-6 space-y-6 animate-in fade-in">
          {/* Sub Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-muted/40 p-1.5 rounded-2xl border border-border">
            {[
              { id: "makes", label: `الماركات والموديلات (${attrs.makes.length})`, Icon: Car },
              { id: "categories", label: `فئات السيارات (${attrs.categories.length})`, Icon: Sliders },
              { id: "transmissions", label: `نواقل الحركة (${attrs.transmissions.length})`, Icon: Layers },
              { id: "fuels", label: `أنواع الوقود (${attrs.fuelTypes.length})`, Icon: Fuel },
              { id: "drivetrains", label: `أنظمة الدفع (${attrs.drivetrains.length})`, Icon: Sparkles },
              { id: "colors", label: `الألوان الشائعة (${attrs.colors.length})`, Icon: Palette },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setAttrSubTab(st.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  attrSubTab === st.id
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <st.Icon className="h-3.5 w-3.5" /> {st.label}
              </button>
            ))}
          </div>

          {/* SUBTAB: MAKES & MODELS */}
          {attrSubTab === "makes" && (
            <div className="space-y-6">
              {/* Add New Make Box */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-accent" /> إضافة ماركة تجارية جديدة
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newMakeName}
                    onChange={(e) => setNewMakeName(e.target.value)}
                    placeholder="اسم الماركة (مثال: Genesis, Maserati, Aston Martin)"
                    className="h-10 px-3 rounded-xl bg-background border border-input text-xs"
                  />
                  <input
                    type="text"
                    value={newMakeCountry}
                    onChange={(e) => setNewMakeCountry(e.target.value)}
                    placeholder="بلد المنشأ (مثال: Germany, Japan, Italy)"
                    className="h-10 px-3 rounded-xl bg-background border border-input text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddMake}
                    className="h-10 px-4 rounded-xl bg-accent text-accent-foreground font-bold text-xs hover:opacity-90 transition"
                  >
                    حفظ الماركة الجديدة
                  </button>
                </div>
              </div>

              {/* Add New Model to Selected Make */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-accent" /> إضافة موديل لماركة محددة
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={selectedMakeForModel}
                    onChange={(e) => setSelectedMakeForModel(e.target.value)}
                    className="h-10 px-3 rounded-xl bg-background border border-input text-xs font-semibold"
                  >
                    {attrs.makes.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                    placeholder="اسم الموديل الجديد (مثال: Panamera, G63 AMG)"
                    className="h-10 px-3 rounded-xl bg-background border border-input text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddModelToMake}
                    className="h-10 px-4 rounded-xl bg-secondary hover:bg-muted text-foreground font-bold text-xs transition border border-border"
                  >
                    إضافة الموديل للماركة
                  </button>
                </div>
              </div>

              {/* Makes & Models List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {attrs.makes.map((m) => (
                  <div key={m.id} className="bg-card border border-border rounded-2xl p-4 shadow-card flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <div>
                          <div className="font-bold text-sm text-foreground">{m.name}</div>
                          <span className="text-[10px] text-muted-foreground">{m.country || "International"}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteMake(m.id)}
                          className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition"
                          title="حذف الماركة بالكامل"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Models Chips */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.models.length === 0 ? (
                          <span className="text-[11px] text-muted-foreground italic">لا توجد موديلات مسجلة بعد</span>
                        ) : (
                          m.models.map((mod) => (
                            <span
                              key={mod}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-[11px] font-semibold text-foreground group"
                            >
                              {mod}
                              <button
                                onClick={() => handleDeleteModel(m.id, mod)}
                                className="text-muted-foreground hover:text-destructive transition ml-1"
                                title="حذف هذا الموديل"
                              >
                                ×
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 text-[10px] text-muted-foreground border-t border-border/60">
                      إجمالي {m.models.length} موديلات مسجلة
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB: CATEGORIES */}
          {attrSubTab === "categories" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="اسم الفئة الجديدة (مثال: Hatchback, Convertible, Pickup)"
                  className="flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddStringItem("categories", newCategoryName, () => setNewCategoryName(""))}
                  className="h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold"
                >
                  إضافة فئة
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {attrs.categories.map((cat) => (
                  <div key={cat} className="p-3 bg-card border border-border rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold">{cat}</span>
                    <button
                      onClick={() => handleDeleteStringItem("categories", cat)}
                      className="p-1 rounded hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB: TRANSMISSIONS */}
          {attrSubTab === "transmissions" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2">
                <input
                  type="text"
                  value={newTransmissionName}
                  onChange={(e) => setNewTransmissionName(e.target.value)}
                  placeholder="اسم ناقل الحركة الجديد (مثال: 9-Speed Automatic, 6-Speed Manual)"
                  className="flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddStringItem("transmissions", newTransmissionName, () => setNewTransmissionName(""))}
                  className="h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold"
                >
                  إضافة ناقل حركة
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {attrs.transmissions.map((tr) => (
                  <div key={tr} className="p-3 bg-card border border-border rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold">{tr}</span>
                    <button
                      onClick={() => handleDeleteStringItem("transmissions", tr)}
                      className="p-1 rounded hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB: FUEL TYPES */}
          {attrSubTab === "fuels" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2">
                <input
                  type="text"
                  value={newFuelName}
                  onChange={(e) => setNewFuelName(e.target.value)}
                  placeholder="نوع الوقود الجديد (مثال: Hydrogen, Mild-Hybrid)"
                  className="flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddStringItem("fuelTypes", newFuelName, () => setNewFuelName(""))}
                  className="h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold"
                >
                  إضافة نوع وقود
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {attrs.fuelTypes.map((fuel) => (
                  <div key={fuel} className="p-3 bg-card border border-border rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold">{fuel}</span>
                    <button
                      onClick={() => handleDeleteStringItem("fuelTypes", fuel)}
                      className="p-1 rounded hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB: DRIVETRAINS */}
          {attrSubTab === "drivetrains" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2">
                <input
                  type="text"
                  value={newDrivetrainName}
                  onChange={(e) => setNewDrivetrainName(e.target.value)}
                  placeholder="نظام الدفع الجديد (مثال: 4x4 Off-Road)"
                  className="flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddStringItem("drivetrains", newDrivetrainName, () => setNewDrivetrainName(""))}
                  className="h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold"
                >
                  إضافة نظام دفع
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {attrs.drivetrains.map((dt) => (
                  <div key={dt} className="p-3 bg-card border border-border rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold">{dt}</span>
                    <button
                      onClick={() => handleDeleteStringItem("drivetrains", dt)}
                      className="p-1 rounded hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB: COLORS */}
          {attrSubTab === "colors" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex gap-2">
                <input
                  type="text"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  placeholder="اسم اللون الجديد (مثال: Daytona Grey, British Racing Green)"
                  className="flex-1 h-10 px-3 rounded-xl bg-background border border-input text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddStringItem("colors", newColorName, () => setNewColorName(""))}
                  className="h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold"
                >
                  إضافة لون
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {attrs.colors.map((col) => (
                  <div key={col} className="p-3 bg-card border border-border rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold">{col}</span>
                    <button
                      onClick={() => handleDeleteStringItem("colors", col)}
                      className="p-1 rounded hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SECURITY & ROLES (RBAC) */}
      {activeTab === "security" && (
        <div className="mt-6 space-y-6 animate-in fade-in">
          {/* Roles Overview Matrix */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <h2 className="font-bold text-lg flex items-center gap-2 mb-2">
              <ShieldCheck className="h-5 w-5 text-accent" /> هيكل الصلاحيات والأدوار (Permission Matrix)
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              نظام أمان دقيق يحدد مستوى وصول كل موظف وعضو في الفريق.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["SUPER_ADMIN", "SALES_AGENT", "INVENTORY_MANAGER"] as AdminRole[]).map((r) => {
                const info = ROLE_INFO[r];
                const isCurrent = activeRole === r;
                return (
                  <div
                    key={r}
                    className={`rounded-2xl p-5 border transition-all ${
                      isCurrent
                        ? "bg-accent/10 border-accent shadow-md"
                        : "bg-card border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${info.badgeCls}`}>
                        {info.titleAr}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-accent bg-accent/15 px-2 py-0.5 rounded-full">
                          الحساب النشط حالياً
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm">{info.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 mb-4">{info.descAr}</p>

                    <div className="space-y-1.5 text-xs pt-3 border-t border-border/80">
                      <div className="font-semibold text-[11px] text-muted-foreground">الصلاحيات المعتمدة:</div>
                      {info.permissions.map((perm) => (
                        <div key={perm} className="flex items-center gap-1.5 text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{perm}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={isCurrent}
                      onClick={() => {
                        setActiveRole(r);
                        toast.success(`تم التبديل لتجربة دور: ${info.titleAr}`);
                      }}
                      className="mt-5 w-full h-9 rounded-xl border border-input bg-card hover:bg-secondary text-xs font-bold transition disabled:opacity-40"
                    >
                      {isCurrent ? "الدور النشط الآن" : "تبديل الصلاحية لهذا الدور"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Members List */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card">
            <h2 className="font-bold text-lg flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-accent" /> فريق العمل وحسابات الدخول المعتمدة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {TEAM_MEMBERS.map((m) => (
                <div key={m.id} className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{m.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-card border font-bold">
                      {ROLE_INFO[m.role].titleAr}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{m.email}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Key className="h-3.5 w-3.5" /> رمز الدخول: <code className="font-bold text-foreground">{m.passcode}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GENERAL SITE SETTINGS */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveGeneralSettings} className="mt-6 space-y-6 animate-in fade-in max-w-2xl">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-card space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2 pb-3 border-b border-border">
              <Building className="h-5 w-5 text-accent" /> بيانات المعرض وصالة العرض
            </h2>

            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1.5">اسم المعرض / العلامة التجارية</label>
              <input
                type="text"
                value={generalForm.siteName}
                onChange={(e) => setGeneralForm({ ...generalForm, siteName: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1.5">رقم الهاتف الرسمي</label>
                <input
                  type="text"
                  value={generalForm.dealershipPhone}
                  onChange={(e) => setGeneralForm({ ...generalForm, dealershipPhone: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1.5">رقم الواتساب للرد السريع</label>
                <input
                  type="text"
                  value={generalForm.whatsappNumber}
                  onChange={(e) => setGeneralForm({ ...generalForm, whatsappNumber: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1.5">البريد الإلكتروني للإدارة</label>
                <input
                  type="email"
                  value={generalForm.dealershipEmail}
                  onChange={(e) => setGeneralForm({ ...generalForm, dealershipEmail: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1.5">رمز الدخول الرئيسي (Admin Passcode)</label>
                <input
                  type="text"
                  value={generalForm.adminPasscode}
                  onChange={(e) => setGeneralForm({ ...generalForm, adminPasscode: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1.5">عنوان صالة العرض والمقر</label>
              <input
                type="text"
                value={generalForm.address}
                onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl bg-background border border-input text-xs sm:text-sm"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="h-11 px-6 rounded-xl bg-gradient-accent text-accent-foreground font-bold text-xs sm:text-sm hover:opacity-90 shadow-md transition"
              >
                حفظ كافة الإعدادات
              </button>
            </div>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}
