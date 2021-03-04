import { useState, createContext, ReactNode } from 'react';

interface ChallengesProviderProps {
    children: ReactNode;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider ({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    
    function levelUp() {
        setLevel(function(prevLevel) {
            return (prevLevel + 1);
        })
    }

    function startNewChallenge() {
        console.log(`[new challenge]`);
    }


    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge
            }}
        >
            { children }
        </ChallengesContext.Provider>
    );
}
