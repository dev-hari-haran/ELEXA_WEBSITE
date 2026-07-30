class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, rate: number = 1.0, onBoundary?: (charIndex: number) => void, onEnd?: () => void) {
    if (!this.synth) return;

    this.stop();

    // Strip HTML tags for clean reading
    const cleanText = text.replace(/<[^>]*>?/gm, '');

    this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance.rate = rate;
    this.currentUtterance.pitch = 1.0;

    if (onBoundary) {
      this.currentUtterance.onboundary = (event) => {
        if (event.name === 'word') {
          onBoundary(event.charIndex);
        }
      };
    }

    if (onEnd) {
      this.currentUtterance.onend = onEnd;
    }

    this.synth.speak(this.currentUtterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking && !this.synth.paused);
  }
}

export const speechService = new SpeechService();
