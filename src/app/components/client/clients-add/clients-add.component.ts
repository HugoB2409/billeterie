import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.scss'],
})
export class ClientsAddComponent implements OnInit {
  private _clientForm?: FormGroup = undefined;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService) { }

  public ngOnInit(): void {
    this._clientForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  public async saveClient(): Promise<void> {
    if (!this._clientForm) return;
    await this.clientService.create(this._clientForm?.value);
    this.router.navigate(['/clients']);
  }

  public get clientForm(): FormGroup | undefined {
    return this._clientForm;
  }
}
