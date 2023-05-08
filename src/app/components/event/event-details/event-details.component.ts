import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  event?: Event | null;
  key?: string | null;
  eventForm?: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.key = paramMap.get('key');
      if (this.key) {
        this.eventService.get(this.key).subscribe((data) => {
          this.event = data;

          this.eventForm = this.formBuilder.group({
            title: [this.event?.title, [Validators.required]],
            date: [new Date(this.event?.date ?? ''), [Validators.required]],
            options: this.formBuilder.array(this.initializeOptions()),
          });
        });
      }
    });
  }

  initializeOptions() {
    if (this.event?.options) {
      return this.event.options.map((option) => {
        return this.formBuilder.group({
          name: [option.name, [Validators.required]],
          price: [option.price, [Validators.required]],
        });
      });
    }
    return [];
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

  modifyEvent(): void {
    if (this.key && this.eventForm) {
      this.eventForm.value.date = this.eventForm?.value.date.toString();
      this.eventService.update(this.key, this.eventForm?.value).then(() => {
        this.router.navigate(['/']);
      });
    }
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.key) {
        this.eventService.delete(this.key);
        this.router.navigate(['/']);
      }
    });
  }
}
