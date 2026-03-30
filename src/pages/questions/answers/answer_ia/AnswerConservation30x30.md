# ¿Cuánto avance hay hacia la meta internacional de proteger el 30% del territorio?

## Meta 30x30 — Marco de Biodiversidad de Kunming-Montreal (GBF)

La meta 30x30 es un compromiso global adoptado en la COP15 de Biodiversidad (Kunming-Montreal, 2022) que obliga a los países a proteger al menos el 30% de sus territorios terrestres y marinos para el año 2030. El portal analiza el progreso de cada país del SICA hacia este objetivo.

---

### ¿Cómo se mide el progreso?

La cobertura efectiva se calcula sumando dos componentes:
1. **Áreas Protegidas (AP)**: Territorios bajo figuras legales oficiales de conservación.
2. **OECMs**: Otras Medidas de Conservación Efectiva Basadas en Áreas (territorios no clasificados formalmente como AP, pero con gestión que conserva la biodiversidad).

**Fórmula**: Cobertura Efectiva = % Áreas Protegidas + % OECMs

**Brecha 2030**: Lo que falta para llegar al 30% objetivo.

---

### Indicadores Clave que muestra la vista (datos dinámicos por país)

- **Cobertura Efectiva (AP + OECM)**: Porcentaje total del territorio bajo figuras oficiales de conservación. El valor se obtiene de la API de GitHub del proyecto (bio_data.json).
- **Brecha 2030**: Si la cobertura es menor al 30%, se muestra el porcentaje pendiente. Si ya se alcanzó la meta, se muestra "META ALCANZADA".
- **Especies Amenazadas**: Número total de especies en listas rojas internacionales (UICN), desglosado por grupos taxonómicos (anfibios, mamíferos, aves, plantas, etc.).

---

### Integridad Ecológica (gráfico de dona)

La vista muestra un gráfico circular con la distribución de la integridad ecológica del territorio protegido, clasificada en tres categorías:
- **Alta integridad**: Ecosistemas bien conservados sin fragmentación significativa.
- **Media integridad**: Ecosistemas con cierta presión humana.
- **Baja integridad**: Ecosistemas fragmentados o degradados dentro de áreas protegidas.

---

### Cobertura Geográfica y Filtros

La vista permite seleccionar entre los 8 países SICA o ver el promedio regional completo. Los datos se cargan dinámicamente desde la fuente remota al cambiar el país.

---

### Fuentes de Datos

- **Global Biodiversity Framework (GBF)**: Metas mundiales para la biodiversidad, incluyendo la Meta 3 (30x30). Proveedor: UN Biodiversity Lab. Actualización: Anual.
- **Integridad Ecológica**: Índice de integridad de los ecosistemas terrestres. Proveedor: Venter et al. / UNBL. Actualización: Bienal.

---

*Para ver la vista interactiva con el progreso actualizado por país, acceda a: /preguntas/conservacion-30x30*