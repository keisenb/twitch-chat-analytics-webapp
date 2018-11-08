import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../_services/message/message.service';
import { UserService } from '../_services/user/user.service';
import { forkJoin, Observable, interval, Subscription } from 'rxjs';
import { switchMap, } from 'rxjs/operators';
import { Chart } from '../_models/Chart.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  totalMessages: number;
  totalUsers: number;

  messageCountSubscription: Subscription;
  userCountSubscription: Subscription;
  topMessagesSubscription: Subscription;
  topUsersSubscription: Subscription;

  topMessagesChart: Chart;
  topUsersChart: Chart;



  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.topMessagesChart = new Chart();
    this.topUsersChart = new Chart();

    this.initializeCards();
    this.initializeMaps();
  }

  ngOnDestroy() {
    // todo check if null
    this.messageCountSubscription.unsubscribe();
    this.userCountSubscription.unsubscribe();

    this.topMessagesSubscription.unsubscribe();
    this.topUsersSubscription.unsubscribe();
  }


  private initializeMaps() {
    const topMessages$ = this.messageService.TopMessages();
    const topUsers$ = this.userService.TopUsers();

    forkJoin([topMessages$, topUsers$])
      .subscribe(res => {
        this.topMessagesChart.datasets[0].data = res[0].map(x => x.count);
        this.topMessagesChart.labels = res[0].map(x => x._id);

        this.topUsersChart.datasets[0].data = res[1].map(x => x.count);
        this.topUsersChart.labels = res[1].map(x => x._id);
      });

    this.topMessagesSubscription = this.setInterval(topMessages$).subscribe(next => {

      const data = next.map(x => x.count);
      this.topMessagesChart.labels = next.map(x => x._id);
      const clone = JSON.parse(JSON.stringify(this.topMessagesChart.datasets));
      clone[0].data = data;
      this.topMessagesChart.datasets = clone;
      this.topMessagesChart.datasets[0].data = data;
    });

    this.topUsersSubscription = this.setInterval(topUsers$).subscribe(next => {
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

    forkJoin([usernameCount$, messageCount$])
      .subscribe(res => {
        this.totalUsers = res[0].users;
        this.totalMessages = res[1].count;
      });

    this.userCountSubscription = this.setInterval(usernameCount$).subscribe(next => {
      this.totalUsers = next.users;
    });

    this.messageCountSubscription = this.setInterval(messageCount$).subscribe(next => {
      this.totalMessages = next.count;
    });

  }

  private setInterval(observable: Observable<any>) {
    const interval$ = interval(3000);
    return interval$.pipe(switchMap(() => observable));
  }
}
