import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
ticket: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private spinner:NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getTicketById(id).subscribe((ticket) => {
      this.ticket = ticket;
      this.spinner.hide();
    });
  }

  goBack() {
    this.router.navigate(['/tickets']);
  }
}
