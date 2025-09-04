import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-top-products-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './top-products-chart.component.html',
  styleUrls: ['./top-products-chart.component.scss'],
})
export class TopProductsChartComponent implements OnInit {
  @Input() products: string[] = [];
  @Input() sales: number[] = [];
  @Input() title: string = 'Produits les Plus Vendus';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Pour les barres horizontales
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 65,
        },
      },
      y: {
        grid: {
          display: false,
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
            return `Ventes: ${context.parsed.x} unités`;
          },
        },
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: '#8EA223',
        borderColor: '#8EA223',
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: '#7C614F',
        hoverBorderColor: '#7C614F',
      },
    ],
  };

  ngOnInit() {
    this.barChartData.labels = this.products.length
      ? this.products
      : [
          'Tomates Fraîches',
          'Œufs Bio (Douzaine)',
          'Lait de Ferme',
          'Pommes de Terre',
          'Miel Local',
        ];

    this.barChartData.datasets[0].data = this.sales.length
      ? this.sales
      : [260, 195, 130, 65, 45];
  }
}
