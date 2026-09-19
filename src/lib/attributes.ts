import { useCallback, useEffect, useState } from "react";
import {
  supabase,
  isSupabaseConfigured,
  type AttributeRow,
} from "@/lib/supabase";

export type AttributeCategory = AttributeRow["category"];

export const ATTRIBUTE_LABELS: Record<AttributeCategory, string> = {
  make: "Makes",
  category: "Body types",
  color: "Colors",
  engine_type: "Engine types",
  transmission: "Transmissions",
};

/** Sensible defaults so dropdowns still work before the `attributes` table/migration exists. */
export const FALLBACK_ATTRIBUTES: Record<AttributeCategory, string[]> = {
  make: [
    "Tesla",
    "BMW",
    "Porsche",
    "Mercedes-Benz",
    "Audi",
    "Land Rover",
    "Lexus",
    "Lamborghini",
    "Toyota",
    "Ford",
    "Genesis",
    "Chevrolet",
  ],
  category: [
    "Sedan",
    "SUV",
    "Coupe",
    "Sports",
    "Electric",
    "Truck",
    "Convertible",
    "Hatchback",
  ],
  color: [
    "Pearl White",
    "Alpine White",
    "Guards Red",
    "Obsidian Black",
    "Midnight Black",
    "Nardo Grey",
  ],
  engine_type: ["Petrol", "Diesel", "Electric", "Hybrid"],
  transmission: ["Automatic", "Manual", "PDK", "eCVT", "Single-Speed"],
};

export function useAttributes(category: AttributeCategory) {
  const [values, setValues] = useState<string[]>(FALLBACK_ATTRIBUTES[category]);
  const [rows, setRows] = useState<AttributeRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("attributes")
        .select("*")
        .eq("category", category)
        .order("value", { ascending: true });
      if (!error && data) {
        setRows(data as AttributeRow[]);
        const fromDb = (data as AttributeRow[]).map((r) => r.value);
        setValues(fromDb.length ? fromDb : FALLBACK_ATTRIBUTES[category]);
      }
    } catch {
      /* table not migrated yet — fallback list stays in place */
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    void load();
  }, [load]);

  const add = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      if (!isSupabaseConfigured) {
        setValues((prev) =>
          prev.includes(trimmed) ? prev : [...prev, trimmed].sort(),
        );
        return;
      }
      const { data, error } = await supabase
        .from("attributes")
        .insert({ category, value: trimmed })
        .select()
        .single();
      if (error) throw new Error(error.message);
      setRows((prev) => [...prev, data as AttributeRow]);
      setValues((prev) =>
        prev.includes(trimmed) ? prev : [...prev, trimmed].sort(),
      );
    },
    [category],
  );

  const remove = useCallback(async (id: string) => {
    if (!isSupabaseConfigured) {
      return;
    }
    const { error } = await supabase.from("attributes").delete().eq("id", id);
    if (error) throw new Error(error.message);
    setRows((prev) => {
      const row = prev.find((r) => r.id === id);
      if (row) setValues((v) => v.filter((x) => x !== row.value));
      return prev.filter((r) => r.id !== id);
    });
  }, []);

  return { values, rows, loading, add, remove, refresh: load };
}
