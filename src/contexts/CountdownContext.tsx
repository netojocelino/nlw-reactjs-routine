import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";
import { AlertModal } from '../components/AlertModal'; 

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
    closeAlertModal: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;


export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState((25 * 60));
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60)


    function startCountdown() {
        setIsActive(true);
    }


    function closeAlertModal() {
        setIsAlertModalOpen(false);
    }

    function resetCountdown(needConfirm = true) {
        if(needConfirm) {
            return setIsAlertModalOpen(true);
        }
        closeAlertModal();
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime((25 * 60));
    }

    useEffect(function() {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(function(){
                setTime(function(previousTime){
                    return previousTime - 1;
                });
            }, 1000);
        }else if(isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
            closeAlertModal
        }}>
            { children }

            { isAlertModalOpen && (
                <AlertModal
                    title={`Deseja abandonar ciclo?`}
                    successCallback={() => (resetCountdown(false))}
                    failCallback={() => (setIsAlertModalOpen(false))}
                >
                    <p>Ao abandonar o ciclo você não receberá um desafio ou ganhará a experiência.</p>
                </AlertModal>
            )}
        </CountdownContext.Provider>
    );
}
