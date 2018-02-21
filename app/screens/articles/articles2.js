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
  ScrollView,
  Modal
} from 'react-native';
import {
  RkText, RkButton,
  RkCard, RkStyleSheet, RkTabView
} from 'react-native-ui-kitten';
import {SocialBar, Avatar} from '../../components';
import {data} from '../../data';
import { UIConstants } from '../../config/appConstants';
import ImageView from 'react-native-image-view';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { RkTextInput } from 'react-native-ui-kitten/src/components/textinput/rkTextInput';
import { FontAwesome } from '../../assets/icons';

export class Articles2 extends React.Component {


  static navigationOptions = ({navigation}) => {
    let renderAvatar = () => {
      return (
        <TouchableOpacity
        onPress={() => { navigation.setParams({isVisible: true}); }} >
          <Avatar style={{marginRight: 16}} rkType='small' img={{uri:"https://d30y9cdsu7xlg0.cloudfront.net/png/14173-200.png"}}/>
        </TouchableOpacity>
      );
    };

    let renderTitle = (title) => {
      return (
        <TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <RkText rkType='header5'>{title}</RkText>
          </View>
        </TouchableOpacity>
      )
    };

    let {params} = navigation.state;
    let type = params ? params.type : "fanimage";
    let title;
    if (type == "fanimage") {
      title = "Fan Images"
    } else {
      title = "Fan Arts"
    }

    let rightButton = renderAvatar();
    let titleC = renderTitle(title);
    navigation.state.params = { isVisible: false, ...navigation.state.params }
    return (
      {
        headerTitle: titleC,
        headerRight: rightButton
      });
  };
  

  constructor(props) {
    super(props);
    this.state = {
      must_see: [{"id":"-2","title":"Loading...","img":"http://","authorid":"1","author":"Loading..."}],
      artists: [{"author":"Loading...","id":"-3","img":"http://"}],
      isVisible: false,
      url: "",
      title: "",
      query: "",
      data: [{"id":"-1","content":"Search Something."}],
      up:true,
    }
    let {params} = this.props.navigation.state;
    console.log(params);
    this.type = params ? params.type : "fanimage";
    this.displayimgs = [];
    this.bol = [];
    this.renderItem = this._renderItem.bind(this);
    this.renderItem2 = this._renderItem2.bind(this);
    this.renderItemS = this._renderItemS.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  _keyExtractor(post, index) {
    return Math.random();
  }

  _renderItem(info) {
    let myid = info.item.id + info.item.authorid;
    if (!this.bol[myid]) {
      this.bol[myid] = true;
      this.displayimgs[myid] = info.item.img;
      let img; // Ugly way to load the img...z
      let img1 = info.item.img.replace('p.jpg','.jpg'); //Don't load preview, need better quality pls.
      let img2 = info.item.img.replace('p.jpg','.png');
      let img3 = info.item.img.replace('p.jpg','.gif');
      
      Image.getSize(img1, () => {
        img = img1;
        this.displayimgs[myid] = img1;
        this.setState({up: !this.state.up});
      }, () => { 
        Image.getSize(img2, () => {
          img = img2;
          this.displayimgs[myid] = img2;
          this.setState({up: !this.state.up});
        }, () => { 
          Image.getSize(img3, () => {
            img = img3;
            this.displayimgs[myid] = img3;
            this.setState({up: !this.state.up});
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
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.id, authorid: info.item.authorid, type: this.type, author: info.item.author})}
        onLongPress={()=> { this.setState({url: this.displayimgs[myid], title:info.item.name ,isVisible: true}); }} >
        <RkCard rkType='imgBlock' style={styles.card}>
        <Image key={this.displayimgs[myid]} rkCardImg source={{uri : this.displayimgs[myid]}}/>

          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header4 inverseColor'>{info.item.title}</RkText>
            <RkText style={styles.time}
                    rkType='secondary2 inverseColor'>{info.item.author}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  _setModalVisible(bool) {
    this.props.navigation.setParams({isVisible: bool});
  }

  _renderItem2(info) {
    let size = Dimensions.get('window').width / 2;
    return (
      <RkButton rkType='tile'
      style={{height: size/(16/9), width: size}}
      onPress={() => {
        this.props.navigation.navigate('Artist',{authorid: info.item.id, type: this.type, author: info.item.author})
      }}>
        <ImageBackground style={{height: size/1.7, width: size}} source={{uri: info.item.img}} >
          <RkText rkType='small' style={{flex:1}} ></RkText>
        </ImageBackground>
      </RkButton>
    )
  }

  _renderItemS(info) {
    return (
      <TouchableOpacity onPress={() => { this._setModalVisible(false); this.props.navigation.navigate('Artist', {authorid: info.item.id, type: this.type, author: info.item.content});}}>
        <View style={styles.container}>
            <View style={styles.contentHeader}>
              <RkText rkType='header5'>{info.item.content}</RkText>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  Search() {
    if (this.state.query == "") {
      this.setState({
        data: [{"id":"-1","content":"Search Something."}]
      });
    }
    let that = this;
    let url = "https://as-api-thetoto.herokuapp.com/search/fr/" + UIConstants.getCurrentSite() + "/" + this.type + "/author/" + this.state.query;
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

  getData() {
    console.log("http://as-api-thetoto.herokuapp.com/" + this.type + "/fr/" + UIConstants.getCurrentSite());
    let that = this;
    axios.request({
      method: "get",
      url: "http://as-api-thetoto.herokuapp.com/" + this.type + "/fr/" + UIConstants.getCurrentSite(),
      responseType:'json'
    }).then(res => {
      that.setState({
        must_see: res.data.must_see,
        artists: res.data.artists,
      });
    });
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Modal
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => this._setModalVisible(false)}
        visible={this.props.navigation.state.params.isVisible}>
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <View style={styles.popupContent}>
            <RkTextInput rkType='bordered' placeholder='Recherche'
                onChangeText={(text) => this.setState({query: text})}
                onSubmitEditing={(event) => this.Search()}
                autoCapitalize='none'
                autoCorrect={false}
                label={<RkText rkType='awesome'>{FontAwesome.search}</RkText>}
                value={this.state.query} />
                  <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    ItemSeparatorComponent={this._renderSeparator}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItemS} />
            </View>
            <View style={styles.popupButtons}>
              <RkButton onPress={() => this._setModalVisible(false)}
                        style={styles.popupButton}
                        rkType='clear'>
                <RkText rkType='light'>CANCEL</RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </Modal>
      <RkTabView>
        <RkTabView.Tab title={'Must See'}>
          <ImageView
            onClose={()=> {this.setState({isVisible: false})}}
            title={this.state.title}
            source={{uri: this.state.url}}
            isVisible={this.state.isVisible}
            />
          <FlatList 
          data={this.state.must_see}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}/>
        </RkTabView.Tab>
        <RkTabView.Tab title={'Artists'}>

            <FlatList
            numColumns={2}
            data={this.state.artists}
            extraData={this.state}
            renderItem={this.renderItem2}
            keyExtractor={this._keyExtractor}
            style={styles2.container}/>

        </RkTabView.Tab>
      </RkTabView>

      </View>

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
  popup: {
    backgroundColor: theme.colors.screen.base,
    marginTop: scaleVertical(70),
    marginHorizontal: 37,
    borderRadius: 7
  },
  popupOverlay: {
    backgroundColor: theme.colors.screen.overlay,
    flex: 1,
    marginTop: UIConstants.HeaderHeight
  },
  popupContent: {
    alignItems: 'center',
    margin: 16
  },
  popupHeader: {
    marginBottom: scaleVertical(45)
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: theme.colors.border.base
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    width: 1
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