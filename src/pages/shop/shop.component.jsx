import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Components
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// Redux
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';

class ShopPage extends Component  {

  state = {
    loading: true,
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route 
          exact 
          path={`${match.path}`} 
          component={CollectionsOverviewContainer}
        /> 
        <Route 
          path={`${match.path}/:collectionId`} 
          component={CollectionPageContainer}
        />  
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);