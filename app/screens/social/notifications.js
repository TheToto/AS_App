import React from 'react';
import axios from 'axios';
import {
  ListView,
  View,
  Image
} from 'react-native';
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {Avatar} from '../../components';
import {data} from '../../data';
import { UIConstants } from '../../config/appConstants';
import { FlatList } from 'react-native-gesture-handler';
let moment = require('moment');

export class Notifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications'
  };

  constructor(props) {
    super(props);
    this.state = {
      notifs: [],
      notifsold: []
    }
    this.renderItem = this.renderRow.bind(this);

  }

  componentDidMount() {
    this.recup();
    this.recup2();
  }

  recup () {
    console.log('Trigger');
    if (!UIConstants.isConnect()) {
      alert('Vous n\'êtes pas connecté !');
      return;
    }

    let that = this;
    let url = "https://as-api-thetoto.herokuapp.com/notif/new";
    console.log(url);
    
    axios.request({
      method: "post",
      url: url,
      data: {
        'cookie': UIConstants.getCookie()
      }
    }).then(res => {
      this.setState({notifs: res.data.notifs});
    }).catch(error => {
      console.log(error);
    });
  }

  recup2 () {
    console.log('Trigger');
    if (!UIConstants.isConnect()) {
      //alert('Vous n\'êtes pas connecté !');
      return;
    }

    let that = this;
    let url = "https://as-api-thetoto.herokuapp.com/notif/old";
    console.log(url);
    
    axios.request({
      method: "post",
      url: url,
      data: {
        'cookie': UIConstants.getCookie()
      }
    }).then(res => {
      this.setState({notifsold: res.data.notifs});
    }).catch(error => {
      console.log(error);
    });
  }

  _keyExtractor(item, index) {
    return index;
  }


  renderRow(row) {
    let mainContentStyle = styles.mainContent;
    let attachment =
        <Image style={styles.attachment} source={{uri: "https://www.animationsource.org/images/shared/AS-REMOVE.png"}}/>;

    return (
      <View style={styles.container}>
        <Avatar img={{uri: row.item.avatar}}
                rkType='circle'
                style={styles.avatar}/>
        <View style={styles.content}>
          <View style={mainContentStyle}>
            <View style={styles.text}>
              <RkText>
                <RkText rkType='header6'>{row.item.id}</RkText>
                <RkText rkType='primary2'> {row.item.content}</RkText>
              </RkText>
            </View>
            <RkText rkType='secondary5 hintColor'>Time</RkText>
          </View>
          {attachment}
        </View>
      </View>
    )
  }

  render() {
    let notifs = [...this.state.notifs, ...this.state.notifsold];
    return (
      <View>
        <FlatList
          style={styles.root}
          data={notifs}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}/>
      </View>

    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    alignItems: 'flex-start'
  },
  avatar: {},
  text: {
    marginBottom: 5,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 30,
    width: 30
  }
}));