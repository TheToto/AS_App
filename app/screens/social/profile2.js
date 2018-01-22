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
import {Avatar} from '../../components';
import {Gallery} from '../../components';
import {data} from '../../data';
import {FontIcons} from '../../assets/icons';
import {FontAwesome} from '../../assets/icons';
import {scale} from '../../utils/scale';
import formatNumber from '../../utils/textUtils';
import MyWebView from 'react-native-webview-autoheight';
import { UIConstants } from '../../config/appConstants';

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

export class ProfileV2 extends React.Component {
  static navigationOptions = {
    title: 'User Profile'.toUpperCase()
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    let id = params ? params.id : UIConstants.id;
    this.state = {
      id: id,
      page:2,
      message:"",
      comments: [{
        "id": "-1",
        "date": "",
        "author": {
          "id": "1",
          "name": "Loading...",
          "avatar": "https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif"
        },
        "content": "Loading..."
      }],
      "infos": {
        "lang": "...",
        "pseudo": "Loading...",
        "forumid": "...",
        "online": false,
        "main": {
          "Mygroup": "Loading...",
          "Country": "france"
        },
        "desc": "<p>Loading...</p>\n"
      }
    }
    let that = this;

    fetch("https://as-api-thetoto.herokuapp.com/profile/"+id).then(response => response.json())
    .then(data => {
      console.log('act profile ' + id);
      that.setState(data);
    })
    .catch(error => console.log('error:', error));
    //this.user = data.getUser(id);

    this.renderItem = this._renderItem.bind(this);
  }
  componentDidMount() {
    //this.getComs(true);
  }

  getComs(bool) {
    let that = this;
    let url = "https://as-api-thetoto.herokuapp.com/profile/" + this.state.id + "/comments?page=" + this.state.page;
    if (bool) {
      this.setState({page: 2});

    } else {
      this.setState({page: this.state.page+1});
    }
      fetch(url).then(response => response.json())
    .then(data => {
      console.log('act comm ' + url);
      if (bool) {
        that.setState({
          comments: data.main
        });
      } else {
        that.setState({
          comments: [...this.state.comments, ...data.main]
        });
      }
    })
    .catch(error => console.log('error:', error));
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
      "date": "",
      "author": {
        "id": UIConstants.id,
        "name": UIConstants.pseudo,
        "avatar": UIConstants.avatar
      },
      "content": this.state.message
    }
    let mess = this.state.message;
    this.setState({
      comments: [newCom, ...this.state.comments],
      message: ""
     });
    axios.request({
      method: "post",
      url: "https://as-api-thetoto.herokuapp.com/profile/" + this.state.id + "/comments",
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

  render() {
    let cssAdd = "<style>img{max-width: 100% !important; max-height: 100% !important }</style>";
    let items = [];

    for (var prop in this.state.infos.main) {
      if (prop == "Age" || prop == "Membersince") {
        items.push({name: prop, content: new Date(this.state.infos.main[prop] * 1000).toLocaleDateString('fr-FR') });
      } else {
        items.push({name: prop, content: this.state.infos.main[prop]});
      }
    }
    let info = items.map(function (route, index) {
      return(
        <View key={index} style={styles.userInfo}>
        <View style={styles.section}>
          <RkText rkType='header3' style={styles.space}>{route.content}</RkText>
          <RkText rkType='secondary1 hintColor'>{route.name}</RkText>
        </View>
        </View>
      )
    });
    let navigationView = (
      <RkAvoidKeyboard style={styles2.container} onResponderRelease={(event) => {
        Keyboard.dismiss();
      }}>
      <FlatList
      inverted
        style={styles2.list}
        data={this.state.comments}
        extraData={this.state}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderItem}
        ListFooterComponent={<View style={{justifyContent: 'center', alignItems: 'center'}} ><RkButton onPress={() => { this.getComs(false) } } rkType='rounded outline' style={{width:200}}>Load More !</RkButton></View>}/>

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
          <Image source={require('../../assets/icons/sendIcon.png')}/>
        </RkButton>
      </View>
      </RkAvoidKeyboard>
    );
    return (
      <DrawerLayoutAndroid
      drawerWidth={350}
      drawerPosition={DrawerLayoutAndroid.positions.Right}
      renderNavigationView={() => navigationView}>
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <View style={styles.row}>
            <View style={styles.buttons}>
              <RkButton style={styles.button} rkType='icon circle'>
                <RkText rkType='moon large primary'>{FontIcons.profile}</RkText>
              </RkButton>
            </View>
            <Avatar img={{uri : this.state.infos.avatar}} rkType='big'/>
            <View style={styles.buttons}>
              <RkButton style={styles.button} rkType='icon circle'>
                <RkText rkType='moon large primary'>{FontIcons.mail}</RkText>
              </RkButton>
            </View>
          </View>
          <View style={styles.section}>
            <RkText rkType='header2'>{this.state.infos.pseudo}</RkText>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.state.infos.lang}</RkText>
            <RkText rkType='secondary1 hintColor'>ServerSide</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.state.id}</RkText>
            <RkText rkType='secondary1 hintColor'>ID</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.state.infos.forumid}</RkText>
            <RkText rkType='secondary1 hintColor'>Forum ID</RkText>
          </View>
        </View>
          {info}
        <MyWebView
            source={{html: cssAdd + this.state.infos.desc}}
            startInLoadingState={true}
            defaultHeight={400}
        />
      </ScrollView>
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