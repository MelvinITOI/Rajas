import { FormGroup } from "@angular/forms";
import { Capacitor } from "@capacitor/core";
import { imgExtensions, audioExtension, videoExtension } from "src/app/modules/image-helper/interface/file";
import { environment } from "src/environments/environment";
import { AppConstant } from "./app-constant";

export function convertDate(data: any): Date | any {
  const dat = new Date(data);
  return `${dat.getFullYear()}-${dat.getMonth() + 1}-${dat.getDate()}`;
  return dat;
}

export function removeDuplicates(arr: any) {
  return [...new Set(arr)];
}
export function isWeb() {
  return Capacitor.getPlatform() == 'web';
}
export function isMobileNative() {
  return Capacitor.isNativePlatform();
}

export function createSearchTableQuery(event: any) {
  if (!event)
    return null;

  const search: any = {};
  let sortText;
  search.page = event.page || 0;
  if (event.first && !event.page)
    search.page = (event.first / AppConstant.TABLE_PAGE_ROWS) || 1;

  search.rows = event.rows;
  if (event.filters) {
    search.queryParams = [];
    Object.keys(event.filters).forEach(key => {
      if (event.filters[key].value) {
        event.filters[key]['colName'] = key;
        search.queryParams.push(event.filters[key]);
      }
    });
  }
  if (event.sortField) {
    search.sort = [];
    if (event.sortOrder == 1) {
      sortText = 'asc';
    }
    else if (event.sortOrder == -1) {
      sortText = 'desc';
    }
    if (event.sortField) {
      search.sort.push({ colName: event.sortField, sortOrder: sortText });
    }
  }
  return search;
}

export function extractNumber(txt: string | number) {
  return +(String(txt).replace(/\D/g, ''));
}

export function checkInternet() {
  return window.navigator.onLine;
}

export function isExistsKey(obj: any, props: Array<string>): any {
  var prop = props.shift();
  return prop === undefined ? true : obj.hasOwnProperty(prop) ? isExistsKey(obj[prop], props) : false;
}
export function uniqueArray(a: any) {
  return a.filter(function (i: any, p: any) {
    return a.indexOf(i) == p;
  });
}

export function titleCase(str: any) {
  return str.toLowerCase().replace(/\b(\w)/g, (s: any) => s.toUpperCase());
}

export function isArray(data: any) {
  if (Array.isArray(data)) {
    return data.length;
  }
  return false;
}

export function toMonthName(monthNumber: any = new Date().getMonth(), type: 'short' | 'long' | 'numeric' | '2-digit' = 'short') {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString('en-US', {
    month: type,
  });
}


export function sort(arr: any, prop: string, desc?: boolean) {
  arr.sort(function (a: any, b: any) {
    if (!a[prop]) return -1;
    return a[prop].toString()?.localeCompare(b[prop], "en", { ignorePunctuation: true });
  });
  if (desc) arr.reverse();
  return arr;
}

export function mergeArrayObject(ar1: any[], ar2: any[], key: string) {
  const ids = new Set(ar1.map(d => d[key]));
  return [...ar1, ...ar2.filter(d => !ids.has(d[key]))];
}

export function cleanForm(formGroup: FormGroup): any {
  Object.keys(formGroup.controls).forEach((key) => {
    if (formGroup.get(key)?.value && typeof formGroup.get(key)?.value == 'string')
      formGroup.get(key)?.setValue(formGroup.get(key)?.value?.trim());
  });
}

export function stringSearch(data: any, search: any) {
  let v = new RegExp(search, "i");
  if (search) {
    return data.match(v);
  }
  return true;
}

export function filterData(filters: any, data: any): any {
  if (!filters)
    return [];
  let keys: any = Object.keys(filters);
  return data.filter((item: any) => {
    return keys.every((key: any) => {
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
}

export function getFullUrl(url: string) {
  return environment.apiUrl + url;
}

export function timediff(endtime: any, startTime = new Date()) {
  if (!endtime) {
    return 0;
  }
  return (endtime.getTime() - startTime.getTime()) / 1000;
}

export function isEmptyObj(obj: any) {
  if (obj && typeof obj === 'object') {
    return Object.getOwnPropertyNames(obj).length == 0;
  } else {
    return true;
  }
}
export function getMineType(fileName: string) {
  if (fileName && typeof fileName === 'string') {
    const ext: any = fileName.split(".").pop()?.toLocaleLowerCase();
    let type = 'application/'
    if (imgExtensions.includes(ext)) {
      type = 'image/';
    } else if (audioExtension.includes(ext)) {
      type = 'audio/';
    } else if (videoExtension.includes(ext)) {
      type = 'video/';
    }
    return type + ext
  } else {
    return false;
  }
}
