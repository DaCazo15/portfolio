import * as XLSX from "xlsx";
import { ref, onMounted } from "vue";

export default function useData() {
  const data = ref([]);

  onMounted(async () => {
    // Cargar el archivo desde public/data
    const response = await fetch("/data/Data.xlsx"); // ojo: no pongas ../../public
    const arrayBuffer = await response.arrayBuffer();

    // Leer el workbook
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // Seleccionar la primera hoja
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convertir a JSON
    let jsonData = XLSX.utils.sheet_to_json(sheet);

    // 🔧 Filtrar y modificar la columna "Descripcion"
    data.value = jsonData.map((row) => {
      if (Object.keys(row).length > 0){
        return {
          ...row,
          Cargo: row.Cargo
          .replace(/1/g, "2     ") 
          .replace(/2/g, "-     ") 
          .replace(/(\\r\\n|\\n|\\r|\\\\|\\|1)/g, ""),
          Descripcion: row.Descripcion
          .replace(/1/g, "2     ") 
          .replace(/2/g, "-     ") 
          .replace(/(\\r\\n|\\n|\\r|\\\\|\\|1)/g, "")
        };
      }
      return row;
    });
  });

  return { data };
}