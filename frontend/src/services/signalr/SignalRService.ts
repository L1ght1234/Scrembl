import * as signalR from '@microsoft/signalr';

export class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async start(): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      return;
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.url)
      .withAutomaticReconnect()
      .build();

    try {
      await this.connection.start();
      console.log('SignalR Connected');
    } catch (error) {
      console.error('SignalR Connection Error:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }

  on<T = any>(methodName: string, callback: (data: T) => void): void {
    if (this.connection) {
      this.connection.on(methodName, callback);
    }
  }

  off(methodName: string, callback?: (...args: any[]) => void): void {
    if (this.connection) {
      this.connection.off(methodName, callback);
    }
  }

  async invoke<T = any>(methodName: string, ...args: any[]): Promise<T> {
    if (!this.connection) {
      throw new Error('SignalR connection not established');
    }
    return await this.connection.invoke<T>(methodName, ...args);
  }

  get state(): signalR.HubConnectionState {
    return this.connection?.state ?? signalR.HubConnectionState.Disconnected;
  }

  get connectionId(): string | null {
    return this.connection?.connectionId ?? null;
  }
}

