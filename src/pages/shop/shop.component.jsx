import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

// Firestore
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// HOC
import WithSpinner from '../../components/with-spinner/with-spinner.component';

// Redux
import { updateCollections } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component  {

  state = {
    loading: true,
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/>} /> 
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />  
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);