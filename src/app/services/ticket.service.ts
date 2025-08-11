import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  id: number;
  title: string;
  status: string;
  assignee: string;
  description:string
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = '/api/tickets';
  private usersUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  assignTicket(id: number, assignee: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/assign`, { assignee });
  }

  completeTicket(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/complete`, {});
  }
  updateStatus(id: number, status: string) {
  

  if (status === 'completed') {
    return this.http.post(`/api/tickets/${id}/complete`, {});
  } else if (status === 'in-progress') {
    // You may want to create an API endpoint to update status like this:
    return this.http.post(`/api/tickets/${id}/status`, { status });
  } else {
    throw new Error('Unsupported status update');
  }
}
getTicketById(id: number) {
  return this.http.get<any>(`/api/tickets/${id}`);
}
updateTicket(ticket: any) {
  return this.http.put(`/api/tickets/${ticket.id}`, ticket);
}

}