import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox () {
    const { activeChallenge } = useContext(ChallengesContext);

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Novo desafio"/>
                        <strong>Novo desafio</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                        >
                            Completei
                        </button>
                    </footer>

                </div>
                ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber desafios a serem completados.</strong>

                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                        Avançe de nível completando desafios
                    </p>
                </div>
                )
            }
            
        </div>
    )
}
