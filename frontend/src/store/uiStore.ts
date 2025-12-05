import React from 'react';

interface UIState {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  isLoading: boolean;
  error: string | null;
  sidebarOpen: boolean;
}

interface UIStore {
  uiState: UIState;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  resetUI: () => void;
}

const initialState: UIState = {
  isModalOpen: false,
  modalContent: null,
  isLoading: false,
  error: null,
  sidebarOpen: false,
};

// Simple store implementation - can be replaced with Zustand
class UIStoreImpl implements UIStore {
  private state: UIState = { ...initialState };
  private listeners: Set<() => void> = new Set();

  get uiState(): UIState {
    return this.state;
  }

  openModal(content: React.ReactNode): void {
    this.state = {
      ...this.state,
      isModalOpen: true,
      modalContent: content,
    };
    this.notify();
  }

  closeModal(): void {
    this.state = {
      ...this.state,
      isModalOpen: false,
      modalContent: null,
    };
    this.notify();
  }

  setLoading(isLoading: boolean): void {
    this.state = { ...this.state, isLoading };
    this.notify();
  }

  setError(error: string | null): void {
    this.state = { ...this.state, error };
    this.notify();
  }

  toggleSidebar(): void {
    this.state = {
      ...this.state,
      sidebarOpen: !this.state.sidebarOpen,
    };
    this.notify();
  }

  setSidebarOpen(open: boolean): void {
    this.state = { ...this.state, sidebarOpen: open };
    this.notify();
  }

  resetUI(): void {
    this.state = { ...initialState };
    this.notify();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const uiStore = new UIStoreImpl();

// Hook to use the store
export const useUIStore = () => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    const unsubscribe = uiStore.subscribe(() => {
      forceUpdate();
    });
    return unsubscribe;
  }, []);

  return {
    uiState: uiStore.uiState,
    openModal: uiStore.openModal.bind(uiStore),
    closeModal: uiStore.closeModal.bind(uiStore),
    setLoading: uiStore.setLoading.bind(uiStore),
    setError: uiStore.setError.bind(uiStore),
    toggleSidebar: uiStore.toggleSidebar.bind(uiStore),
    setSidebarOpen: uiStore.setSidebarOpen.bind(uiStore),
    resetUI: uiStore.resetUI.bind(uiStore),
  };
};

