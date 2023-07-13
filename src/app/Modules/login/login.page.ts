import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, IUserAccessToken, StatusCode, TLanguage } from 'src/app/Interfaces/index.interface';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { FormGroupTemplate } from 'src/app/Services/form/form-group.service';
import { FormService, TFieldError, TFormLoginKey } from 'src/app/Services/form/form.service';
import { GlobalService } from 'src/app/Services/global/global.service';
import { NavigationService } from 'src/app/Services/navigation/navigation.service';
import { RestService } from 'src/app/Services/rest/rest.service';
import { StorageService } from 'src/app/Services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formError: Record<TFormLoginKey, TFieldError> = {
    email: {
      label: 't_email',
      msg: '',
    },
    password: {
      label: 't_password',
      msg: '',
    }
  };
  isSubmitted = false;
  errorMsg: string = '';
  passwordType: string = 'password'
  isSendingForm: boolean = false;
  constructor(
    private navigationService: NavigationService,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private restService: RestService,
    private formService: FormService,
    private globalService: GlobalService,
    private storageService: StorageService,
    public formGroupTemplate: FormGroupTemplate
  ) {
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    // const isAuthenticated = await this.authService.checkIsAuthenticated();
    // if (isAuthenticated) { this.navigationService.toDashboardPage() }
  }

  togglePasswordType() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      return;
    }
    this.passwordType = 'password';
  }

  async submit() {
    this.navigationService.toDashboardPage()
  }

  validateForm(): boolean {
    this.formService.resetErrors(this.formError);
    if (this.formGroupTemplate.loginForm.valid) { return true };
    this.formService.validateForm(this.formGroupTemplate.loginForm, this.formError);
    const toastMessage = this.formService.getFirstError(this.formError);
    this.globalService.showToast(toastMessage, 'danger');
    return false;
  }

  async setUserSession(profile: IUser, token: IUserAccessToken) {
    try {
      await this.authService.setSession(profile, token.token, token.expired_at);
      await this.getAddress();
      const isAuthenticated = this.authService.isAuthenticated$?.getValue();
      if (!isAuthenticated) { return }

      this.navigationService.toDashboardPage();
    } catch (error) {
      this.globalService.errorHandler(error, '-- Gagal membuat sesi --')
    }
  }
  async getAddress() {
   
  }
  changeLanguage(languageCode: TLanguage) {
    const currentLanguage = this.storageService.language ?? 'id';
    if (currentLanguage === languageCode) { return; }
    // this.translate.setLanguage(languageCode);

    // To update error message language
    const hasErrorMessage = this.formService.getFirstError(this.formError);
    if (!hasErrorMessage) { return; }
    this.formService.validateForm(this.formGroupTemplate.loginForm, this.formError);
  }
}
