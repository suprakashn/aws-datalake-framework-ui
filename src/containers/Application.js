import Layout from 'layout/Layout';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Application = (props) => {
	return (
		<>
		<Layout />
		</>
	)
}

const mapStateToProps = state => ({
 
})
const mapDispatchToProps = dispatch => bindActionCreators({
	
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Application);