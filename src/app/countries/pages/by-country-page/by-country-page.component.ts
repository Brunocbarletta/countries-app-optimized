import { Component, OnInit, inject } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  
  public initialValue: string = '';
  public countries: Country[] = [];
  private countriesServices = inject(CountriesService);
  
  ngOnInit(): void {
    this.initialValue = this.countriesServices.cacheStore.byCountries.term;
    this.countries = this.countriesServices.cacheStore.byCountries.countries;
  }

  searchByName(term: string) {
    this.countriesServices.searchCountry(term)
    .subscribe(countries => {
      this.countries = countries;
    })
  }
}
