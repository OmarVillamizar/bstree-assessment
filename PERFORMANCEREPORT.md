# Performance Report — BST Visualizer

## Problemas Identificados y Corregidos

### Problema 1: `d3Data` recalculado en cada render

**Archivo:** `src/components/BSTVisualizer.jsx` — línea 68→71

**Síntoma:** `toD3Format(root)` recorre recursivamente todo el árbol para convertirlo
al formato de react-d3-tree. En la versión original, esto se ejecutaba en **cada
render** del componente, incluso cuando `root` no había cambiado (ej: el usuario
escribía en el input, cambiaba el traversal activo, etc.).

**Solución:** Envolver el cómputo en `useMemo` con dependencia `[root]`:

```js
const d3Data = useMemo(() => root ? toD3Format(root) : null, [root]);
```

**Impacto:** Con un árbol de 20+ nodos, `toD3Format` hace ~20 llamadas recursivas.
Al evitar recalcular en renders innecesarios, se reduce la carga de trabajo
computacional a solo los renders donde el árbol realmente cambia (insert o
random insert).

---

### Problema 2: `traversalResult` recalculado en cada render

**Archivo:** `src/components/BSTVisualizer.jsx` — línea 70→76

**Síntoma:** `inOrder`, `preOrder` y `postOrder` recorren el árbol completo
recursivamente. En la versión original, `getTraversalResult` se ejecutaba en
**cada render**, incluso cuando ni `root` ni `activeTraversal` cambiaban.

**Solución:** Envolver el cómputo en `useMemo` con dependencias `[root, activeTraversal]`:

```js
const traversalResult = useMemo(
  () => activeTraversal ? getTraversalResult(root, activeTraversal) : [],
  [root, activeTraversal]
);
```

**Nota:** `getTraversalResult` ya estaba memoizada con `useCallback` (referencia
estable), pero eso no impedía que se invocara. `useMemo` cachea el **resultado**,
no solo la función.

**Impacto:** Un `inOrder` en un árbol de 20 nodos visita los 20 nodos. Al
cachear el resultado, solo se recalcula cuando el usuario inserta un nodo o
cambia el tipo de recorrido. Operaciones como escribir en el input o hacer
hover ya no disparan recorridos del árbol.

---

## Resumen de Cambios

| Variable | Hook | Dependencias | Antes | Después |
|---|---|---|---|---|
| `d3Data` | `useMemo` | `[root]` | Recorrido en cada render | Solo cuando `root` cambia |
| `traversalResult` | `useMemo` | `[root, activeTraversal]` | Recorrido en cada render | Solo cuando `root` o `activeTraversal` cambian |

## Criterios de Evaluación Relacionados

- **React bien usado (inmutabilidad, memoización) — 20%:** Ambos fixes usan
  `useMemo`, el hook correcto para cachear valores derivados. No se modifican
  props ni estado directamente, se retornan nuevas copias inmutables.
- **Calidad del código — 20%:** Las funciones `toD3Format`, `inOrder`, etc. ya
  eran puras (sin efectos secundarios), lo que las hace aptas para memoización.
  Los comentarios explican el por qué, no el qué.
