import {TestCaseEnum} from "../../enum/TestCaseEnum";
import {SpecialistNameEnum} from "../../../support/beeoclock/page-element/common/enum/SpecialistNameEnum";
import {CalendarTableTimeEnum} from "../../../support/beeoclock/page-element/configuration/tab/calendar/calendar-table/enum/CalendarTableTimeEnum";
import {DateUtils} from "../../../support/beeoclock/backend/Utils/DateUtils";
import {TimeEnum} from "../../../support/beeoclock/page-element/configuration/tab/calendar/calendar-table/enum/TimeEnum";

export class PanelAbsenceCreationDataProvider {
    static getTestData(caseEnum: TestCaseEnum) {

        switch (caseEnum) {
            case TestCaseEnum.CASE_1:
                return {
                    specialist: SpecialistNameEnum.ZALEWSKI,
                    time: CalendarTableTimeEnum.Hour_12,
                    absenceRange: '30',
                    selectedTime: TimeEnum.Hour_12.toString(),
                    absenceFromDate: DateUtils.formatDateDaysAhead(1),
                    absenceFromTime: TimeEnum.Hour_12,
                    absenceToDate: DateUtils.formatDateDaysAhead(1),
                    absenceToTime: TimeEnum.Hour_12_30,
                    absenceNote: 'Jutrzejszy obiad Tomka',
                    assertTableAbsence: 'Przerwa\n12:00 - 12:30'
                }
            case TestCaseEnum.CASE_2:
                return {
                    specialist: SpecialistNameEnum.E2E_E2E,
                    time: CalendarTableTimeEnum.Hour_15,
                    absenceRange: '30',
                    selectedTime: TimeEnum.Hour_15.toString(),
                    absenceFromDate: DateUtils.formatDateDaysAhead(1),
                    absenceFromTime: TimeEnum.Hour_15.toString(),
                    absenceToDate: DateUtils.formatDateDaysAhead(1),
                    absenceToTime: TimeEnum.Hour_15_30,
                    absenceNote: 'Jutrzejszy obiad e2e',
                    assertTableAbsence: 'Przerwa\n15:00 - 15:30'
                }
        }
    }
}