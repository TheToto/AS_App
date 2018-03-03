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
import PersoWebView from '../../components/webview';
import { UIConstants } from '../../config/appConstants';
import { ComDrawer } from '../../components/comdrawer';
const moment = require('moment');

export class ProfileV2 extends React.Component {
  static navigationOptions = ({navigation}) => {
    return (
      {
        title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Profil': navigation.state.params.title,
      });
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    this.id = params ? params.id : UIConstants.id;
    this.state = {
      id: this.id,
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
        galleries: {},
        "pseudo": "Loading...",
        "online": false,
        "main": { registration: 0},
        "desc": "Loading..."
      }
    }
  }
  componentDidMount() {
    let that = this;

    fetch("https://as-api-thetoto.herokuapp.com/profile/fr/"+UIConstants.getCurrentSite() + '/' +this.id).then(response => response.json())
    .then(data => {
      console.log('act profile ' + this.id);
      that.setState(data);
      this.props.navigation.setParams({title: "Profil de " + data.infos.pseudo});
      console.log(data.infos.pseudo);
    })
    .catch(error => console.log('error:', error));
  }

  render() {
    let flag, gender = <View />;
    if (this.state.infos.main.country) {
      console.log('yes' + this.state.infos.main.country);
      flag = <Image style={{alignSelf:'center',height:20, width:33}} source={{uri: 'https://www.animationsource.org/images/shared/flags/'+this.state.infos.main.country+ '.gif'}} />
    }
    if (this.state.infos.main.gender) {
      gender = <Image style={{alignSelf:'center',height:25, width:20}}  source={{uri: 'https://www.animationsource.org/images/shared/' + this.state.infos.main.gender + '.gif'}} />
    }
    let cssAdd = "<style>img{max-width: 100% !important; max-height: 100% !important }</style>";
    let gal_list = ["fanart","fanimage","fangbook","fanfic","music","video"];
    let type_list = ["fanart","fanimage","fangbook","fanfic","fanmusic","fanvideo"];
    let screen_list = ["Artist","Artist","Artist2","Artist2","Artist2","Artist2"];
    let infos_sup = ["group","email"];
    let other = ["char","article","review", "contest", "project"]

    let that = this;
    let galleries = gal_list.map(function (item, index) {
      if (that.state.infos.galleries[item]) {
        console.log(item);
        console.log(that.state.infos.galleries[item].count);
        return(
          <View key={that.state.infos.galleries[item].id} style={styles.section}>
              <RkButton onPress={() => {
                  that.props.navigation.navigate(screen_list[index], {authorid: that.state.infos.galleries[item].id, type: type_list[index], author: that.state.infos.pseudo});
                }} style={styles.button}  rkType='small outline'>
                <RkText rkType='awesome primary'>{FontAwesome[item]} : {that.state.infos.galleries[item].count}</RkText>
              </RkButton>
          </View>
        )
      }
    });
    let infos = infos_sup.map(function (item, index) {
      if (that.state.infos.main[item]) {
        return(
          <View key={index} style={styles.userInfo}>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{that.state.infos.main[item]}</RkText>
            {/*<RkText rkType='secondary1 hintColor'>{item}</RkText>*/}
          </View>
          </View>
        )
      }
    });
    let brithday = <View />;
    if (this.state.infos.main.birthday) {
      brithday = (
        <View style={styles.section}>
          <RkText rkType='header3' style={styles.space}>{moment(this.state.infos.main.birthday, 'X').format("DD/MM/YY")}</RkText>
          <RkText rkType='secondary1 hintColor'>Anniv'</RkText>
        </View>
      );
    }
    let wid = Dimensions.get('window').width;
    let webview = <RkText>Loading...</RkText>;
    if (this.state.infos.desc != "Loading...") {
      webview = (
        <PersoWebView
            navigation={this.props.navigation}
            source={{html: cssAdd + this.state.infos.desc}}
            startInLoadingState={true}
            defaultHeight={2000}
        />
      );
    }
    return (
      <ComDrawer url={"https://as-api-thetoto.herokuapp.com/profile/" + this.state.id} comments={this.state.comments} navigation={this.props.navigation}>
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <View style={styles.row}>
            <View style={styles.buttons}>
              <RkButton style={styles.button} rkType='icon circle'>
                <RkText rkType='moon large primary awesome'>{FontIcons.profile}</RkText>
              </RkButton>
            </View>
            <Avatar img={{uri : this.state.infos.avatar}} rkType='big'/>
            <View style={styles.buttons}>
              <RkButton onPress={() => {
                  this.props.navigation.navigate('SendMp', {id: this.state.id, to: this.state.infos.pseudo, avatar: this.state.infos.avatar});
                }} style={styles.button} rkType='icon circle'>
                <RkText rkType='moon large primary awesome'>{FontIcons.mail}</RkText>
              </RkButton>
            </View>
          </View>
          <View style={styles.section} ><View style={{flexDirection: 'row'}}>
            <RkText rkType='header2'>{this.state.infos.pseudo}  </RkText>{flag}{gender}
          </View></View>
        </View>
        <View style={styles.userInfo}>
          {galleries}
        </View>
        <View style={styles.userInfo}>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{moment(this.state.infos.main.registration, 'X').format("DD/MM/YY")}</RkText>
            <RkText rkType='secondary1 hintColor'>Inscription</RkText>
          </View>
              {brithday}
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.state.id}</RkText>
            <RkText rkType='secondary1 hintColor'>ID</RkText>
          </View>
        </View>
          {infos}
        {webview}
      </ScrollView>
      </ComDrawer>
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
    color: theme.colors.text.hint,
    borderColor: theme.colors.text.hint,
    width:200
  }
}));
