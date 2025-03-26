import { ContactFormType } from "../../types"
import { store } from "../store"

export const updateContact = (form: ContactFormType) => {
    store.setState((state) => {
      return {
        ...state,
        contactForm: form,
      }
    })
  }