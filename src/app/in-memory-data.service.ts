import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
   const tickets = [
  {
    id: 1,
    title: 'Fix login bug',
    status: 'Open',
    assignee: 'John Doe',
    category: 'Bug',
    description: 'Users are unable to log in due to a session timeout error.'
  },
  {
    id: 2,
    title: 'Update dashboard UI',
    status: 'In-Progress',
    assignee: 'Jane Smith',
    category: 'UI',
    description: 'Revamp dashboard with new charts and responsive design.'
  },
  {
    id: 3,
    title: 'Database optimization',
    status: 'Completed',
    assignee: 'Ali Khan',
    category: 'Performance',
    description: 'Improved query performance by adding indexes and optimizing joins.'
  },
  {
    id: 4,
    title: 'Add multi-language support',
    status: 'Open',
    assignee: '',
    category: 'Feature',
    description: 'Allow users to switch between English, Spanish, and French.'
  },
  {
    id: 5,
    title: 'Fix payment gateway timeout',
    status: 'In-Progress',
    assignee: 'Sara Ahmed',
    category: 'Bug',
    description: 'Resolve timeouts occurring during payment processing.'
  },
  {
    id: 6,
    title: 'Redesign user profile page',
    status: 'Open',
    assignee: 'Jane Smith',
    category: 'UI',
    description: 'Create a modern and clean layout for the user profile page.'
  },
  {
    id: 7,
    title: 'Implement audit logging',
    status: 'Completed',
    assignee: 'John Doe',
    category: 'Security',
    description: 'Log all user actions for security auditing.'
  },
  {
    id: 8,
    title: 'Improve load times on mobile',
    status: 'In-Progress',
    assignee: 'Ali Khan',
    category: 'Performance',
    description: 'Optimize images and lazy-load components for mobile users.'
  },
  {
    id: 9,
    title: 'Fix notification email formatting',
    status: 'Open',
    assignee: '',
    category: 'Bug',
    description: 'Emails are not displaying properly in Outlook.'
  },
  {
    id: 10,
    title: 'Setup automated backups',
    status: 'Completed',
    assignee: 'Sara Ahmed',
    category: 'Maintenance',
    description: 'Configure nightly backups for all databases.'
  },
];


    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Ali Khan' },
      { id: 4, name: 'Sara Ahmed' }
    ];

    return { tickets, users };
  }
}
