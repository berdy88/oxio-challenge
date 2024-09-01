import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {DataPoint} from '../../../../types/data-point';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit, OnDestroy {

  @Input() chartTitle: string = '';
  @Input() chartType: 'bar' | 'pie' = 'bar';
  @Input() dataPoints?: Observable<DataPoint[]>;

  chartOptions: any;

  private sub = new Subscription();

  ngOnInit() {
    this.sub.add(this.dataPoints?.subscribe(dataPoints => {
      this.chartOptions = {
        animationEnabled: true,
        title: {
          text: this.chartTitle
        },
        data: [{
          type: this.chartType,
          startAngle: -90,
          indexLabel: "{name}: {y}",
          dataPoints: dataPoints
        }]
      };
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
