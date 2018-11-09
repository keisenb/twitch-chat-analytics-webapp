import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../_services/message/message.service';
import { UserService } from '../_services/user/user.service';
import { forkJoin, Observable, interval, Subscription } from 'rxjs';
import { switchMap, } from 'rxjs/operators';
import { Chart } from '../_models/chart.model';
import { ChatterService } from '../_services/chatter/chatter.service';
import * as Chartjs from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  totalMessages: number;
  totalUsers: number;
  chatterCount: number;

  messageCountSubscription: Subscription;
  userCountSubscription: Subscription;
  topMessagesSubscription: Subscription;
  topUsersSubscription: Subscription;
  currentChattersSubscription: Subscription;

  topMessagesChart: Chart;
  topUsersChart: Chart;
  cardCharts: Array<Chart>;



  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private chatterService: ChatterService
  ) {
    this.topMessagesChart = new Chart();
    this.topUsersChart = new Chart();
    this.cardCharts = new Array<Chart>();
  }

  ngOnInit() {
    this.InitializeCardCharts();
    this.initializeCards();
    this.initializeCharts();
  }

  ngOnDestroy() {
    // todo check if null
    this.messageCountSubscription.unsubscribe();
    this.userCountSubscription.unsubscribe();

    this.topMessagesSubscription.unsubscribe();
    this.topUsersSubscription.unsubscribe();
  }

  private initializeCharts() {
    const topMessages$ = this.messageService.TopMessages();
    const topUsers$ = this.userService.TopUsers();

    forkJoin([topMessages$, topUsers$])
      .subscribe(res => {
        this.topMessagesChart.datasets[0].data = res[0].map(x => x.count);
        this.topMessagesChart.labels = res[0].map(x => x._id);

        this.topUsersChart.datasets[0].data = res[1].map(x => x.count);
        this.topUsersChart.labels = res[1].map(x => x._id);
      }, err => {
        console.log('unable to refresh charts');
      });

    this.topMessagesSubscription = this.setInterval(topMessages$, 3000).subscribe(next => {

      const data = next.map(x => x.count);
      this.topMessagesChart.labels = next.map(x => x._id);
      const clone = JSON.parse(JSON.stringify(this.topMessagesChart.datasets));
      clone[0].data = data;
      this.topMessagesChart.datasets = clone;
      this.topMessagesChart.datasets[0].data = data;
    });

    this.topUsersSubscription = this.setInterval(topUsers$, 3000).subscribe(next => {
      const data = next.map(x => x.count);
      this.topUsersChart.labels = next.map(x => x._id);
      const clone = JSON.parse(JSON.stringify(this.topUsersChart.datasets));
      clone[0].data = data;
      this.topUsersChart.datasets = clone;
      this.topUsersChart.datasets[0].data = data;
    });

  }

  private initializeCards(): void {
    const usernameCount$ = this.userService.UsernameCount();
    const messageCount$ = this.messageService.MessageCount();
    const chatterCount$ = this.chatterService.CurrentChatters('timthetatman');

    forkJoin([usernameCount$, messageCount$, chatterCount$])
      .subscribe(res => {
        this.totalUsers = res[0].users;
        this.totalMessages = res[1].count;
        this.chatterCount = res[2].chatter_count;
      }, err => {
        console.log('unable to refresh cards');
      });

    this.userCountSubscription = this.setInterval(usernameCount$, 3000).subscribe(next => {
      this.totalUsers = next.users;
    });

    this.messageCountSubscription = this.setInterval(messageCount$, 3000).subscribe(next => {
      this.totalMessages = next.count;
    });

    this.currentChattersSubscription = this.setInterval(chatterCount$, 30000).subscribe(next => {
      this.chatterCount = next.chatter_count;
    });

  }

  private setInterval(observable: Observable<any>, int: number) {
    const interval$ = interval(int);
    return interval$.pipe(switchMap(() => observable));
  }

  private InitializeCardCharts() {

    const temp = [
      [10, 30, 20, 15, 30],
      [25, 10, 20, 15, 20],
      [25, 30, 20, 15, 10],
      [25, 30, 20, 15, 20]
    ];

    temp.forEach((val, index) => {
      const c = new Chart();

      c.type = 'bar';
      const opts = this.valincome('#fff', val, '#fff');
      c.labels = opts.labels;
      c.datasets = opts.datasets;
      c.options = this.valincomebuildoption();

      this.cardCharts[index] = c;

    });

  }

   valincome(a, b, f) {
    if (f == null) {
        f = 'rgba(0,0,0,0)';
    }
    return {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: '',
            borderColor: a,
            borderWidth: 0,
            hitRadius: 30,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 12,
            pointBackgroundColor: Chartjs.helpers.color('#000000').alpha(0).rgbString(),
            pointBorderColor: a,
            pointHoverBackgroundColor: a,
            pointHoverBorderColor: Chartjs.helpers.color('#000000').alpha(.1).rgbString(),
            fill: true,
            backgroundColor: Chartjs.helpers.color(f).alpha(1).rgbString(),
            data: b,
        }]
    };
}

 valincomebuildoption() {
    return {
        maintainAspectRatio: false,
        title: {
            display: false,
        },
        tooltips: {
            enabled: false,
        },
        legend: {
            display: false
        },
        hover: {
            mode: 'index'
        },
        scales: {
            xAxes: [{
                display: false,
                gridLines: false,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: false,
                gridLines: false,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
                ticks: {
                    min: 1,
                }
            }]
        },
        elements: {
            point: {
                radius: 4,
                borderWidth: 12
            }
        },
        layout: {
            padding: {
                left: 10,
                right: 0,
                top: 15,
                bottom: 0
            }
        }
    };
}
}
