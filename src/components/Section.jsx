import React from 'react';
import PropTypes from 'prop-types';
import styles from './Section.module.css'; // Create and style accordingly

const Section = ({ title, children }) => (
  <div className={styles.section}>
    {title && <h2>{title}</h2>}
    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Section;
