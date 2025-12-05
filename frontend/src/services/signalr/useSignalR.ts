import { useSignalRContext } from './SignalRContext';
import { useEffect } from 'react';

export const useSignalR = () => {
  const { service, isConnected, connectionId } = useSignalRContext();

  const on = <T = any>(methodName: string, callback: (data: T) => void) => {
    if (service) {
      service.on(methodName, callback);
    }
  };

  const off = (methodName: string, callback?: (...args: any[]) => void) => {
    if (service) {
      service.off(methodName, callback);
    }
  };

  const invoke = async <T = any>(methodName: string, ...args: any[]): Promise<T> => {
    if (!service) {
      throw new Error('SignalR service not available');
    }
    return await service.invoke<T>(methodName, ...args);
  };

  return {
    service,
    isConnected,
    connectionId,
    on,
    off,
    invoke,
  };
};

