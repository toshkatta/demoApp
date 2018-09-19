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

  private sneakers: Sneaker[]
  private apiUrl:string = API_URL

  private loadSneakers() {
    this.sneakerService.getSneakers()
      .subscribe(resp => {
        console.log('zaredi sneakers: ', resp)
        this.sneakers = resp
      })
  }

  ngOnInit() {
    this.loadSneakers()
  }

}
