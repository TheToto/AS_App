import React from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  RkCard,
  RkText, RkStyleSheet, RkButton
} from 'react-native-ui-kitten';
import {Avatar} from '../../components/avatar';
import {SocialBar} from '../../components/socialBar';
import axios from "axios";

import {data} from '../../data';
import { UIConstants } from '../../config/appConstants';
let moment = require('moment');

export class Feed extends React.Component {
  static navigationOptions = {
    title: 'News'
  };

  constructor(props) {
    super(props);
    this.state = {
      more:true,
      page:1,
      news: [],
    }
    this.renderItem = this._renderItem.bind(this);
    this.renderFooter = this._renderFooter.bind(this);
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    console.log('act ' + "http://as-api.thetoto.tk/" + "news" + "?page=" + this.state.page);
    let that = this;
    axios.request({
      method: "get",
      url: "http://as-api.thetoto.tk/" + "news" + "?page=" + this.state.page,
      responseType:'json'
    }).then(res => {
      if (res.data.news.length == 0) {
        console.log('No more news');
        this.setState({more: false});
        return;
      }
      if (that.state.page == 1) {
        that.setState({
          news: res.data.news,
          comments: res.data.comment,
          page: that.state.page+1
        });
      } else {
      that.setState({
        news: [...that.state.news, ...res.data.news],
        comments: res.data.comment,
        page: that.state.page+1
      });
    }
    });
  }

  _renderItem(info) {
    let img = info.item.img;
    if (img.startsWith('/')) {
      img = "https://animationsource.org" + img;
    }
    let siteimg = this.getSiteimg(info.item.sitename);
    return (
      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('news', {id: info.item.id})} >
      <RkCard style={styles.card}>
        <View rkCardHeader>
        <Avatar rkType='small'
                  style={styles.avatar}
                  img={{uri:siteimg}}/>
          <View>
            <RkText rkType='header4'>{info.item.title}</RkText>
            <RkText rkType='secondary2 hintColor'>{moment(info.item.date, 'X').format() } - {info.item.author}</RkText>
          </View>
        </View>
        <Image rkCardImg source={{uri:img}}/>
      </RkCard>
      </TouchableOpacity>
    )
  }

  getSiteimg(alias) {
    for (var i in UIConstants.sites_list) {
      if (UIConstants.sites_list[i].alias == alias) {
        return UIConstants.sites_list[i].badge;
      }
    } 
    console.log('Site not found : ' + alias);
    return "https://www.animationsource.org/images/shared/BANNER-AS.png";
  }

  _renderFooter() {
    if (this.state.more) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}} ><RkButton onPress={() => { this.getData() } } rkType='rounded outline' contentStyle={styles.buttonMore} style={styles.buttonMore2} >Load More !</RkButton></View>
      );
    } else {
      return <View />;
    }
  }

  render() {
    return (
      <FlatList data={this.state.news}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
                extraData={this.state}
                ListFooterComponent={this.renderFooter}
                style={styles.container}/>
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