import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './revenus-chart.component.html',
  styleUrls: ['./revenus-chart.component.scss'],
})
export class RevenueChartComponent implements OnInit {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() title: string = "Évolution du Chiffre d'Affaires";

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (typeof value === 'number') {
              return '€' + value.toLocaleString('fr-FR');
            }
            return value;
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return (
              "Chiffre d'affaires: €" + context.parsed.y.toLocaleString('fr-FR')
            );
          },
        },
      },
    },
  };

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: 'transparent',
        borderColor: '#7C614F',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  ngOnInit() {
    // Utiliser les données d'entrée ou des données par défaut basées sur l'image
    this.lineChartData.labels = this.labels.length
      ? this.labels
      : [
          'Jan',
          'Fév',
          'Mar',
          'Avr',
          'Mai',
          'Juin',
          'Juil',
          'Août',
          'Sep',
          'Oct',
        ];

    this.lineChartData.datasets[0].data = this.data.length
      ? this.data
      : [16000, 12000, 8000, 4000, 0, 12000, 14000, 11000, 9000, 13000];
  }
}
