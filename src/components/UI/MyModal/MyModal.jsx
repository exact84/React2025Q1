import st from "./MyModal.module.css";

export default function MyModal({ children, visible, setVisible }) {
  const rootClass = [st["my-modal"]];
  if (visible) {
    rootClass.push(st.active);
  }

  return (
    <div className={rootClass.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={st["my-modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
