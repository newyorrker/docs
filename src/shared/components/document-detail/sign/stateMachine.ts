import { createMachine } from "xstate"

export enum Event {

  /* errors on sign start */
  success = "SUCCESS",
  startSignError = "START_SIGN_ERROR",
  timeIsUp = "TIME_IS_UP",

  /* errors on confirm  */
  signatureError = "SIGNATURE_ERROR",
  confirmationError = "CONFORMATION_ERROR",
  wrongCodeError = "WRONG_CODE_ERROR",
  invalidCode = "INVALID_CODE",
  resetCodeValidation = "RESET_CODE_VALIDATION",

  startSign = "START_SIGN",
  confirm = "CONFIRM",
  retryStart = "RETRY_START",
  retryConfirm = "RETRY_CONFIRM",
}

export enum State {
  initial = "initial",

  /**
   * Код отправляется
   */
  onSignStart = "onSignStart",

  /**
   * Код запрошен, ожидание подтверждения
   */
  waitingCodeInput = "waitingCode",

  /**
   * Ожидание ответа на запрос подтверждения подписи (подписываем документ)
   */
  onConfirmation = "onConfirmation",

  /**
   * Можно запросить код еще раз
   */
  canRestartSign = "canRestartSign",

  /**
   * Введенный код не валиден
   */
  invalidCode = "invalidCode",

  /**
   * Ошибка неправильного кода
   */
  wrongCode = "wrongCode",

  /**
   * Неизвестаня ошибка начала подписи документа
   */
  startSignError = "startSignError",

  /**
   * Неизвестаня ошибка подтверждения подписи
   */
  confirmationError = "confirmationError",

  /**
   * Отсутствие подписи
   */
  signatureError = "signatureError",

  /**
   * Подписан успешно
   */
  signIsSucceed = "signIsSucceed"
}


export const stateMachine = createMachine({
  initial: State.initial,
  states: {
    [State.initial]: {
      on: {
        [Event.startSign]: State.onSignStart,
      }
    },
    [State.onSignStart]: {
      on: {
        [Event.success]: State.waitingCodeInput,
        [Event.startSignError]: State.startSignError,
      }
    },
    [State.canRestartSign]: {
      on: {
        [Event.startSign]: State.onSignStart
      }
    },
    [State.startSignError]: {
      on: {
        [Event.retryStart]: State.onSignStart
      }
    },
    [State.waitingCodeInput]: {
      on: {
        [Event.confirm]: State.onConfirmation,
        [Event.timeIsUp]: State.canRestartSign,
      }
    },
    [State.onConfirmation]: {
      on: {
        //
        [Event.invalidCode]: State.invalidCode,
        [Event.success]: State.signIsSucceed,
        [Event.wrongCodeError]: State.wrongCode,
        [Event.confirmationError]: State.confirmationError,
        [Event.signatureError]: State.signatureError,
      }
    },
    [State.invalidCode]: {
      on: {
        [Event.resetCodeValidation]: State.waitingCodeInput
      }
    },
    [State.wrongCode]: {
      on: {
        [Event.resetCodeValidation]: State.waitingCodeInput
      }
    },
    [State.confirmationError]: {
      on: {
        [Event.retryConfirm]: State.onConfirmation
      }
    },
    [State.signatureError]: {
    },
    [State.signIsSucceed]: {
    }
  }
})