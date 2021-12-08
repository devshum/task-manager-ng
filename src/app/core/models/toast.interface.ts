export type ToastSeverity = 'add' | 'edit' | 'delete';

export interface Toast {
    id: string;
    severity: ToastSeverity;
    life: number;
    title: string;
    message: string;
}
export class ToastMessage implements Toast {
    id: string;
    severity: ToastSeverity;
    life: number;
    title: string;
    message: string;

    constructor({
        id = null,
        severity = null,
        life = 3 * 1000,
        title = null,
        message = null
    }: Partial<Toast> = {}) {
        this.id = id;
        this.severity = severity;
        this.life = life;
        this.title = title;
        this.message = message;
    }
}
