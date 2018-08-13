import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { ResizerDirective } from './directives/resizer.directive';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ResizerDirective
    
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
