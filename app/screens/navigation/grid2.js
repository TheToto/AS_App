import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  StatusBar,
  Platform
} from 'react-native';
import {
  RkText,
  RkButton,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {MainRoutes} from '../../config/navigation/routes';
import {FontIcons} from '../../assets/icons';
import { UIConstants } from '../../config/appConstants';
import * as SiteTheme from '../../config/sitetheme/index'

export class GridV2 extends React.Component {
  static navigationOptions = {
    title: 'Choix du site'
  };

  constructor(props) {
    super(props);
    this.state = {
      dimensions: undefined,
      active: [{ text: "Loading...", alias:'loading', icon: "https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif", iconColor: "#f42ced" }]
    }
    this.getActiveSite();
  };

  shadeColor(color, percent=-30) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

  _onLayout = event => {
    if (this.state.height)
      return;
    let dimensions = event.nativeEvent.layout;
    this.setState({dimensions})
  };

  _getEmptyCount(size) {
    let rowCount = Math.ceil((this.state.dimensions.height - 20) / size);
    return rowCount * 3 - MainRoutes.length;
  };

  getDailySite() {
    let date = new Date(Date.now()).getDate();
    if (date == 31) {
      return UIConstants.sites_list[0];
    }
    return UIConstants.sites_list[date-1];
  }

  getActiveSite() {
    let that = this;
    fetch("http://as-api-thetoto.herokuapp.com/chat/fr/active").then(response => response.json())
    .then(data => {
      console.log('act active');
      var aactive = [];
      data.active.map(function (elem, index) {
        let site = that.getSite(elem.chat);
        if (site)
          aactive.push(site);
      });
      that.setState({active: aactive});
    })
    .catch(error => console.log('error:', error));
  }

  getSite(alias) {
    for (var i in UIConstants.sites_list) {
      if (UIConstants.sites_list[i].alias == alias) {
        return UIConstants.sites_list[i];
      }
    }
    console.log('Site not found : ' + alias);
    return undefined;
  }

  checkTheme(site) {
    if (site.theme) {
      console.log('Switch Theme to ' + site.text);
      RkTheme.setTheme(site.theme);
      StatusBar.setBarStyle('light-content', true);
      Platform.OS == 'android' && StatusBar.setBackgroundColor(this.shadeColor(site.theme.colors.screen.base), true);
    } else {
      console.log('No Theme found for ' + site.text);
    }
  }

  render() {
    let navigate = this.props.navigation.navigate;
    let items = <View/>;
    let dailysite = <View/>;
    let activesite = <View/>;
    let that = this;

    if (this.state.dimensions) {
      let size = this.state.dimensions.width / 3;
      let daily = this.getDailySite();

      dailysite = (        
        <RkButton rkType='tile'
        style={{height: size-25, width: size}}
        key={-1}
        onPress={() => {
          UIConstants.setCurrentSite(daily);
          that.checkTheme(daily);
          navigate('Comments',{site: UIConstants.getCurrentSite()})
        }}>
        <ImageBackground style={{height: size-25, width: size}} source={{uri: daily.icon}} >
        <RkText rkType='small' style={{flex:1}} ></RkText>
        </ImageBackground>
        </RkButton>
      );

      items = UIConstants.sites_list.map(function (route, index) {
        return (
          <RkButton rkType='tile'
                    style={{height: size-25, width: size}}
                    key={index}
                    onPress={() => {
                      UIConstants.setCurrentSite(route);
                      that.checkTheme(route);
                      navigate('Comments',{site: UIConstants.getCurrentSite()})
                    }}>
            <ImageBackground style={{height: size-25, width: size}} source={{uri: route.icon}} >
            <RkText rkType='small' style={{flex:1}} ></RkText>
            </ImageBackground>
          </RkButton>
        )
      });
      let that = this;
      activesite = this.state.active.map(function (route, index) {
        return (
          <RkButton rkType='tile'
                    style={{height: size-25, width: size}}
                    key={-2-index}
                    onPress={() => {
                      UIConstants.setCurrentSite(route);
                      that.checkTheme(route);
                      navigate('Comments',{site: UIConstants.getCurrentSite()})
                    }}>
            <ImageBackground style={{height: size-25, width: size}} source={{uri: route.icon}} >
            <RkText rkType='small' style={{flex:1}} ></RkText>
            </ImageBackground>
          </RkButton>
        )
      });

    }

    return (
      <ScrollView
        style={styles.root}
        onLayout={this._onLayout}
        contentContainerStyle={styles.rootContainer}>
      <RkText style={styles.text} >Site du jour / Sites actifs</RkText>
        {dailysite}
        {activesite}
      <RkText style={styles.text} >Tout les sites</RkText>
        {items}
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
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