import React from 'react';
import axios from 'axios';
import {
  ListView,
  TouchableHighlight,
  View,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {MainRoutes} from '../../config/navigation/routes';
import { UIConstants } from '../../config/appConstants';

import AutoHeightImage from 'react-native-auto-height-image';

export class ListMenu extends React.Component {
  static navigationOptions = {
    title: 'Plan du Site'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.state = {
      sitemap: [],
    }
    this.renderRow = this._renderRow.bind(this);
  }

  componentDidMount() {
    this.recup();
  }

  recup () {
    console.log('Trigger');
    if (!UIConstants.isConnect()) {
      alert('Vous n\'êtes pas connecté !');
      return;
    }

    let that = this;
    let url = "http://as-api-thetoto.herokuapp.com/sitemap/fr/" + UIConstants.getCurrentSite() + "/";
    console.log(url);
    
    axios.request({
      method: "GET",
      url: url,
    }).then(res => {
      let sitemap = res.data.menu;
      let thelist = [];
      for (var item in sitemap) {
        console.log(item);
        thelist.push({
          title: sitemap[item].title,
          img: sitemap[item].img,
          isTitle: true
        });
        let children = sitemap[item].children;
        for (var elem in children) {
          thelist.push({
            title: children[elem].title,
            url: children[elem].url,
            isTitle: false
          });
        }
      }
      console.log(thelist);
      this.setState({sitemap: thelist});
    }).catch(error => {
      console.log(error);
    });
  }

  _keyExtractor(item, index) {
    return index;
  }

  _renderRow(row) {
    if (row.item.isTitle) {
      return (
        <View
          style={styles.item2}>
          <View style={styles.container2}>
            <AutoHeightImage width={300} source={{uri: row.item.img}} >
            </AutoHeightImage>
          </View>
        </View>
      )
      // <RkText>{row.item.title}</RkText>
    } else {
      return (
        <TouchableHighlight
          style={styles.item}
          activeOpacity={1}
          onPress={() => {
            this.props.navigation.navigate(row)
          }}>
          <View style={styles.container}>
            <RkText>{row.item.title}</RkText>
          </View>
        </TouchableHighlight>
      )
    }

  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.sitemap}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderRow}/>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  item: {
    height: 50,
    paddingLeft:10,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    paddingHorizontal: 0
  },
  item2: {
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    paddingHorizontal: 0
  },
  list: {
    backgroundColor: theme.colors.screen.base,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 34,
    textAlign: 'center',
    marginRight: 16
  }
}));