import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent implements OnInit {
  event: Event = new Event();
  eventForm?: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      options: this.formBuilder.array([]),
    });
  }

  addOption() {
    const option = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.options.push(option);
  }

  removeOption(i: number) {
    this.options.removeAt(i);
  }

  get options() {
    return this.eventForm?.get('options') as FormArray;
  }

  saveEvent(): void {
    if (this.eventForm) {
      this.eventForm.value.date = this.eventForm?.value.date.toString();
      this.eventService.create(this.eventForm?.value).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
