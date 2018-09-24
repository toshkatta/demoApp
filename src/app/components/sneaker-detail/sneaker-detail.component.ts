import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SneakerService } from '../../services/sneaker.service';
import { Sneaker } from '../../sneaker';
import { API_URL } from '../../services/auth.service';

@Component({
  selector: 'app-sneaker-detail',
  templateUrl: './sneaker-detail.component.html',
  styleUrls: ['./sneaker-detail.component.css']
})
export class SneakerDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location, private sneakerService: SneakerService) { }

  private apiUrl: string = API_URL
  private sneaker

  private getSneaker() {
    const id = +this.route.snapshot.paramMap.get('id')
    this.sneakerService.getSneakerById(id).subscribe(resp => {
      this.sneaker = resp
      this.sneaker.sizes = resp.sizes.map(size => size.eu).join(', ')
    })
  }

  ngOnInit() {
    this.getSneaker()
  }

}
