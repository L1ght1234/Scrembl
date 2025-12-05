import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SignalRService } from './SignalRService';
import { useSignalR } from './useSignalR';

interface SignalRContextType {
  service: SignalRService | null;
  isConnected: boolean;
  connectionId: string | null;
}

const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

interface SignalRProviderProps {
  children: ReactNode;
  url: string;
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({ children, url }) => {
  const [service] = useState(() => new SignalRService(url));
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState<string | null>(null);

  useEffect(() => {
    const connect = async () => {
      try {
        await service.start();
        setIsConnected(true);
        setConnectionId(service.connectionId);

        service.on('ConnectionStateChanged', (state: string) => {
          setIsConnected(state === 'Connected');
          setConnectionId(service.connectionId);
        });
      } catch (error) {
        console.error('Failed to connect to SignalR:', error);
        setIsConnected(false);
      }
    };

    connect();

    return () => {
      service.stop();
    };
  }, [service]);

  return (
    <SignalRContext.Provider value={{ service, isConnected, connectionId }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalRContext = (): SignalRContextType => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSignalRContext must be used within SignalRProvider');
  }
  return context;
};

