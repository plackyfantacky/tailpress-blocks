import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,
	edit(props) {
        return (
            <p { ...useBlockProps() }>
                { __(
                    'Tailpress Blocks – hello from the editor!',
                    'tailpress-blocks'
                ) }
            </p>
        );
    },
	save(props) {
        return (
            <p { ...useBlockProps.save() }>
                { 'Tailpress Blocks – hello from the saved content!' }
            </p>
        );
    }
} );
