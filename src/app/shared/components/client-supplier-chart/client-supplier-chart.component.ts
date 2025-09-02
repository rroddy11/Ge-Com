// chart.component.ts
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-supplier-chart.component.html',
  styleUrl: './client-supplier-chart.component.scss',
})
export class ClientSupplierChartComponent implements OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() title: string = '';
  @Input() type: 'bar' | 'line' | 'pie' | 'doughnut' = 'bar';
  @Input() data: any;
  @Input() options: any = {};
  @Input() height: string = '300px';

  private chart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['type'] || changes['options']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.chartCanvas && this.data) {
      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: this.type,
        data: this.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
          ...this.options,
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
