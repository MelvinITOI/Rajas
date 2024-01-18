import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { arrayofData } from 'src/app/helper/core.data.interface';
import { filterConfig, formBuilder, formBuilderData, ResponseData, tblFilterQuery } from 'src/app/helper/dataModal/response';
import { dataBuilder } from 'src/app/helper/interface/response';
import { AlertService } from 'src/app/helper/service/alert.service';
import { AppConstant, MODULE_NAME, PERMISSION, RESPONSE_CODE } from 'src/app/helper/utility/app-constant';
import { createSearchTableQuery, isArray, isEmptyObj, mergeArrayObject } from 'src/app/helper/utility/utility-helper';
import { MasterApiService } from '../../../master-api.service';
import { DataListService } from '../data-list.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit {
  dataList: Array<any> = [];
  @Input() parentGetList: ((args?: any) => Promise<any>) | any;
  @Input() selectable: 'SINGLE' | 'MULTI' | false | undefined = false;
  @Input() searchBar: boolean = true
  @Input() maxSelection: number = -1; // -1 means unlimited;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onAction: EventEmitter<any> = new EventEmitter();
  @Input() skipId: Array<string | number> = [];
  dataName: string = 'MEMBER';
  @Input() dataConfig: dataBuilder = {} as dataBuilder;
  filterCol: formBuilder[] | any = [] as formBuilder[];
  // @Input() swipeBtn: swipeBtn[] = [{ eventName: 'edit', alignment: 'RIGHT', title: 'Edit', isIcon: true, iconConfig: { name: 'pencil-outline' } }]
  showFilter: boolean = false;
  cols: Array<any> = [];
  DATA_LOADING: any = {};
  selectedData: Array<any> = [];
  FORM_SUPPORT_DATA: arrayofData | any = {} as arrayofData;
  moduleArray: any = Object.keys(MODULE_NAME);
  actionArray: any = Object.keys(PERMISSION);
  totalRecords: number = 0;
  primaryKey: string | number | any = 'id';
  lastFilter: tblFilterQuery = {} as tblFilterQuery;
  defaultRow = AppConstant.TABLE_PAGE_ROWS;
  page_number = 0;
  page_limit = 10;
  filterPageNumber = 0;
  loadingPage: boolean = false;
  isReachedPage = false;
  lastPage: number = 0;
  currentFilter: any = {}
  restoreList: any = { page_number: 0, isReachedPage: false };
  globalFilter: filterConfig | any = {} as filterConfig
  f: any;
  constructor(private dataServe: DataListService, private changeDetector: ChangeDetectorRef,
    private alertService: AlertService, private masterApi: MasterApiService) { }

  ngOnInit() {
    this.dataName = this.dataConfig.name;
    this.filterCol = this.dataConfig.filterCol;
    this.dataServe.tempData[this.dataName] = this.dataServe.tempData[this.dataName] || []
    this.refresh();
    // this.mapColum();
  }

  ionViewWillEnter() {

  }

  mapFilterColum() {
    this.filterCol.map((a: formBuilderData) => {
      if (a.type == 'select' || a.type == 'checkbox' || a.type == 'radio' || a.type == 'MULTISELECT') {
        a.selectPrimaryKey = a.selectPrimaryKey || 'id',
          a.selectKeyName = a.selectKeyName || a?.selectKeyName || '';
        if (a.data?.length || a.apiTblName) {
          this.FORM_SUPPORT_DATA[a.colName] = a.data;
        }
      }
      return a;
    });
    this.apiCallInit()
  }

  apiCallInit() {
    const skipLevel: any = [];
    this.filterCol.map((a: formBuilderData) => {
      if ((a.apiTblName || a.event) && !a.data?.length && !skipLevel.includes(a.colName)) {
        if (a.apiTblName || a.apiFunName) {
          this.getFullData(a.apiTblName || '', [], a.colName, a.apiFunName || '');
        }
        if (a.event?.apiTblName) {
          skipLevel.push(a.event.valueAssign);
        }
      }
    });
  }

  getFullData(tblName: any, cond = [], pValue: string, apiFun: string = '') {
    if (tblName || apiFun) {
      this.DATA_LOADING[pValue] = true;
      let api: any;
      if (apiFun) {
        //@ts-ignore
        api = this.masterApi[apiFun](cond);
      } else {
        api = this.masterApi.getFullData(tblName, cond, false);
      }
      this.apiCall(api, pValue);
    }
  }

  checkOperation(val: any, compare: any, operation = '==') {
    switch (operation) {
      case '!=':
        return val != compare;
        break;
      case '>=':
        return val >= compare;
        break;
      case '>':
        return val > compare;
        break;
      default:
        if (Array.isArray(val)) {
          return val.includes(compare);
        }
        return val == compare;
        break;
    }
  }


  apiCall(api: any, pValue: string) {
    api.then((res: ResponseData) => {
      if (res?.statusCode == RESPONSE_CODE.SUCCESS) {
        let colData: formBuilder | any = this.filterCol.find((a: formBuilder) => a.colName == pValue);
        let data = colData.appendData || [];
        if (!isArray(res.result)) { data = [] };
        const aF: any = colData.apiFilter || {};
        if (aF?.keyName) {
          //@ts-ignore
          res.result = res.result.filter((b: any) => this.checkOperation(aF?.value, b[aF?.keyName], aF?.operation || '=='))
        }
        this.FORM_SUPPORT_DATA[pValue] = [...data, ...res.result];
      } else {
        this.FORM_SUPPORT_DATA[pValue] = [];
      }
    }).finally(() => this.DATA_LOADING[pValue] = false)
  }

  refresh() {
    if (!this.dataList.length) {
      this.getData(false, {});
    } else {
      this.dataList = this.dataServe.tempData[this.dataName];
      this.changeDetector.detectChanges();
    }
  }

  mapDataItem(d: any) {
    // const d
  }

  mapData(data: any) {
    data.map((a: any) => {
      a.content = (a.church_name || '') + ' - ' + a.church_id || '';
      a.date = a.created_at || '';
      a.title = a.name || '',
        a.rightTop = a.member_id || ''
      return a;
    })
    return data;
  }

  onIonInfinite(e: any) {
    if (!this.isReachedPage) {
      this.getData(e, this.globalFilter)
    } else {
      e?.target?.complete();
    }
  }

  async getData(event: any, filter: any = {}, isRefresh = false) {
    const loaderInstance =await this.alertService.showLoader();
    console.log('show loader')
    let isFilter = false;
    let ev = { page: this.page_number, rows: this.page_limit, queryParams: [], whereField: [] };
    if (!isEmptyObj(filter)) {
      filter.page = 0;
      filter.rows = this.page_limit;
      ev = filter
      isFilter = true;
    }
    ev = createSearchTableQuery(ev);
    this.loadingPage = true;
    console.log('get Data', event)
    this.parentGetList(ev).then((res: ResponseData) => {
      if (res?.statusCode == RESPONSE_CODE.SUCCESS) {
        const data = !this.dataConfig.isLazy ? this.mapData(res.result) : this.mapData(res?.result.data || []);
        if (!isRefresh) {
          this.page_number++;
        }
        if (isFilter) {
          this.dataList = res.result?.data || [];
        } else {
          this.dataServe.tempData[this.dataName] = mergeArrayObject(this.dataServe.tempData[this.dataName], data, this.primaryKey);
          this.dataList = this.dataServe.tempData[this.dataName];
          console.log('data list', this.dataList)
        }
        if (!data || this.page_limit > data.length) {
          this.isReachedPage = true
        }
        if (event?.target) {
          event.target.complete();
        }
      }
      else {
        event?.target?.complete();
        this.alertService.showToast('unable to load..', 'info');
      }
    }).catch((error: any) => {
      event?.target?.complete();
      console.log('error', error)
      this.alertService.showToast('unable to load..', 'info');
    }).finally(() => {
      this.loadingPage = false
      console.log('dismiss loader',loaderInstance)
      this.alertService.dismissLoader(loaderInstance)
    });
  }

  doRefresh(e: any) { this.getData(e, this.globalFilter) }

  resetFilter() {
    this.globalFilter = {};
    //restore old page number//
    this.page_number = this.restoreList.page_number;
    this.isReachedPage = this.restoreList.isReachedPage;
    this.dataList = this.dataServe.tempData[this.dataName] || [];
  }

  onChangeInput(t: any, colName: string, type: 'filter' | 'sort' = 'filter') {
    const terms = t.target.value || '';
    if (type == 'sort') {
      this.globalFilter.sortField = colName;
      this.globalFilter.sortOrder = terms;
    } else {
      if (terms) {
        this.globalFilter.filters = { [colName]: { value: terms } }
      } else if (this.globalFilter.filters[colName]) {
        delete this.globalFilter.filters[colName];
      }
    }
    this.onFilter();
  }

  onFilter() {
    // on filter//
    this.page_number = 0;
    this.isReachedPage = false;
    this.getData({}, this.globalFilter)
  }

  doInfinite(event: any) {
    this.getData(true, event);
  }

  trackByFn(index: any, item: any) {
    return item ? item.id : undefined;
  }

  onEvent(e: any) {
    this.onAction.emit(e);
  }

  goToDetail(e: any) {
    const d: any = { eventName: 'CLICK', data: e };
    this.onAction.emit(d);
  }
}
