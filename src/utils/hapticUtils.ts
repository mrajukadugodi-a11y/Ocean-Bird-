// Haptic Pulse & Tactile Feedback Utility for Seafarer & Marine Operations

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'alert' | 'sos' | 'scan' | 'click';

class HapticEngine {
  private enabled: boolean = true;
  private intensity: 'subtle' | 'standard' | 'intense' = 'standard';
  private visualListeners: Array<(pattern: HapticPattern) => void> = [];

  constructor() {
    // Load persisted settings
    if (typeof window !== 'undefined') {
      const savedEnabled = localStorage.getItem('oceanbird_haptic_enabled');
      if (savedEnabled !== null) {
        this.enabled = savedEnabled === 'true';
      }
      const savedIntensity = localStorage.getItem('oceanbird_haptic_intensity');
      if (savedIntensity && ['subtle', 'standard', 'intense'].includes(savedIntensity)) {
        this.intensity = savedIntensity as any;
      }
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('oceanbird_haptic_enabled', String(val));
    }
  }

  public getIntensity() {
    return this.intensity;
  }

  public setIntensity(val: 'subtle' | 'standard' | 'intense') {
    this.intensity = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('oceanbird_haptic_intensity', val);
    }
  }

  public subscribeVisual(callback: (pattern: HapticPattern) => void) {
    this.visualListeners.push(callback);
    return () => {
      this.visualListeners = this.visualListeners.filter((cb) => cb !== callback);
    };
  }

  private notifyVisual(pattern: HapticPattern) {
    this.visualListeners.forEach((cb) => cb(pattern));
  }

  public trigger(pattern: HapticPattern = 'light') {
    if (!this.enabled) return;

    // Trigger visual ripple listener
    this.notifyVisual(pattern);

    if (!this.isSupported()) return;

    const scale = this.intensity === 'subtle' ? 0.6 : this.intensity === 'intense' ? 1.5 : 1.0;

    let vibrationSequence: number[] = [];

    switch (pattern) {
      case 'click':
        vibrationSequence = [Math.round(20 * scale)];
        break;
      case 'light':
        vibrationSequence = [Math.round(35 * scale)];
        break;
      case 'medium':
        vibrationSequence = [Math.round(65 * scale)];
        break;
      case 'heavy':
        vibrationSequence = [Math.round(110 * scale)];
        break;
      case 'scan':
        vibrationSequence = [Math.round(40 * scale), Math.round(30 * scale), Math.round(80 * scale)];
        break;
      case 'success':
        vibrationSequence = [Math.round(40 * scale), Math.round(50 * scale), Math.round(120 * scale)];
        break;
      case 'alert':
        vibrationSequence = [
          Math.round(100 * scale),
          Math.round(40 * scale),
          Math.round(100 * scale),
          Math.round(40 * scale),
          Math.round(180 * scale)
        ];
        break;
      case 'sos':
        vibrationSequence = [
          Math.round(200 * scale),
          Math.round(100 * scale),
          Math.round(200 * scale),
          Math.round(100 * scale),
          Math.round(450 * scale)
        ];
        break;
      default:
        vibrationSequence = [Math.round(30 * scale)];
    }

    try {
      navigator.vibrate(vibrationSequence);
    } catch (e) {
      // Ignore vibration errors on un-interacted DOMs
    }
  }
}

export const hapticEngine = new HapticEngine();
