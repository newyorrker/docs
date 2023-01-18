import MobileAppButtonType from '../types/MobileAppButtonType';

export interface MobileAppChangeButtonMessage {
  type: MobileAppButtonType;
  params?: {
    disabled?: boolean;
    filtered?: boolean;
    visible?: boolean;
  };
}

export default MobileAppChangeButtonMessage;
