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
  private _eventForm?: FormGroup = undefined;
  private _event?: Event = undefined;
  private _key: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this._key = paramMap.get('key');
      if (!this._key) return;
      this.eventService.get(this._key).subscribe((data) => {
        this._event = data;
        this._eventForm = this.formBuilder.group({
          title: [this._event?.title, [Validators.required]],
          date: [new Date(this._event.date ?? ''), [Validators.required]],
          options: this.formBuilder.array(this.initializeOptions()),
        });
      });
    });
  }

  private initializeOptions(): FormGroup[] {
    if (!this._event?.options) return [];
    return this._event.options.map((option) =>
      this.formBuilder.group({
        name: [option.name, [Validators.required]],
        price: [option.price, [Validators.required]],
      })
    );
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

  public async modifyEvent(): Promise<void> {
    if (!this._key || !this._eventForm) return;
    this._eventForm.value.date = this._eventForm?.value.date.toString();
    await this.eventService.update(this._key, this._eventForm?.value);
    this.router.navigate(['/']);
  }

  public delete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result || !this._key) return;
      this.eventService.delete(this._key);
      this.router.navigate(['/']);
    });
  }

  public get options(): FormArray {
    return this._eventForm?.get('options') as FormArray;
  }

  public get eventForm(): FormGroup | undefined {
    return this._eventForm;
  }
}
