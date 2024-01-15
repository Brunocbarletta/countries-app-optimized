import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  constructor(private countriesService: CountriesService) {

  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(term)
    .subscribe((capitals) => {
      this.countries = capitals;
      this.isLoading = false;
    });
  }
}
