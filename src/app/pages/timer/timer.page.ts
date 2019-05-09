import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  percent: number = 0;
  radius: number = 100;
  fullTime: any = '00:01:30';
  title: any;

  timer: any = false;
  progress: any = 0;
  minutes: number = 1;
  seconds: any = 30;

  constructor() { }

  ngOnInit() {
  }

  startTimer() {

    clearInterval(this.timer);

    this.timer = setInterval(()=>{

      if(this.percent < this.radius){
        this.percent++;
        this.title = this.percent;
      }else if (this.percent === this.radius){
        this.percent=15;
        this.title = this.percent;
        clearInterval(this.timer);
      }
    }, 1000);
    

  }

}
