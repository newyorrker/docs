import { createMachine } from "xstate"

export enum Event {

  /* errors on sign start */
  success = "SUCCESS",
  error = "ERROR",

  /* errors on confirm  */
  confirmationError = "CONFORMATION_ERROR",
  wrongCodeError = "WRONG_CODE_ERROR",
  invalidCode = "INVALID_CODE",
  resetCodeValidation = "RESET_CODE_VALIDATION",

  startSign = "START_SIGN",
  confirm = "CONFIRM",
  retryStart = "RETRY_START",

  tooLongOperation = "TOO_LONG_OPERATION"
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
   * Отправка кода подтверждения
   */
  onSendingTheCode = "sendingTheCode",

  /**
   * Ожидание подписания документа (подписываем документ)
   */
  onSigning = "onSigning",

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
   * Неизвестаня ошибка при подписании
   */
  signError = "signError",

  /**
   * Подписан успешно
   */
  signIsSucceed = "signIsSucceed",

  /**
   * Время ожидания подписания вышло
   */
  signTimeIsOut = "signTimeIsOut"
}

const states =  {
  [State.initial]: {
    on: {
      [Event.startSign]: State.onSignStart,
    }
  },
  [State.onSignStart]: {
    on: {
      [Event.success]: State.waitingCodeInput,
      [Event.error]: State.startSignError,
    }
  },
  [State.startSignError]: {
    on: {
      [Event.retryStart]: State.onSignStart
    }
  },
  [State.waitingCodeInput]: {
    on: {
      [Event.confirm]: State.onSendingTheCode,
    }
  },
  [State.onSendingTheCode]: {
    on: {
      [Event.invalidCode]: State.invalidCode,
      [Event.success]: State.onSigning,
      [Event.error]: State.signError
    }
  },
  [State.invalidCode]: {
    on: {
      [Event.resetCodeValidation]: State.waitingCodeInput
    }
  },
  [State.wrongCode]: {
    on: {
      [Event.resetCodeValidation]: State.waitingCodeInput,
      [Event.confirm]: State.onSendingTheCode
    }
  },
  [State.signError]: {
    on: {
      [Event.confirm]: State.onSendingTheCode,
    }
  },
  [State.signIsSucceed]: {

  },
  [State.onSigning]: {
    on: {
      [Event.tooLongOperation]: State.signTimeIsOut,
      [Event.success]: State.signIsSucceed,
      [Event.wrongCodeError]: State.wrongCode,
      [Event.error]: State.signError
    }
  },
  [State.signTimeIsOut]: {
    on: {
      [Event.confirm]: State.onSendingTheCode
    }
  }
}

const data = {
  initial: State.initial,
  states: states
}

export const stateMachine = createMachine(data);