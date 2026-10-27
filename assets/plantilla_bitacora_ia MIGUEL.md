# 📜 Bitácora de Uso de IA en el Colegio Mágico (Entrega en PR)

> **Instrucciones:** Copia todo este contenido y pégalo en la descripción de tu Pull Request (PR).  
> **Recordatorio:** Este informe vale el **20% de tu calificación final** y debe ser redactado con tus propias palabras (sin utilizar IA para generar el texto del reporte).

---

## 🧙‍♂️ Datos del Aprendiz
* **Nombre del Estudiante:** [Miguel Angel Hernandez Montes]
* **Usuario de GitHub:** [@Miguel-sv23]
* **Herramientas de IA utilizadas:** [Gemini,antigravity]

---

## 🔍 Bitácora del Reto 5: El Transmutador de Estados (Filtros y Estabilidad)

### 1. Prompt Principal Formulado
> *Pega aquí el prompt exacto que le diste a la IA:*
```text
[Actúa como un experto desarrollador en Angular y TypeScript. Necesito que implementes los métodos getPocionesFiltradas() y calcularEstabilidadCaldero() para el componente CalderoComponent (Reto 5). El primero debe filtrar un arreglo de pociones por texto (nombre/descripción insensible a mayúsculas), tipo de magia, y si son peligrosas (nivel > 7), ordenándolas de forma ascendente o descendente por nivel de peligro. El segundo debe calcular la estabilidad del caldero retornando 'CRÍTICO' si hay 2 o más pociones con nivel >= 8, 'INESTABLE' si hay al menos 1 poción con nivel >= 5, y 'SEGURO' en caso contrario.]
```

### 2. ¿Qué respuesta te entregó la IA?
*Describe brevemente la solución que te propuso:*
- [el getPocionesFiltradas se encarga de filtrar por nombre no importa si sea mayuscula o munuscula tambien por el tipo de magia y si es peligrosa mayor que 7 ordenandola de forma acendent y desendente la segunda calcularEstabilidadCaldero recisa cuantas posciciones peligrosas hay acumuladad en el caldero para decirnos si la cosa esta critica, inestable o segura]

### 3. Ajustes y Correcciones Manuales
*¿La solución funcionó a la primera? ¿Qué tuviste que corregir o adaptar para que pasaran las pruebas del Tribunal?*
- [si funciono a la primera]

---

## ⏳ Bitácora del Reto 6: El Giratiempo (Undo / Redo Inmutable)

### 1. Prompt Principal Formulado
> *Pega aquí el prompt exacto que le diste a la IA:*
```text
[Actúa como un experto desarrollador en Angular y TypeScript. Necesito que implementes el sistema de historial Undo/Redo ('El Giratiempo') en el componente CalderoComponent (Reto 6). Debes rellenar los siguientes métodos asegurando inmutabilidad profunda (por ejemplo, con JSON.parse(JSON.stringify(...))), descartando el futuro si se añade un estado nuevo tras haber hecho 'undo': guardarEstadoGiratiempo(), puedeDeshacer() (retorna true si indiceHistorial > 0), puedeRehacer() (retorna true si indiceHistorial < historialPasos.length - 1), giratiempoDeshacer() y giratiempoRehacer()]
```

### 2. ¿Cómo abordó la IA la inmutabilidad de los objetos?
*Explica qué método te sugirió para clonar el arreglo de pociones sin mutar las referencias originales (ej. map con spread operator, structuredClone, etc.):*
- [lo que busca hacer es armar el clsico sistema de deshacer y rehacer para componente de angular.necisita clonar bien los datos para que no se mezclen. ]

### 3. Depuración de Errores con la IA
*Si una prueba de Jasmine falló, ¿cómo usaste la IA para encontrar el bug?*
- [no me fallo funciono a la pirmera]

---

## 🎨 Resumen del Reto Creativo (Reto 7 - 30%)
* **Nombre de tu Artefacto Mágico:** [Ej: El Mapa del Merodeador, Tienda de Varitas Ollivander, etc.]
* **¿Qué hace tu artefacto y cómo interactúa el usuario?**
  - [Descripción de funcionalidades]
* **¿Qué hooks de ciclo de vida implementaste?**
  - [Ej: ngOnInit para cargar datos, ngOnDestroy para limpiar timers]
* **¿Qué directivas y enlaces utilizaste?**
  - [Ej: @if para estados de victoria, @for para hechizos, [(ngModel)] para renombrar]

---

## 💡 Reflexión Crítica del Aprendiz
*¿En qué momentos sentiste que la IA te ahorró tiempo y en qué momentos una mala respuesta te retrasó?*
- [Tu reflexión honesta con tus propias palabras]
