import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.module';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //url da api
  private url:string = 'http://localhost:8080/'

  constructor(private http: HttpClient) {
    console.log('HttpClient foi injetado:', this.http);
  }

  //Get all clients
  public selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  cadatrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, obj);
  }

  editar(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url, obj);
  }

  remover(codigo:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + codigo);
  }
}
