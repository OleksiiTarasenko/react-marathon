import cn from "classnames";
import s from "./style.module.css";
import { useEffect, useRef } from "react";

const Modal = ({ isOpen, title, children, onCloseModal }) => {
  const modalEl = useRef();

  useEffect(() => {
    document.querySelector("body").style.overflow = isOpen ? "hidden" : null;
  }, [isOpen]);

  const handlerCloseModal = () => {
    onCloseModal && onCloseModal(false);
  };

  const handlerClickRoot = (event) => {
    if (!modalEl.current.contains(event.target)) {
      handlerCloseModal();
    }
  };
  return (
    <div>
      <div
        onClick={handlerClickRoot}
        className={cn(s.root, { [s.open]: isOpen })}
      >
        <div className={s.modal} ref={modalEl}>
          <div className={s.head}>
            {title}
            <span className={s.btnClose} onClick={handlerCloseModal}></span>
          </div>
          <div className={s.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
