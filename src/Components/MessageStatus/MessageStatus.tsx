import React, {useCallback} from "react";
type SendMes = {
  setMessageSent: (messageSent: boolean) => void;
};
const MessageStatus: React.FC<SendMes> = ({ setMessageSent }): JSX.Element => {
  const goBack = useCallback(() => setMessageSent(false), [setMessageSent]);
  return(
    <div title='Нажми сюда, чтобы вернуться в окно формы' onClick={goBack} className="message__sent container">
      <div className="message__sent-inner">
        <h4 className="message__sent-title">
          Сообщение поставлено в очередь на отправку
        </h4>
        <p className="message__sent-text">
          Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону
          почты получателя «abc@my.com» со скоростью электронов.
        </p>
      </div>
    </div>
  );
};
export default MessageStatus;
