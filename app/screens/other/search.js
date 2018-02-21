import React from 'react';
import axios from 'axios';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import {
  RkStyleSheet,
  RkText,
  RkTextInput
} from 'react-native-ui-kitten';
import {Avatar} from '../../components';
import {FontAwesome} from '../../assets/icons';
import {data} from '../../data';
import { UIConstants } from '../../config/appConstants';
let moment = require('moment');

export class Search extends React.Component {
  static navigationOptions = {
    title: 'Search'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.renderHeader = this._renderHeader.bind(this);
    this.renderItem = this._renderItem.bind(this);
    this.state = {
      query: "",
      data: [{"id":"-1","content":"Search Something."}]
    }
  }

  componentDidMount() {
    this.setState({
      data: [{"id":"-1","content":"Search Something."}]
    });
  }

  getData() {
    if (this.state.query == "") {
      this.setState({
        data: [{"id":"-1","content":"Search Something."}]
      });
    }
    let that = this;
    let url = "https://as-api-thetoto.herokuapp.com/search/fr/hub/profile/object/" + this.state.query;
    axios.request({
      method: "get",
      url: url,
    }).then(res => {
      console.log('act search ' + url);
      if (!res.data.success) {
        alert(res.data.error);
      }
      that.setState({
        data: res.data.result
      });
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

  _renderHeader() {
    return (
      <View style={styles.searchContainer}>
        <RkTextInput autoCapitalize='none'
                     autoCorrect={false}
                     onChangeText={(text) => this.setState({query: text})}
                     value={this.state.query}
                     onSubmitEditing={(event) => this.getData()}
                     label={<RkText rkType='awesome'>{FontAwesome.search}</RkText>}
                     rkType='row'
                     placeholder='Search'/>
      </View>
    )
  }

  _renderItem(info) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV2', {id: info.item.id})}>
        <View style={styles.container}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{info.item.content}</RkText>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderItem}/>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center'
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0
  },
  separator: {
    height: StyleSheet.hairlineWidth +1,
    backgroundColor: theme.colors.border.base
  }
}));