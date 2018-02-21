import React from 'react';
import axios from 'axios';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView
} from 'react-native';
import {
  RkText, RkButton,
  RkCard, RkStyleSheet, RkTabView
} from 'react-native-ui-kitten';
import {SocialBar} from '../../components';
import {data} from '../../data';
import { UIConstants } from '../../config/appConstants';
import { ComDrawer } from '../../components/comdrawer';
import ImageView from 'react-native-image-view';
import { RkTextInput } from 'react-native-ui-kitten/src/components/textinput/rkTextInput';

export class Artist extends React.Component {
  static navigationOptions = {
    title: 'Artist'.toUpperCase()
  };
  static navigationOptions = ({navigation}) => {
    let {params} = navigation.state;
    let type = params ? params.type : "fanimage";
    let author = params ? params.author : "User";
    let title;
    if (type == "fanimage") {
      title = "Fan Images de " + author 
    } else {
      title = "Fan Arts de " + author 
    }
    return (
      {
        title: title
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      imgs: [{"id":"-1","title":"Loading...","img":"http://","authorid":"1","author":"Loading..."}],
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
      isVisible: false,
      url: "",
      title: "",
      page:1,
      up: 0,
      more: true,
    }
    let {params} = this.props.navigation.state;
    console.log(params);
    this.type = params ? params.type : "fanimage";
    this.authorid = params ? params.authorid : 1;
    this.author = params ? params.author : "User";
    this.displayimgs = [];
    this.bol = [];
    this.renderItem = this._renderItem.bind(this);
    this.renderFooter = this._renderFooter.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  _renderItem(info) {
    if (!this.bol[info.item.id]) {
      this.bol[info.item.id] = true;
      this.displayimgs[info.item.id] = info.item.img;
      let img; // Ugly way to load the img...
      let img1 = info.item.img.replace('p.jpg','.jpg'); //Don't load preview, need better quality pls.
      let img2 = info.item.img.replace('p.jpg','.png');
      let img3 = info.item.img.replace('p.jpg','.gif');
      
      Image.getSize(img1, () => {
        img = img1;
        this.displayimgs[info.item.id] = img1;
        this.setState({up: this.state.up +1});
      }, () => { 
        Image.getSize(img2, () => {
          img = img2;
          this.displayimgs[info.item.id] = img2;
          this.setState({up: this.state.up +1});
        }, () => { 
          Image.getSize(img3, () => {
            img = img3;
            this.displayimgs[info.item.id] = img3;
            this.setState({up: this.state.up +1});
          }, () => { 
            img = info.item.img;
          });
        });
      });
    }
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.id, authorid: info.item.authorid, type: this.type, author: this.author})}
        onLongPress={()=> { this.setState({url: this.displayimgs[info.item.id], title:info.item.name ,isVisible: true}); }} >
        <RkCard rkType='imgBlock' style={styles.card}>
        
          <Image key={this.displayimgs[info.item.id]} rkCardImg source={{uri : this.displayimgs[info.item.id]}}/>


          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header4 inverseColor'>{info.item.name}</RkText>
            <RkText style={styles.time}
                    rkType='secondary2 inverseColor'>Date</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  getData() {
    console.log('act ' + "http://as-api.thetoto.tk/" + this.type + "/fr/" + UIConstants.getCurrentSite() + '/' + this.authorid + "?page=" + this.state.page);
    let that = this;
    axios.request({
      method: "get",
      url: "http://as-api.thetoto.tk/" + this.type + "/fr/" + UIConstants.getCurrentSite() + '/' + this.authorid + "?page=" + that.state.page,
      responseType:'json'
    }).then(res => {
      if (res.data.imgs.length == 0) {
        console.log('No more imgs');
        this.setState({more: false});
        return;
      }
      if (that.state.page == 1) {
        that.setState({
          imgs: res.data.imgs,
          comments: res.data.comment,
          page: this.state.page+1
        });
      } else {
      that.setState({
        imgs: [...this.state.imgs, ...res.data.imgs],
        comments: res.data.comment,
        page: this.state.page+1
      });
    }
    });
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
      <ComDrawer url={"http://as-api.thetoto.tk/" + this.type + "/fr/" + UIConstants.getCurrentSite() + '/' + this.authorid}  comments={this.state.comments} navigation={this.props.navigation}>
          <ImageView
            title={this.state.title}
            source={{uri: this.state.url}}
            isVisible={this.state.isVisible}
            />
          <FlatList 
          data={this.state.imgs}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}
          ListFooterComponent={this.renderFooter}
          />
          
      </ComDrawer>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8,
  },
  time: {
    marginTop: 5
  },
  list: {

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
  text: {
    width:Dimensions.get('window').width,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight:50
  },
  root: {
    backgroundColor: theme.colors.screen.base
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base
  },
  icon: {
    marginBottom: 16
  }
}));