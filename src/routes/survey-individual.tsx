import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { useState } from 'react'
import { FormType, MessageFormType } from '../types'
import { useStore } from '@tanstack/react-store'
import { store } from '../store/store'
import { v4 as uuid4 } from 'uuid'
import ButtonBack from '../components/ButtonBack'
import { saveIndividualForm } from '../hooks/mutation'
import "./survey.css"

const SurveySearchParams = z.object({
  name: z.string(),
})

type SearchParams = z.infer<typeof SurveySearchParams>

export const Route = createFileRoute('/survey-individual')({
  component: Survey,
  validateSearch: (params: SearchParams) => SurveySearchParams.parse(params),
})

function Survey() {
  const fieldClass = "text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100 input-field";
  const { name } = Route.useSearch()
  const [formData, setFormData] = useState<FormType>()
  const contactForm = useStore(store, (state) => state.contactForm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }) as FormType);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message: MessageFormType = {
      id: `${uuid4()}`,
      name: contactForm.name || "Не указано",
      email: contactForm.email || "Не указано",
      phone: contactForm.phone || "Не указано",
      telegram: contactForm.telegram || "Не указано",
      formRole: formData?.formRole || "Не указано",
      songFor: formData?.songFor || "Не указано",
      heroName: formData?.heroName || "Не указано",
      heroOrigin: formData?.heroOrigin || "Не указано",
      heroItem: formData?.heroItem || "Не указано",
      job: formData?.job || "Не указано",
      equipment: formData?.equipment || "Не указано",
      motivation: formData?.motivation || "Не указано",
      comrades: formData?.comrades || "Не указано",
      moments: formData?.moments || "Не указано",
      words: formData?.words || "Не указано",
      additionalChecks: formData?.additionalChecks || { remembrance: false, personalMessage: false, specialPhrases: false, futureMessage: false },
      remembranceText: formData?.remembranceText || "Не указано",
      personalMessageText: formData?.personalMessageText || "Не указано",
      specialPhrasesText: formData?.specialPhrasesText || "Не указано",
      futureMessageText: formData?.futureMessageText || "Не указано",
      otherText: formData?.otherText || "Не указано",
      planName: name || "Не указано",
    }
      try {
         saveIndividualForm({ message });
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
  }

  return (
    <>
       <div className=""> {/*{showPopup ? "blur-background" : ""} */}
        <div className="h-15">
          <ButtonBack to='/pricing' />
        </div>
        <form className="px-5 py-10 pb-[550px]" onSubmit={handleSubmit}>
          {/* Updated custom radio group for formRole */}
          <h2 className="text-2xl text-center mb-5 font-header_form">
            Для кого
          </h2>
          <div className="w-full px-4 py-5 bg-[rgba(44,44,44,0.8)] flex flex-col gap-3 rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
            <legend className="text-lg font-semibold mb-3 select-none text-white">
              1 Кто заполняет форму?
            </legend>
            <label
              htmlFor="option1"
              className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg select-none ${
                formData?.formRole === "Я солдат, хочу песню о себе"
                  ? "text-black bg-blue-50 ring-blue-300 ring-1"
                  : ""
              }`}
              onClick={() =>
                setFormData({
                  ...formData,
                  formRole: "Я солдат, хочу песню о себе",
                })
              }
            >
              <div className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    formData?.formRole === "Я солдат, хочу песню о себе"
                      ? "text-[#4a592c]"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Я солдат, хочу песню о себе
            </label>
            <label
              htmlFor="option2"
              className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg select-none ${
                formData?.formRole ===
                "Я близкий человека (жена, мать, отец, друг)"
                  ? "text-black bg-blue-50 ring-blue-300 ring-1"
                  : ""
              }`}
              onClick={() =>
                setFormData({
                  ...formData,
                  formRole: "Я близкий человека (жена, мать, отец, друг)",
                })
              }
            >
              <div className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    formData?.formRole ===
                    "Я близкий человека (жена, мать, отец, друг)"
                      ? "text-[#4a592c]"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Я близкий человека (жена, мать, отец, друг)
            </label>
            <label
              htmlFor="option3"
              className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg select-none ${
                formData?.formRole === "Я сослуживец"
                  ? "text-black bg-blue-50 ring-blue-300 ring-1"
                  : ""
              }`}
              onClick={() =>
                setFormData({ ...formData, formRole: "Я сослуживец" })
              }
            >
              <div className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    formData?.formRole === "Я сослуживец"
                      ? "text-[#4a592c]"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Я сослуживец
            </label>
          </div>

          <div className="w-full mb-5 px-4 py-5 bg-[rgba(44,44,44,0.8)] flex flex-col gap-3 rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)] mt-5">
            <legend className="text-lg font-semibold mb-3 select-none">
              2. Для кого создаётся песня?
            </legend>
            <label
              htmlFor="option1_song"
              className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg select-none ${
                formData?.songFor === "Для солдата на передовой"
                  ? "text-black bg-blue-50 ring-blue-300 ring-1"
                  : ""
              }`}
              onClick={() =>
                setFormData({
                  ...formData,
                  songFor: "Для солдата на передовой",
                })
              }
            >
              <div className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    formData?.songFor === "Для солдата на передовой"
                      ? "text-[#4a592c]"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Для солдата на передовой
            </label>
            <label
              htmlFor="option2_song"
              className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg select-none ${
                formData?.songFor === "От солдата близким"
                  ? "text-black bg-blue-50 ring-blue-300 ring-1"
                  : ""
              }`}
              onClick={() =>
                setFormData({ ...formData, songFor: "От солдата близким" })
              }
            >
              <div className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    formData?.songFor === "От солдата близким"
                      ? "text-[#4a592c]"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              От солдата близким
            </label>
            <label
              htmlFor="option3_song"
              className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg select-none ${
                formData?.songFor === "Чтобы увековечить свою историю"
                  ? "text-black bg-blue-50 ring-blue-300 ring-1"
                  : ""
              }`}
              onClick={() =>
                setFormData({
                  ...formData,
                  songFor: "Чтобы увековечить свою историю",
                })
              }
            >
              <div className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    formData?.songFor === "Чтобы увековечить свою историю"
                      ? "text-[#4a592c]"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Чтобы увековечить свою историю
            </label>
          </div>

          <h2 className="text-2xl text-center font-header_form">О герое</h2>
          <div>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg mt-5 mb-5">
              <label className="font-semibold text-lg">
                1.Как его зовут? Какой у него позывной?
              </label>
              <div className="form-field mt-6">
                <input
                  type="text"
                  name="heroName"
                  value={formData?.heroName || ""}
                  onChange={handleChange}
                  placeholder="Например: Алексей, «Барс»"
                  className={fieldClass} // updated
                  id="heroName-input"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg font-mono">
              <label className="font-semibold text-lg">
                2.Откуда он родом?
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="heroOrigin"
                  value={formData?.heroOrigin || ""}
                  onChange={handleChange}
                  placeholder="Например: Город Курган, вырос на берегу Тобола"
                  className={fieldClass} // updated
                  id="heroOrigin-textarea"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg mt-5 mb-5 font-semibold">
              <label className="font-semibold text-lg">
                3.Есть ли у него особая вещь, символ или талисман? Почему это
                важно?
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="heroItem"
                  value={formData?.heroItem || ""}
                  onChange={handleChange}
                  placeholder="Например: Кулон с именем дочери"
                  className={fieldClass} // updated
                  id="heroItem-textarea"
                  required
                />
              </div>
            </div>
          </div>

          <h2 className="text-2xl text-center font-header_form">О службе</h2>
          <div>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg mt-5 mb-5">
              <label className="font-semibold text-lg">
                4.Чем он занимается на передовой?
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="job"
                  value={formData?.job || ""}
                  onChange={handleChange}
                  placeholder="Например: Разведчик в группе наблюдения"
                  className={fieldClass} // updated
                  id="job-textarea"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg font-mono  mt-5 mb-5">
              <label className="font-semibold text-lg">
                5.С какой техникой или оружием он работает?
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="equipment"
                  value={formData?.equipment || ""}
                  onChange={handleChange}
                  placeholder="Например: Снайпер с винтовкой СВД"
                  className={fieldClass} // updated
                  id="equipment-textarea"
                  required
                />
              </div>
            </div>
          </div>

          <h2 className="text-2xl text-center font-header_form">
            О характере, мотивации и команде
          </h2>
          <div>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg font-mono mt-5 mb-5">
              <label className="font-semibold text-lg">
                6.Что даёт ему силу и мотивацию? Какие качества ценит?
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="motivation"
                  value={formData?.motivation || ""}
                  onChange={handleChange}
                  placeholder="Например: Вера в победу и поддержка родных"
                  className={fieldClass} // updated
                  id="motivation-textarea"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg font-mono mt-5 mb-5">
              <label className="font-semibold text-lg">
                7.Кто его боевые товарищи?
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="comrades"
                  value={formData?.comrades || ""}
                  onChange={handleChange}
                  placeholder="Например: Традиции и ритуалы в сплочённой команде"
                  className={fieldClass} // updated
                  id="comrades-textarea"
                  required
                />
              </div>
            </div>
          </div>

          <h2 className="text-2xl text-center font-header_form">
            Личное послание в песню
          </h2>
          <div>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg font-mono mt-5 mb-5">
              <label className="font-semibold text-lg">
                8.Какие моменты из жизни героя должны прозвучать?
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="moments"
                  value={formData?.moments || ""}
                  onChange={handleChange}
                  placeholder="Например: Первые дни на службе, победы и трудности"
                  className={fieldClass} // updated
                  id="moments-textarea"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg font-mono mt-5 mb-5">
              <label className="font-semibold text-lg">
                9.Какие слова, цитаты или обещания важно включить?
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="words"
                  value={formData?.words || ""}
                  onChange={handleChange}
                  placeholder="Например: «Брат за брата, никто не забыт!»"
                  className={fieldClass} // updated
                  id="words-textarea"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl text-center font-header_form">
              Что ещё нужно передать?
            </h2>
            <div className="w-full p-5 bg-[rgba(44,44,44,0.8)] rounded-lg font-mono mt-5 mb-5">
              <label className="font-semibold text-lg">
                Воспоминания о службе
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="remembranceText"
                  value={formData?.remembranceText || ""}
                  onChange={handleChange}
                  placeholder="Введите воспоминания о службе"
                  className={fieldClass}
                />
              </div>
              <label className="font-semibold text-lg">Личное обращение</label>
              <div className="form-field mt-6">
                <textarea
                  name="personalMessageText"
                  value={formData?.personalMessageText || ""}
                  onChange={handleChange}
                  placeholder="Введите личное обращение"
                  className={fieldClass}
                />
              </div>
              <label className="font-semibold text-lg">
                Особые фразы, цитаты
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="specialPhrasesText"
                  value={formData?.specialPhrasesText || ""}
                  onChange={handleChange}
                  placeholder="Введите особые фразы или цитаты"
                  className={fieldClass}
                />
              </div>
              <label className="font-semibold text-lg">
                Послание в будущее
              </label>
              <div className="form-field mt-6">
                <textarea
                  name="futureMessageText"
                  value={formData?.futureMessageText || ""}
                  onChange={handleChange}
                  placeholder="Введите послание в будущее"
                  className={fieldClass}
                />
              </div>
              <label className="font-semibold text-lg pt-5">📝 Другое:</label>
              <div className="form-field mt-6">
                <textarea
                  name="otherText"
                  value={formData?.otherText || ""}
                  onChange={handleChange}
                  placeholder="Ваш текст"
                  className={fieldClass}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="relative group inline-block w-full py-4 px-6 text-center text-gray-50 hover:text-gray-900 bg-[#7CA200] font-semibold rounded-full overflow-hidden transition duration-200"
            // onClick={handleSubmit}
          >
            Отправить
          </button>
        </form>
      </div>
      {/* {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              // background: "#fff",
              // padding: "20px",
              borderRadius: "8px",
              position: "relative",
            }}
          >
          </div>
        </div>
      )} */}
    </>
  );
}

