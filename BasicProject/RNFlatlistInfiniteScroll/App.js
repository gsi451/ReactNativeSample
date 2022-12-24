import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList, // here
  ActivityIndicator,
} from 'react-native';

export default class App extends React.Component {
  state = {
    loading: false, // 로딩이 다 되지 않으면 새로운걸 가져오지 않도록 처리
    data: [],
    page: 1, // here
    refreshing: false,
  };

  _renderItem = ({item}) => (
    <View key={item.id} style={{borderBottomWidth: 1, marginTop: 20}}>
      <Image source={{uri: item.url}} style={{height: 200}} />
      <Text>{item.title}</Text>
      <Text>{item.id}</Text>
    </View>
  );

  // _getData 함수 수정
  _getData = () => {
    this.setState({loading: true});
    const url =
      'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=' +
      this.state.page;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        this.setState({
          loading: false,
          data: this.state.refreshing ? data : this.state.data.concat(data),
          page: this.state.page + 1,
          refreshing: false,
        });
      });
  };

  componentDidMount() {
    this._getData();
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        page: 1,
      },
      this._getData,
    );
  };

  _handleLoadMore = () => {
    if (!this.state.loading) {
      this._getData();
    }
  };

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => item.id}
        onEndReached={this._handleLoadMore}
        onEndReachedThreshold={1}
        refreshing={this.state.refreshing}
        onRefresh={this._handleRefresh}
        ListFooterComponent={this.state.loading && <ActivityIndicator />}
      />
    );
  }
}
