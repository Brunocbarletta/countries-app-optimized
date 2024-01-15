import { Component, inject } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Ocenia';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Ocenia'];
  public selectedRegion?: Region;
  private countriesServices = inject(CountriesService);

  searchByRegion(term: Region): void {
    this.selectedRegion = term;
    this.countriesServices.searchRegion(term)
    .subscribe(countries => {
      this.countries = countries;
    })
  }
}
