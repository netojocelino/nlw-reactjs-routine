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
    levelUp: () => void;
    startNewChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider ({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    
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


    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge
            }}
        >
            { children }
        </ChallengesContext.Provider>
    );
}
