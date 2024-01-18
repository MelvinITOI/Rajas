import { dataColum, tbl_condition } from "src/app/helper/dataModal/response"
import { userPermission } from "src/app/helper/dataModal/user"
// import { SwipeItemComponent } from "src/app/modules/swiper/component/swipe-item/swipe-item.component"

export interface eventBtn {
  eventName: string
  action: any,
  value: any,
  style: any,
  // instance: SwipeItemComponent
}
interface iconConfig {
  name: string,
  color?: string
  class?: string
}
export interface swipeBtn {
  title?: string,
  isIcon?: boolean,
  iconConfig?: iconConfig,
  eventName: string,
  class?: string
  color?: string
  alignment: 'RIGHT' | 'LEFT',
  isConfirm?: boolean,
  confirmConfig?: confirmBox,
  permission?: userPermission,
  condition?: tbl_condition[],
}
export interface swipeItemData {
  column: dataColum[],
  condition?: tbl_condition[],
  permission?: userPermission,
  showHighlight?: boolean
  highlightColor?: string
  showImage?: boolean,
  swipeBtn?: swipeBtn[]
}

export interface confirmBox {
  message: string;
  header: string;
  button1?: string
  button2?: string,
  type: 'confirm',
  inputs?: []
  backdropDismiss?: boolean;

}