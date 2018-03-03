import React from 'react';
import axios from 'axios';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  Text,
  DrawerLayoutAndroid,
  ToastAndroid
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkAvoidKeyboard,
  RkButton,
  RkTextInput
} from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import {scale} from '../../utils/scale';
import {data} from '../../data';
import { UIConstants } from '../../config/appConstants';
import {FontAwesome} from '../../assets/icons';

class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);

  }
  render() {
    let navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('ProfileV2', {id: this.props.item.item.author.id})}>
        <Avatar rkType='circle' style={styles2.avatar} img={{uri: this.props.item.item.author.avatar}}/>
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <RkText rkType='header5'>{this.props.item.item.author.name}</RkText>
          <RkText rkType='secondary4 hintColor'>
            {this.props.item.item.time}
          </RkText>
        </View>
        <RkText rkType='primary3 mediumLine'>{this.props.item.item.text}</RkText>
      </View>
    </View>
    )
  }
}

class MyListItem2 extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    let navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container} >
      <TouchableOpacity onPress={() => navigate('ProfileV2', {id: this.props.item.item.id})}>
        <Avatar rkType='circle' style={styles2.avatar} img={{uri: this.props.item.item.avatar}}/>
      </TouchableOpacity>
      <View style={styles.content}>
      <View style={styles.contentHeader}>
        <RkText rkType='header5'>{this.props.item.item.name}</RkText>
      </View>
      </View>
      </View>
    )
  }
}

export class Comments extends React.Component {
  

  static navigationOptions = ({navigation}) => {
    //navigation.setParams({chatname: "Normal", this: function(){}});
    let renderAvatar = () => {
      return (
        <RkButton rkType='outline small' onPress={() => {
          
          if (UIConstants.currentChatType == 'chat') {
            UIConstants.currentChatType = 'chat_rpg';
            navigation.setParams({chatname: "RPG"});
          } else {
            UIConstants.currentChatType = 'chat';
            navigation.setParams({chatname: "Normal"});
          }
        ToastAndroid.show("Switch to " + UIConstants.currentChatType + "...", ToastAndroid.SHORT);
        try {
          navigation.state.params._this.recup();
        } catch (e) {}
        }}>
        {navigation.state.params.chatname}
        </RkButton>
      );
    };
    let renderTitle = () => {
      return (
        <RkText>{typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? UIConstants.getCurrentSiteName(): navigation.state.params.title}</RkText>
      );
    };
    let rightButton = renderAvatar();
    let title = renderTitle();
    return (
      {
        headerTitle: title,
        headerRight: rightButton
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [{
        "author": {
          "avatar": "https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif",
          "name": "AS",
          "id": "1"
        },
        "text": "Loading...",
        "color": "#FFA23F",
        "time": "1s",
        "id": Math.random()
      }],
      connected: [{
        "avatar": "https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif",
        "name": "Loading...",
        "id": "1"
      }],
      message:"",
    };
    let that = this;
    UIConstants.currentChatType = 'chat';
    this.int = setInterval(function(){ that.recup(); }, 15000);
    this.recup();
    let postId = this.props.navigation.params ? this.props.navigation.params.postId : undefined;
    this.renderItem = this._renderItem.bind(this);
    this.renderConnected = this._renderConnected.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({ _this: this, chatname: "Normal" });
  }

  componentWillUnmount() {
    console.log('unmount');
    clearInterval(this.int);
  }

  recup () {
    console.log('Trigger');
    let that = this;
    let type = UIConstants.currentChatType;
    if (UIConstants.getCurrentSite() == 'hub')
      type = "chat_shared";
    console.log('call recup ' + "https://as-api-thetoto.herokuapp.com/chat/fr/" + UIConstants.getCurrentSite() + "/" + type);
    let url = "https://as-api-thetoto.herokuapp.com/chat/fr/" + UIConstants.getCurrentSite() + "/" + type;
    fetch(url).then(response => response.json())
    .then(data => {
      console.log('act chat' + UIConstants.getCurrentSite() + data);
      that.setState({
        data: data.messages,
        connected: data.connected
      });
    })
    .catch(error => console.log('error:', error));
  }

  sendMessage() {
    if (!UIConstants.isConnect()) {
     alert("Vous n'êtes pas connecté !");
     return;
    }
    if (this.state.message == "") {
      console.log("Empty message");
      return;
    }
    console.log(UIConstants.getCookie());

    let newly_added_data = {
     "author": {
       "avatar": UIConstants.avatar,
       "name": UIConstants.pseudo,
       "id": UIConstants.id
     },
     "text": this.state.message,
     "color": "#FFA23F",
     "time": "1s",
     "id": Math.random()
   };
   let type = UIConstants.currentChatType;
   if (UIConstants.getCurrentSite() == 'hub')
     type = "char_shared";
   let mess = this.state.message;
   this.setState({
     data: [newly_added_data, ...this.state.data],
     message: ""
    });
  
   axios.request({
     method: "post",
     url: "https://as-api-thetoto.herokuapp.com/chat/fr/" + UIConstants.getCurrentSite() + "/" + type,
     data: {
       'message': mess,
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
      <View style={styles.separator}/>
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

  _renderConnected(info) {
    return (
      <MyListItem2
      navigation={this.props.navigation}
      item={info}
      />
    )
  }

  render() {
    let navigationView = (
      <View style={styles.drawer}>
              <RkText style={{ justifyContent: 'center', textAlign: 'center' }} >Personnes connectés :</RkText>
              <FlatList
              style={styles2.list}
              data={this.state.connected}
              extraData={this.state}
              ItemSeparatorComponent={this._renderSeparator}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderConnected}/>
      </View>
    );
    return (
      <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Right}
      renderNavigationView={() => navigationView}>
      <RkAvoidKeyboard style={styles2.container} onResponderRelease={(event) => {
        Keyboard.dismiss();
      }}>
      <FlatList
      inverted
        style={styles2.list}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderItem}/>

        <View style={styles2.footer}>
        <RkButton style={styles2.plus} rkType='clear'>
          <RkText rkType='awesome secondaryColor'>{FontAwesome.plus}</RkText>
        </RkButton>

        <RkTextInput
          onChangeText={(message) => this.setState({message})}
          value={this.state.message}
          rkType='row sticker'
          placeholder="Add a comment..."/>

        <RkButton onPress={() => {console.log(this.state.message); this.sendMessage()}} style={styles2.send} rkType='circle highlight'>
          <Image source={require('../../assets/icons/sendIcon.png')}/>
        </RkButton>
      </View>
      </RkAvoidKeyboard>
    </DrawerLayoutAndroid>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  drawer: {
    backgroundColor: theme.colors.screen.base,
    flex:1
  },
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