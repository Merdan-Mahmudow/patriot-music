import { useNavigate } from "@tanstack/react-router";
import "./index.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sendMessageToAdmins } from "../../hooks/api";


export default function Form(){
    const navigate = useNavigate();
    const [showError, setShowError] = useState<boolean>(false);
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!e.currentTarget.checkValidity()){
            setShowError(true);
            return;
        }
        const formData = new FormData(e.currentTarget);
        const form = Object.fromEntries(formData.entries());
        const message = `🔔 *Новая заявка!*\n\n👤 *Контактные данные:*\n\n▫️ Имя: ${form.name}\n▫️ Email: ${form.email}\n▫️ Телефон: ${form.phone}\n▫️ Телеграм: ${form.telegram || 'Не указан'}`;

        try {
            const ADMIN_BOT_TOKEN = process.env.REACT_APP_ADMIN_BOT_TOKEN;
            const ADMIN_CHAT_IDS = process.env.REACT_APP_ADMIN_CHAT_IDS?.split(',') as string[];
            const data = useQuery({
                    queryKey: ['send-sms'],
                    queryFn: () => sendMessageToAdmins({token: ADMIN_BOT_TOKEN, ids: ADMIN_CHAT_IDS, message: message}),
                })
            
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form-card1">
        <div className="form-card2">
          <form className="form" onSubmit={handleSubmit}>
            <p className="form-heading">Ваши контакты</p>
            <div className="form-field">
              <input
                required
                placeholder="Имя"
                className="input-field"
                type="text"
                name="name"
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity("Пожалуйста, заполните поле 'Имя'")
                }
                onInput={(e) => e.currentTarget.setCustomValidity('')}
              />
            </div>
            <div className="form-field">
              <input
                required
                placeholder="Email"
                className="input-field"
                type="email"
                name="email"
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity("Пожалуйста, заполните поле 'Email'")
                }
                onInput={(e) => e.currentTarget.setCustomValidity('')}
              />
            </div>
            <div className="form-field">
              <input
                required
                placeholder="Номер телефона"
                className="input-field"
                type="text"
                name="phone"
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity("Пожалуйста, заполните поле 'Номер телефона'")
                }
                onInput={(e) => e.currentTarget.setCustomValidity('')}
              />
            </div>
            <div className="form-field">
              <input
                placeholder="Телеграм"
                className="input-field"
                type="text"
                name="telegram"
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity("Пожалуйста, заполните поле 'Телеграм'")
                }
                onInput={(e) => e.currentTarget.setCustomValidity('')}
              />
            </div>
            <button type="submit" className="sendMessage-btn">Отправить</button>
          </form>
        </div>
      {/* Error popup */}
      {showError && (
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
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p>Пожалуйста, заполните все поля.</p>
            <button onClick={() => setShowError(false)}>Закрыть</button>
          </div>
        </div>
      )}
     </div>
    )
}