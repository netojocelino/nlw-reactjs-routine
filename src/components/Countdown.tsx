import { useState, useEffect } from 'react';

import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown () {
    const [time, setTime] = useState((25 * 60));
    const [isActive, setIsActive] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60)

    const [minuteLeft, minuteRight] = String(minutes)
        .padStart(2, '0')
        .split('');

    const [secondLeft, secondRight] = String(seconds)
        .padStart(2, '0')
        .split('');


    function startCountdown() {
        setIsActive(true);
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime((25 * 60));
    }

    useEffect(function() {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(function(){
                setTime(function(previousTime){
                    return previousTime - 1;
                });
            }, 1000);
        }
    }, [isActive, time]);
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{ minuteLeft }</span>
                    <span>{ minuteRight }</span>
                </div>
                <span>:</span>
                <div>
                    <span>{ secondLeft }</span>
                    <span>{ secondRight }</span>
                </div>
            </div>

            { isActive ? (
                <button
                    type="button"
                    className={`${styles.countdownButton} ${ styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                >
                    Abandonar ciclo
                </button>
            ) : (
                <button
                    type="button"
                    className={styles.countdownButton}
                    onClick={startCountdown}
                >
                    Iniciar ciclo
                </button>
            )
        }
        </div>
    )
}
