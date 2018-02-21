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
  Modal,
  Linking
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
import { WebBrowser} from 'expo';

export class Articles3 extends React.Component {


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
    let type = params ? params.type : "fanfic";
    let title;
    switch (type) {
      case "fanfic": 
        title = "Fanfics";
        break;
      case "fanvideo":
        title = "Fan vidéos";
        break;
      case "fangbook":
        title = "Livres-jeux";
        break;
      case "fanmusic":
        title = "Fan Musiques";
        break;
      default:
        title = "Type undefined";
        break;
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
      recent: [{"author":"Loading...","id":"-3","img":"http://"}],
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
    //this.type = "fanmusic"; // FORCE
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
    return Math.random(); // lol.
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => WebBrowser.openBrowserAsync(info.item.id)} >
      <RkCard rkType='horizontal' style={styles.card}>
        

        <View rkCardContent>
          <RkText numberOfLines={1} rkType='header6'>{info.item.title} -<RkText rkType='secondary6 hintColor'>{info.item.author}</RkText></RkText>
          
          <RkText style={styles.post} numberOfLines={4} rkType='secondary3'>{info.item.desc}</RkText>
        </View>

      </RkCard>
      </TouchableOpacity>
    )

  }

  _setModalVisible(bool) {
    this.props.navigation.setParams({isVisible: bool});
  }

  _renderItem2(info) {
    return (
      <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => WebBrowser.openBrowserAsync(info.item.id)} >
      <RkCard rkType='' style={styles.card}>
        
        <View rkCardContent>          
        <RkText numberOfLines={10} rkType='header6'>{info.item.name}</RkText>
          <RkText style={styles.post} numberOfLines={1} rkType='secondary3 hintColor'>{info.item.author}</RkText>
        </View>

      </RkCard>
      </TouchableOpacity>
    )
  }

  _renderItemS(info) {
    return (
      <TouchableOpacity onPress={() => { this._setModalVisible(false); this.props.navigation.navigate('Artist2', {authorid: info.item.id, type: this.type, author: info.item.content});}}>
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
        recent: res.data.recent
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
        <RkTabView.Tab title={'Récent'}>

            <FlatList
            data={this.state.recent}
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
  },
  post: {
    marginTop: 1
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