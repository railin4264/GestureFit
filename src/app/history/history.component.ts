import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  exerciseHistory = [
    { date: '2023-05-20', exercise: 'Flexiones', repetitions: 20, time: 60, calories: 6 },
    { date: '2023-05-19', exercise: 'Sentadillas', repetitions: 15, time: 45, calories: 5 },
    // Aquí se agregarían más entradas del historial
  ];
}