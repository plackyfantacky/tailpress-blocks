import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

addFilter(
    'blocks.registerBlockType',
    'tailpress-blocks/code',
    function(settings, name ) {
        if (name !== 'core/code') {
            return settings;
        }

        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                highlightLanguage: {
                    type: 'string',
                    default: 'plaintext'
                },
                hightlightTheme: {
                    type: 'string',
                    default: 'default'
                }
            }
        }
    }
);

function Edit(props) {

    const handleChangeLanguage = (highlightLanguage) => {
        props.setAttributes({ highlightLanguage });
    }

    const handleChangeTheme = (hightlightTheme) => {
        props.setAttributes({ hightlightTheme });
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Code Settings', 'tailpress-blocks')}>
                    <SelectControl
                        label={__('Language', 'tailpress-blocks')}
                        value={props.attributes.highlightLanguage}
                        options={[
                            { label: 'Plain Text', value: 'plaintext' },
                            { label: 'HTML', value: 'html' },
                            { label: 'CSS', value: 'css' },
                            { label: 'JavaScript', value: 'javascript' },
                            { label: 'PHP', value: 'php' },
                            { label: 'Python', value: 'python' },
                            { label: 'Ruby', value: 'ruby' },
                            { label: 'SQL', value: 'sql' },
                            { label: 'Shell', value: 'shell' },
                        ]}
                        onChange={handleChangeLanguage}
                    />
                    <SelectControl
                        label={__('Theme', 'tailpress-blocks')}
                        value={props.attributes.hightlightTheme}
                        options={[
                            { label: 'Default', value: 'default' },
                            { label: 'Dark', value: 'dark' },
                            { label: 'Light', value: 'light' },
                        ]}
                        onChange={handleChangeTheme}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
}

addFilter(
    'editor.BlockEdit',
    'tailpress-blocks/code',
    createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            if (props.name !== 'core/code') {
                return <BlockEdit {...props} />;
            }

            return (
                <>
                    <BlockEdit {...props} />
                    <Edit {...props} />
                </>
            );
        };
    })
);
