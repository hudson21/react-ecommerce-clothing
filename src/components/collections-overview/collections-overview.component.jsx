import React from 'react';
import './collections-overview.styles.scss';

// Components
import CollectionPreview from '../collection-preview/collection-preview.component';

// Redux
import { connect } from 'react-redux';

// Selectors
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'


const CollectionsOverview = ({ collections }) => {
  console.log("collections", collections);
  
  return (
    <div className='collections-overview'>
    {
      collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview 
          key={id}
          {...otherCollectionProps}
        />
      ))
    }
    </div>
  )
};

const maptStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
});

export default connect(maptStateToProps)(CollectionsOverview);