import React from 'react';
import './directory.styles.scss';

// Selectors
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

// Redux 
import { connect } from 'react-redux';

// Components
import MenuItem from '../menu-item/menu-item.component';

const Directory  = ({ sections }) => (
  <div className="directory-menu">
    {
      sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem 
          key={id}
          {...otherSectionProps}
        />  
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
