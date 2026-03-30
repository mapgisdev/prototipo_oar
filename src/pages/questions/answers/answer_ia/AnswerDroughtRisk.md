# ¿Existe riesgo de sequía en mi país o en la región?

## Monitor de Riesgo de Sequía — Observatorio de Vulnerabilidad Climática

El portal monitorea las condiciones hidrometeorológicas actuales de los países de la región SICA y el Corredor Seco Centroamericano, utilizando datos de pronóstico a 7 días y datos históricos del reanálisis global ERA5 de Copernicus.

---

### Puntos de Control Monitoreados

El sistema tiene 10 estaciones o puntos de control georreferenciados:

| Estación / Punto de Control | País |
|---|---|
| Guatemala City | Guatemala |
| Tegucigalpa | Honduras |
| San Salvador | El Salvador |
| Managua | Nicaragua |
| San José | Costa Rica |
| Panama City | Panamá |
| Belmopan | Belice |
| Santo Domingo | República Dominicana |
| Corredor Seco (Chiquimula) | Guatemala (zona crítica) |
| Promedio Regional | Región SICA (centro geográfico: 13.5°N, 85°W) |

---

### Indicadores Clave que muestra la vista

- **Temperatura Máxima (°C)**: Estrés térmico a 2 metros sobre el nivel del suelo, para el día más reciente. Se obtiene de la API Open-Meteo con datos de ERA5.
- **Precipitación Acumulada (mm)**: Suma total de lluvia de los últimos 90 días (trimestre) para el punto seleccionado.
- **Nivel de Riesgo (SPI-3)**: Clasificación del Índice de Precipitación Estándar regional:
  - **Severo**: Precipitación acumulada menor a 50 mm en el trimestre.
  - **Moderado**: Precipitación entre 50 mm y 200 mm.
  - **Bajo**: Precipitación acumulada superior a 200 mm.

---

### Diagnóstico Narrativo

La vista genera automáticamente una interpretación combinada:
- Si el acumulado trimestral es menor a 100 mm → se declara **"ALTO DÉFICIT HÍDRICO"**.
- Si el acumulado es mayor a 100 mm → se clasifica como **"PERIODOS DE LLUVIAS ESTABLES"**.

---

### Gráfico de Dinámica Climática (90 días)

La vista incluye un gráfico temporal que muestra la interacción entre:
- **Temperatura máxima diaria** (línea naranja, eje izquierdo, en °C).
- **Precipitación diaria** (área azul, eje derecho, en mm).

Ambas variables para el punto de control seleccionado, en los últimos 90 días.

---

### Fuentes de Datos

- **Pronóstico Meteorológico**: Previsión a 7 días de temperatura y precipitación. Proveedor: Open-Meteo API. Actualización: Horaria.
- **Datos Históricos (ERA5 Reanalysis)**: Registro climático de las últimas décadas. Proveedor: Copernicus / ECMWF. Actualización: Mensual.

---

*Para ver el monitor de sequía actualizado en tiempo real, acceda a: /preguntas/riesgo-sequia*