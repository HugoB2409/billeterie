import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  private _events?: Event[] = undefined;
  private _columnsToDisplay: string[] = ['title', 'date'];

  constructor(private eventService: EventService) { }

  public ngOnInit(): void {
    this.eventService.getAll().subscribe((data) => {
      this._events = data;
    });
  }

  public get events(): Event[] | undefined {
    return this._events;
  }

  public get columnsToDisplay(): string[] {
    return this._columnsToDisplay;
  }
}
