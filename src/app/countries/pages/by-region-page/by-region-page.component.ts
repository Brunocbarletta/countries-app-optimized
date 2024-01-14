import { Component, inject } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  private countriesServices = inject(CountriesService);

  searchByRegion(term: string) {
    this.countriesServices.searchRegion(term)
    .subscribe(countries => {
      this.countries = countries;
    })
  }
}
