import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

// Components
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// Redux
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';

const ShopPage = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

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
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);