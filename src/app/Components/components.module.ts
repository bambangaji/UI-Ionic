import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DashboardBackgroundComponent } from './dashboard-background/dashboard-background.component';
import { InputFormComponent } from './input-form/input-form.component';
import { DropdownAddressComponent } from './dropdown/dropdown-address/dropdown-address.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { DirectivesModule } from '../Directives/directives.module';
import { PipesModule } from '../Pipe/pipes.module';
import { InputFieldLabelComponent } from './input-field-label/input-field-label.component';
import { DropdownFlagComponent } from './dropdown/dropdown-flag/dropdown-flag.component';
import { PickAddressComponent } from './modal/pick-address/pick-address.component';
import { CreateAddressComponent } from './modal/create-address/create-address.component';
import { PickExpeditionComponent } from './modal/pick-expedition/pick-expedition.component';
import { InputFormPhoneNumberComponent } from './input-form-phone-number/input-form-phone-number.component';
import { PickAdministrativeComponent } from './modal/pick-administrative/pick-administrative.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { PickLayananComponent } from './modal/pick-layanan/pick-layanan.component';
import { CardKoliComponent } from './card/card-koli/card-koli.component';
import { CreateItemComponent } from './modal/create-item/create-item.component';
import { CompletePesananComponent } from './page/complete-pesanan/complete-pesanan.component';
import { HeaderComponent } from './header/header.component';
import { LabelPageComponent } from './label-page/label-page.component';
import { GraphDashboardComponent } from './graph-dashboard/graph-dashboard.component';
import { CardDashboardComponent } from './card/card-dashboard/card-dashboard.component';
import { SidebarDashboardComponent } from './sidebar/sidebar-dashboard/sidebar-dashboard.component';
import { TableCustomComponent } from './table/table-custom/table-custom.component';
import { ModalScheduleConfirmComponent } from './modal/modal-schedule-confirm/modal-schedule-confirm.component';
import { ModalScheduleCreateComponent } from './modal/modal-schedule-create/modal-schedule-create.component';
import { DropdownCustomComponent } from './popover/country/country.component';
import { CalendarComponent } from './popover/calendar/calendar.component';
import { TimeComponent } from './popover/time/time.component';
import { FilterComponent } from './modal/filter/filter.component';
import { DetailScheduleComponent } from './modal/detail-schedule/detail-schedule.component';
import { LabelStatusComponent } from './label/label-status/label-status.component';
import { HistoryAktivitasComponent } from './sidebar/history-aktivitas/history-aktivitas.component';
import { ModalScheduleComponent } from './modal/modal-schedule/modal-schedule.component';
import { ChartDashboardComponent } from './chart/chart-dashboard/chart-dashboard.component';
import { ProcessBagComponent } from './modal/process-bag/process-bag.component';
import { TableExcelComponent } from './table/table-excel/table-excel.component';
import { PopoverTableComponent } from './popover/popover-table/popover-table.component';


@NgModule({
  declarations: [
    DashboardBackgroundComponent,
    InputFormComponent,
    DropdownFlagComponent,
    DropdownAddressComponent,
    ImageUploadComponent,
    InputFieldLabelComponent,
    PickAddressComponent,
    CreateAddressComponent,
    PickExpeditionComponent,
    InputFormPhoneNumberComponent,
    PickAdministrativeComponent,
    NoFoundComponent,
    PickLayananComponent,
    CardKoliComponent,
    CreateItemComponent,
    CompletePesananComponent,
    HeaderComponent,
    LabelPageComponent,
    GraphDashboardComponent,
    CardDashboardComponent,
    SidebarDashboardComponent,
    TableCustomComponent,
    ModalScheduleConfirmComponent,
    ModalScheduleCreateComponent,
    DropdownCustomComponent,
    CalendarComponent,
    TimeComponent,
    FilterComponent,
    DetailScheduleComponent,
    LabelStatusComponent,
    HistoryAktivitasComponent,
    ModalScheduleComponent,
    ChartDashboardComponent,
    ProcessBagComponent,
    TableExcelComponent,
    PopoverTableComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
  ],
  exports: [
    DashboardBackgroundComponent,
    InputFormComponent,
    DropdownFlagComponent,
    DropdownAddressComponent,
    ImageUploadComponent,
    InputFieldLabelComponent,
    PickAddressComponent, 
    CreateAddressComponent,
    PickExpeditionComponent,
    InputFormPhoneNumberComponent,
    PickAdministrativeComponent,
    NoFoundComponent,
    PickLayananComponent,
    CardKoliComponent,
    CreateItemComponent,
    CompletePesananComponent,
    HeaderComponent,
    LabelPageComponent,
    GraphDashboardComponent,
    CardDashboardComponent,
    SidebarDashboardComponent,
    TableCustomComponent,
    ModalScheduleConfirmComponent,
    ModalScheduleCreateComponent,
    DropdownCustomComponent,
    CalendarComponent,
    TimeComponent,
    FilterComponent,
    DetailScheduleComponent,
    LabelStatusComponent,
    HistoryAktivitasComponent,
    ModalScheduleComponent,
    ChartDashboardComponent,
    ProcessBagComponent,
    TableExcelComponent,
    PopoverTableComponent
  ]
})
export class ComponentsModule { }