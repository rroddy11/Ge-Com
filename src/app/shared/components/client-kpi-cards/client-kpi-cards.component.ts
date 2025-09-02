// kpi-cards.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUsers,
  faUserTie,
  faStar,
  faEuroSign,
  faBox,
  faChartLine,
  faCheckCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './client-kpi-cards.component.html',
  styleUrl: './client-kpi-cards.component.scss',
})
export class ClientKpiCardsComponent {
  @Input() cards: any[] = [];

  // Icones
  faUsers = faUsers;
  faUserTie = faUserTie;
  faStar = faStar;
  faEuroSign = faEuroSign;
  faBox = faBox;
  faChartLine = faChartLine;
  faCheckCircle = faCheckCircle;
  faExclamationTriangle = faExclamationTriangle;
}
