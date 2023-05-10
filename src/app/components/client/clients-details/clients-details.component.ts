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
  private _clientForm?: FormGroup = undefined;
  private _client?: Client = undefined;
  private _key: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private dialog: MatDialog) { }

  public ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this._key = paramMap.get('key');
      if (!this._key) return;
      this.clientService.get(this._key).subscribe((data) => {
        this._client = data;
        this._clientForm = this.formBuilder.group({
          firstname: [this._client?.firstname, [Validators.required]],
          lastname: [this._client?.lastname, [Validators.required]],
          address: [this._client?.address, [Validators.required]],
          phoneNumber: [this._client?.phoneNumber, [Validators.required]],
        });
      });
    });
  }

  public async modifyClient(): Promise<void> {
    if (!this._key || !this._clientForm) return;
    await this.clientService.update(this._key, this._clientForm?.value);
    this.router.navigate(['/clients']);
  }

  public async deleteClient(): Promise<void> {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (!result || !this._key) return;
      await this.clientService.delete(this._key);
      this.router.navigate(['/clients']);
    });
  }

  public get clientForm(): FormGroup | undefined {
    return this._clientForm;
  }
}
