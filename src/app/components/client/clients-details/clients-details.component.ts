import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.scss'],
})
export class ClientsDetailsComponent {
  client?: Client | null;
  key?: string | null;
  clientForm?: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.key = paramMap.get('key');
      if (this.key) {
        this.clientService.get(this.key).subscribe((data) => {
          this.client = data;

          this.clientForm = this.formBuilder.group({
            firstname: [this.client?.firstname, [Validators.required]],
            lastname: [this.client?.lastname, [Validators.required]],
            address: [this.client?.address, [Validators.required]],
            phoneNumber: [this.client?.phoneNumber, [Validators.required]],
          });
        });
      }
    });
  }

  modifyClient(): void {
    if (this.key && this.clientForm) {
      this.clientService.update(this.key, this.clientForm?.value).then(() => {
        this.router.navigate(['/clients']);
      });
    }
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.key) {
        this.clientService.delete(this.key);
        this.router.navigate(['/clients']);
      }
    });
  }
}
