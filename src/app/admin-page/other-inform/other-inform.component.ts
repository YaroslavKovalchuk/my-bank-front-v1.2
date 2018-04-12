import { Component, OnInit } from '@angular/core';
import { Country } from '../../models/country';
import { City } from '../../models/citi';
import { CityService } from '../../serive/city.service';
import { CountryService } from '../../serive/country.service';

@Component({
  selector: 'app-other-inform',
  templateUrl: './other-inform.component.html',
  styleUrls: ['./other-inform.component.css']
})
export class OtherInformComponent implements OnInit {

  countries:Country[];
  countryName:string;

  constructor(private cityService:CityService, private countryService:CountryService) { }

  ngOnInit() {
    this.getCounries();
 
  }

  getCounries(){
    this.countryService.getCountries()
    .subscribe(countries => this.countries = countries);
  }

  addCountry(e){
    e.preventDefault();
    var name = e.target.elements[0].value;
    this.countryService.saveCountry({name} as Country)
    .subscribe(()=>{
                    this.getCounries();
                  });
  }

  addCity(e){
    e.preventDefault();
    var name =      e.target.elements[0].value;
    var idCountry = e.target.elements[1].value;
    this.cityService.saveCity({name,idCountry} as City)
    .subscribe(()=>{});
  }

  selectCountry(nameCountry:string){
    this.countryName = nameCountry;
  }
}
