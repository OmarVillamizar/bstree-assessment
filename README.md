# 🌳 BST Visualizer — Prueba Técnica Práctica

**Omar Villamizar** | Código: 1152239  
Empleabilidad · Universidad Francisco de Paula Santander

- **Repositorio**: [https://github.com/OmarVillamizar/bstree-assessment/]
- **Video YouTube**: [https://youtu.be/PHJ3Da7yUts]

## Nivel 1 — Bug Fixing (6 bugs corregidos)

A continuación documento cada bug encontrado, su causa raíz y la corrección aplicada.

### BUG #1 — Inserción siempre a la derecha
| | |
|---|---|
| **Archivo** | `src/utils/bst.js` |
| **Líneas** | 50-56 |
| **Problema** | La condición `value > node.value` estaba duplicada en ambas ramas. Cuando el valor era menor que el nodo actual, la inserción caía en `right` en vez de `left`. El árbol resultante era una lista enlazada hacia la derecha, rompiendo la propiedad fundamental del BST. |
| **Corrección** | Se cambió la segunda condición a `value < node.value` y se asignó a `left:` en vez de `right:`. Ahora los valores menores van al subárbol izquierdo y los mayores al derecho. |
| **Comentario** | `// BUG 1 Correccion: valores menores al nodo actual van a la izquierda, no a la derecha` |

### BUG #2 — Manejo de nodo null inicial
| | |
|---|---|
| **Archivo** | `src/utils/bst.js` |
| **Líneas** | 38-39 |
| **Problema** | Cuando el árbol estaba vacío (`root === null`), la función `insert` no tenía un guard clause que creara el primer nodo. El primer `insert` fallaba silenciosamente y el árbol nunca se inicializaba. |
| **Corrección** | Se agregó un caso base al inicio: `if (node === null) return createNode(value)`. Esto asegura que el primer nodo se cree correctamente y que las inserciones en subárboles vacíos también funcionen. |
| **Comentario** | `// BUG 2 Correccion: Caso base: si el nodo no existe, se crea uno nuevo con el valor recibido` |

### BUG #3 — Uso de `==` en lugar de `===`
| | |
|---|---|
| **Archivo** | `src/utils/bst.js` |
| **Líneas** | 74-75 |
| **Problema** | La función `search` usaba `node.value == value` (igualdad laxa), lo que permite coerción de tipos. Por ejemplo, buscar el string `"5"` encontraba incorrectamente el nodo con valor numérico `5`. Esto es un riesgo silencioso en aplicaciones donde el input del usuario puede llegar como string desde un formulario. |
| **Corrección** | Se reemplazó `==` por `===` (igualdad estricta) y se eliminó el comentario `// eslint-disable-line eqeqeq` que ocultaba el problema. |
| **Comentario** | `// BUG 3 Correccion: Comparacion estricta para evitar coercion de tipos` |

### BUG #4 — `toD3Format` ignora hijo derecho
| | |
|---|---|
| **Archivo** | `src/utils/bst.js` |
| **Líneas** | 149-156 |
| **Problema** | La función `toD3Format` (que convierte el BST al formato que espera react-d3-tree) solo procesaba el hijo izquierdo de cada nodo. Si un nodo tenía únicamente hijo derecho (ej: insertar 10, 15, 20), el subárbol derecho desaparecía de la visualización y el árbol se rompía visualmente. |
| **Corrección** | Se desanidaron los checks: ahora `node.left` y `node.right` se procesan de forma independiente, cada uno con su propio `if`. Ambos hijos se agregan al array `children` sin que uno dependa del otro. |
| **Comentario** | `// BUG 4 Correccion: Se agrega el hijo derecho al formato D3; antes solo se procesaba el izquierdo` |

### BUG #5 — Performance en componente React
| | |
|---|---|
| **Archivo** | `src/utils/bst.js` |
| **Líneas** | 42-43 |
| **Problema** | La función `insert` contenía comentarios que indicaban mutación de estado externo, lo que impediría su memoización desde React. Una función que muta estado compartido no puede ser usada de forma segura con `useCallback` o `useMemo`. |
| **Corrección** | Se verificó que `insert` es una **función pura**: no modifica el nodo original (usa spread `...node`), no tiene efectos secundarios, y siempre retorna un nuevo objeto. El comentario se actualizó para documentar esta pureza. |
| **Comentario** | `// BUG 5 Correccion: Funcion pura: no modifica estado externo, apta para memoizacion desde el componente` |

### BUG #6 — UX sin manejo de `NaN`
| | |
|---|---|
| **Archivo** | `src/components/BSTVisualizer.jsx` |
| **Líneas** | 46-54 |
| **Problema** | Cuando el usuario ingresaba un valor no numérico (letras, cadena vacía), `parseInt` retornaba `NaN`. Este `NaN` se insertaba en el BST, rompiendo silenciosamente toda la lógica de comparación (`NaN < x` y `NaN > x` siempre son `false`). El usuario no recibía ninguna retroalimentación del error. |
| **Corrección** | Se agregó una validación con `isNaN(parsed)` antes de insertar. Si el valor no es un número válido, se muestra un mensaje de error: _"Por favor, ingresa un número válido."_ usando el estado `errorMessage`. |
| **Comentario** | `// BUG 6 Correccion: Validacion de entrada: se descarta el valor si no es un numero valido` |

---

## Nivel 2 — Funciones Implementadas

### Recorridos del árbol

| Función | Recorrido | Orden de visita |
|---------|-----------|-----------------|
| `inOrder(node)` | En orden | Izquierda → Raíz → Derecha |
| `preOrder(node)` | Pre-orden | Raíz → Izquierda → Derecha |
| `postOrder(node)` | Post-orden | Izquierda → Derecha → Raíz |

Las tres funciones son **recursivas puras**: reciben un nodo (o `null`) y retornan un array de valores en el orden correspondiente. Para un árbol vacío (`null`) retornan `[]`.

### Altura del árbol

| Función | Convención |
|---------|------------|
| `getHeight(node)` | Árbol vacío = `-1`, un solo nodo = `0` |

Implementada como: `Math.max(getHeight(node.left), getHeight(node.right)) + 1`. El caso base `node === null` retorna `-1` para que un nodo hoja tenga altura `0`.

---

## 🟢 Nivel 3 — Features Agregadas

### 3.1 Resaltado de nodo encontrado en búsqueda
En `BSTVisualizer.jsx`, la función `renderCustomNode` compara el valor de cada nodo con `foundNode` (resultado de la búsqueda). Si coinciden, el círculo se pinta de color ámbar (`#F59E0B`) en vez del azul por defecto (`#4A90D9`), permitiendo identificar visualmente el nodo buscado.

### 3.2 Mensaje de error en inserción
El campo de inserción valida el input con `isNaN()`. Si el usuario ingresa un valor no numérico, se muestra un mensaje de error estilizado debajo del campo: _"Por favor, ingresa un número válido."_

### 3.3 Botón de Altura (getHeight)
Se agregó un botón **"Altura"** en el `TraversalPanel`, junto a los botones de In-Order, Pre-Order y Post-Order, con el mismo formato visual. Al hacer clic, calcula la altura del árbol usando `getHeight()` y muestra el resultado.

### 3.4 Tipografía mejorada en nodos
Los nodos del árbol usan la fuente **Google Poppins** en peso regular (400) a 16px, con texto blanco sobre fondo azul. Esto mejora significativamente la legibilidad frente a la versión original.

---

## Nivel 4 — Optimizaciones de Rendimiento

Se identificaron y corrigieron **dos problemas de rendimiento** usando los hooks correctos de React:

### 4.1 `useMemo` para `toD3Format`
```js
const d3Data = useMemo(() => root ? toD3Format(root) : null, [root]);
```
`toD3Format` recorre el árbol recursivamente. Sin memoización, se recalcularía en cada render (ej: cada vez que el usuario escribe en el input de inserción). Con `useMemo`, solo se recalcula cuando `root` cambia.

### 4.2 `useMemo` para `traversalResult`
```js
const traversalResult = useMemo(
  () => activeTraversal ? getTraversalResult(root, activeTraversal) : [],
  [root, activeTraversal]
);
```
Los recorridos (`inOrder`, `preOrder`, `postOrder`) también recorren el árbol completo. Se memoizan para evitar trabajo computacional repetido cuando ni `root` ni `activeTraversal` han cambiado.

### 4.3 `useCallback` para `getTraversalResult`
```js
const getTraversalResult = useCallback((root, type) => {
  // ...
}, []);
```
La función de despacho de recorridos se memoiza con `useCallback` para mantener una referencia estable entre renders, evitando que `useMemo` que depende de ella se invalide innecesariamente.

### 4.4 `useCallback` para `handleGetHeight`
```js
const handleGetHeight = useCallback(() => {
  setHeightResult(getHeight(root));
}, [root]);
```
El handler del botón de altura se memoiza con `useCallback` (dependencia: `[root]`) para evitar recrear la función en cada render.

---

## 🧪 Tests

Los 3 tests definidos en `src/utils/bst.test.js` pasan correctamente:

```bash
npm run test -- --run
```

✓ Test 1: Inserciones y estructura del BST  
✓ Test 2: Recorridos (inOrder, preOrder, postOrder)  
✓ Test 3: Altura del árbol (`getHeight`)

---

## 📸 Captura del Árbol

Insertando los valores **10, 5, 15, 3, 7, 12, 20**, el árbol se visualiza correctamente:

```
        10
       /  \
      5    15
     / \   / \
    3   7 12 20
```

---

## 🎥 Video de Demostración

[Ver video en YouTube]

---

## 🤖 AI Usage — Uso de Inteligencia Artificial

### Herramienta utilizada
**OpenCode (DeepSeek V4 Pro)** — modelo de lenguaje con capacidad de razonamiento, ejecución de comandos, y edición de archivos en un entorno de desarrollo local.

### Cómo me apoyé en la IA

El agente me asistió durante todo el flujo de trabajo. Estas fueron las interacciones clave:

### Qué rechacé y por qué

- **Poppins semibold a 13px**: El agente propuso `fontWeight="600"` y `fontSize={13}` para los nodos. Lo rechacé porque los números de 2 dígitos (10, 15, 20) se veían apretados y poco legibles en el círculo de 40px. Lo corregí a peso regular (400) y 16px, que ofrece mucho mejor legibilidad.
- **Comentarios con emojis**: El agente intentó agregar emojis en algunos comentarios. Los removí porque el estándar del proyecto especifica comentarios técnicos en español, sin emojis.

---

## 🔗 Enlaces de Entrega

- **Repositorio**: [https://github.com/OmarVillamizar/bstree-assessment/]
- **Video YouTube**: [https://youtu.be/PHJ3Da7yUts]
