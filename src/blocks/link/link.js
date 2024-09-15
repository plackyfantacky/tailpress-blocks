import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, InspectorControls  } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

registerBlockType( metadata.name, {
    ...metadata,
    edit(props) {
        const blockProps = useBlockProps();
        const { attributes, setAttributes } = props;
        const { url = "", target = "", classNames = ""} = attributes;

        const handleUrlChange = (val) => {
            setAttributes({
                ...attributes,
                url: val
            });
        }

        const handleTargetChange = (val) => {
            setAttributes({
                ...attributes,
                target: val
            });
        }

        const handleClassNamesChange = (val) => {
            setAttributes({
                ...attributes,
                classNames: val
            });
        }

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Link Settings", metadata.textdomain)}>
                        <PanelRow>
                            <TextControl
                                label={__("URL", metadata.textdomain)}
                                value={url}
                                onChange={val => handleUrlChange(val)}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__("Link target", metadata.textdomain)}
                                value={target}
                                onChange={val => handleTargetChange(val)}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__("Link tag class names", metadata.textdomain)}
                                value={classNames}
                                onChange={val => handleClassNamesChange(val)}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps }>
                    <a className={classNames} rel="noopener">
                        <InnerBlocks />
                    </a>
                </div>
            </>
        );

    },
    save(props) {
        const blockProps = useBlockProps.save();
        const { attributes } = props;
        return (
            <div { ...blockProps }>
                <a href={attributes.url} target={attributes.target} className={attributes.classNames} rel="noopener">
                    <InnerBlocks.Content />
                </a>
            </div>
        );
    }
} );
