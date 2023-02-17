import { Statuses } from "@/shared/components/applications/applications-list-filter/types";
import { Status } from "../../filter/types";

export const getStatuses = (): Status<Statuses>[] => {
    return [
        {
            id: Statuses.WAITING_FOR_APPROVAL,
            title: "На рассмотрении",
            isActive: false,
            iconName: "hourglass-top"
        },
        {
            id: Statuses.WITHOUT_HR_MANAGER,
            title: "Не требует рассмотрения ",
            isActive: false,
            iconName: "warning"
        },
        {
            id: Statuses.PROCESSED,
            title: "В процессе",
            isActive: false,
            iconName: "paper-plane"
        },
        {
            id: Statuses.REJECTED,
            title: "Отменен",
            isActive: false,
            iconName: "cross-icon"
        },
        {
            id: Statuses.CLAIMED,
            title: "Утверждено",
            isActive: false,
            iconName: "apply-icon"
        }
    ]
}