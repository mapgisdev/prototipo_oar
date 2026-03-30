# ¿Qué animales y plantas se han registrado en los países de la región?

## Inventario Regional de Biodiversidad — Red Global GBIF (Global Biodiversity Information Facility)

El portal consulta en tiempo real la API de GBIF para mostrar los registros biológicos (ocurrencias) válidas de flora, fauna y hongos en los países de la región SICA. Los datos provienen de la red internacional de curadores científicos y observaciones ciudadanas verificadas.

---

### ¿Qué es una "ocurrencia" en GBIF?

Una ocurrencia es un registro documentado de la presencia de una especie en un lugar y tiempo determinado. Puede ser un avistamiento con foto, una colecta de museo, una observación de campo, o un registro de cámara trampa, siempre que esté geolocalizado y validado por la comunidad científica.

---

### Indicadores Clave que muestra la vista (datos en tiempo real por país)

- **Ocurrencias Globales (registros)**: Total de avistamientos validados y geolocalizados para el país o la región completa. Este número se consulta directamente desde la API de GBIF en tiempo real.
- **Variedad Taxonómica (reinos)**: Número de reinos biológicos con representación en el dataset actual (Animalia, Plantae, Fungi, entre otros).
- **Evidencia Multimedia**: Estimación de registros respaldados con fotografía. Se calcula como el 5% del total de ocurrencias.

---

### Distribución por Reinos Biológicos (gráfico de barras horizontales)

La vista muestra el desglose de ocurrencias por Reino Biológico. Los colores identificativos son:

| Reino | Color en la vista |
|---|---|
| **Animalia** (animales) | Rojo (#F87171) |
| **Plantae** (plantas) | Verde esmeralda (#10B981) |
| **Fungi** (hongos) | Ámbar (#F59E0B) |
| Otros | Gris (#94A3B8) |

El reino dominante (con mayor número de registros) es destacado en la narrativa de la vista como el "núcleo biológico" del país.

---

### Galería de Evidencia Multimedia (imágenes en tiempo real)

La vista muestra una galería con las 6 fotografías más recientes de especies registradas en el país seleccionado, cargadas directamente desde GBIF. Cada imagen incluye:
- **Nombre común o vulgar** de la especie (si disponible).
- **Nombre científico** (nomenclatura binomial, en latín).
- **Verificación**: Todas las imágenes tienen identificación verificada por curadores de la Red GBIF.

---

### Mapa de Densidad de Ocurrencias

El mapa interactivo muestra un **mapa de calor (Hex-Binning)** que representa la densidad de registros biológicos por unidad de superficie, sirviendo directamente desde la API de mapas de GBIF:
- **Resolución**: Hex-tiles dinámicos según el nivel de zoom.
- **Escala de color**: de verde tenue (baja densidad) a verde oscuro (extrema densidad de registros).

---

### Fuentes de Datos

- **GBIF API v2**: Occurrencias de especies geolocalizadas a nivel global. Actualización: Tiempo Real.
- **GBIF Backbone Taxonomy v2.1**: Clasificación biológica estandarizada de todos los reinos. Actualización: Semestral.

---

*Para explorar los registros de biodiversidad y el mapa de calor por país, acceda a: /preguntas/registros-especies*