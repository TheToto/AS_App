import {Platform} from 'react-native';

export class UIConstants {
  static AppbarHeight = Platform.OS === 'ios' ? 44 : 56;
  static StatusbarHeight = Platform.OS === 'ios' ? 20 : 0;
  static HeaderHeight = UIConstants.AppbarHeight + UIConstants.StatusbarHeight;

  static currentSite = 'roi_lion';
  static currentSiteName = 'AS';
  static getCurrentSite() {
    return UIConstants.currentSite;
  }
  static getCurrentSiteName() {
    return UIConstants.currentSiteName;
  }
  static setCurrentSite(name, alias) {
    UIConstants.currentSiteName = name;
    UIConstants.currentSite = alias;
  }
  

  static cookie = "";
  static success = false;
  static pseudo = "User";
  static avatar = "https://www.animationsource.org/images/shared//no_avi_fr.jpg"
  static id = 1;
  static getCookie() {
    return UIConstants.cookie;
  }
  static isConnect() {
    return UIConstants.success;
  }
}