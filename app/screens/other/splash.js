import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  StatusBar,
  ImageBackground,
  ToastAndroid
} from 'react-native';
import {
  RkText,
  RkTheme
} from 'react-native-ui-kitten'
import {ProgressBar} from '../../components';
import {
  KittenTheme
} from '../../config/theme';
import {NavigationActions} from 'react-navigation';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { UIConstants } from '../../config/appConstants';

let timeFrame = 500;

export class SplashScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    }
  }

  getLog() {
    let that = this;
    let cookie = "";
    cookie = Expo.SecureStore.getItemAsync('cookie');
    cookie.then(function(value) {
      console.log("load : " + value);
      that.setState({progress:0.25});
      if (value == "" || value == null || value == undefined) {
        ToastAndroid.show('Vous n\'êtes pas connecté à AS.', ToastAndroid.SHORT);
        console.log("Pas connecté");
        that.setState({progress:1});
        return;
      }
      axios.request({
        method: "post",
        url: "https://as-api-thetoto.herokuapp.com/test",
        data: {
          'cookie': value
        }
      }).then(res => {
        if (res.data.success) {
          UIConstants.cookie = value;
          UIConstants.avatar = res.data.infos.avatar;
          Expo.SecureStore.setItemAsync('avatar', res.data.infos.avatar);
          UIConstants.pseudo = res.data.infos.pseudo;
          Expo.SecureStore.setItemAsync('pseudo', res.data.infos.pseudo);
          UIConstants.id = res.data.infos.id;
          Expo.SecureStore.setItemAsync('id', res.data.infos.id);
          UIConstants.success = true;
          ToastAndroid.show('Vous êtes connecté à AS.', ToastAndroid.SHORT);
          console.log("Connecté");
          that.props.navigation.goBack()
        } else {
          ToastAndroid.show('Votre session a expiré ! Veuillez vous reconnecter à AS.', ToastAndroid.SHORT);
          console.log("Expiré");
        }
        that.setState({progress:1});
      }).catch(error => { 
        ToastAndroid.show('Erreur de connexion.', ToastAndroid.SHORT);
        console.log(error);
        that.setState({progress:1});
       });
    });
    cookie.catch(function(error) {
      ToastAndroid.show('Vous n\'êtes pas connecté à AS.', ToastAndroid.SHORT);
      console.log("Pas connecté (catch)");
      that.setState({progress:1});
    });

  }

  componentDidMount() {
    StatusBar.setHidden(true, 'none');
    RkTheme.setTheme(KittenTheme);
    this.getLog()
    this.timer = setInterval(() => {
      if (this.state.progress == 1) {
        clearInterval(this.timer);
        setTimeout(() => {
          StatusBar.setHidden(false, 'slide');
          let toHome = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Home'})]
          });
          this.props.navigation.dispatch(toHome)
        }, timeFrame);
      } else {
        /*let random = Math.random() * 0.5;
        let progress = this.state.progress + random;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({progress});
        */
      }
    }, timeFrame)

  }

  render() {
    let width = Dimensions.get('window').width;
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground style={styles2.backgroundImage} source={require('../../assets/images/splashBack.jpg')}>
          <View style={{flex:1}} ></View>
          <View style={styles.text}>
            <RkText rkType='light' style={styles.hero}>Animation</RkText>
            <RkText rkType='logo' style={styles.appName}>Source</RkText>
          </View>
          <View style={{flex:1}} ></View>
          <ProgressBar
          color={RkTheme.current.colors.accent}
          style={styles.progress}
          progress={this.state.progress} width={scale(320)}/>
          </ImageBackground>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: KittenTheme.colors.screen.base,
    justifyContent: 'space-between',
    flex: 1
  },
  image: {
    resizeMode: 'cover',
    height: Dimensions.get('window').height
  },
  text: {
    alignItems:'center',
    flex:1,

  },
  hero: {
    fontSize: 37,
    color: 'white'
  },
  appName: {
    fontSize: 62,
    color: 'white'
  },
  progress: {
    alignSelf: 'center',
    marginBottom: 35,
    backgroundColor: '#e5e5e5'
  }
});
const styles2 = StyleSheet.create({
  backgroundImage: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  },

  text: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 32
  }
});