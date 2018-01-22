import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image
} from 'react-native';
import {
  RkText,
  RkButton,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {MainRoutes, sites_list} from '../../config/navigation/routes';
import {FontIcons} from '../../assets/icons';
import { UIConstants } from '../../config/appConstants';

export class GridV2 extends React.Component {
  static navigationOptions = {
    title: 'Sites Menu'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.state = {
      dimensions: undefined,
      active: [{ text: "Loading...", alias:'loading', icon: "https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif", iconColor: "#f42ced" }]
    }
    this.getActiveSite();
  };

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
    return sites_list[date-1];
  }

  getActiveSite() {
    let that = this;
    fetch("http://as-api-thetoto.herokuapp.com/chat/fr/active").then(response => response.json())
    .then(data => {
      console.log('act active');
      var aactive = [];
      data.active.map(function (elem, index) {
        aactive.push(that.getSite(elem.chat));
      });
      that.setState({active: aactive});
    })
    .catch(error => console.log('error:', error));
  }

  getSite(alias) {
    for (var i in sites_list) {
      if (sites_list[i].alias == alias) {
        return sites_list[i];
      }
    }
    console.log('Site not found : ' + alias);
    return undefined;
  }

  render() {
    let navigate = this.props.navigation.navigate;
    let items = <View/>;
    let dailysite = <View/>;
    let activesite = <View/>;

    if (this.state.dimensions) {
      let size = this.state.dimensions.width / 3;
      let daily = this.getDailySite();

      dailysite = (        
        <RkButton rkType='tile'
        style={{height: size-25, width: size}}
        key={-1}
        onPress={() => {
          UIConstants.setCurrentSite(daily.text, daily.alias);
          navigate('Comments',{site: UIConstants.getCurrentSite()})
        }}>
        <ImageBackground style={{height: size-25, width: size}} source={{uri: daily.icon}} >
        <RkText rkType='small' style={{flex:1}} ></RkText>
        </ImageBackground>
        </RkButton>
      );

      items = sites_list.map(function (route, index) {
        return (
          <RkButton rkType='tile'
                    style={{height: size-25, width: size}}
                    key={index}
                    onPress={() => {
                      UIConstants.setCurrentSite(route.text, route.alias);
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
                      UIConstants.setCurrentSite(route.text, route.alias);
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