<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { DateTime, Duration } from "luxon";
import { AxiosError } from "axios";

import { interpret } from "xstate";
import { stateMachine, Event, State } from "./stateMachine";

const COUNT_DOWN_MINUTES = 1;

@Component

export default class DocumentSign extends Vue {
  @Prop({ default: "Произошла ошибка" }) defaultErrorMessage: string;
  @Prop({required: true}) id: string;

  requestId: string | null = null;
  pinCodeValue: string[] = ["", "", "", "", "", ""];

  resendCounter: number | null = null;
  resendDuration: Duration | null = null;

  canRestartSign = false;

  errorMessage = "";

  stateService = interpret(stateMachine);
  currentState = stateMachine.initialState;
  State = State;

  created() {
    // Start service on component creation
    this.stateService
        .onTransition((state) => {
            // Update the current state component data property with the next state
            this.currentState = state;
        })
        .start();
  }

  /**
   * START SIGN
   */
  async startSign() {

    this.canRestartSign = false;

    this.stateService.send(Event.startSign);

    try {
      this.requestId = await this.$hrLinkRepository.startSign(this.id);

      this.startTimer();
      this.stateService.send(Event.success);
    }
    catch(e) {
      this.errorMessage = (e as AxiosError).response?.data?.message || this.defaultErrorMessage;

      //show error
      this.stateService.send(Event.startSignError);
      this.$store.dispatch('reportError', e);
    }
  }

  /**
   * CONFIRM
   */
  async confirm() {
    try {
      if(!this.requestId) {
        throw Error("requestId must be set before confirmation");
      }

      this.stateService.send(Event.confirm);

      const valid = this.validate();

      if(valid) {
        // await sleep(500);

        await this.$hrLinkRepository.confirmSign(this.id, this.requestId, this.code);
        this.stateService.send(Event.success);
        this.$emit("signed");
      }
      else {
        this.stateService.send(Event.invalidCode);
      }
    }
    catch(e) {
      //catch the wrong pincode
      //false beacause some problem with checking code on backend
      if(false && (e as any)?.response?.data?.code === "HRLink.incorrectCode") {
        this.stateService.send(Event.wrongCodeError);
      }
      else {
        this.stateService.send(Event.confirmationError);
        this.errorMessage = (e as AxiosError).response?.data?.message || this.defaultErrorMessage;
        this.$store.dispatch('reportError', e);
      }
    }
  }

  async restart() {
    await this.startSign();
  }

  @Watch("pinCodeValue")
  resetPinCodeError() {
    this.stateService.send(Event.resetCodeValidation)
  }

  protected validate() {
    let valid = true;

    if(!this.code || this.code.length < 6) {
      valid = false;
    }

    return valid;
  }

  protected startTimer() {
    const resendTime = DateTime.local().plus({ minutes: COUNT_DOWN_MINUTES });

    const handler = () => {
      this.resendDuration = this.getDiff(resendTime);

      if((this.resendDuration?.seconds ?? 0) <= 1) {
        this.canRestartSign = true;
        clearInterval(this.resendCounter || 0);
      }
    }

    this.resendCounter = setInterval(handler, 1000);

    handler();
  }

  protected getDiff(resendTime: DateTime) {
    return resendTime.diff(DateTime.local(), "seconds")
  }

  get time() {
    return this.resendDuration?.toFormat("mm:ss");
  }

  get code() {
    return this.pinCodeValue.join("");
  }

  get isBusy() {
    return this.currentState.matches(State.onConfirmation) || this.currentState.matches(State.onSignStart);
  }

  get isPinCodeError() {
    return this.currentState.matches(State.wrongCode) || this.currentState.matches(State.invalidCode);
  }

  get isError() {
    return  this.currentState.matches(State.startSignError) || this.currentState.matches(State.confirmationError);
  }

  get showMain() {
    return !this.isError && !this.currentState.matches(State.signIsSucceed);
  }
}

</script>

<style lang="scss">
.document-sign {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;

  &__container {
    padding: 0 16px;
  }

  &__footer {
    background-color: #F9F9F9;
    padding: 16px;
  }
}
</style>