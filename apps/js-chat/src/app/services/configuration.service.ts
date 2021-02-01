import { Injectable } from '@angular/core';
import { httpClients } from '@js-chat/http-client';
import Axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  axios = Axios.create({ baseURL: environment.dataApiUrl });
  clients = httpClients(this.axios);

  constructor() {}

  setJWT(input: string) {
    this.axios.defaults.headers = {
      ...this.axios.defaults.headers,
      authorization: 'Bearer ' + input,
    };
  }
}
