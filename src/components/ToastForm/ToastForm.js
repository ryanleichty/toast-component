import React from "react";
import Button from "../Button";
import styles from "./ToastForm.module.css";
import { ToastContext } from "../ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastForm() {
  const { addToast } = React.useContext(ToastContext);
  const [variant, setVarient] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState("");
  const messageRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    addToast(variant, message);
    setVarient(VARIANT_OPTIONS[0]);
    setMessage("");

    messageRef.current.focus();
  }

  return (
    <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label
          htmlFor="message"
          className={styles.label}
          style={{ alignSelf: "baseline" }}
        >
          Message
        </label>
        <div className={styles.inputWrapper}>
          <textarea
            id="message"
            className={styles.messageInput}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            ref={messageRef}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>Variant</div>
        <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
          {VARIANT_OPTIONS.map((item) => {
            return (
              <label key={item} htmlFor={`variant-${item}`}>
                <input
                  id={`variant-${item}`}
                  type="radio"
                  name="variant"
                  value={item}
                  checked={item === variant}
                  onChange={(e) => {
                    setVarient(e.target.value);
                  }}
                />
                {item}
              </label>
            );
          })}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label} />
        <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
          <Button>Pop Toast!</Button>
        </div>
      </div>
    </form>
  );
}

export default ToastForm;
