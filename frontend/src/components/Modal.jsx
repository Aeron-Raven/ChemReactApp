const Modal = ({ click, setClick, header, body, footer }) => {
    const modalClass = click ? 'modal is-active' : 'modal';

    return (
        <div className={modalClass}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <div className="modal-card-title">{header}</div>
                    <button className="delete" aria-label="close" onClick={() => setClick(false)}></button>
                </header>
                <section className="modal-card-body">
                    {body}
                </section>
                {footer}

            </div>
        </div>
    );
};

export default Modal;