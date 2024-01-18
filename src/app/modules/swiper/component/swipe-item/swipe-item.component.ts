import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonItem } from '@ionic/angular';
import { dataColum } from 'src/app/helper/interface/response';
import { AlertService } from 'src/app/helper/service/alert.service';
import { CurrencyFormatPipe } from 'src/app/modules/shared/form/pipe/currency-format.pipe';
import { swipeBtn, swipeItemData } from 'src/app/modules/shared/helper/dataModal/shared-interface';

@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
  providers: [DatePipe, CurrencyFormatPipe]
})

export class SwipeItemComponent implements OnInit {
  m: any = {};
  @Input('data') public set dataValue(d: any) {
    this.m = d
    this.mapData();
  }
  @Input('dataCol') dataCol: swipeItemData = {} as swipeItemData;
  @ViewChild(IonItem, { read: ElementRef }) item!: ElementRef;
  @Output() onEvent: EventEmitter<swipeBtn> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  bigIcon = false;
  btn: any = []
  colorCode = ['#78909c', '#5c6bc0', '#bf3931', '#ac58bc', '#01579b', '#1e89d1']
  constructor(private alertService: AlertService, private currencyPipe: CurrencyFormatPipe,
    private _sanitizer: DomSanitizer,
    private datePipe: DatePipe,) { }

  ngOnInit() {
    this.mapData();
    this.btn = this.dataCol.swipeBtn || []
  }

  mapData() {
    const d = this.m;
    this.dataCol.column?.forEach((e: dataColum) => {
      let text = e.colJoinName ? `${d[e.colName]} ${e.colJoinSeparator || ''} ${d[e.colJoinName]}` : d[e.colName];
      // text =this._sanitizer.bypassSecurityTrustHtml(text);
      if (e.dataType == 'DATE') {
        text = this.datePipe.transform(text, e.dateFormat || 'dd-MMM-YY');
      }
      if (e.dataType == 'CURRENCY') {
         const te = this.currencyPipe.transform(text);
         text = te.split('.')[0] || text
      }
      if (e.dataType == 'HTML') {
        text = this._sanitizer.bypassSecurityTrustHtml(text);
        text = text.changingThisBreaksApplicationSecurity
      }
      switch (e.colType) {
        case 'HEADING':
          d.title = text
          break;
        case 'DESCRIPTION':
          d.content = text
          break;
        case 'LEFT':
          if (e.dataType == 'IMAGE') {
            d.isImage = true;
          }
          d.left = text;
          break;
        case 'RIGHT_TOP':
          // text = text.replace(/\//g,'');
          d.right_top_badge = undefined
          d.right_top = e?.span_text ? e.span_text : text;
          console.log('reght topt', d)
          break;
        case 'RIGHT_BOTTOM':
          d.right_bottom = e?.span_text ? e.span_text : text;
          break;
        case 'BADGE':
          d.right_top = undefined
          d.right_top_badge = e?.span_text ? e.span_text : text;
          break

      }
    });
    this.m = d;
    console.log('data',this.m);
    
  }

  openDetails(data: any) {
    this.onClick.emit(data);
  }
  eventClick(a: swipeBtn | any) {
    const data = { ...a, ...this.m }
    if (a.isConfirm) {
      this.alertService.confirmBox(a.confirmConfig).then(res => {
        if (res) {
          this.onEvent.emit(data);
        }
      })
    } else {
      this.onEvent.emit(data);
    }

  }
  showImage: boolean = true;
  randomColor: any;
  removeImg(e: any) {
    this.randomColor = this.colorCode[Math.floor(Math.random() * this.colorCode.length)];
    this.showImage = false;
  }
}
