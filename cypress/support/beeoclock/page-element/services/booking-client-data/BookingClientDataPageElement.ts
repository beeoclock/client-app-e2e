import { CommentInput } from "./page-element/CommentInput";
import { EmailInput } from "./page-element/EmailInput";
import { FirstNameInput } from "./page-element/FirstNameInput";
import { PhoneInput } from "./page-element/PhoneInput";
import {SelectedService} from "./selected-service-summary/SelectedService";
import {ServicePrice} from "./selected-service-summary/ServicePrice";
import {ServiceDate} from "./selected-service-summary/ServiceDate";
import {ServiceSpecialist} from "./selected-service-summary/serviceSpecialist";
import {ServiceTime} from "./selected-service-summary/ServiceTime";
import {SummaryPriceValue} from "./page-element/SummaryPriceValue";

export class BookingClientDataPageElement {

    public static FirstNameInput: FirstNameInput = new FirstNameInput();
    public static EmailInput: EmailInput = new EmailInput();
    public static PhoneInput: PhoneInput = new PhoneInput();
    public static CommentInput: CommentInput = new CommentInput();
    public static SelectedService: SelectedService = new SelectedService();
    public static ServicePrice: ServicePrice = new ServicePrice();
    public static ServiceDate: ServiceDate = new ServiceDate();
    public static ServiceSpecialist: ServiceSpecialist = new ServiceSpecialist();
    public static ServiceTime: ServiceTime = new ServiceTime();
    public static SummaryPriceValue: SummaryPriceValue = new SummaryPriceValue();
}