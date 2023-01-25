import { OtherStatuses, Statuses } from "@/service/repositories/types";
import { Status } from "./types";

export const getStatuses = () => {
    return [
        {
            id: Statuses.completed,
            title: "Завершен",
            isActive: false
        },
        {
            id: Statuses.deleted,
            title: "Удален",
            isActive: false
        },
        {
            id: Statuses.draft,
            title: "Черновик",
            isActive: false
        },
        {
            id: Statuses.rejected,
            title: "Отменен",
            isActive: false
        },
        {
            id: Statuses.inProcess,
            title: "В процессе",
            isActive: false
        }

    ]
}

export const getOtherStatuses = (): Status<OtherStatuses>[] => {
    return [
        {
            id: Statuses.notSeen,
            title: "Не просмотрен",
            isActive: false
        },
        {
            id: Statuses.seen,
            title: "Просмотрен",
            isActive: false
        },
        {
            id: Statuses.rejected,
            title: "Отклонен",
            isActive: false
        },
        {
            id: Statuses.signed,
            title: "Подписан",
            isActive: false
        }
    ];
}