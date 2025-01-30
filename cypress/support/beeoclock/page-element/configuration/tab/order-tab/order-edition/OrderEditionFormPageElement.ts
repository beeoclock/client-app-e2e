import {SelectGivenSpecialist} from "./order-specialist/SelectGivenSpecialist";
import {SelectSpecialistButton} from "./order-specialist/SelectSpecialistButton";
import {OrderCustomerButton} from "./order-customer/OrderCustomerButton";
import {OrderPriceComponent} from "./order-price/OrderPriceComponent";
import {EditButton} from "./clipboard/page-element/EditButton";
import {SelectServiceLink} from "./clipboard/page-element/SelectServiceLink";
import {SelectGivenService} from "./clipboard/page-element/SelectGivenService";

export class OrderEditionFormPageElement {

 //specialist
 public static SelectGivenSpecialist: SelectGivenSpecialist = new SelectGivenSpecialist()
 public static SelectSpecialistButton: SelectSpecialistButton = new SelectSpecialistButton()

 //customer
 public static OrderCustomerButton: OrderCustomerButton = new OrderCustomerButton()

 //price
 public static OrderPriceComponent: OrderPriceComponent = new OrderPriceComponent()
 public static EditButton: EditButton = new EditButton()
 public static SelectServiceLink: SelectServiceLink = new SelectServiceLink()
 public static SelectGivenService: SelectGivenService = new SelectGivenService()
}