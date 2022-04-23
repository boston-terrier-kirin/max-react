import ReactDom from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHideCart}></div>;
};

const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const overlays = document.getElementById('overlays');

  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        overlays
      )}
      {ReactDom.createPortal(<Overlay>{props.children}</Overlay>, overlays)}
    </>
  );
};

export default Modal;
