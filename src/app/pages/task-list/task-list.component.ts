import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tickets: any[] = [];
  users: any[] = [];

  statusFilter = '';
  assigneeFilter = '';

  filteredTickets: any[] = [];

  constructor(private ticketService: TicketService,private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.loadTickets();
    this.ticketService.getUsers().subscribe(users => (this.users = users));
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data.map(t => ({
        ...t,
        status: t.status.toLowerCase(),
      }));
          
      this.spinner.hide();
      this.applyFilters();
    });
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    const statusFilterLower = this.statusFilter.toLowerCase();
    this.filteredTickets = this.tickets.filter((ticket:any) => {
      const matchesStatus = !this.statusFilter || ticket.status === statusFilterLower;
      const matchesAssignee = !this.assigneeFilter || ticket.assignee === this.assigneeFilter;
      return matchesStatus && matchesAssignee;
    });
  }

 assign(ticketId: number, assignee: string) {
  if (!assignee) return;

  this.spinner.show();

  this.ticketService.assignTicket(ticketId, assignee).subscribe({
    next: () => {
      const ticket = this.tickets.find(t => t.id === ticketId);
      if (ticket) {
        ticket.assignee = assignee;
        this.applyFilters();
      }

      this.spinner.hide();

      this.toastr.success(`This ticket is assigned to ${assignee} successfully!`, 'Success');
    },
    error: () => {
      this.spinner.hide();

      this.toastr.error('Failed to assign this ticket.', 'Error');
    }
  });
}

updateTicketStatus(ticketId: number, newStatus: string) {
  const ticket = this.tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  const updatedTicket = { ...ticket, status: newStatus.toLowerCase() };

  this.ticketService.updateTicket(updatedTicket).subscribe({
    next: () => {
      ticket.status = updatedTicket.status;
      this.applyFilters();

      // Hide loader
      this.spinner.hide();

      // Show success toast
      this.toastr.success('Ticket updated successfully!', 'Success');
    },
    error: () => {
      // Hide loader
      this.spinner.hide();

      // Show error toast
      this.toastr.error('Failed to update ticket.', 'Error');
    }
  });
}


  markInProgress(ticketId: number) {
    this.spinner.show();
    this.updateTicketStatus(ticketId, 'in-progress');
    
  }

  complete(ticketId: number) {
    this.spinner.show();
    this.updateTicketStatus(ticketId, 'completed');
  }
}
