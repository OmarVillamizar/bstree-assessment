import styles from "./BSTVisualizer.module.css";

export default function TraversalPanel({ active, onChange, result, heightResult, onGetHeight }) {
  const renderButton = (type, label) => (
    <button
      type="button"
      onClick={() => onChange(type)}
      className={`${styles.button} ${active === type ? "" : styles.secondary}`}
    >
      {label}
    </button>
  );

  return (
    <section className={styles.controls}>
      <div className={styles.inputGroup}>
        {renderButton("inOrder", "In-Order")}
        {renderButton("preOrder", "Pre-Order")}
        {renderButton("postOrder", "Post-Order")}
        <button
          type="button"
          onClick={onGetHeight}
          className={`${styles.button} ${styles.secondary}`}
        >
          Altura
        </button>
      </div>
      {active ? <p>Resultado: [{result.join(", ")}]</p> : null}
      {heightResult !== null && heightResult !== undefined ? (
        <p>Altura del arbol: {heightResult}</p>
      ) : null}
    </section>
  );
}