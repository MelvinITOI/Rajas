
import { tblFilter } from '../dataModal/response';
import { roleMap, Concrete, modulInterface, actionInterface, roleKey, userPermission, dynamicObjectKey } from '../dataModal/user';
import { MODULE_NAME } from '../utility/app-constant';
import { isArray, isExistsKey } from '../utility/utility-helper';


export class RolePermissionService {
  module = MODULE_NAME;
  userRoleData: roleMap = {} as roleMap;
  constructor() {}


  checkPermission(mName: Concrete<keyof modulInterface> | undefined, aName: Concrete<keyof actionInterface> | undefined) {
    if (mName == undefined || aName == undefined) {
      return false;
    }
    const s = isExistsKey(this.userRoleData, [mName, aName]);
    if (s) {
      return this.userRoleData[mName][aName];
    }
    return false;
  }

  getModuleByAction(aName: Concrete<keyof actionInterface>[]): any {
    return Object.keys(this.userRoleData).filter((a: any) => aName.filter((e: string) => isExistsKey(this.userRoleData, [a, e]) == true).length > 0)
    //return this.mapTblFilter(res)
  }

  private mapTblFilter(moduleName: any = [], keys: any = []) {
    let res: any = [];
    moduleName.forEach((a: any) => {
      const keysVal = keys.length ? keys : Object.keys(this.userRoleData[a].permission) || [];
      if (keysVal.length) {
        keysVal.map((aN: roleKey) => {
          const p: any = this.userRoleData[a].permission[aN] || [];
          let sp = [];
          if (p.includes('All')) {
            sp.push(0);
          } else {
            sp = p
          }
          res.push({ colName: aN, value: sp });
        });
      }
    })
    if (keys.length == 1) {
      return res[0] || {}
    }
    return res;
  }


  getPermittedId(mName: Concrete<keyof modulInterface>[], aName: Concrete<keyof actionInterface>[], keys: roleKey[] = []) {
    const res: any = [];
    if (mName.length) {
      mName.map((mN: any) => {
        aName.forEach(aN => {
          if (isExistsKey(this.userRoleData,[mN,aN])) {
            if (keys.length) {
              keys.map((a) => {
                const p: any = this.userRoleData[mN].permission[a] || '';
                const sp = [];
                if (p.includes('All')) {
                  sp.push(0);
                } else {
                  if (isArray(p)) {
                    sp.push(p.join(','))
                  } else
                    sp.push(p);
                }
                const s: tblFilter = { colName: a, value: sp }
                console.log('final permission', s)
                res.push(s);
              });
            }
          }
        });
      })
    }
    return res;
  }
  getPermittedData(mName: Concrete<keyof modulInterface>[], aName: Concrete<keyof actionInterface>[], keys: roleKey[] = []) {
    let d: any = this.getPermittedId(mName, aName, keys);
    if (Array.isArray(d)) {
      d.forEach((e: any, i) => {
        const searchArray = ((e.value[0] || '')?.split(',') || []).filter((a:any) => a);
        const containAll = ['-1', '0',0,''].some((item: any) => searchArray.indexOf(item) !== -1);
        console.log('e value', containAll)
        if (containAll || !searchArray.length) {
          d[i].value = [];
        }else{
          d[i] =searchArray
        }
      });
      return d;
    } else {
      return []
    }
  }

  async mapRolePermission(p: Array<userPermission> | userPermission) {
    const x: Array<userPermission> = Array.isArray(p) ? p : [p];
    const roleP: roleMap = {} as roleMap;
    await x.forEach((obj: userPermission) => {
      if (!roleP[obj.moduleName]) {
        roleP[obj.moduleName] = {} as dynamicObjectKey;
        roleP[obj.moduleName].permission = { zone: [], department: [], institution: [], promotional_office: [], region: [], ad_office: [], trust: [], sponsorship_module: [], home: [],church : [] };
      }
      roleP[obj.moduleName][obj.actionName] = true;
      for (const [key, value] of Object.entries(roleP[obj.moduleName].permission)) {
        if (obj.hasOwnProperty(key)) {
          // @ts-ignore
          const v = +obj[key] == 0 ? 'All' : +obj[key];
          if (!value.includes(v) && v) {
            value.push(v);
          }
        }
      }
    });
    return roleP;
  }
}
