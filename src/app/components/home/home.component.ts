import { Component, OnInit } from '@angular/core'
import { Sneaker } from '../../sneaker'
import { SneakerService } from '../../services/sneaker.service'
import { API_URL } from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sneakerService: SneakerService) { }

  private sneakers
  private apiUrl: string = API_URL

  private loadSneakers() {
    this.sneakerService.getSneakers()
      .subscribe(resp => {
        this.sneakers = resp
        for (let sneaker of this.sneakers) {
          sneaker.sizes = sneaker.sizes.map(size => size.eu).join(', ')
        }
      })
  }

  ngOnInit() {
    this.loadSneakers()
  }

}
