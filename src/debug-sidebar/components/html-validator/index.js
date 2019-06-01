import { __ } from '@wordpress/i18n'
import { BaseControl } from '@wordpress/components'
import { CodeTextarea } from '@stackable/components'
import { Component } from '@wordpress/element'
import { validateBlockHTML } from '../../util'

const editorSettings = {
	codemirror: {
		mode: 'html',
	},
}

class HTMLValidator extends Component {
	constructor() {
		super( ...arguments )
		this.state = {
			value: this.props.value,
			isValid: validateBlockHTML( this.props.value ),
		}
		this.onChange = this.onChange.bind( this )
	}

	onChange( value ) {
		this.setState( {
			value,
			isValid: validateBlockHTML( value ),
		} )
	}

	render() {
		return (
			<BaseControl
				className="ugb-html-validator">
				<p className="components-base-control__help">
					{ __( 'Enter some HTML below to see whether it renders correctly as a block. Check the browser console for block errors.' ) }
				</p>
				<CodeTextarea value={ this.state.value } onChange={ this.onChange } editorSettings={ editorSettings } />
				{ this.state.isValid === true && (
					<div className="ugb-html-validator--valid">
						<span role="img" aria-label={ __( 'Valid' ) }>✔️</span>
						{ __( 'Valid' ) }
					</div>
				) }
				{ this.state.isValid !== true && (
					<div className="ugb-html-validator--invalid">
						<span role="img" aria-label={ __( 'Invalid' ) }>️️⚠️</span>
						{ __( 'Invalid' ) }
						<br />
						{ this.state.isValid }
					</div>
				) }
			</BaseControl>
		)
	}
}

HTMLValidator.defaultProps = {
	value: `<!-- wp:paragraph -->
<p>Some sample code</p>
<!-- /wp:paragraph -->`,
}

export default HTMLValidator