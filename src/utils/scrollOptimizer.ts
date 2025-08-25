class ScrollOptimizer {
  private listeners: Map<string, { callback: () => void; isActive: boolean }> = new Map();
  private isListening = false;
  private rafId: number | null = null;

  private handleScroll = () => {
    if (this.rafId) return;
    
    this.rafId = requestAnimationFrame(() => {
      // Only execute callbacks for components that are active (in viewport)
      this.listeners.forEach(({ callback, isActive }) => {
        if (isActive) {
          callback();
        }
      });
      this.rafId = null;
    });
  };

  addListener(id: string, callback: () => void, isActive = true) {
    this.listeners.set(id, { callback, isActive });
    
    if (!this.isListening) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      this.isListening = true;
    }
  }

  updateListener(id: string, isActive: boolean) {
    const listener = this.listeners.get(id);
    if (listener) {
      listener.isActive = isActive;
    }
  }

  removeListener(id: string) {
    this.listeners.delete(id);
    
    if (this.listeners.size === 0 && this.isListening) {
      window.removeEventListener('scroll', this.handleScroll);
      this.isListening = false;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    }
  }

  // Disable all scroll listeners when not needed
  pauseAll() {
    this.listeners.forEach((listener) => {
      listener.isActive = false;
    });
  }

  // Re-enable scroll listeners
  resumeAll() {
    this.listeners.forEach((listener) => {
      listener.isActive = true;
    });
  }
}

export const scrollOptimizer = new ScrollOptimizer();