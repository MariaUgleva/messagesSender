import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers/rootReducer";
import { ReduxMessageType } from "../../type";
import { getMonthWord } from "../../functions/func";

const Messages: React.FC = (): JSX.Element => {
  const messages: Array<ReduxMessageType> = useSelector(
    (state: AppState) => state.mesages
  );
  return (
    <div className="container">
      <div className="messages">
        <h4 className="messages__title">Отправленные сообщения</h4>
        {messages.length ? (
          <table className="table__messages">
            <thead>
              <tr className="table__head">
                <th className="table__head-item date">Дата</th>
                <th className="table__head-item topic">Тема</th>
                <th className="table__head-item status">Статус</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((item) => (
                <tr key={item.data.id} className="table__messages-item message">
                  <td className="message__date">
                    {item.data.date.getDate()}{" "}
                    {getMonthWord(+item.data.date.getMonth())}
                  </td>
                  <td className="message__topic">
                    {item.data.topic.length
                      ? item.data.topic.length > 57
                        ? item.data.topic.substring(0, 60) + "..."
                        : item.data.topic
                      : "Без темы"}
                  </td>
                  <td data-value={item.status} className="message__status">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="messages__none">Сообщения ещё не отправлялись</p>
        )}
      </div>
    </div>
  );
};
export default Messages;
