import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Accelerometer, AccelerometerData } from '@nativescript/core/ui/accelerometer';
import { Gyroscope, GyroscopeData } from '@nativescript/core/ui/gyroscope';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent implements OnInit, OnDestroy {
  currentExercise = 'Flexiones';
  repetitions = 0;
  elapsedTime = 0;
  caloriesBurned = 0;
  
  private accelerometer: Accelerometer;
  private gyroscope: Gyroscope;
  private timer: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startExercise();
  }

  ngOnDestroy() {
    this.stopSensors();
    clearInterval(this.timer);
  }

  startExercise() {
    this.startAccelerometer();
    this.startGyroscope();
    this.startTimer();
  }

  startAccelerometer() {
    this.accelerometer = new Accelerometer();
    this.accelerometer.startUpdates((data: AccelerometerData) => {
      this.processAccelerometerData(data);
    });
  }

  startGyroscope() {
    this.gyroscope = new Gyroscope();
    this.gyroscope.startUpdates((data: GyroscopeData) => {
      this.processGyroscopeData(data);
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.elapsedTime++;
      this.caloriesBurned = Math.round(this.elapsedTime * 0.1);
    }, 1000);
  }

  processAccelerometerData(data: AccelerometerData) {
    // Lógica para detectar repeticiones basadas en datos del acelerómetro
    if (data.z < -0.8) {
      this.repetitions++;
    }
  }

  processGyroscopeData(data: GyroscopeData) {
    // Lógica para mejorar la precisión de la detección de repeticiones
    // usando datos del giroscopio
  }

  stopSensors() {
    if (this.accelerometer) {
      this.accelerometer.stopUpdates();
    }
    if (this.gyroscope) {
      this.gyroscope.stopUpdates();
    }
  }

  finishExercise() {
    this.stopSensors();
    clearInterval(this.timer);
    // Aquí podrías guardar los datos del ejercicio
    this.router.navigate(['/home']);
  }
}