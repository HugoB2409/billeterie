import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  events?: Event[];
  columnsToDisplay = ['title', 'date'];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((data) => {
      this.events = data;
    });
  }
}
