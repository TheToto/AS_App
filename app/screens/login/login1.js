import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import {GradientButton} from '../../components/gradientButton';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { UIConstants } from '../../config/appConstants';

import axios from 'axios';

export class LoginV1 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: ""
    }
  }

  _renderImage(image) {
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;

    if (RkTheme.current.name === 'light')
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('../../assets/images/backgroundLoginV1.png')}/>);
    else
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('../../assets/images/backgroundLoginV1DarkTheme.png')}/>);
    return image;
  }

  sendLog() {
    let that = this;
    axios.request({
      method: "post",
      url: "https://as-api-thetoto.herokuapp.com/connect",
      data: {
        'user': that.state.user, 
        'pass': that.state.pass
      }
    }).then(res => {
      if (res.data.success) {
        UIConstants.cookie = res.data.cookie;
        console.log(res.data.cookie);
        Expo.SecureStore.setItemAsync('cookie', res.data.cookie);
        UIConstants.avatar = res.data.infos.avatar;
        Expo.SecureStore.setItemAsync('avatar', res.data.infos.avatar);
        UIConstants.pseudo = res.data.infos.pseudo;
        Expo.SecureStore.setItemAsync('pseudo', res.data.infos.pseudo);
        UIConstants.id = res.data.infos.id;
        Expo.SecureStore.setItemAsync('id', res.data.infos.id);
        UIConstants.success = true;
        alert('Vous êtes connecté !');
        that.props.navigation.navigate('GridV2')
      } else {
        alert('Erreur de connexion. Vérifiez vos infos.');
      }

    });
    
  }

  render() {
    let image = this._renderImage();

    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}
        style={styles.screen}>
        {image}
        <View style={styles.container}>
          <RkTextInput rkType='bordered' placeholder='Username'
          onChangeText={(text) => this.setState({user: text})}
          value={this.state.user} />
          <RkTextInput rkType='bordered' placeholder='Password' secureTextEntry={true}
          onChangeText={(text) => this.setState({pass: text})}
          value={this.state.pass} />
          <GradientButton onPress={() => {
            this.sendLog();
          }} rkType='large' style={styles.save} text='LOGIN'/>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('SignUp')}> Sign up
                  now </RkText>
              </RkButton>
            </View>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Forgot your Password ?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('password')}> Recover it ! </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
}));