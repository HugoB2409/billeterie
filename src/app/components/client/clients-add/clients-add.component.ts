import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.scss'],
})
export class ClientsAddComponent implements OnInit {
  client: Client = new Client();
  clientForm?: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  saveClient(): void {
    if (this.clientForm) {
      this.clientService.create(this.clientForm?.value).then(() => {
        this.router.navigate(['/clients']);
      });
    }
  }
}
