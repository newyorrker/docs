// import {ModalProps} from "../types/ModalInterrfaces";

const template = `
<div class="modal-overlay hidden not-visible">
    <div class="modal-content">
        <a href="#" class="closebtn">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.601041" y1="0.742221" x2="11.9147" y2="12.0559" stroke="white" stroke-width="1.7"/>
                <line x1="11.9145" y1="0.601041" x2="0.600808" y2="11.9147" stroke="white" stroke-width="1.7"/>
            </svg>
        </a>
        <div class="modal-content__title">

        </div>
        <div class="modal-content__text">

        </div>
        <div class="modal-buttons">

        </div>
    </div>
</div>
`;

/**
 * Button modal properties
 * text - button text
 * class - additional class (default .button, the additional ones would be added to it)
 * returnValue - value which will be return when the button clicked in confirm window
 */
interface ModalButton {
  text: string;
  class?: string;
  returnValue?: any;
}

/**
 * Modal window properties
 * title - Title of the modal
 * contentText - main text
 * buttons - array of buttons if there are
 * modalClass - modal class name
 * outContent - content which will be inserted at the end of .modal-content
 */
interface ModalProps {
  title?: string;
  contentText?: string;
  buttons?: ModalButton[];
  modalClass?: string;
  outContent?: string;
  distContainerSelector?: string;
}

/**
 * Shows modal by appending it to body
 *
 *
 */
class Modal {
  /**
   * modal props
   */
  props: ModalProps = {};
  /**
   * reference to modal elemtn
   */
  modal?: HTMLElement;
  /**
   * escape handler
   */
  escapeHandler: any = null;

  constructor(props: ModalProps) {
    this.props = props;
    this.prepareWindow();
  }

  prepareWindow() {
    const html = document.createElement('div');
    html.innerHTML = template;

    const modal = html.querySelector('.modal-overlay') as HTMLElement;
    if (this.props.modalClass) {
      modal.classList.add(this.props.modalClass);
    }

    const title = html.querySelector('.modal-content__title') as HTMLElement;
    if (this.props.title) {
      title.innerHTML = this.props.title;
    } else {
      title.remove();
    }

    const content = html.querySelector('.modal-content__text') as HTMLElement;
    if (this.props.contentText) {
      content.innerHTML = this.props.contentText;
    } else {
      content.remove();
    }

    const buttons = html.querySelector('.modal-buttons') as HTMLElement;

    if (this.props.buttons && this.props.buttons.length) {
      this.props.buttons.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'button ' + (item.class || '');
        btn.innerText = item.text;
        (btn as any)._returnValue = item.returnValue;
        buttons.append(btn);
      });
    } else {
      buttons.remove();
    }

    const modalContent = html.querySelector('.modal-content') as HTMLElement;
    if (this.props.outContent) {
      const outContentContainer = document.createElement('div');
      outContentContainer.innerHTML = this.props.outContent;
      while (outContentContainer.children.length > 0) {
        modalContent.appendChild(outContentContainer.children[0]);
      }
    }

    this.modal = html.children[0] as HTMLElement;
    if (this.props.distContainerSelector) {
      const distElement = document.querySelector(this.props.distContainerSelector);
      distElement?.append(this.modal);
    } else {
      document.body.append(this.modal);
    }
  }

  /**
   * Make modal visible
   */
  private show() {
    this.modal?.classList.remove('hidden');
    setTimeout(() => {
      this.modal?.classList.remove('not-visible');
      this.modal?.focus();
    }, 50);
  }

  /**
   * show simple modal
   */
  showModal() {
    this.show();

    const buttons: HTMLElement[] = [].slice.call(this.modal?.querySelectorAll('.modal-buttons .button'));

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.destroy();
      });
    });

    const close = this.modal?.querySelector('.closebtn') as HTMLElement;
    close &&
      close.addEventListener('click', (e: Event) => {
        e.preventDefault();
        this.destroy();
      });

    const instance = this;
    this.escapeHandler = (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        instance.destroy();
      }
    };

    window.addEventListener('keyup', this.escapeHandler);
  }

  /**
   * Shows confirm-like modal
   */
  showConfirm() {
    return new Promise((resolve, reject) => {
      this.show();

      const buttons: HTMLElement[] = [].slice.call(this.modal?.querySelectorAll('.modal-buttons .button'));

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          let value = btn;
          if (Object.prototype.hasOwnProperty.call(btn, '_returnValue')) {
            value = (btn as any)._returnValue;
          }
          resolve(value);
          this.destroy();
        });
      });

      const close = this.modal?.querySelector('.closebtn') as HTMLElement;
      close &&
        close.addEventListener('click', (e: Event) => {
          e.preventDefault();
          resolve('close');
          this.destroy();
        });

      const instance = this;
      this.escapeHandler = (e: KeyboardEvent) => {
        if (e.key == 'Escape') {
          resolve('close');
          instance.destroy();
        }
      };

      window.addEventListener('keyup', this.escapeHandler, false);
    });
  }

  /**
   * Remove node from dom && remove props for faster gc
   */
  destroy() {
    this.modal?.classList.add('not-visible');
    window.removeEventListener('keyup', this.escapeHandler, false);
    setTimeout(() => {
      this.modal?.remove();
      delete this.modal;
      delete this.escapeHandler;
    }, 300);
  }
}
export { Modal, ModalProps };
