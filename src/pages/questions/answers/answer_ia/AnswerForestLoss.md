# ¿Cuánto bosque se ha perdido y dónde está ocurriendo la deforestación?

## Análisis de Pérdida de Cobertura Arbórea — Global Forest Watch (GFW)

El portal utiliza datos satelitales del programa Hansen/UMD/Google/USGS/NASA (Landsat) y de Global Forest Watch para monitorear la pérdida de bosque anual en los países de la región SICA desde el año 2010.

---

### ¿Qué se mide exactamente?

- **Pérdida de cobertura arbórea**: Eliminación del dosel vegetal con cobertura superior al 30%, detectada por el satélite Landsat.
- **Bosque primario**: Pérdida específica en bosques maduros tropicales de alta biodiversidad, más críticos ecológica y carbonicamente.
- **Emisiones de CO₂**: Estimación de carbono liberado a la atmósfera por la pérdida de biomasa forestal superficial.
- **Alertas GLAD**: Sistema de alerta temprana de deforestación basado en imágenes satelitales del GLAD Lab (University of Maryland). Actualización semanal.

---

### Indicadores Clave que muestra la vista (datos dinámicos por país)

- **Pérdida Bruta Total (ha)**: Superficie total de dosel arbóreo eliminada acumulada desde 2010.
- **Bosque Primario Perdido (ha)**: Hectáreas de bosques maduros afectados.
- **Huella de Carbono (Mt CO₂)**: Emisiones proyectadas liberadas por la pérdida de biomasa (en millones de toneladas de CO₂ equivalente).
- **Porcentaje de Pérdida**: Calculado como (pérdida total / cobertura base) × 100.

---

### Serie Histórica Anual (gráfico de barras)

La vista muestra un gráfico de barras con la pérdida anual de hectáreas de bosque desde el año 2010, permitiendo identificar los años con mayor actividad de deforestación para el país seleccionado.

---

### Zonas de Mayor Presión (ranking de regiones críticas)

La vista presenta un ranking de las principales zonas de deforestación dentro del país o región seleccionada, mostrando:
- **Nombre de la región o área crítica**.
- **Hectáreas perdidas** en ese territorio.
- **Porcentaje que representa** del total de pérdida del país.

---

### Fuentes de Datos

- **Pérdida de Cobertura Arbórea**: Hansen/UMD/Google/USGS/NASA (Landsat). Actualización: Anual.
- **Emisiones de CO₂**: Global Forest Watch. Actualización: Anual.
- **Alertas GLAD**: GLAD Lab (UMD). Actualización: Semanal.

---

### Cobertura Geográfica

La vista permite filtrar por los 8 países SICA o visualizar el total regional. Los datos se cargan dinámicamente desde la fuente remota (forest_data.json en GitHub).

---

*Para ver el mapa interactivo y los datos de deforestación por país, acceda a: /preguntas/perdida-bosque*