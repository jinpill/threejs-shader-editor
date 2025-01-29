const TIMEOUT_DURATION = 1000;

export class HistoryManager<T> {
  private history: T[] = [];
  private currentIndex = -1;
  private timeoutId: NodeJS.Timeout | null = null;
  private readonly maxLength: number;

  constructor(maxLength: number) {
    this.maxLength = maxLength;
  }

  public push = (state: T) => {
    if (this.current === state) return;
    this.history = this.history.slice(0, this.currentIndex + 1);

    if (typeof this.timeoutId === "number") {
      this.history[this.currentIndex] = state;
      window.clearTimeout(this.timeoutId);
    } else {
      if (this.history.length === this.maxLength) {
        this.history.shift();
      }

      this.history.push(state);
      this.currentIndex = this.history.length - 1;
    }

    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
    }, TIMEOUT_DURATION);
  };

  private clearTimeout = () => {
    if (typeof this.timeoutId !== "number") return;
    window.clearTimeout(this.timeoutId);
    this.timeoutId = null;
  };

  public get isUndoAvailable() {
    return this.currentIndex > 0;
  }

  public get isRedoAvailable() {
    return this.currentIndex < this.history.length - 1;
  }

  public get current() {
    return this.history[this.currentIndex] ?? null;
  }

  public update = (state: T) => {
    if (this.current === null) return;
    if (this.current === state) return;
    this.history[this.currentIndex] = state;
  };

  public undo = () => {
    this.clearTimeout();

    if (this.isUndoAvailable) {
      this.currentIndex--;
      return this.current;
    } else {
      return null;
    }
  };

  public redo = () => {
    this.clearTimeout();

    if (this.isRedoAvailable) {
      this.currentIndex++;
      return this.current;
    } else {
      return null;
    }
  };

  public get length() {
    return this.history.length;
  }
}
