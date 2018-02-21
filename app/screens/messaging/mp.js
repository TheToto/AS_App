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
  RkText, RkStyleSheet
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

export class Message extends React.Component {
  static navigationOptions = {
    title: 'Message'
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    this.id = params ? params.id : UIConstants.id;
    this.state = {
      content: "Loading...",
      author: "Loading...",
      subject: "Loading...",
      avatar: "https://www.animationsource.org/images/shared//no_avi_fr.jpg",
      date: "",
      author_id: 0
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let that = this;
    if (!UIConstants.isConnect()) {
      alert("Vous n'êtes pas connecté !");
      return;
    }
    axios.request({
      method: "post",
      url: "https://as-api-thetoto.herokuapp.com/mp/"+this.id,
      data: {
        'cookie': UIConstants.getCookie()
      }
    }).then(res => {
      console.log(res.data.content);
      that.setState({
        author: res.data.author,
        date: res.data.date,
        subject: he.decode(res.data.subject),
        content: "<style>img{max-width: 100% !important; max-height: 100% !important } #global { overflow-wrap: break-word;  display: block; word-wrap: break-word; width:90% } .content_important { color: red;}</style><div id='global'>" + res.data.content + "</div>",
        author_id: res.data.author_id
      });
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
                  img={{uri: this.state.avatar}}/>
          <View>
            <RkText rkType='header4'>{this.state.author}</RkText>
            <RkText rkType='secondary2 hintColor'>{this.state.date}</RkText>
          </View>
        </View>
        <View>
          <View rkCardContent ><RkText rkType='header4'>{this.state.subject}</RkText></View>
            <MyWebView
              source={{html: this.state.content }}
              startInLoadingState={true}
              defaultHeight={400}
              />
        </View>
        <View rkCardContent>
          <GradientButton onPress={() => {
            navigate('SendMp', {id: this.state.author_id, to: this.state.author, subject: "Re : " + this.state.subject, avatar: this.state.avatar});
          }} rkType='large' style={{marginVertical: 9}} text='Répondre !'/>
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