import React from 'react';
import {
  View,
  Image,
  StatusBar,
  Platform,
  ScrollView
} from 'react-native';
import {
  RkText,
  RkButton,
  RkTheme,
  RkStyleSheet,
  
} from 'react-native-ui-kitten';
import {DarkKittenTheme} from '../../config/darkTheme';
import * as SiteTheme from '../../config/sitetheme/index'
import {KittenTheme} from '../../config/theme';
import {GradientButton} from '../../components/gradientButton';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import { UIConstants } from '../../config/appConstants';

async function registerForPushNotificationsAsync(type) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  console.log(token);
  if (type == "news") {
    axios.post('http://as-api.thetoto.tk/notif/', {
      token: token,
      pseudo: UIConstants.pseudo,
      id: UIConstants.id
    })
    .then(function (response) {
      alert('C\'est OK');
    })
    .catch(function (error) {
      alert('Erreur server');
    });
  } else {
    if (!UIConstants.isConnect()) {
      alert('Vous n\'êtes pas connecté !');
      return;
    }
    axios.post('https://notif-manager.herokuapp.com/notif/', {
      token: token,
      cookie: UIConstants.getCookie(),
      pseudo: UIConstants.pseudo,
      id: UIConstants.id
    })
    .then(function (response) {
      alert('C\'est OK');
    })
    .catch(function (error) {
      alert('Erreur server');
    });
  }
  return token;
}

export class Themes extends React.Component {
  static navigationOptions = {
    title: 'Theme'.toUpperCase()
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.root}>
        <View style={styles.container}>
          <RkText>Light Theme</RkText>
          <Image style={styles.image} source={require('../../assets/images/lightThemeImage.png')}/>
          <GradientButton
            text='APPLY'
            onPress={() => {
              StatusBar.setBarStyle('dark-content', true);
              Platform.OS == 'android' && StatusBar.setBackgroundColor(KittenTheme.colors.screen.base);
              RkTheme.setTheme(KittenTheme);
            }}/>
        </View>
        <View style={styles.container}>
          <RkText>Dark Theme</RkText>
          <Image style={styles.image} source={require('../../assets/images/darkThemeImage.png')}/>
          <GradientButton
            text='APPLY'
            onPress={() => {
              RkTheme.setTheme(DarkKittenTheme);
              StatusBar.setBarStyle('light-content', true);
              Platform.OS == 'android' && StatusBar.setBackgroundColor(DarkKittenTheme.colors.screen.base);
            }}/>

        </View>
        <View style={styles.container}>
          <RkText>Balto Theme</RkText>
          <GradientButton
            text='APPLY'
            onPress={() => {
              RkTheme.setTheme(SiteTheme.BaltoTheme);
              StatusBar.setBarStyle('light-content', true);
              Platform.OS == 'android' && StatusBar.setBackgroundColor(SiteTheme.BaltoTheme.colors.screen.base);
            }}/>

        </View>
        <View style={styles.container}>
          <RkText>Roi Lion Theme</RkText>
          <GradientButton
            text='APPLY'
            onPress={() => {
              RkTheme.setTheme(SiteTheme.RoiLionTheme);
              StatusBar.setBarStyle('light-content', true);
              Platform.OS == 'android' && StatusBar.setBackgroundColor(SiteTheme.RoiLionTheme.colors.screen.base);
            }}/>

        </View>
        <View style={styles.container}>
          <RkText>Notif News</RkText>
          <GradientButton
            text='APPLY'
            onPress={() => {
              registerForPushNotificationsAsync("news");
            }}/>
        </View>
        <View style={styles.container}>
          <RkText>Notif site</RkText>
          <GradientButton
            text='APPLY'
            onPress={() => {
              registerForPushNotificationsAsync("site");
            }}/>
        </View>
      </View>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
    paddingHorizontal: scale(72),

  },
  image: {
    height: scaleVertical(160)
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaleVertical(20)
  }
}));