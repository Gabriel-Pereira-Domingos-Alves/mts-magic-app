import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface DamageEntry {
  sourceId: number;
  targetId: number;
  damage: number;
}

interface CommanderContextType {
  sendEvent: (eventName: string, index: number, payload?: any) => void;
  onEvent: (eventName: string, callback: (index: number, payload?: any) => void) => void;
  commanderActionDamage: DamageEntry[];
  updateCommanderActionDamage: (sourceId: number, targetId: number, damage: number) => void;
  resetCommanderActionDamage: () => void;
  startProcessing: () => void;
  finishProcessing: () => void;
  processingCount: number; // Aqui está o contador
}

const CommanderContext = createContext<CommanderContextType>({
  sendEvent: () => {},
  onEvent: () => {},
  commanderActionDamage: [],
  updateCommanderActionDamage: () => {},
  resetCommanderActionDamage: () => {},
  startProcessing: () => {},
  finishProcessing: () => {},
  processingCount: 0, // Inicialização do contador
});

export const useCommander = () => useContext(CommanderContext);

interface CommanderProviderProps {
  children: ReactNode;
}

export const CommanderProvider: React.FC<CommanderProviderProps> = ({ children }) => {
  const [listeners, setListeners] = useState<{ eventName: string; callback: (index: number, payload?: any) => void; }[]>([]);
  const [commanderActionDamage, setCommanderActionDamage] = useState<DamageEntry[]>([]);
  const [processingCount, setProcessingCount] = useState(0);

  const sendEvent = useCallback((eventName: string, index: number, payload?: any) => {
    listeners.forEach((listener) => {
      if (listener.eventName === eventName) {
        listener.callback(index, payload);
      }
    });
  }, [listeners]);

  const onEvent = useCallback((eventName: string, callback: (index: number, payload?: any) => void) => {
    setListeners((prevListeners) => [
      ...prevListeners,
      { eventName, callback },
    ]);
  }, []);

//   const updateCommanderActionDamage = (sourceId: number, targetId: number, damage: number) => {
//     setCommanderActionDamage((prevDamage) => {
//       const existingEntry = prevDamage.find(
//         (entry) => entry.sourceId === sourceId && entry.targetId === targetId
//       );
//       if (existingEntry) {
//         return prevDamage.map((entry) =>
//           entry.sourceId === sourceId && entry.targetId === targetId
//             ? { ...entry, damage: entry.damage + damage }
//             : entry
//         );
//       } else {
//         return [...prevDamage, { sourceId, targetId, damage }];
//       }
//     });
//   };
  
  const updateCommanderActionDamage = (sourceId: number, targetId: number, damage: number) => {
    setCommanderActionDamage((prevDamage) => {
      const existingEntry = prevDamage.find(
        (entry) => entry.sourceId === sourceId && entry.targetId === targetId
      );
      if (existingEntry) {
        return prevDamage.map((entry) =>
          entry.sourceId === sourceId && entry.targetId === targetId
            ? { ...entry, damage }
            : entry
        );
      } else {
        return [...prevDamage, { sourceId, targetId, damage }];
      }
    });
  };

  const resetCommanderActionDamage = () => {
    setCommanderActionDamage([]);
  };

  const startProcessing = () => {
    setProcessingCount((prevCount) => prevCount + 1);
  };

  const finishProcessing = () => {
    setProcessingCount((prevCount) => prevCount - 1);
  };

  return (
    <CommanderContext.Provider value={{
      sendEvent,
      onEvent,
      commanderActionDamage,
      updateCommanderActionDamage,
      resetCommanderActionDamage,
      startProcessing,
      finishProcessing,
      processingCount, // Incluindo o contador no contexto
    }}>
      {children}
    </CommanderContext.Provider>
  );
};
