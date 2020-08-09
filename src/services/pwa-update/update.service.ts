import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private readonly updates:SwUpdate, private readonly dialog:MatDialog) {
    this.updates.available.subscribe(event => {
      this.updates.activateUpdate().then(()=>document.location.reload())
    });
  }
}
