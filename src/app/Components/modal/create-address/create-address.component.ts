import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { IOption, StatusCode } from 'src/app/Interfaces/index.interface';
import { PickAdministrativeComponent } from '../pick-administrative/pick-administrative.component';
import { RestService } from 'src/app/Services/rest/rest.service';
import { GlobalService } from 'src/app/Services/global/global.service';
import { FormService } from 'src/app/Services/form/form.service';
import { TFieldError } from 'src/app/Services/form/form.service';
type TAddressFormKey = 'address1' | 'province' | 'city' | 'district' | 'subdistrict' | 'postal' | 'password' | 'repassword' | 'phone' | 'name' | 'email';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss'],
})
export class CreateAddressComponent implements OnInit {
  @ViewChild(PickAdministrativeComponent) locationComponent?: PickAdministrativeComponent;
  @Input() idModal: string = ''
  @Input() typeAction: string = ''
  @Input() uuid: string = ''
  @Input() label: string = 'Buat Alamat Pick Up'
  @Input() isPhone: boolean = false;
  @Input() isPassword: boolean = false;
  @Input() isEmail: boolean = false;
  @Input() isEdit: boolean = false;
  @Output() inputValueChange = new EventEmitter<any>();
  @ViewChild(IonModal) modal?: IonModal;
  addressForm: FormGroup = new FormBuilder().group({
    address1: [null, [Validators.required]],
    province: [null, [Validators.required]],
    city: [null, [Validators.required]],
    district: [null, [Validators.required]],
    subdistrict: [null, [Validators.required]],
    postal: [null, [Validators.required]],
    phone: [null, this.isPhone ? [Validators.required] : null],
    password: [null, this.isPassword ? [Validators.required] : null],
    repassword: [null, this.isPassword ? [Validators.required] : null],
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    b2b_uid: [null,],
  })

  formAddressError: Record<TAddressFormKey, TFieldError> = {
    name: {
      label: 't_name',
      msg: '',
    },
    email: {
      label: 't_email',
      msg: '',
    },
    province: {
      label: 't_province',
      msg: '',
    },
    city: {
      label: 't_city',
      msg: '',
    },
    district: {
      label: 't_district',
      msg: '',
    },
    subdistrict: {
      label: 't_subdistrict',
      msg: '',
    },

    postal: {
      label: 't_zip',
      msg: '',
    },
    phone: {
      label: 't_phone',
      msg: '',
    },
    address1: {
      label: 't_address',
      msg: '',
    },
    password: {
      label: 't_password',
      msg: '',
    },
    repassword: {
      label: 't_repassword',
      msg: '',
    }
  };
  listKoli=[];
  type: string = 'province';
  listProvince: IOption[] = []
  listCity: IOption[] = []
  listDistrict: IOption[] = []
  listSubDistrict: IOption[] = []
  onPhoneValueChange(value: string): void {
    console.log('Phone value changed:', value);
    // Handle the changed value as needed
  }
  constructor(private restService: RestService, private globalService: GlobalService, private formService: FormService) { }

  ngOnInit() { }
  async emitValue():Promise<any>{
    this.inputValueChange.emit(this.addressForm.value);
    this.modal?.dismiss();
    return this.addressForm.value;
  }
  setData(data: any, type_action: string) {
    if (type_action) {
      this.typeAction = type_action;
    }
    this.addressForm.get('address1')?.setValue(data?.address.address1)
    this.addressForm.get('password')?.setValue(data?.b2b_account.password)
    this.addressForm.get('repassword')?.setValue(data?.b2b_account.password)
    this.addressForm.get('province')?.setValue(data?.address.province)
    this.addressForm.get('city')?.setValue(data?.address.city)
    this.addressForm.get('district')?.setValue(data?.address.district)
    this.addressForm.get('postal')?.setValue(data?.address.postal)
    this.addressForm.get('subdistrict')?.setValue(data?.address.subdistrict)
    this.addressForm.get('email')?.setValue(data?.email)
    this.addressForm.get('name')?.setValue(data?.name)
    this.addressForm.get('phone')?.setValue(data?.phone)
    this.addressForm.get('ext')?.setValue(data?.ext)
    this.addressForm.get('b2b_uid')?.setValue(data?.uuid)
    this.listProvince = [{
      label: data?.address.province,
      value: 0
    }]
    this.listCity = [{
      label: data?.address.city,
      value: 0
    }]
    this.listDistrict = [{
      label: data?.address.district,
      value: 0
    }]
    this.listSubDistrict = [{
      label: data?.address.subdistrict,
      value: 0
    }]
  }
  async getDataLocation(str: string, id: string) {
    const data = this.addressForm.value;
    this.locationComponent?.updateData(data['province'], data['city'], data['district'], data['subDistrict'])
    await this.locationComponent?.getData('', str);
    await this.locationComponent?.modal?.present();
  }
  onAddressLocationValueChange(event: any) {
    const type = event.type;
    if (type === 'province') {
      this.listProvince = [{
        label: event.provinsi,
        value: 0
      }]
      this.addressForm.get(type)?.setValue(event.provinsi);
      this.addressForm.get('city')?.setValue("");
      this.addressForm.get('district')?.setValue("");
      this.addressForm.get('subdistrict')?.setValue("");
      this.addressForm.get('postal')?.setValue(event.postal);
    }
    if (type === 'city') {
      this.listCity = [{
        label: event.kabupaten,
        value: 0
      }]
      this.addressForm.get(type)?.setValue(event.kabupaten);
      this.addressForm.get('district')?.setValue("");
      this.addressForm.get('subdistrict')?.setValue("");
      this.addressForm.get('postal')?.setValue(event.postal);
    }
    if (type === 'district') {
      this.listDistrict = [{
        label: event.kecamatan,
        value: 0
      }]
      this.addressForm.get(type)?.setValue(event.kecamatan);
      this.addressForm.get('subdistrict')?.setValue("");
      this.addressForm.get('postal')?.setValue(event.postal);
    }
    if (type === 'subdistrict') {
      this.listSubDistrict = [{
        label: event.kelurahan,
        value: 0
      }]
      this.addressForm.get(type)?.setValue(event.kelurahan);
      this.addressForm.get('postal')?.setValue(event.postal);
    }
  }

  onChangeValue(value: string): void {
    // this.currentData = value;
    // this.closeModal();
    // this.emitValue();
    // console.log(this.currentData);
  }

  validateForm(): boolean {
    this.formService.resetErrors(this.formAddressError);
    if (this.addressForm.valid) {
      if (this.addressForm.valid) { return true };
    };

    // this.formService.validateForm(this.form, this.formError);
    this.formService.validateForm(this.addressForm, this.formAddressError);
    let toastMessage = '';
    // toastMessage = this.formService.getFirstError(this.formError);
    toastMessage !== '' ? null : toastMessage = this.formService.getFirstError(this.formAddressError);
    this.globalService.showToast(toastMessage, 'danger');
    return false;
  }

  async submit() {

    console.log(this.addressForm.value);

    const isValid = this.validateForm();
    if (this.addressForm.value['password'] !== this.addressForm.value['repassword']) {
      this.globalService.showToast('Password tidak sama', 'danger');
      return
    }
    if (!isValid) { return };
    try {
      const body =
      {
        "uuid": this.addressForm.value['b2b_uid'],
        "b2b_uid":this.uuid,
        "name": this.addressForm.value['name'],
        "email": this.addressForm.value['email'],
        "password": this.addressForm.value['password'],
        "address": {
          "address1": this.addressForm.value['address1'],
          "province": this.addressForm.value['province'],
          "city": this.addressForm.value['city'],
          "district": this.addressForm.value['district'],
          "subdistrict": this.addressForm.value['subdistrict'],
          "postal": this.addressForm.value['postal']
        }
      }
      let response;
      // if (this.typeAction === 'edit-member') {
      //   response = await this.restService.editMember(body);
      // }
      // if (this.typeAction === 'create-member') {
      //   response = await this.restService.createMember(body);
      // }
      // if (!response?.data) { throw response }
      // console.log(response);
      this.modal?.dismiss();
      this.globalService.showToast('Berhasil', 'success');
    } catch (error) {
      this.globalService.errorHandler(error, '')
    }
  }

}
