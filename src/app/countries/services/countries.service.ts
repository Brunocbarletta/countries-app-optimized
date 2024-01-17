import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { Region } from '../interfaces/region.type';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byRegion: {region: '', countries: []},
    byCountries: {term: '', countries: []}
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage () {
    localStorage.setItem("cacheStore", JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage () {
    const item = localStorage.getItem('cacheStore');
    if (!item) return;
    this.cacheStore = JSON.parse(item);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError((_err: HttpErrorResponse) => of<Country[]>([]))
      // delay(1000) //Este delay quedo obsoleto tras cambiar el evento por (keyup) e implementar el 'debounce' en shared-search-box
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map(countries =>  countries.length > 0 ? countries[0] : null),
      catchError((_err: HttpErrorResponse) => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap((countries) => { this.cacheStore.byCapital = {term, countries}}),
      tap(() => {this.saveToLocalStorage()})
    );
  }

  searchCountry(term: string):  Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap((countries) => { this.cacheStore.byCountries = {term, countries}}),
      tap(() => {this.saveToLocalStorage()})
      );
  }
  
  searchRegion(region: Region):  Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap((countries) => { this.cacheStore.byRegion = {region, countries}}),
      tap(() => {this.saveToLocalStorage()})
    );
  }
}


