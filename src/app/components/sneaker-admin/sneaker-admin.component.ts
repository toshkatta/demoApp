import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BrandService } from '../../services/brand.service'
import { NameId } from '../../sneaker'
import { SneakerService } from '../../services/sneaker.service'
import { FileUploader } from 'ng2-file-upload'
import { API_URL } from '../../services/auth.service'

const AVAILABLE_SIZES = [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 40, 41, 41.5, 42, 42.5, 43, 44, 45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 50, 51]
const INVALID_FORM_MESSAGE = "Make sure that you have added at least one image, selected a brand from the list, added a model name, selected low or high-top, men's or women's and selected at least one available size."

@Component({
  selector: 'app-sneaker-admin',
  templateUrl: './sneaker-admin.component.html',
  styleUrls: ['./sneaker-admin.component.css']
})
export class SneakerAdminComponent implements OnInit {

  constructor(private brandService: BrandService, private sneakerService: SneakerService) {
    this.uploader = new FileUploader({ url: API_URL + '/uploadSneakers', queueLimit: 4 })
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let image = JSON.parse(response).image
      console.log('image: ', image)
      this.images.push(image)
    }
    this.uploader
  }

  private uploader: FileUploader
  private brands: NameId[]
  private selectedBrand: NameId
  private sizes: number[] = AVAILABLE_SIZES
  private selectedSizes: number[] = []
  private images: string[] = []

  private apiErrors = {
    modelName: null,
    brandName: null,
    invalidForm: null
  }

  private sneakerForm = new FormGroup({
    name: new FormControl(''),
    brand: new FormControl(''),
    type: new FormControl(''),
    gender: new FormControl('')
  }, {
      validators: []
    })

  private selectBrand(brand: NameId) {
    this.selectedBrand = brand
    this.sneakerForm.controls['brand'].setValue(brand.name)
    this.apiErrors.brandName = null
  }

  private addBrand() {
    if (this.checkBrandNameExists()) return

    this.brandService.createBrand(this.brand.value)
      .subscribe(resp => {
        let newBrand = { 'id': resp.id, 'name': resp.name }

        this.brands.push(newBrand)
        this.brands.sort(function (a, b) {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })

        this.selectBrand(newBrand)
      })
  }

  private getBrands() {
    this.brandService.getBrands()
      .subscribe(resp => {
        this.brands = resp
      })
  }

  private selectSize(size) {
    this.selectedSizes.indexOf(size) === -1 ? this.selectedSizes.push(size) : this.selectedSizes.splice(this.selectedSizes.indexOf(size), 1)
  }

  private checkBrandNameExists(): boolean {
    const brandName = this.brand.value.trim()
    for (let brand of this.brands) {
      if (brandName.toLowerCase() === brand.name.toLowerCase()) {
        this.apiErrors.brandName = brand.name + ' already exists.'
        return true
      }
    }

    return false
  }

  private checkModelExists() {
    this.apiErrors.invalidForm = null

    let model = this.name.value.trim()
    let gender = this.gender.value
    let type = this.type.value
    if (!this.selectBrand || !model || !model.length || !gender || !type) {
      this.apiErrors.invalidForm = INVALID_FORM_MESSAGE
      return
    }

    let input = {
      'brandId': this.selectedBrand.id,
      'typeId': parseInt(type),
      'genderId': parseInt(gender),
      'name': model
    }

    this.sneakerService.checkModelExists(input).subscribe(
      resp => {
        // e.g. Vans Era Men's Low-top already exists.
        let errorMessage = this.selectedBrand.name + ' ' + model + (gender === '1' ? " Men's " : " Women's ") + (type === '1' ? 'Low-top' : 'High-top') + ' already exists.'
        this.apiErrors.modelName = resp ? errorMessage : null
      }
    )
  }

  private hasBaseDropZoneOver: boolean = false
  private fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e
  }

  private removeImage(item) {
    let queueIndex = this.uploader.queue.indexOf(item)
    this.images.splice(queueIndex, 1)
    item.remove()
  }

  ngOnInit() {
    this.getBrands()
  }

  onSubmit() {
    console.log('vliza v onsubmit: ', this.apiErrors)
    this.checkModelExists()

    if (!this.selectedSizes.length || !this.images.length) {
      this.apiErrors.invalidForm = INVALID_FORM_MESSAGE
      return
    }

    if (this.apiErrors.brandName || this.apiErrors.invalidForm || this.apiErrors.modelName) return

    let input = {
      'brandId': this.selectedBrand.id,
      'typeId': parseInt(this.type.value),
      'genderId': parseInt(this.gender.value),
      'name': this.name.value.trim(),
      'sizes': this.selectedSizes,
      'images': this.images
    }

    this.sneakerService.createSneaker(input)
      .subscribe(resp => {
        console.log('created sneaker: ', resp)
      })
  }

  get name() { return this.sneakerForm.get('name') }
  get brand() { return this.sneakerForm.get('brand') }
  get gender() { return this.sneakerForm.get('gender') }
  get type() { return this.sneakerForm.get('type') }
}
