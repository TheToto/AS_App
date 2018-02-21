import React from 'react';
import axios from "axios";
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  DrawerLayoutAndroid,
  FlatList,
  StyleSheet,
  Modal
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {data} from '../../data';
import {Avatar, GradientButton} from '../../components';
import {SocialBar} from '../../components';
import { UIConstants } from '../../config/appConstants';
import { RkTextInput } from 'react-native-ui-kitten/src/components/textinput/rkTextInput';
import { RkButton } from 'react-native-ui-kitten/src/components/button/rkButton';
import { RkAvoidKeyboard } from 'react-native-ui-kitten/src/components/avoidKeyboard/rkAvoidKeyboard';
import { scale } from '../../utils/scale';
import { FontAwesome } from '../../assets/icons';
import ImageView from 'react-native-image-view';
import { ComDrawer } from '../../components/comdrawer';
import MyWebView from 'react-native-webview-autoheight';
import { WebBrowser } from 'expo';

export class news extends React.Component {
  static navigationOptions = ({navigation}) => {

    return (
      {
        title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'News': "News",
      });
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    this.id = params ? params.id : 1;
    this.state = {
      title: "Loading...",
      desc: "Loading...",
      id: 1,
      comments: [{
        "id": "-1",
        "date": "",
        "author": {
          "id": "1",
          "name": "Loading...",
          "avatar": "https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif"
        },
        "content": "Loading...",
      }],
      
    }
  }

  componentDidMount() {
    this.getData();

  }


  getData() {
    console.log("http://as-api.thetoto.tk/" +"news/" + this.id);
    let that = this;
    axios.request({
      method: "get",
      url: "http://as-api.thetoto.tk/" +"news/" + this.id,
      responseType:'json'
    }).then(res => {
      that.setState({
        id: res.data.news.id,
        title: res.data.news.title,
        desc: res.data.news.content,
        //comments: res.data.comment,
        author: res.data.news.author,
      });
      this.props.navigation.setParams({title: res.data.news.sitename});
    });
    axios.request({
      method: "get",
      url: "http://as-api.thetoto.tk/" +"news/" + this.id + "/comments",
      responseType:'json'
    }).then(res => {
      that.setState({
        comments: res.data.main,
      });
    });
  }

  getCom() {
    let that = this;
    axios.request({
      method: "get",
      url: "http://as-api.thetoto.tk/" + this.type + "/fr/" + UIConstants.getCurrentSite() + '/' + this.authorid + "?page=" + that.state.page,
      responseType:'json'
    }).then(res => {
      if (res.data.obj.length == 0) {
        console.log('No more imgs');
        that.setState({more: false});
        return;
      }
      if (that.state.page == 1) {
        that.setState({
          imgs: res.data.obj,
          comments: res.data.comment,
          page: that.state.page+1
        });
      } else {
      that.setState({
        imgs: [...that.state.imgs, ...res.data.obj],
        comments: res.data.comment,
        page: that.state.page+1
      });
    }
    });
  }

  render() {
    let cssAdd = "<style>img{max-width: 100% !important; max-height: 100% !important }</style>";
    let webview = (<RkText> Loading... </RkText>);
    if (this.state.desc != "Loading...") {
      webview = (
        <MyWebView
        ref={(ref) => { this.webview = ref; }}
        source={{html: cssAdd + this.state.desc}}
        startInLoadingState={true}
        defaultHeight={1000}
        onShouldStartLoadWithRequest={false}
        />
      );
    }
    let modal = (
      <ImageView
        title={this.state.title}
        source={{uri: this.state.img}}
        isVisible={this.state.isVisible}
      />
      );

    return (
    <ComDrawer url={"https://as-api-thetoto.herokuapp.com/news/" + this.state.id} comments={this.state.comments} navigation={this.props.navigation}>
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{this.state.title}</RkText>
              <RkText rkType='secondary2 hintColor'>{this.state.author}</RkText>
            </View>
          </View>
        </RkCard>
        {webview}
      </ScrollView>
    </ComDrawer>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));