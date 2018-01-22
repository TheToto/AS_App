import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import {
  RkText,
  RkButton,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {sites_list} from '../../config/navigation/routes';

export class GridV3 extends React.Component {
  static navigationOptions = {
    title: 'Sites'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.state = {dimensions: undefined}
  };

  _onLayout = event => {
    if (this.state.height)
      return;
    let dimensions = event.nativeEvent.layout;
    this.setState({dimensions})
  };

  _getEmptyCount(size) {
    let rowCount = Math.ceil((this.state.dimensions.height - 20) / size);
    return rowCount * 3 - sites_list.length;
  };

  render() {
    let navigate = this.props.navigation.navigate;
    let items = <View/>;

    if (this.state.dimensions) {
      let size = this.state.dimensions.width / 3;
      let emptyCount = this._getEmptyCount(size);

      items = sites_list.map(function (site, index) {
        return (
          <RkButton rkType='tile'
                    style={{height: size, width: size}}
                    key={index}
                    onPress={() => {
                      console.log(site.alias);
                    }}>

            <RkText rkType='small'>{site.text}</RkText>
          </RkButton>
        )
      });

      for (let i = 0; i < emptyCount; i++) {
        items.push(<View key={'empty' + i} style={[{height: size, width: size}, styles.empty]}/>)
      }
    }

    return (
      <ScrollView
        style={styles.root}
        onLayout={this._onLayout}
        contentContainerStyle={styles.rootContainer}>
        {items}
      </ScrollView>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
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