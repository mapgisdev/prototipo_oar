# Guía de Inicio Local - Prototipo OAR v2

Esta guía detalla los pasos necesarios para ejecutar el proyecto en un entorno local utilizando la terminal.

## Requisitos Previos

- **Node.js**: Asegúrate de tener instalada la versión 18 o superior (recomendado v20+).
- **npm**: Viene incluido con Node.js.

## Pasos para Iniciar el Proyecto

### 1. Abrir la Terminal
Abre tu terminal preferida (PowerShell, Command Prompt o terminal de VS Code).

### 2. Navegar al Directorio del Proyecto
Asegúrate de estar en la carpeta raíz del proyecto:
```bash
cd c:\web_antigravity\prototipo_OAR_v2
```

### 3. Instalar Dependencias
Si es la primera vez que inicias el proyecto o si ha habido cambios en `package.json`, ejecuta:
```bash
npm install
```

### 4. Iniciar el Servidor de Desarrollo
Para lanzar el sitio en modo desarrollo con Vite:
```bash
npm run dev
```

### 5. Acceder al Sitio
Una vez que la terminal indique que el servidor está corriendo, abre tu navegador y dirígete a:
- [http://localhost:5173](http://localhost:5173)

---

## Otros Comandos Útiles

- **Construir para producción**: `npm run build`
- **Previsualizar la construcción**: `npm run preview`
- **Ejecutar Linter**: `npm run lint`
