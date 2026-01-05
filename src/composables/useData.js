import * as XLSX from "xlsx";
import { ref, onMounted } from "vue";

export default function useData() {
  const data = ref([]);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    try {
      const response = await fetch("/data/Data.xlsx");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      data.value = jsonData.map((row) => ({
        ...row,
        Cargo: row.Cargo
          .replace(/(\\r\\n|\\n|\\r|\\\\|\\|1)/g, ""),

        Descripcion: row.Descripcion
          .replace(/1/g, "-" + "&nbsp;".repeat(5))
          .replace(/(\\r\\n|\\n|\\r|\\\\|\\|1)/g, ""),

        competencias: row.competencias
          .replace(/1/g, "&nbsp;".repeat(5))
          .replace(/(\\r\\n|\\n|\\r|\\\\|\\|1)/g, ""),

        Tecnologias: row.Tecnologias && typeof row.Tecnologias === 'string'
          ? row.Tecnologias.split(',').map(tech => tech.trim().toLowerCase())
          : [],
      }));
    } catch (e) {
      error.value = e.message;
      console.error("Error loading or parsing data:", e);
    } finally {
      loading.value = false;
    }
  });

  return { data, loading, error };
}