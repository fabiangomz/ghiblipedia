import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, forkJoin, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../interfaces/person.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private http = inject(HttpClient);

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${baseUrl}/people/${id}`);
  }
  getPeople(urls: string[]): Observable<(Person | null)[]> {
    if (urls.length === 0) return of([]);

    const requests = urls.map((url) =>
      this.http.get<Person>(url).pipe(catchError(() => of(null)))
    );

    return forkJoin(requests);
  }
}
