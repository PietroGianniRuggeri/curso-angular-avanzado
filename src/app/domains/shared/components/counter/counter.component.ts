import {
  Component,
  input,
  signal,
  OnInit,
  AfterViewInit,
  OnDestroy,
  effect,
  computed,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
})
export class CounterComponent implements OnInit, AfterViewInit, OnDestroy {
  $duration = input.required<number>({ alias: 'duration' });
  $doubleDuration = computed(() => this.$duration() * 2);
  $message = input.required<string>({ alias: 'message' });
  $counter = signal(0);
  counterRef: number | null = null;

  constructor() {
    // NO ASYNC
    // before render
    // una vez
    console.log('constructor');
    console.log('-'.repeat(10));
    effect(() => {
      this.$duration();
      this.doSomething();
    });

    effect(() => {
      this.$message();
      this.doSomethingTwo();
    });

    /* after render Sirve para ejecutar código después de que se haya pintado el componente */
    afterNextRender(() => {
      this.counterRef = window.setInterval(() => {
        console.log('run interval');
        this.$counter.update(statePrev => statePrev + 1);
      }, 1000);
    });
  }

  ngOnInit() {
    // after render
    // una vez
    // async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.$duration());
    console.log('message =>', this.$message());
  }

  ngAfterViewInit() {
    // after render
    // hijos ya fueron pintandos
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    if (this.counterRef) {
      window.clearInterval(this.counterRef);
    }
  }

  doSomething() {
    console.log('change duration');
    // async
  }

  doSomethingTwo() {
    console.log('change duration');
    // async
  }
}
