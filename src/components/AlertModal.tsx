
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/AlertModal.module.css';

export function AlertModal({ title, children, successCallback, failCallback }) {
    const { closeAlertModal } = useContext(CountdownContext);


    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{ title }</header>

                {/* <strong>Parabéns</strong> */}

                { children }

                {/* <p>Você alcançou um novo nível.</p> */}

                <button type="button" onClick={closeAlertModal}>
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>


                { (successCallback || failCallback) && <div className={styles.btnContainer}>
                    {successCallback && <button type="button" className={styles.success} onClick={successCallback}>
                        SIM
                    </button>}
                    {failCallback && <button type="button" className={styles.fail} onClick={failCallback}>
                        NÃO
                    </button>}
                </div>}
            </div>
        </div>
    );
}
