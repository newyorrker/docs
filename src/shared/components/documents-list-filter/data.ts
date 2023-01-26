import { OtherStatuses, Statuses } from "@/service/repositories/types";
import { Status } from "./types";

export const getStatuses = (): Status<Statuses>[] => {
    return [
        {
            id: Statuses.completed,
            title: "Завершен",
            isActive: false,
            iconName: "document-check-icon"
        },
        {
            id: Statuses.rejected,
            title: "Отменен",
            isActive: false,
            iconName: "cross-icon"
        },
        {
            id: Statuses.inProcess,
            title: "В процессе",
            isActive: false,
            iconName: "document-progress-icon"
        }

    ]
}

export const getOtherStatuses = (): Status<OtherStatuses>[] => {
    return [
        {
            id: Statuses.notSeen,
            title: "Не просмотрен",
            isActive: false,
            iconName: "eye-strikethrough-icon"
        },
        {
            id: Statuses.seen,
            title: "Просмотрен",
            isActive: false,
            iconName: "eye-icon"
        },
        {
            id: Statuses.rejected,
            title: "Отклонен",
            isActive: false,
            iconName: "cross-icon"
        },
        {
            id: Statuses.signed,
            title: "Подписан",
            isActive: false,
            iconName: "apply-icon"
        }
    ];
}