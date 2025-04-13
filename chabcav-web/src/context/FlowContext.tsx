import { createContext, useContext, useState } from "react";

interface LessonContextType {
    chaptername: string;
    setChaptername: (value: string) => void;
    //showLogin: boolean;
    //setShowLogin: (value: boolean) => void;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const useLesson = () => {

    const context = useContext(LessonContext);
    if (!context) {
        throw new Error("useAuth must be used within an LessonProvider");
    }
    return context;

}

export const LessonProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [chaptername, setChaptername] = useState<string>("");

    return (
        <LessonContext.Provider value={{chaptername, setChaptername}}>
            {children}
        </LessonContext.Provider>
    );

}