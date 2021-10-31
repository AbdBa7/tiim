import { Component, Inject, Optional } from '@angular/core';
import { CommonService } from '../service/service-common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './about.component.html',
  providers: [
    // ...
  ]
})
export class AboutComponent {
  // SystPy version:
  version ="1.0.0";
  id: any;
  item: any;
  private sub: any;


  // Pie Chart

  trace_pie = {
    // Quantité tuyau
    type: "pie",
    values: [4626, 4000, 626],
    labels: ["Quantité tuyau fabriquée", "Quantité tuyau prevue", "Quantité tuyau supplementaire"],
    textinfo: "label+percent",
    insidetextorientation: "outside"
  }
  graph0 = {
    data: [
      this.trace_pie
    ],
    layout: {title: 'Quantité tuyau', height: 600, width: 600}
  };


  // Bar Chart

  trace1 = {
    y: this.data["qt_gazoil"],
    name: 'Quantité de réserve gasoil (Litres)',
    type: 'bar'
  };
  trace2 = {
    y: this.data["cons_gasoil"],
    name: 'Consommation en gasoil (Litres)',
    type: 'bar'
  };

  graph1 = {
    data: [
      this.trace1, this.trace2
    ],
    layout: {title: 'Some Data to Hover Over'}
  };
  // Line chart
  graph2 = {
    data: [
      { x: [1, 2, 3, 4, 5], y: [1, 4, 9, 4, 1], type: 'scatter' },
      { x: [1, 2, 3, 4, 5], y: [1, 3, 6, 9, 6], type: 'scatter' },
      { x: [1, 2, 3, 4, 5], y: [1, 2, 4, 5, 6], type: 'scatter' },
    ],
    layout: {title: 'Some Data to Highlight'}
  };

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AboutComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private common_service: CommonService,
    private route: ActivatedRoute,
  ) { 
    /*this.common_service.get_all(`${environment.API_leboncarrfour}get_all_isouk?category=test&api=1`).subscribe(res => {
      this.version = "1.0.1";
    });*/
    this.version = "1.0.1";
  }

  ngOnInit() {
    /* Later explore
        this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });

        It works:
        this.route.data.subscribe(value => console.log(value));

    */
    console.log(this.data)
  }

  closeAbout() {
    console.log('Data')
    this.dialogRef.close();
  }

}
