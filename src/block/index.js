/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './index.scss';
import './editor.scss';
import settings from './settings';
import transforms from './transforms';
import edit from './edit';
import deprecated from './deprecated';

registerBlockType('ballschule/accordion-item', {
	...settings,

	transforms,

	edit,

	save: ({ attributes }) => {
		const {
			className,
			title,
			subtitle,
			duration,
			initiallyOpen,
			clickToClose,
			autoClose,
			titleTag,
			scroll,
			scrollOffset,
			uuid,
		} = attributes;

		let itemClasses = [
			'c-accordion__item',
			'js-accordion-item',
			'no-js',
		];

		let titleClasses = [
			'c-accordion__title',
		];

		let contentStyles = {};

		if (titleTag === 'button') {
			titleClasses.push('c-accordion__title--button');
		}

		if (initiallyOpen) {
			itemClasses.push('is-open');
		}
		else {
			contentStyles.display = 'none';
		}

		const blockProps = useBlockProps.save({
			className: [...itemClasses, className].join(' '),
			'data-initially-open': initiallyOpen,
			'data-click-to-close': clickToClose,
			'data-auto-close': autoClose,
			'data-scroll': scroll,
			'data-scroll-offset': scrollOffset,
		});

		const innerBlocksProps = useInnerBlocksProps.save({
			id: 'ac-' + uuid,
			className: 'c-accordion__content',
		});

		return (
			<div { ...blockProps }>
				<div
					id={ 'at-' + uuid }
					className={ 'js-accordion-controller' }
					role="button"
					aria-controls={ 'ac-' + uuid }
				>
					<RichText.Content
						className={ titleClasses.join(' ') }
						tagName={ titleTag }
						value={ title }
					/>
					<RichText.Content
						className={ 'c-accordion__subtitle'}
						tagName={ 'span' }
						value={ subtitle }
					/>
					<RichText.Content
						className={ 'c-accordion__duration'}
						tagName={ 'span' }
						value={ duration }
					/>
				</div>
				<div { ...innerBlocksProps } />
			</div>
		);
	},
	//deprecated,
});
