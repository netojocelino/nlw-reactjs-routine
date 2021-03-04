import { useState, createContext, ReactNode } from 'react';

import challenges from '../../challenges.json';

interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider ({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow(
        (level + 1) * 4
        , 2
    );

    function levelUp() {
        setLevel(function(prevLevel) {
            return (prevLevel + 1);
        })
    }

    function startNewChallenge() {
        const challengeSize = challenges.length;
        const randomNumber = Math.random() * challengeSize;
        const randomChallengeIndex = Math.floor(randomNumber);

        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }
        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(function(currentValue) {
            return currentValue + 1;
        })
    }


    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge
            }}
        >
            { children }
        </ChallengesContext.Provider>
    );
}
