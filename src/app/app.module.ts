import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiscoComponent } from './components/disco/disco.component';
import { RamComponent } from './components/ram/ram.component';
import { MemoriaLogicaComponent } from './components/memoria-logica/memoria-logica.component';
import { ColaProcesosComponent } from './components/cola-procesos/cola-procesos.component';
import { TablaTraduccionComponent } from './components/tabla-traduccion/tabla-traduccion.component';
import { CpuComponent } from './components/cpu/cpu.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatCommonModule } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatRadioModule } from "@angular/material/radio";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    DiscoComponent,
    RamComponent,
    MemoriaLogicaComponent,
    ColaProcesosComponent,
    TablaTraduccionComponent,
    CpuComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatExpansionModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
