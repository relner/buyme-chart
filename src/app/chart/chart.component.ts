import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DataStructure } from '../models/models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  constructor(private dataService: DataService) {   }

  ngOnInit() {
    this.getAllData();
  }

  public lineChartData:Array<any>
  public lineChartLabels:Array<any>
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  myShowFlag = false;
 
  getAllData(){

    let days = this.getWeekDays(7);
 
    let _lineChartData = [];
    let _lineChartLabels = [];
    let count = 0;
 
    for (let i = 0; i < days.length; i++) {
      
      this.dataService.getAllData({date: days[i], symbols: 'USD,AUD,CAD'}).subscribe(data => {
        count++
 
          _lineChartLabels[i] = days[i];
 
          for (let j = 0; j < Object.keys(data.rates).length; j++) {
            if(_lineChartData[j] == undefined) _lineChartData[j] = {data: [], label: ''}
            _lineChartData[j].data[i] = data.rates[Object.keys(data.rates)[j]];
            _lineChartData[j].label = Object.keys(data.rates)[j];
          }
 
          if(count == days.length) {
            this.lineChartData = _lineChartData;
            this.lineChartLabels = _lineChartLabels;
 
            //show the char
            setTimeout(() => { this.myShowFlag = true; }, 0);
          }
        }
      )
      
    }
 
    
  }
 
  getWeekDays(dayNubbers){
    let weeksArray = [];
    const today = new Date();
    for (let i = 0; i < dayNubbers; i++) {
        weeksArray[i] = ("0000" + (new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)).getFullYear().toString()).slice(-4) + "-" +
                       ("00" + (new Date(today.getFullYear(), today.getMonth(), today.getDate() - i).getMonth() + 1).toString()).slice(-2 ) + "-" +
                       ("00" + (new Date(today.getFullYear(), today.getMonth(), today.getDate() - i).getDate()).toString()).slice(-2 )
    }
    return weeksArray.reverse();
  }

}


//this.dataService.getAllData({date: '2013-03-16', symbols: 'USD,AUD,CAD'}).subscribe(data => console.log(data))
//http://data.fixer.io/api/2013-03-16?access_key=7b73f20314c84c42e9a4caf56b347a37&symbols=USD,AUD,CAD&format=1
//https://valor-software.com/ng2-charts/#top