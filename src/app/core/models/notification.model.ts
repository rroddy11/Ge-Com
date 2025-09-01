import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Notification {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: IconDefinition;
}
