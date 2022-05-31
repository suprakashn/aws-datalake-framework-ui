import { PureComponent } from 'react';
import { Helmet } from 'react-helmet/es/Helmet';

import logo from 'images/tigerLogo.png';
class ReactHelmet extends PureComponent {
	render() {
		return (
			<>
			<Helmet>
				<title>Tiger DataLake</title>
				<html lang="en"/>
				<meta name="description" content="Tiger Data lake GCP"/>
				<link rel="icon" href={logo} type="image/png" size="64x64 32x32 24x24 16x16"/>
			</Helmet>
			{this.props.children}
			</>
		)
	}
}

export default ReactHelmet;
