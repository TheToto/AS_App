import React from 'react';
import axios from 'axios';
import {
  FlatList,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {
  RkCard,
  RkText, RkStyleSheet, RkTextInput
} from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import {SocialBar} from '../../components/socialBar';
import {data} from '../../data';
import MyWebView from 'react-native-webview-autoheight';
import {GradientButton} from '../../components/gradientButton';
import { UIConstants } from '../../config/appConstants';
import { RkButton } from 'react-native-ui-kitten/src/components/button/rkButton';
let moment = require('moment');
let he = require('he');

export class sendMp extends React.Component {
  static navigationOptions = {
    title: 'Envoyer un message'
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    this.id = params ? params.id : -1;
    this.dest =  params ? params.to : "ERROR";
    this.avatar = params ? params.avatar : "https://www.animationsource.org/images/shared//no_avi_fr.jpg";
    this.state = {
      subject: params ? params.subject : "",
      content: "",
      disable: false
    }
  }

  componentDidMount() {

  }

  send() {
    this.setState({disable: true});
    let that = this;
    if (!UIConstants.isConnect()) {
      alert("Vous n'êtes pas connecté !");
      return;
    }
    axios.request({
      method: "post",
      url: "https://as-api-thetoto.herokuapp.com/mp/send/"+this.id,
      data: {
        sujet: he.encode(this.state.subject), //Encore to html entities
        msg: he.encode(this.state.content.replace(/\n/g, '<br>')),
        'cookie': UIConstants.getCookie()
      }
    }).then(res => {
      alert('Message envoyé !');
      this.props.navigation.goBack();
    }).catch(error => {
      console.log(error);
      alert('Le message n\'a pas pu être envoyé...');
      this.setState({enable: false});
    });
  }

  render() {
    let navigate = this.props.navigation.navigate;
    return (
      <ScrollView style={styles.container}>
      <RkCard style={styles.card}>
        <View rkCardHeader>
          <Avatar rkType='small'
                  style={styles.avatar}
                  img={{uri: this.avatar}}/>
          <View>
            <RkText rkType='header4'>{this.dest}</RkText>
            <RkText rkType='secondary2 hintColor'>Now</RkText>
          </View>
        </View>
        <View rkCardContent>
        <View rkCardContent >
          <RkTextInput rkType='rounded' placeholder='Sujet'
          onChangeText={(text) => this.setState({subject: text})}
          value={this.state.subject} />
        </View>
          <RkTextInput multiline={true} rkType='bordered' placeholder='Message'
          onChangeText={(text) => this.setState({content: text})}
          value={this.state.content} />
        </View>
        <View rkCardContent>
        <GradientButton disabled={this.state.disable} onPress={() => {
            this.send();
          }} rkType='large' style={styles.save} text='Envoyer !'/>
        </View>
      </RkCard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  card: {
    marginVertical: 8,
  },
  avatar: {
    marginRight: 16
  }
}));