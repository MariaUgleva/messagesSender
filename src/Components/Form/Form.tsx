import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { initialFormData } from "../../functions/initial";
import { nanoid } from "nanoid";
import { Ref, errorsType } from "../../type";
import logo from "../../img/logo.svg";
import "../../index.scss";
import Input from "../Input/Input";
import { countSizeFiles, checkValidate } from "../../functions/func";
import {
  loadMessageAction,
  sentMessageAction,
} from "../../redux/actions/messagesActions";
import MessageStatus from "../MessageStatus/MessageStatus";
/* eslint-disable*/

const Form: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  // состояние содержит информацию о том, было ли отправлено сообщение (в зависисмости от него отрисовывается или нет окно MessageStatus)
  const [messageSent, setMessageSent] = useState<boolean>(false);
  // состояние хранит ссылки на input ы в которые кладем файлы
  const [refs, setRefs] = useState<Ref[]>([]);
  // состояние ошибок (обязательные поля с email-ами и размер прикрепляемых файлов)
  const [errorsState, setErrorsState] = useState<errorsType>({
    senderError: false,
    recipientError: false,
    sizeError: false,
  });
  // состояние с данными, вводимыми в input-ы
  const [formData, setFormData] = useState(initialFormData);
  // ф-я отслеживает все input-ы и изменяет
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  // просто состояние для принудительной перерисовки страницы типа forseUpdate
  const [zero, setState] = useState({});
  // отслеживаем добавление файла в input (они скрыты), при каждом добалении файла перерисывываем страничку
  const handleFilechange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({});
  }, []);
  // отслеживаем кнопку удаления добавленного файла
  const deleteFileHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>):void => {
    event.preventDefault();
    const newRefs = refs.filter(item => event.currentTarget.id !== item.id);
    setRefs([...newRefs]);
  }, [refs]);
  // отслеживаем кнопку "отправить"
  const onSend = (event: React.MouseEvent<HTMLButtonElement>):void => {
    event.preventDefault();
    // считаем объем сообщений
    const size: number | boolean = countSizeFiles(refs);
    // проверяем корректность заполнения формы (ф-я изменяет состояние ошибок)
    setErrorsState({
      ...checkValidate(formData.senderEmail, formData.recipientEmail, size),
    });
    console.log(errorsState)
    console.log(formData)
    // если нет ошибок ...
    if (
      formData.senderEmail &&
      formData.recipientEmail &&
      !errorsState.sizeError
    ) {
      // создаем id для сообщения
      const id = nanoid();
      // отправляем его в стэйт со статусом "в очереди"
      dispatch(
        loadMessageAction({
          ...formData,
          date: new Date(),
          files: refs,
          id: id,
        })
      );
      // очищаем форму
      setFormData(initialFormData);
      // статус сообщения "отправлено" -> отрисовываем окно с успешной постановкой в очередь отправки
      setMessageSent(true);
      // через 5 сек устанавливаем статус сообщения в "отправлено"
      setTimeout(() => dispatch(sentMessageAction(id)), 5000);
    }
  };
  const addRef = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // создаем ссылку на input элемент
    const ref = await React.createRef<HTMLInputElement>();
    // добавляем ее в массив элементов
    await setRefs([...refs, { id: nanoid(), ref: ref }]);
    // открываем новый инпут
    await ref.current?.click();
  };
  if (messageSent) return <MessageStatus setMessageSent={setMessageSent} />;
  return (
    <div className="container">
      <img src={logo} alt="" className="logo" />
      <div className="form">
        <form action="" className="form__inner">
          <h4 className="form__title">Отправлялка сообщений</h4>
          <div className="form__list">
            <Input
              id="senderName"
              label="От кого"
              value={formData.senderName}
              type="text"
              onChange={handleChange}
              placeholder="Имя"
            />
            <Input
              id="senderEmail"
              label=""
              value={formData.senderEmail}
              type="text"
              onChange={handleChange}
              placeholder="Email"
              errors={errorsState}
            />
            <Input
              id="recipientName"
              label="Кому"
              value={formData.recipientName}
              type="text"
              onChange={handleChange}
              placeholder="Имя"
            />
            <Input
              id="recipientEmail"
              label=""
              value={formData.recipientEmail}
              type="text"
              onChange={handleChange}
              placeholder="Email"
              errors={errorsState}
            />
            <Input
              id="topic"
              label="Тема письма"
              value={formData.topic}
              type="text"
              onChange={handleChange}
              placeholder="Моя тема письма"
            />
            <Input
              label="Сообщение"
              type="textarea"
              onChange={handleChange}
              id="letter"
              value={formData.letter}
              placeholder="Введите ваше сообщение"
            />
          </div>
          {refs.map((item: Ref) => (
            <input
              key={item.id}
              id="file-input"
              name="file"
              type="file"
              ref={item.ref}
              data-id={item.id}
              onChange={handleFilechange}
            />
          ))}
          <div className="form__files">
            {refs.map((item) => {
              if (item?.ref.current?.files?.[0]?.name) {
                return (
                  <div className="form__file" key={item.id}>
                    {item.ref.current?.files?.[0]?.name}
                    <button
                      id={item.id}
                      onClick={deleteFileHandler}
                      className="form__file-delete"
                    >
                      Удалить
                    </button>
                  </div>
                );
              }
            })}
          </div>
          <button type="button" className="form__btn-attach" onClick={addRef}>
            Прикрепить файл
          </button>
          {errorsState.sizeError ? (
            <div className="error__message">Недопустимый объём файлов</div>
          ) : null}
          <button type="submit" className="form__btn" onClick={onSend}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};
/* eslint-enable*/
export default Form;
