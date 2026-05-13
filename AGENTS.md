# 🌳 BST Visualizer — Technical Challenge
# Omar Villamizar | Código: 1152239
# Herramientas de Empleabilidad · Prueba Técnica Práctica

## Objetivo

Recibirás un proyecto React intencionalmente roto e incompleto. Tu misión es diagnosticar, corregir y extender el código como lo haría un desarrollador profesional en un entorno real.

No se evalúa solo que funcione. Se evalúa cómo llegas a que funcione.

## Stack Tecnológico

| Herramienta       | Uso                          |
|-------------------|------------------------------|
| React 18          | Framework UI                 |
| react-d3-tree     | Visualización del árbol      |
| Vite              | Build tool                   |
| Vitest            | Testing                      |

### Setup

```bash
npm install
npm run dev        # Servidor de desarrollo
npm run test       # Tests unitarios
npm run test:ui    # UI de Vitest en el navegador
```

## Tu Misión (en orden de prioridad)

### 🔴 Nivel 1 — Bug Fixing (Obligatorio)
Hay 6 bugs intencionales distribuidos en `src/utils/bst.js` y `src/components/BSTVisualizer.jsx`. Están marcados con comentarios `// BUG`.

Encuentra cada uno, corrígelo, y documenta en tu PR qué era el bug y por qué tu corrección es la correcta.

> Pista: Inserta los valores 10, 5, 15, 3, 7 y observa el árbol. ¿Luce correcto?

### 🟡 Nivel 2 — Implementación (Obligatorio)
Completa las funciones marcadas con `// TODO` en `src/utils/bst.js`:
- `inOrder(node)` → Retorna array con recorrido In-Order
- `preOrder(node)` → Retorna array con recorrido Pre-Order
- `postOrder(node)` → Retorna array con recorrido Post-Order
- `getHeight(node)` → Retorna la altura del árbol

### 🟢 Nivel 3 — Features (Obligatorio)
En `BSTVisualizer.jsx`:
- Los nodos que coincidan con el resultado de búsqueda deben resaltarse visualmente.
- El campo de inserción debe mostrar un mensaje de error si el usuario intenta insertar un valor no numérico.

### 🔵 Nivel 4 — Performance (Diferenciador)
Identifica y corrige los dos problemas de rendimiento usando los hooks correctos de React. Justifica tu elección en los comentarios del código.

## Criterios de Evaluación

| Criterio                                       | Peso |
|------------------------------------------------|------|
| Corrección algorítmica (BST real + edge cases) | 30%  |
| Calidad del código (funciones puras, nombres)  | 20%  |
| React bien usado (inmutabilidad, memoización)  | 20%  |
| Git workflow (commits atómicos, PR description) | 15%  |
| Documentación (JSDoc, README actualizado)       | 10%  |
| Tests (al menos 5 casos cubriendo edge cases)   | 5%   |

## Uso de Inteligencia Artificial

Está permitido y es esperado que uses herramientas de IA (Claude, Cursor, Copilot, etc.).

Sin embargo, serás evaluado en tu capacidad de auditar la IA:
- ¿Qué te generó el agente?
- ¿Qué modificaste y por qué?
- ¿Qué rechazaste y por qué era incorrecto?

En tu PR, incluye una sección `## AI Usage` donde describas esto. Un estudiante que usó IA ciegamente y no puede explicar su propio código no aprueba.

---

# AGENTS.md — Flujo de Trabajo del Agente

Este archivo define el flujo de trabajo que el agente debe seguir para completar el trabajo práctico. El objetivo no es resolver todo de una sola pasada, sino seguir un proceso de desarrollo real: leer, entender, corregir con criterio, probar, y documentar.

---

## Reglas generales

- **Git**: El estudiante hace `git add`, `git commit` y `git push`. El agente puede ayudar con `git branch`, `git merge`, `gh pr create` y revisión de PRs.
- No agregar CSS nuevo ni modificar estilos visuales existentes a menos que se indique explícitamente.
- No agregar elementos de UI ni cambiar layout visual.
- Cada cambio de código debe ir acompañado de un comentario técnico breve en el propio archivo, justo encima de la línea corregida o implementada.
- Los comentarios deben ser en español, claros, directos y sin emojis.
- No sobre-explicar. Un comentario de una línea es suficiente si el código habla por sí solo.
- Después de cada corrección o implementación, documentar el cambio en la sección `## Registro de cambios` al final de este archivo, especificando archivo, líneas modificadas y qué se hizo.

---

## Fase 0 — Reconocimiento del proyecto

Antes de tocar cualquier archivo, el agente debe hacer lo siguiente:

1. Leer la estructura completa del proyecto con `ls` y `cat` sobre los archivos clave:
   - `src/utils/bst.js`
   - `src/utils/bst.test.js`
   - `src/components/BSTVisualizer.jsx`
   - `package.json`

2. Identificar qué dependencias están instaladas y cuáles faltan.

3. Leer los tests en `bst.test.js` antes de corregir cualquier bug. Los tests definen el comportamiento esperado — son la especificación.

4. Anotar internamente (sin modificar archivos todavía) qué hace cada función y dónde están los bugs declarados por el profesor.

No se escribe código en esta fase. Solo lectura y comprensión.

---

## Fase 1 — Configuración de ESLint (branch: `feature/eslint-setup`)

Instalar y configurar ESLint antes de hacer cualquier corrección de código. Esto asegura que cada cambio cumpla estándares de calidad antes de ser committeado.

### Pasos

```bash
npm install --save-dev eslint @eslint/js eslint-plugin-react eslint-plugin-react-hooks
```

Crear el archivo `eslint.config.js` en la raíz del proyecto con una configuración base para React:

```js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "eqeqeq": ["error", "always"],
      "no-unused-vars": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
```

Agregar el script en `package.json` si no existe:

```json
"lint": "eslint src/"
```

Verificar que ESLint corre sin errores de configuración antes de continuar:

```bash
npm run lint
```

Es normal que aparezcan errores en el código original — eso es exactamente lo que se va a corregir.

---

## Fase 2 — Corrección de bugs (branch: `feature/fix-bugs`)

Corregir los 6 bugs uno por uno en la rama `feature/fix-bugs`. Después de cada corrección, correr ESLint sobre el archivo antes de pasar al siguiente bug.

```bash
npm run lint -- src/utils/bst.js
```

### BUG #1 — Inserción siempre a la derecha

Problema: la lógica de inserción no evalúa si el valor nuevo es menor que el nodo actual. Como resultado, todos los nodos terminan en el subárbol derecho sin importar su valor.

Qué buscar: una condición de inserción que nunca redirige hacia la izquierda, o que usa `>` donde debería usar `<` (o viceversa).

Corrección esperada: si el valor es menor que el nodo actual, insertar en el subárbol izquierdo; si es mayor, en el derecho.

Comentario a colocar encima de la línea corregida:
```js
// BUG 1 Correccion: valores menores al nodo actual van a la izquierda, no a la derecha
```

---

### BUG #2 — Manejo de nodo null inicial

Problema: cuando el árbol está vacío (raíz es `null`), la función de inserción no maneja ese caso correctamente y puede fallar o ignorar el primer nodo.

Qué buscar: ausencia de un guard clause al inicio de la función, o una condición que no retorna un nodo nuevo cuando el nodo recibido es `null`.

Corrección esperada: si `node === null`, retornar un nodo nuevo con el valor dado.

Comentario:
```js
// BUG 2 Correccion: Caso base: si el nodo no existe, se crea uno nuevo con el valor recibido
```

---

### BUG #3 — Uso de `==` en lugar de `===`

Problema: comparaciones con `==` permiten coerciones de tipo que pueden producir resultados inesperados. Por ejemplo, `"5" == 5` es `true` en JavaScript.

Qué buscar: cualquier comparación con `==` o `!=` dentro de `bst.js`.

Corrección esperada: reemplazar con `===` o `!==` según corresponda.

Comentario:
```js
// BUG 3 Correccion: Comparacion estricta para evitar coercion de tipos
```

ESLint con la regla `eqeqeq` debería marcar esto automáticamente — confirmar que el error desaparece después de la corrección.

---

### BUG #4 — `toD3Format` ignora hijo derecho

Problema: la función que convierte el árbol al formato que espera D3 (para la visualización) solo procesa el hijo izquierdo de cada nodo. El subárbol derecho nunca se incluye en el resultado.

Qué buscar: una llamada recursiva sobre `node.left` sin la correspondiente llamada sobre `node.right`.

Corrección esperada: agregar la llamada recursiva para `node.right` y añadirlo al array de children del nodo D3.

Comentario:
```js
// BUG 4 Correccion: Se agrega el hijo derecho al formato D3; antes solo se procesaba el izquierdo
```

---

### BUG #5 — Performance en componente React

Contexto: este bug está catalogado en `bst.js` pero su efecto se manifiesta en cómo se usa desde React.

Problema: una función que se recalcula en cada render sin necesidad, causando renders innecesarios o trabajo computacional repetido.

Qué buscar: una función dentro de un componente que debería estar memoizada con `useCallback` o `useMemo` pero no lo está, o bien una función en `bst.js` que no está pura y genera efectos secundarios innecesarios.

Corrección esperada: depende del contexto exacto del archivo. Si la función es pura, asegurarse de que no modifica estado externo. Si se usa en React, el fix de `useCallback` se aplica en `BSTVisualizer.jsx` (ver Fase 3).

Comentario:
```js
// BUG 5 Correccion: Funcion pura: no modifica estado externo, apta para memoizacion desde el componente
```

---

### BUG #6 — UX sin manejo de `NaN`

Problema: si el usuario ingresa un valor que no es un número (por ejemplo, letras o una cadena vacía), el árbol intenta insertar `NaN`, lo que rompe la lógica de comparación silenciosamente.

Qué buscar: la función de inserción o de procesamiento de input que no valida si el valor recibido es un número válido antes de operar.

Corrección esperada: agregar una validación con `isNaN()` o `Number.isNaN()` que rechace el valor antes de intentar insertarlo.

Comentario:
```js
// BUG 6 Correccion: Validacion de entrada: se descarta el valor si no es un numero valido
```

---

## Fase 3 — Implementar funciones TODO (branch: `feature/implement-traversals`)

Implementar las cuatro funciones de recorrido y altura en la rama `feature/implement-traversals`. Todas son recursivas. Leer los tests antes de implementar para entender exactamente qué formato de retorno se espera.

### `inOrder(node)`

Recorrido en orden: izquierda → raíz → derecha. Produce los valores del árbol en orden ascendente.

```js
// Recorrido en orden: produce los valores en orden ascendente
```

### `preOrder(node)`

Recorrido previo: raíz → izquierda → derecha. Útil para copiar o serializar la estructura del árbol.

```js
// Recorrido previo: la raiz se visita antes que sus hijos
```

### `postOrder(node)`

Recorrido posterior: izquierda → derecha → raíz. Útil para eliminar nodos o evaluar expresiones.

```js
// Recorrido posterior: los hijos se visitan antes que la raiz
```

### `getHeight(node)`

Altura del árbol: número de aristas en el camino más largo desde la raíz hasta una hoja. Un árbol vacío tiene altura -1 o 0 según la convención usada — verificar con los tests.

```js
// Altura del arbol: maximo entre la altura del subarbol izquierdo y el derecho, mas uno
```

Después de implementar cada función, correr:

```bash
npm run lint -- src/utils/bst.js
```

---

## Fase 4 — Features del Visualizador (branch: `feature/node-highlight`)

Solo se modifica comportamiento lógico en `src/components/BSTVisualizer.jsx`, no estilos ni layout.

### 4.1 — Renderizar `errorMessage`

Ubicar el lugar en el JSX donde se muestra feedback al usuario. Si `errorMessage` existe (string no vacío), debe renderizarse en el elemento correspondiente. No crear elementos nuevos — usar el que ya existe o el que corresponda según la estructura actual del componente.

Comentario:
```js
// Se muestra el mensaje de error cuando el input no es valido
```

### 4.2 — Resaltar nodo encontrado por búsqueda en `renderCustomNode`

La función `renderCustomNode` es la que D3/react-d3-tree usa para dibujar cada nodo. Debe recibir de alguna forma el valor que se está buscando y aplicar una clase o estilo diferente al nodo cuyo valor coincide.

Qué buscar: cómo se pasa el nodo buscado al componente, y cómo `renderCustomNode` accede a ese valor. Modificar solo la lógica condicional, no los estilos.

Comentario:
```js
// Si el valor del nodo coincide con el buscado, se aplica la clase de resaltado
```

### 4.3 — Memoizar `getTraversalResult` con `useCallback`

Ubicar la función `getTraversalResult` dentro del componente. Envolverla con `useCallback` e incluir las dependencias correctas en el array. ESLint con `react-hooks/exhaustive-deps` debería advertir si faltan dependencias.

Comentario:
```js
// Memoizada con useCallback para evitar recalculos en cada render
```

Después de cada modificación en este archivo, correr:

```bash
npm run lint -- src/components/BSTVisualizer.jsx
```

---

## Fase 5 — Verificación con tests

Una vez completadas las fases 2, 3 y 4, correr la suite de tests:

```bash
npm run test -- --run
```

Deben pasar los 3 tests definidos en `src/utils/bst.test.js`.

Si algún test falla:
1. Leer el mensaje de error completo.
2. Identificar cuál función o comportamiento está fallando.
3. Volver a la fase correspondiente y revisar la implementación.
4. No avanzar hasta que los 3 tests pasen.

No modificar los tests. Si un test parece incorrecto, leerlo de nuevo con más cuidado antes de asumir que está mal.

---

## Fase 6 — Lint final

Correr ESLint sobre todo el proyecto una última vez antes de mergear a `main`:

```bash
npm run lint
```

No deben quedar errores. Las advertencias (`warn`) son aceptables pero deben revisarse. Si alguna advertencia es sobre una dependencia faltante en `useCallback` o `useMemo`, debe corregirse — no ignorarse.

---

## Flujo de Trabajo Git

El agente puede ayudar a crear ramas, hacer merges y abrir PRs. El estudiante ejecuta `add`, `commit` y `push`.

### Estructura de ramas

```
main
├── feature/eslint-setup          (Fase 1 — ESLint + config)
├── feature/fix-bugs              (Fase 2 — 6 bugs corregidos)
├── feature/implement-traversals  (Fase 3 — inOrder, preOrder, postOrder, getHeight)
├── feature/node-highlight        (Fase 4 — errorMessage, highlight, useCallback)
└── feature/performance-optimization (Fase 4.3 — useCallback/memo adicional si aplica)
```

### Flujo por fase

| Fase | Rama | Commits sugeridos |
|------|------|-------------------|
| 1 | `feature/eslint-setup` | `chore: setup eslint` |
| 2 | `feature/fix-bugs` | `fix: correct insert to place smaller values on left subtree`<br>`fix: handle null root in insert`<br>`fix: use strict equality (===)`<br>`fix: resolve toD3Format bug for right-only child nodes`<br>`fix: make insert pure for memoization`<br>`fix: validate NaN input with error feedback` |
| 3 | `feature/implement-traversals` | `feat: implement in-order, pre-order, post-order traversals`<br>`feat: implement getHeight` |
| 4 | `feature/node-highlight` | `feat: render error message for invalid input`<br>`feat: highlight found node in tree visualization`<br>`perf: memoize traversal computation with useCallback` |
| 5 | (en `feature/*`) | `test: all tests pass` |
| 6 | (en `feature/*`) | `chore: lint fixes before merge` |

### Proceso

1. El agente indica qué rama crear y el estudiante la crea con `git checkout -b feature/xxx`.
2. El agente hace los cambios de código y el estudiante hace `git add`, `git commit`, `git push`.
3. Al completar cada rama, el estudiante hace merge a `main` (o abre PR).
4. El agente puede ayudar con `gh pr create` y revisión del PR.

### Entrega final

- Abrir un Pull Request a `main` con descripción completa.
- El PR debe incluir capturas del árbol funcionando correctamente con los valores `10, 5, 15, 3, 7, 12, 20`.
- Incluir sección `## AI Usage` describiendo qué generó el agente, qué modificó el estudiante y qué rechazó.

---

## Registro de cambios

Cada entrada debe seguir este formato:
```
- **ARCHIVO** | Líneas: N-M | Descripción del cambio.
```

- **AGENTS.md** | Líneas: 16-17, 333-339 | Se agregó regla de documentación obligatoria en Registro de cambios tras cada corrección.
- **BUG FIX #1** | **src/utils/bst.js** | Líneas: 50-56 | Se cambió condición duplicada `value > node.value` por `value < node.value`, y `right:` por `left:`.
- **BUG FIX #2** | **src/utils/bst.js** | Líneas: 38-39 | Se reemplazó comentario de profesor por comentario oficial de corrección en el null guard.
- **BUG FIX #3** | **src/utils/bst.js** | Líneas: 74-75 | Se cambió `==` por `===` y se eliminó `// eslint-disable-line eqeqeq`.
- **BUG FIX #4** | **src/utils/bst.js** | Líneas: 149-156 | Se desanidaron los checks de left/right en toD3Format; ahora el hijo derecho se agrega independientemente del izquierdo.
- **BUG FIX #5** | **src/utils/bst.js** | Líneas: 42-43 | Se reemplazaron comentarios stale del bug original por comentario de función pura, apta para memoización desde React.
- **BUG FIX #6** | **src/components/BSTVisualizer.jsx** | Líneas: 46-54 | Se agregó else con setErrorMessage cuando el input no es un número válido; antes se tragaba el error silenciosamente.
- **AGENTS.md** | Líneas: 1-357 | Reestructuración completa: se agregó challenge description, flujo git por ramas, criterios de evaluación, y se actualizaron reglas de git.

---

## Lo que el agente NO debe hacer

- Modificar `bst.test.js`
- Agregar dependencias de UI o librerías de visualización nuevas
- Cambiar estilos, clases CSS existentes, o layout visual
- Ejecutar `git add`, `git commit` o `git push` (el estudiante los hace)
- Reescribir funciones que ya funcionan correctamente
- Agregar comentarios que parezcan generados automáticamente o que usen emojis