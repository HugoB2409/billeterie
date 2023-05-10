import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent implements OnInit {
  private _eventForm?: FormGroup = undefined;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService) { }

  public ngOnInit(): void {
    this._eventForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      options: this.formBuilder.array([]),
    });
  }

  public addOption(): void {
    const option = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.options.push(option);
  }

  public removeOption(i: number): void {
    this.options.removeAt(i);
  }

  public async saveEvent(): Promise<void> {
    if (!this._eventForm) return;
    this._eventForm.value.date = this._eventForm?.value.date.toString();
    await this.eventService.create(this._eventForm?.value);
    this.router.navigate(['/']);
  }

  public get options(): FormArray {
    return this._eventForm?.get('options') as FormArray;
  }

  public get eventForm(): FormGroup | undefined {
    return this._eventForm;
  }
}
