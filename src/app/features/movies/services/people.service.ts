import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
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

  async getPeople(urls: string[]): Promise<(Person | null)[]> {
    if (urls.length === 0) return [];

    const promises = urls.map(async (url) => {
      try {
        return await firstValueFrom(this.http.get<Person>(url));
      } catch (error) {
        console.error(`Failed to fetch ${url}`, error);
        return null;
      }
    });

    return Promise.all(promises);
  }
}
