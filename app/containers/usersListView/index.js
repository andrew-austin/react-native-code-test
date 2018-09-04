import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './../../actions';
import styles from './style'

class UserListView extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return ({
      title: "Users",
      headerLeft:
        <TouchableOpacity ></TouchableOpacity>,
      headerRight: <TouchableOpacity ></TouchableOpacity>,
    })
  }

  componentDidMount() {
    this.fetchUserList(1);
  }

  fetchUserList = (page) => {
    this.props.getUserList('per_page='+this.props.perPage+'&page=' + page);
  }

  fetchMore = () => {
    if (this.props.usersList &&
      this.props.usersList.length > 0) {
      if (this.props.usersList.length < this.props.total &&
        !this.props.isLoading) {
        this.fetchUserList(this.props.page + 1)
      }
    }
  }

  renderFooter = () => {
    if (this.props.noMoreData && this.props.usersList.length)
      return (
        <View
          style={[styles.container,{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE"
          }]}>
        <Text>No more users </Text>
        </View>
      );
    // end No-MORE-DATA
    if (this.props.isLoading &&
      (this.props.usersList &&
        this.props.usersList.length)) return null;
    // end No-Layout
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
    //
  };

  renderOption = (rowItem) => {
    return (
      <View style={styles.listItem}>
        <View style={styles.imageWrapper}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
            source={{
              uri: rowItem.item.avatar
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            {rowItem.item.first_name} {rowItem.item.last_name}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    if (this.props.isLoading &&
      (this.props.usersList &&
        !this.props.usersList.length)) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}  >
          {(this.props.usersList &&
            this.props.usersList.length > 0) ?
            <FlatList
              data={this.props.usersList}
              renderItem={(item) => this.renderOption(item)}
              keyExtractor={(item) => 'key' + item.id}
              onEndReached={this.fetchMore}
              onEndReachedThreshold={0.3}
              ListFooterComponent={this.renderFooter}
            />
            :
            <View style={styles.container} >
              <Text >No users to show.</Text>
            </View>
          }
        </View>
      )
    }
  }

}

///////////////Redux  ///////////////
function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch: dispatch }, bindActionCreators(ActionCreators, dispatch));
}
function mapStateToProps(state) {
  return {
    total: state.users.total,
    page: state.users.page,
    isLoading: state.users.isLoading,
    usersList: state.users.data,
    noMoreData: state.users.noMoreData,
    perPage: state.users.per_page,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserListView);