import React from 'react';
import axios from 'axios';
import {
  View,
  ScrollView,
  WebView,
  Dimensions,
  DrawerLayoutAndroid,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet, RkAvoidKeyboard, RkTextInput
} from 'react-native-ui-kitten';
import {Avatar} from './';
import {Gallery} from './';
import {data} from '../data';
import {FontIcons} from '../assets/icons';
import {FontAwesome} from '../assets/icons';
import {scale} from '../utils/scale';
import formatNumber from '../utils/textUtils';
import MyWebView from 'react-native-webview-autoheight';
import { UIConstants } from '../config/appConstants';

class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    let navigate = this.props.navigation.navigate;
    return (
      <View style={styles3.container}>
      <TouchableOpacity onPress={() => navigate('ProfileV2', {id: this.props.item.item.author.id})}>
        <Avatar rkType='circle' style={styles2.avatar} img={{uri: this.props.item.item.author.avatar}}/>
      </TouchableOpacity>
      <View style={styles3.content}>
        <View style={styles3.contentHeader}>
          <RkText rkType='header5'>{this.props.item.item.author.name}</RkText>
          <RkText rkType='secondary4 hintColor'>
            {this.props.item.item.date}
          </RkText>
        </View>
        <RkText rkType='primary3 mediumLine'>{this.props.item.item.content}</RkText>
      </View>
    </View>
    )
  }
}

export class ComDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page:2,
      message:"",
      newcoms: [],
      justsend: [],
      more: true,
    }
    let that = this;

    this.renderItem = this._renderItem.bind(this);
    this.renderFoot = this._renderFoot.bind(this);
  }
  componentDidMount() {
    //this.getComs(true);
  }

  getComs(bool) {
    if (this.state.more) {
      let that = this;
      let url = this.props.url + "/comments?page=" + this.state.page;
      if (bool) {
        this.setState({page: 2});
      } else {
        this.setState({page: this.state.page+1});
      }
      fetch(url).then(response => response.json())
      .then(data => {
        console.log('act comm ' + url);
        //console.log(data.main);
        if (data.main.length == 0) {
          console.log("end of comments...");
          this.setState({more:false});
          return;
        }
        if (bool) {
          this.setState({newcoms:data.main});
        } else {
          this.setState({newcoms:[...this.state.newcoms, ...data.main]});
        }
      })
      .catch(error => console.log('error:', error));
    }
  }

  sendMessage() {
    if (this.state.message == "") {
      alert('Vous devez entrer un commentaire !');
      return;
    }
    if (!UIConstants.isConnect()) {
      alert("Vous n'êtes pas connecté !");
      return;
    }
    let newCom = {
      "id": "-1",
      "date": "Now",
      "author": {
        "id": UIConstants.id,
        "name": UIConstants.pseudo,
        "avatar": UIConstants.avatar
      },
      "content": this.state.message
    }
    let mess = this.state.message;
    this.setState({
      justsend: [newCom, ...this.state.justsend],
      message: ""
     });
    axios.request({
      method: "post",
      url: this.props.url +  "/comments",
      data: {
        'comm': mess,
        'cookie': UIConstants.getCookie()
      }
    }).then(res => {
      console.log(res);
    });
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _renderSeparator() {
    return (
      <View style={styles3.separator}/>
    )
  }

  _renderItem(info) {
    return (
      <MyListItem
      navigation={this.props.navigation}
      item={info}
      />
    )
  }

  _renderFoot(info) {
    if (this.state.more) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}} ><RkButton onPress={() => { this.getComs(false) } } rkType='rounded outline' contentStyle={styles.buttonMore} style={styles.buttonMore2} >Load More !</RkButton></View>
      );
    } else {
      return <View />;
    }
  }

  render() {
    let comments = [...this.state.justsend ,...this.props.comments, ...this.state.newcoms];
    let navigationView = (
      <RkAvoidKeyboard style={styles2.container} onResponderRelease={(event) => {
        Keyboard.dismiss();
      }}>
      <FlatList
      inverted
        style={styles2.list}
        data={comments}
        extraData={this.state}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderItem}
        ListFooterComponent={this.renderFoot}/>

        <View style={styles2.footer}>
        <RkButton style={styles2.plus} rkType='clear'>
          <RkText rkType='awesome secondaryColor'>{FontAwesome.plus}</RkText>
        </RkButton>

        <RkTextInput
          onChangeText={(message) => this.setState({message})}
          value={this.state.message}
          rkType='row sticker'
          placeholder="Leave a comment..."/>

        <RkButton onPress={() => {console.log(this.state.message); this.sendMessage()}} style={styles2.send} rkType='circle highlight'>
          <Image source={require('../assets/icons/sendIcon.png')}/>
        </RkButton>
      </View>
      </RkAvoidKeyboard>
    );
    return (
      <DrawerLayoutAndroid
      drawerWidth={350}
      drawerPosition={DrawerLayoutAndroid.positions.Right}
      renderNavigationView={() => navigationView}>
        {this.props.children}
      </DrawerLayoutAndroid>
    )
  }
}


let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    paddingTop: 25,
    paddingBottom: 17,
  },
  row: {
    flexDirection: 'row',

  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flex: 1
  },
  button: {
    marginTop: 27.5,
    alignSelf: 'center'
  },
  buttonMore: {
    color: theme.colors.text.hint,
    borderColor: theme.colors.text.hint
  },
  buttonMore2: {
    borderColor: theme.colors.text.hint,
    width:200
  }
}));

let styles2 = RkStyleSheet.create(theme => ({
  header: {
    alignItems: 'center'
  },
  avatar: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  list: {
    paddingHorizontal: 0
  },
  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: theme.colors.screen.alter
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row'
  },
  itemIn: {},
  itemOut: {
    alignSelf: 'flex-end'
  },
  balloon: {
    maxWidth: scale(250),
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15
  },
  plus: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 7
  },
  send: {
    width: 40,
    height: 40,
    marginLeft: 10,
  }
}));
let styles3 = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base
  }
}));