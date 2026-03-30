# ¿Cuáles son los incendios forestales activos en la región?

## Vigilancia de Incendios en Tiempo Real — NASA FIRMS / VIIRS

El portal monitorea anomalías térmicas (focos de calor) detectadas por los satélites NASA FIRMS en tiempo cuasi-real. Los datos se actualizan cada vez que el satélite pasa sobre la región, con una latencia inferior a 3 horas.

---

### Zonas con Focos Activos Registrados (puntos fijos en el mapa)

Los siguientes focos de incendio están registrados en el sistema y son visibles en el mapa interactivo:

| Zona | País |
|---|---|
| Petén (Alta Confianza) | Guatemala |
| Sierra de las Minas | Guatemala |
| Olancho | Honduras |
| Biosfera Bosawás | Nicaragua |
| Talamanca | Costa Rica |
| Darién | Panamá |
| Chiquibul | Belice |
| Cordillera Central | República Dominicana |

---

### Indicadores Clave (KPIs) que muestra la vista

- **Total de Alertas (últimas 24h)**: Número de anomalías térmicas procesadas vía satélite en el territorio seleccionado. El valor es dinámico y se actualiza desde la API de NASA FIRMS.
- **Porcentaje de Alta Confianza**: Del total de alertas, la vista calcula qué porcentaje corresponde a focos de alta confianza, confirmando actividad de fuego persistente en áreas boscosas primarias.
- **Superficie Afectada**: Estimación en hectáreas (ha) del área con probabilidad de combustión activa. Proviene del sistema GWIS (Global Wildfire Information System).
- **Huella de Carbono**: Estimación de gases de efecto invernadero liberados por la biomasa incinerada, expresado en toneladas de CO₂ equivalente (tCO₂e). Se calcula como 0.12 tCO₂e por cada alerta activa.

---

### Tecnología de Detección

- **Sensor VIIRS S-NPP**: Resolución espacial de 375 metros. Optimizado para capturar anomalías térmicas pequeñas e incendios de baja intensidad bajo dosel cerrado.
- **NASA FIRMS Pipeline**: Procesamiento automatizado NRT (Near Real Time) con latencia inferior a 3 horas desde el paso del satélite.
- **Latencia del sistema**: ~3.2 horas (promedio regional).
- **Nodos activos**: 8 nodos regionales monitoreando los 8 países SICA.

---

### Fuentes de Datos

- **NASA FIRMS (MODIS/VIIRS)**: Detecciones de anomalías térmicas en tiempo real.
- **GWIS (Global Wildfire Information System)**: Estimación de área quemada, actualización mensual.

---

### Cobertura Geográfica

La vista cubre los 8 países miembros del SICA: Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panamá, Belice y República Dominicana. El usuario puede filtrar por país o ver la región completa.

---

*Para ver el mapa interactivo con los focos activos, acceda a: /preguntas/incendios-activos*