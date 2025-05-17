import {SelectTimePageElement} from "./SelectTimePageElement";
import {DateUtils} from "../../../../backend/Utils/DateUtils";

export class SelectTimePage {

    public selectSpecificTime(time: string): SelectTimePage {
        SelectTimePageElement.SelectSpecificTime.getElement(time)
            .click();
        return this;
    }
    public assertSpecificTime(time: string): SelectTimePage {
        const currentHour = parseInt(DateUtils.getCurrentHour());
        const currentMinute = parseInt(DateUtils.getCurrentMinutes());

        // Nie sprawdzaj, jeśli po 20:29
        if (currentHour > 20 || (currentHour === 20 && currentMinute > 29)) {
            return this;
        }

        if (currentHour < 10) {
            SelectTimePageElement.SelectSpecificTime.getElement('12:00');
        } else {
            SelectTimePageElement.SelectSpecificTime.getElement(time);
        }
        return this;
    }


    public verifySelectedTime(time: string): SelectTimePage {
        SelectTimePageElement.SelectedDayAssert.getElement(time)
            .should('have.class', 'bg-yellow-400').and('not.have.class', 'bg-gray-800')
        return this;
    }

    public verifyGivenSlotByActualTime(time: string): SelectTimePage {
        const [hourStr, minuteStr] = time.split(':');
        const slotHour = parseInt(hourStr, 10);
        const slotMinute = parseInt(minuteStr, 10);

        const validMinutes = ['00', '15', '30', '45'];

        // Check if the given time is after 20:00, if so, no available slots
        if (slotHour > 20 || (slotHour === 20 && slotMinute > 0)) {
            cy.log(`${time} is after 20:00, no available slots`);
            SelectTimePageElement.SelectSpecificTime.getNotExistingElement(time);
        }
        // Check if the time is not a valid slot (not 00, 15, 30, or 45)
        else if (!validMinutes.includes(minuteStr)) {
            cy.log(`${time} is not a valid time slot. Valid time slots are 00, 15, 30, 45`);
            SelectTimePageElement.SelectSpecificTime.getNotExistingElement(time);
        }
        // Otherwise, check for the available slot
        else {
            SelectTimePageElement.SelectSpecificTime.getElement(time);
        }
        return this;
    }

    public verifyGivenSlotNotExisting(time: string): SelectTimePage {
        SelectTimePageElement.SelectSpecificTime.getNotExistingElement(time);
        return this;
    }

    public verifySlotLength(length: number): SelectTimePage {
        SelectTimePageElement.SelectSpecificTime.getElements()
            .should('have.length', length)
        return this
    }

    public clickBackByButton(): SelectTimePage {
        const element = cy.get('utility-header-component').find('.bi.bi-x-lg').scrollIntoView().should('be.visible')
        element.click();
        return this
    }
}