import { RefObject} from "react";
export type InputType = {
    id: string,
    label: string,
    value: string,
    type: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    placeholder: string,
    errors? : errorsType
};
export type Ref = {
    id: string,
    ref: RefObject<HTMLInputElement>,
};
export type errorsType = {
    senderError: boolean,
    recipientError: boolean,
    sizeError: boolean,
};
export type MessageType = {
    id: string,
    date: Date,
    senderName: string,
    senderEmail: string,
    recipientName: string,
    recipientEmail: string,
    topic: string,
    letter: string,
    files: Array<Ref>
}
export type ReduxMessageType = {
    status: string,
    data: MessageType
}
