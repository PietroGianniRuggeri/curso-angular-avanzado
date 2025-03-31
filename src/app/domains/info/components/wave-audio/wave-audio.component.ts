import { Component, ElementRef, ViewChild, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import WaveSurfer from 'wavesurfer.js';
import { afterNextRender } from '@angular/core';

@Component({
  selector: 'app-wave-audio',
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
})
export class WaveAudioComponent {
  readonly audioUrl = input.required<string>();
  @ViewChild('wave') container!: ElementRef;
  private ws!: WaveSurfer;
  isPlaying = signal(false);

  constructor() {
    afterNextRender(() => {
      this.ws = WaveSurfer.create({
        url: this.audioUrl(),
        container: this.container.nativeElement,
      });
      this.ws.on('play', () => this.isPlaying.set(true));
      this.ws.on('pause', () => this.isPlaying.set(false));
    });
  }

  playPause() {
    this.ws.playPause();
  }
}
