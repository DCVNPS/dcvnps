import { Injectable } from '@angular/core';
import { AdminLevel } from '../../shared/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminlevelDataService {

  private adminLevels$: Array<AdminLevel> = [];
  constructor() { }
  get AdminLevels() {
    return this.adminLevels$;
  }

  set AdminLevels(admLvls: Array<AdminLevel>) {
    if (admLvls) {
      this.adminLevels$ = admLvls;
    }
  }
}
