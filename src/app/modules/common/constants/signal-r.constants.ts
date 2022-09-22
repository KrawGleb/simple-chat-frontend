import { HttpConstants } from "./http.constants";

export class SignalRConstants {
  public static HubUrl = HttpConstants.BaseUrl + '/hub';

  public static NewMessageSignal = 'NewMessage';
}
